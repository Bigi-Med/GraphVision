const MongoClient = require('mongodb').MongoClient;
const dbName = 'OrangeData';
const client = new MongoClient('mongodb://0.0.0.0:27017', { useUnifiedTopology: true });
const services = require("./services/InteractionCount");
let jsonData = require('../../client/src/ressources/dataOrange.json')


async function main() {
    try {
        console.log("connect");
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}
// main().catch(console.error);

async function openConnection()
{
    await client.connect();
}

/*
* db = client.db(dbName)
*/
async function deleteDataBase() {
    let db = client.db("OrangeData");
    await db.dropDatabase(function (err, result) {
        console.log("Error here: " + err);
        if (err) throw err;
        console.log("Operation Success ? " + result);
        // after all the operations with db, close it.
        //  db.close();
    });
}
//deleteDataBase();
/*
*newDbName : string
*collectionName: string
*data: jsonData for example*/

async function createCollection(newDbName, collectionName, data) {
    let result = await client.connect();
    let db = result.db(newDbName);
    await db.collection(collectionName)
        .insertMany(data, function (err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            //client.close();
        });
}
/*const newJsonData = services.CountInteractions(jsonData);
createCollection("OrangeData","theData",newJsonData);*/
async function readDB(){
    let result = await client.connect();
    let db = result.db("OrangeData");
    let collection = db.collection("GraphVisionMs");
    let data = await collection.find({}).toArray();
    //console.log("data",data)
    console.log("data",data.length)
}
readDB();

async function listDatabases(client) {
    dataBasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    dataBasesList.databases.forEach(db =>
        console.log(` - ${db.name}`));
};
listDatabases(client);

// collection: collection1 for example
async function findCollectionByName(collection) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
    const result = client.db("OrangeData").collection(collection).find();
    return result;
}
async function closeConnection() {
    await client.close();
}
 async function getListCollection(res){
    const db = client.db("OrangeData");
     await db.listCollections().toArray()
         .then(result=>{console.log("get list",result);
         res.send(result);}
 );
         //res.send(myString)

}

async function retreiveDataFromDataBase(collectionName) {
    await openConnection();
    let arrayName = [];
    let dataAsString = '[';
    //prev collection: collection2
    Promise.resolve(getJsonData(collectionName)).then(
        (data) => {
            Promise.resolve(data.forEach(element => {
                dataAsString = dataAsString == '[' ? '[' + JSON.stringify(element) : dataAsString + ',' + JSON.stringify(element);
            })).then(
                () => {
                    dataAsString += ']';
                    let dataAsJson = JSON.parse(dataAsString);
                    arrayName = dataAsJson
                    //res.status(200).send(dataAsJson);
                    //console.log("hnaaa",arrayName)
                    return arrayName;
                    //closeConnection();

                }
            )
        }
    );

}

async function Collectionlist(collectionName,newJsonData,res)
{
    let  exists = false;
    console.log(collectionName);
    let result = client.db("OrangeData").listCollections({name: collectionName})
    result.toArray(function(err, myString) {
        if ( myString.length > 0 )
            {
                //Collection already exists
                console.log("exist");
                res.status(220).send("A database with that name already exists, please choose another name");

            }
            else
            {
                //Collection does not exist
                console.log("does not exist");
                createCollection("OrangeData",collectionName,newJsonData);
                res.status(200).send("Database created successfully",);
            }

        });


}


async function getJsonData(collection)
{
    /*client.db("OrangeData").collection(collection).find().toArray(function(err, docs) {
        console.log("logging data to know " + JSON.stringify(docs));
    });*/
    const projection = {_id: 0} //suppressing private id
    //prev collection: collection1:
    const cursor = client.db("OrangeData").collection(collection).find().project(projection);
    return cursor;

}






module.exports = { findCollectionByName, closeConnection, getJsonData, openConnection,Collectionlist,createCollection,getListCollection,retreiveDataFromDataBase};


