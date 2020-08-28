document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("dag").textContent = "I dag er det " + getDayName();

    // Function which creates a Date variable which holds the date for today, which is then used to extrapolate the current day
    // Note: getMonth() has "+ 1" added because the array goes from 0-11, meaning we'd get last months data if left
    function getDayName() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return new Date(date).toLocaleDateString("da-DK", { weekday: 'long' }).toString();
    }
});