document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    // Charger les données JSON
    async function fetchMembers() {
        try {
            const response = await fetch("members.json");
            const members = await response.json();
            displayMembers(members, "grid"); // Afficher en grille par défaut
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }

    // Afficher les membres
    function displayMembers(members, view) {
        membersContainer.innerHTML = "";
        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>Membership Level: ${member.membershipLevel}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(card);
        });

        if (view === "list") {
            membersContainer.style.display = "flex";
            membersContainer.style.flexDirection = "column";
        } else {
            membersContainer.style.display = "grid";
        }
    }

    // Basculer entre vue grille et vue liste
    gridViewButton.addEventListener("click", () => {
        gridViewButton.classList.add("active");
        listViewButton.classList.remove("active");
        displayMembers(JSON.parse(localStorage.getItem("members")), "grid");
    });

    listViewButton.addEventListener("click", () => {
        gridViewButton.classList.remove("active");
        listViewButton.classList.add("active");
        displayMembers(JSON.parse(localStorage.getItem("members")), "list");
    });

    // Ajouter la date et l'heure de dernière modification
    const lastModified = document.getElementById("last-modified");
    const formattedDate = new Date(document.lastModified).toLocaleString();
    lastModified.textContent = formattedDate;

    // Stocker les membres dans localStorage
    fetchMembers().then(members => localStorage.setItem("members", JSON.stringify(members)));
});