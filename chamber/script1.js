

// Fetch Members Data
async function fetchMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

// Display Members
async function displayMembers(view = 'grid') {
    const directory = document.getElementById('directory');
    const members = await fetchMembers();

    directory.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        if (view === 'list') card.classList.add('list-view');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>Membership Level: ${member.membershipLevel}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>`;

        directory.appendChild(card);
    });
}

// Toggle View
document.getElementById('grid-view').addEventListener('click', () => {
    document.getElementById('directory').classList.remove('list-view');
    displayMembers('grid');
});

document.getElementById('list-view').addEventListener('click', () => {
    document.getElementById('directory').classList.add('list-view');
    displayMembers('list');
});



// Initial Load
displayMembers();
















    // Ajouter la date et l'heure de dernière modification
    const lastModified = document.getElementById("last-modified");
    const formattedDate = new Date(document.lastModified).toLocaleString();
    lastModified.textContent = formattedDate;

    
;









