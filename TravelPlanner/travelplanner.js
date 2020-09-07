document.addEventListener("DOMContentLoaded", function (event) {
    const baseURL = 'http://xmlopen.rejseplanen.dk/bin/rest.exe/';
    const jsonRequest = '&format=json';

    // Event bliver kaldt når der bliver trykket på "Submit" knappen. 
    document.getElementById("querybutton").onclick = 
    async function() {
        let locationQuery = 'location?input=';
        let textnode = document.getElementById("traveltext");
        let query = textnode.value.replace(/ /g, '%20');
        let request = locationQuery.concat(query);

        /* Kalder async metoder som kan kaldes inde i en async metode selv.
        getLocation Coord finder din lokalisering baseret på input.
        getNearestStop finder så det nærmeste stoppested ud fra brugerens lokalitet
        getTripToDestination finder til sidst den tidligeste rejse fra dette stop til Ballerup St
        */
        let location = await getLocationCoord(baseURL.concat(request, jsonRequest));
        let nearestStop = await getNearestStop(location);
        let trip = await getTripToDestination(nearestStop);

        // Opretter elementer til at vise rejsen
        createTripElements(trip.Leg, textnode.value);
    }

    // Asynkron funktion der finder koordinater baseret på brugerens indtastning
    async function getLocationCoord(request){
        try{
            let response = await fetch(baseURL.concat(request, jsonRequest));
            let data = await response.json();

            // Baseret på din indtastning kan API'en enten svare med StopLocation eller CoordLocation, derfor tjekkes de før vi returnerer en værdi
            if (typeof data.LocationList.StopLocation !== 'undefined'){
                return await data.LocationList.StopLocation[0];
            }
            else if (typeof data.LocationList.CoordLocation !== 'undefined'){
                return await data.LocationList.CoordLocation;
            }
        }
        catch (error){
            console.log(error);
            return null;
        }
    }

    // Asynkron funktion der finder det nærmeste stop baseret på koordinater
    async function getNearestStop(location){
        try{
            let locationCoordinateQuery = 'stopsNearby?coordX=' + location.x + "&coordY=" + location.y;
            let response = await fetch(baseURL.concat(locationCoordinateQuery, jsonRequest));
            let data = await response.json();

            return data.LocationList.StopLocation[0];
        }
        catch (error) {
            console.log("Error: " + error);
        }
    }

    // Asynkron funktion der finder den tidligeste rejse fra det angivne stop
    async function getTripToDestination(nearestStop){
        try{
            let nearestStopTripQuery = 'trip?originId=' + nearestStop.id + "&destId=008600708"
            let response = await fetch(baseURL.concat(nearestStopTripQuery, jsonRequest));
            let data = await response.json();

            return data.TripList.Trip[0];
        }
        catch (error) {
            console.log(error);
        }
    }

    // Opretter elementer for hvert stop på rejsen
    function createTripElements(trip, queryText){
        var h3 = document.createElement("h3");
        h3.innerText = "Din rejse fra " + queryText;
        var nodes = [];
        nodes.push(h3);

        for (let i = 0; i < trip.length; i++) {
            let pname = document.createElement("p");
            pname.innerText = "Transport: " + trip[i].name;
            
            let pfrom = document.createElement("p");
            pfrom.innerText = "Afgang fra: " + trip[i].Origin.name;

            let pfromtime = document.createElement("p");
            pfromtime.innerText = "Afgang kl. : " + trip[i].Origin.time;

            let pto = document.createElement("p");
            pto.innerText = "Til: " + trip[i].Destination.name;

            let ptotime = document.createElement("p");
            ptotime.innerText = "Ankomst kl. : " + trip[i].Destination.time;

            let br = document.createElement("br");

            let message = document.createElement("p");

            if (trip[i] === trip[0]){
                message.innerText = "Info: " + trip[i].MessageList.Message.Text.$;
            }

            let br3 = document.createElement("br");

            if (i+1 === trip.length){
                h3.innerText = h3.innerText.concat(" til ", trip[i].Destination.name);
            }
            nodes.push(pname, pfrom, pfromtime, pto, ptotime, br, message, br3);
        }
        populateTravelInfo(nodes);
    }

    // Tilføjer de forskellige elementer til hjemmesiden
    function populateTravelInfo(array){
        let travelinfo = document.getElementById("travelinfo");
        travelinfo.innerHTML = '';

        array.forEach(array => {
            travelinfo.appendChild(array);
        });
    }
});