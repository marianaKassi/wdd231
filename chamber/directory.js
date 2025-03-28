// Display the current year and last modified date
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load and display members
async function loadMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  const memberList = document.getElementById('member-list');
  memberList.innerHTML = ''; // Clear previous content

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <img src="${member.image}" alt="Logo of ${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Tel: ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    memberList.appendChild(card);
  });
}

// Toggle between grid and list views
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('member-list').classList.remove('list-view');
  document.getElementById('member-list').classList.add('grid-view');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('member-list').classList.remove('grid-view');
  document.getElementById('member-list').classList.add('list-view');
});

// Initialize the page
loadMembers();