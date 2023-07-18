const jsonData= require('./dataOrange.json');


var tab = new Array
let index = 0;
for(var app in jsonData){
    for(var j in jsonData[app]){
        if(j == 'Liens'){
            const liens = jsonData[app]['Liens'].split(',')
            interaction = liens.length
            jsonData[app].Interaction = interaction


            //console.log(jsonData[app])
        }


    }
    jsonData[app].index = index
    console.log("index" , jsonData[app]);
    tab.push(jsonData[app])
    index = index + 1;

}

var tab2 = JSON.stringify(tab);

const fs = require("fs");
fs.writeFile("./dataOrange.json", tab2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
});



// // Requiring fs module
// const fs = require("fs");

// // Storing the JSON format data in myObject
// var data = fs.readFileSync("./exemple.json");
// var myObject = JSON.parse(data);

// var tab = new Array
// tab.push(myObject)
// myObject.iter = 2
// tab.push(myObject)

// console.log(tab)
// // // Writing to our JSON file
// // var newData2 = JSON.stringify(myObject);
// // tab.push(newData2)
// // tab.push(newData)

// var tab2 = JSON.stringify(tab);
// fs.writeFile("./exemple.json", tab2, (err) => {
//   // Error checking
//   if (err) throw err;
//   console.log("New data added");
// });

