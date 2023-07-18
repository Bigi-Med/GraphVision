
// const fs = require('fs');


// First read the file
//from disc now eventualy from import


var originaleData = require("../../../client/src/ressources/GraphVisionMs2.json");
// originaleData.environment[1].test = "qsdqs";
// console.log(originaleData.environment[1])

// console.log(originaleData.links);

// // Second, add the links fields

function addLinks(originaleData)
{
    for( let i =0; i< originaleData.links.length; i++)
    {
        for(let j = 0 ; j<originaleData.environment.length;j++)
        {
            // console.log(originaleData.links[i].source);
            // console.log(originaleData.environment[j].id);
            // break;

            if(originaleData.links[i].source === originaleData.environment[j].id)
            {
                originaleData.environment[j].Liens == null ? originaleData.environment[j].Liens = findNameFromId(originaleData.environment,originaleData.links[i].target) :
                    originaleData.environment[j].Liens = `${findNameFromId(originaleData.environment,originaleData.links[i].target)},${findNameFromId(originaleData.environment,originaleData.links[i].target)}`;
            }
        }
        // break;
    }
    return originaleData;
}

function findNameFromId(arrayTo,target)
{
    for(let i = 0; i < arrayTo.length; i++ )
    {
        if(arrayTo[i].id === target)
        {
            return arrayTo[i].name;
        }
    }
}

//finaly, adapt to pivot format.
function formatToPivot(originaleData)
{
    return originaleData.environment;
}

test = addLinks(originaleData);
test2 = formatToPivot(test);
//console.log(test2);

module.exports =  {addLinks, formatToPivot};