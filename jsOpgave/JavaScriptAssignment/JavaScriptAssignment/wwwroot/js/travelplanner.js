document.addEventListener("DOMContentLoaded", function (event) {
    fetch('http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=55655405&coordY=12549377&format=json', { mode: 'no-cors' })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data.response);
            data.forEach((data) => {
                console.log(data);
            });
        })
        .catch((err) => {
            console.error("My error: " + err);
        });
});