document.addEventListener("DOMContentLoaded", function (event) {
    // Sets up an XML HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/atoacounter/tecballerup");

    // Defines the responsetype as JSON
    xhr.responseType = "json";

    // When the JSON is loaded, this function is run
    xhr.onload = function () {
        // Gets the element in the footer we want to alter
        var footer = document.getElementById("sharedfooter");

        // Creates an element; A simple paragraph for showing the hit counter
        var counter = document.createElement("p");
        counter.style.marginBottom = 0;
        counter.innerHTML = "&nbsp;- " + this.response.value + " visits";

        // Appends the counter to the footer element
        footer.appendChild(counter);
    }

    // Sends the request
    xhr.send();
});