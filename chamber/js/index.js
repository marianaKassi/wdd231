document.addEventListener("DOMContentLoaded", () => {
    // Update last modified date
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();

    // Fetch and display weather data
    async function fetchWeather() {
        const apiKey = "07318ee6b4bfd153ec3177dd487f63a6"; // Replace with your API key
        const city = "Yamoussoukro"; // Replace with your city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const weatherContainer = document.getElementById("weather-container");

            weatherContainer.innerHTML = `
                <p>Current Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Visibility: ${data.visibility} km</p> 
                <p> Pressure:${data.main.pressure} hPa</p
            `;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather-container").innerHTML = "<p>Unable to load weather data.</p>";
        }
    }

    // Fetch members from JSON file
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            return members;
        } catch (error) {
            console.error("Error loading members:", error);
            return [];
        }
    }

    // Display random member spotlights
    async function displaySpotlights() {
        const members = await fetchMembers();
        const goldAndSilverMembers = members.filter(member => member.membershipLevel === "Gold" || member.membershipLevel === "Silver");
        const randomMembers = shuffleArray(goldAndSilverMembers).slice(0, 2); // Select 2 random members

        const spotlightContainer = document.getElementById("spotlight-container");
        randomMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div>
                    <h4>${member.name}</h4>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p>Membership Level: ${member.membershipLevel}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;
            spotlightContainer.appendChild(card);
        });
    }

    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize page
    fetchWeather();
    displaySpotlights();
});