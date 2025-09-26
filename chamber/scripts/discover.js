document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from JSON file
    async function fetchItems() {
        try {
            const response = await fetch("data/items.json");
            const items = await response.json();
            displayCards(items);
        } catch (error) {
            console.error("Error loading items:", error);
        }
    }

    // Display cards dynamically
    function displayCards(items) {
        const gallery = document.getElementById("gallery");
        items.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", `card${index + 1}`);
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button>Learn More</button>
            `;
            gallery.appendChild(card);
        });
    }

    // Visitor message logic
    function displayVisitorMessage() {
        const lastVisit = localStorage.getItem("lastVisit");
        const today = Date.now();
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

        let message;
        if (!lastVisit) {
            message = "Welcome! Feel free to contact us if you have any questions.";
        } else {
            const daysSinceLastVisit = Math.floor((today - lastVisit) / oneDay);
            if (daysSinceLastVisit === 0) {
                message = "Back so soon! Awesome!";
            } else {
                const dayText = daysSinceLastVisit === 1 ? "day" : "days";
                message = `Your last visit was ${daysSinceLastVisit} ${dayText} ago.`;
            }
        }

        document.getElementById("visitor-message").textContent = message;
        localStorage.setItem("lastVisit", today);
    }

    // Initialize page
    fetchItems();
    displayVisitorMessage();
});

// Update last modified date
document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();