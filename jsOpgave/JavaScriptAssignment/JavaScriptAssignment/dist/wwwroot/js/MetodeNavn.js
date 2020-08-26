document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("metodeNavn").textContent = getName();

    function getName() {
        return "Mit navn er Nicklas Sams";
    }
});