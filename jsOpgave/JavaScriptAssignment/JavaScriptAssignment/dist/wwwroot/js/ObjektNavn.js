document.addEventListener("DOMContentLoaded", function (event) {
    var mitObjekt = {
        fornavn: "Nicklas",
        efternavn: "Sams"
    }
    function getName() {
        return "Mit navn er " + mitObjekt.fornavn + " " + mitObjekt.efternavn;
    }

    document.getElementById("objektNavn").textContent = getName();
});