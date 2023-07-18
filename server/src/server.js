const express = require('express')
const database = require("./database");
const fs = require('fs');
const app = express()
const port = 3000
const cors = require("cors")
const services = require("./services/InteractionCount");
const pivot = require("./services/convertToPivot");


//import data orange
//let dataOrange = require('../../client/src/ressources/dataOrange.json')
var dataOrange = [];
let keysToBuildNetwork = []
const { addSuffix } = require("yarn/lib/cli");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

var dataAsJson = "";
const newFile = "newOrangeData.json";


async function retreiveDataFromDataBase(collectionName,param,keysToBuildNetwork,details,res) {
    await database.openConnection();
    let dataAsString = '[';
    //prev collection: collection2
    Promise.resolve(database.getJsonData(collectionName)).then(
        (data) => {
            Promise.resolve(data.forEach(element => {
                dataAsString = dataAsString == '[' ? '[' + JSON.stringify(element) : dataAsString + ',' + JSON.stringify(element);
            })).then(
                () => {
                    dataAsString += ']';
                    dataAsJson = JSON.parse(dataAsString);
                    console.log("dataa",dataAsJson)
                    if(param==="filter")
                    {
                        //console.log("in filter",dataAsJson);
                        let possibleFiltres = [];
                        dataAsJson.forEach((item) => {
                            Object.keys(JSON.parse(JSON.stringify(item))).forEach((filtre) => {
                                if (!possibleFiltres.includes(filtre)) {
                                    possibleFiltres.push(filtre);
                                }
                            })
                        })
                        res.send(possibleFiltres);
                    }else if(param === "buildNetwork"){
                        let dataToBuildNetwork = {
                            "node" : uniq(nodes(dataAsJson,keysToBuildNetwork)),
                            "edge" : edges(dataAsJson,keysToBuildNetwork)
                        }
                        console.log("in build network", dataToBuildNetwork)
                        res.send(dataToBuildNetwork)
                    }else if( param === "details"){
                        res.send(dataAsJson[Object.keys(details)[0]])
                    }
                }
            )
        }
    );
}
//retreiveDataFromDataBase()

function uniq(tab){
    let result = Array.from(new Set(tab.map(a => a.id)))
        .map(id => {
            return tab.find(a => a.id === id)
        })
    return result
}
function groupBy(items, key){
    let result =items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [
                ...(result[item[key]] || []),
                item,
            ],
        }),
        {},
    );
    return result
}

function filter(tabFilter){
    let chosenFilters = []
    tabFilter.forEach((item) =>{
        chosenFilters.push({
            filter : item,
            selectedValue : null
        })
    })
    return chosenFilters;
}
function nodes(myData,dataKey) {
    let nodes = [];
    myData.forEach((item)=>{
        nodes.push({
            "id" : item[dataKey.filter((item)=> item["field"]=== 'id')[0]["selectedValue"]],
            "group" :item[dataKey.filter((item)=> item["field"]=== 'group')[0]["selectedValue"]],
            "label" : item[dataKey.filter((item)=> item["field"]=== 'label')[0]["selectedValue"]],
            "title" : item[dataKey.filter((item)=> item["field"]=== 'label')[0]["selectedValue"]],
            //"value": item["Interaction"],
        })
    })
    return nodes;
}

function edges(myData,dataKey){
    let edges = [];
    myData.forEach((item)=>{
        if(item[dataKey.filter((item)=> item["field"]=== 'link')[0]["selectedValue"]]) {
            let liens = item[dataKey.filter((item)=> item["field"]=== 'link')[0]["selectedValue"]].split(',');

            console.log("iteeem", item[dataKey.filter((item) => item["field"] === 'label')[0]["selectedValue"]])

            liens.forEach((lien) => {
                console.log("lien",lien)
                edges.push({
                    "from": item[dataKey.filter((item)=> item["field"]=== 'id')[0]["selectedValue"]],
                    "to": myData.findIndex((item) => item[dataKey.filter((item)=> item["field"]=== 'label')[0]["selectedValue"]].trim() === lien.trim())
                })
            })
        }
    })
    return edges;
}

app.get("/listCollection", cors(), async (req, res) => {
    console.log("aaa3ibad llah")
    await database.getListCollection(res);
})

app.post("/filtres", cors(), async (req, res) => {
    let collectionName  = req.body;
    await retreiveDataFromDataBase(Object.keys(collectionName)[0],"filter", "0", "rien",res);
})

app.post("/buildNetwork", cors(), async (req,res)=>{
    keysToBuildNetwork = req.body;
    await retreiveDataFromDataBase(keysToBuildNetwork.name,"buildNetwork",keysToBuildNetwork.data,"rien",res)
})

app.post("/buildFilter", cors(), async (req,res) =>{
    let keyTobuildFilter = req.body;
    let chosenFilter = filter(keyTobuildFilter.data)
    let tableOfItems = [];
    for(let i =0; i<chosenFilter.length; i++){
        tableOfItems.push(dataOrange.map((element)=>element[chosenFilter[i]["filter"]]))
    }
    let dataTobuildFilter = {
        chosenFilters : chosenFilter,
        tableOfItems : tableOfItems,
    }
    res.send(dataTobuildFilter)

})

app.post("/selectedData", cors(), async (req,res)=>{
    let filters = req.body;
    let filtredData = [];
    Object.keys(filters).forEach((key) =>{
        if(filters[key] !== null) {
            if(key !=="Label"){
                filters[key].forEach((element) =>{
                    let copyDataOrange = JSON.parse(JSON.stringify(dataOrange))
                    copyDataOrange = copyDataOrange.filter((item) => item[key] === element);
                    filtredData = filtredData.concat(copyDataOrange);
                })
            }
            else if(key === "Label"){
                filters[key].forEach((label)=>{
                    let newData = JSON.parse(JSON.stringify(dataOrange));
                    newData = newData.filter((item) => item[key] === label);
                    let linksOfSelectedNode = [];
                    if(newData[0]["Liens"]){
                        let liens = newData[0]["Liens"].split(',');
                        liens.forEach((link) =>{
                            let index = dataOrange.findIndex((element) => element["Label"] === link.trim());
                            if( index !== -1)
                                linksOfSelectedNode.push(dataOrange[index]);
                        })
                    }
                    newData = newData.concat(linksOfSelectedNode)
                    filtredData = filtredData.concat(newData);
                })
            }
        }
        let result = Object.values(groupBy(filtredData,"index")).map((item)=>item[0])

        filtredData = result.length>0 ? result : filtredData
    })
    let dataToBuildNetwork = {
        "node" : nodes(filtredData,keysToBuildNetwork),
        "edge" : edges(filtredData,keysToBuildNetwork)
    }
    res.send(dataToBuildNetwork)
})

app.post('/api', (req,res) =>
{
    const body = req.query.domaine;
    console.log(body);
    res.send("yess")
})

app.post("/details", cors(), async (req,res)=>{
    let node = req.body.data;
    await retreiveDataFromDataBase(keysToBuildNetwork.name,"details","rien",node,res)
})

app.post('/upload', async (req, res) => {
    const jsonData = req.body.data;
    const jsonDataName = req.body.databaseName;
    let intermediateData = pivot.addLinks(jsonData);
    let finaleData = pivot.formatToPivot(intermediateData);
    const newJsonData = services.CountInteractions(finaleData);
    await database.Collectionlist(jsonDataName,newJsonData,res)

  })

app.listen(port, () => {
    console.log("listening at localhost : 4000")
})