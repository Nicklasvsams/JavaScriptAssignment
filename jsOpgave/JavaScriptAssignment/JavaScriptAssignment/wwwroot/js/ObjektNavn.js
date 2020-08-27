document.addEventListener("DOMContentLoaded", function (event) {
    var myObject = {
        fornavn: "Nicklas",
        efternavn: "Sams"
    }

    function getName() {
        return "Mit navn er " + myObject.fornavn + " " + myObject.efternavn;
    }

    document.getElementById("objektNavn").textContent = getName();
});