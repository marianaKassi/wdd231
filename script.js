// JavaScript to update the last modified date
document.addEventListener("DOMContentLoaded", function () {
    const lastUpdateElement = document.getElementById("last-update");
    const lastUpdateDate = new Date();
    const formattedDate = lastUpdateDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    lastUpdateElement.textContent = formattedDate;
});