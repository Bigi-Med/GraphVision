const xlsx = require('xlsx');
var fs = require('fs');

function convertExcelFileToJsonUsingXlsx() {

    // Read the file using pathname
    const file = xlsx.readFile('./applis_rms.xlsx');

    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    // Variable to store our data
    let parsedData = [];

    // Convert to json using xlsx
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[0]]);

    // Add the sheet's json to our data array
    parsedData.push(...tempData);
    // call a function to save the data in a json file

    generateJSONFile(parsedData);
}
function generateJSONFile(data) {
    newFile = 'Testdata.json';
    console.log(JSON.stringify(data));
    dataAsJson = JSON.parse(JSON.stringify(data));
    fs.writeFile(newFile, JSON.stringify(dataAsJson, null, 4), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + newFile);
        }
    });//
}
convertExcelFileToJsonUsingXlsx();