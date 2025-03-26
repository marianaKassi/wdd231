// Footer dates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Updated: ${document.lastModified}`;

// Load member data
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Loading error:', error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('member-container');
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = `member-card ${member.membership}`;
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p class="membership">${getMembershipLevel(member.membership)}</p>
        `;
        container.appendChild(card);
    });
}

function getMembershipLevel(level) {
    const levels = {
        "gold": "Gold Member",
        "silver": "Silver Member",
        "bronze": "Bronze Member"
    };
    return levels[level] || "Member";
}

// Initialize
document.addEventListener('DOMContentLoaded', getMembers);