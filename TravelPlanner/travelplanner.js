const fetch = require("node-fetch");
const baseURL = 'http://xmlopen.rejseplanen.dk/bin/rest.exe';
const apiRequest = '/stopsNearby?coordX=55655405&coordY=12549377';
const jsonRequest = '&format=json';
const URL = baseURL.concat(apiRequest, jsonRequest);


// function getApiData(fetchUrl) {
//     fetch(fetchUrl)
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         if (typeof data.LocationList.StopLocation !== 'undefined'){
//             return data.LocationList.StopLocation[0];
//         }
//         else if (typeof data.LocationList.CoordLocation !== 'undefined'){
//             return data.LocationList.CoordLocation[0];
//         }
//     })
//     .catch(err => {
//         console.error("My error: " + err);
//     });
// }
async function getTripData(URL){
    let response = await fetch(URL);
    let data = await response.json();
    if (typeof data.LocationList.StopLocation !== 'undefined'){
        return await data.LocationList;
    }
    else if (typeof data.LocationList.CoordLocation !== 'undefined'){
        return await data.LocationList;
    }
}

async function useTripData(){
    var myNewVar = await getTripData(URL);
    console.log(myNewVar);
}

useTripData();