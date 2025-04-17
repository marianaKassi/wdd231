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