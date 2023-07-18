/*
Function to count the number of interactions, takes data as json
*/

function CountInteractions(jsonData)
{
    let tab = new Array
    let index = 0;
    for(let app in jsonData){
        for(let j in jsonData[app]){
            if(j == 'Liens'){
                const liens = jsonData[app]['Liens'].split(',')
                let interaction = liens.length
                jsonData[app].Interaction = interaction
            }
        }
        jsonData[app].index = index
        tab.push(jsonData[app])
        index = index + 1;

    }
    return jsonData;
}

module.exports = {CountInteractions};

