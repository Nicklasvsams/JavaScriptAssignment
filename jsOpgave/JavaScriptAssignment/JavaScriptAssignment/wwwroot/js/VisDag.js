document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("dag").textContent = "I dag er det " + getDayName();

    function getDayName() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return new Date(date).toLocaleDateString("da-DK", { weekday: 'long' }).toString();
    }
});