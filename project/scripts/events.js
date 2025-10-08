
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});

function fetchEvents() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.events-grid');
            data.forEach(event => {
                const card = document.createElement('div');
                card.classList.add('events-card');
                card.innerHTML = `
                    <img src="${event.image}" alt="${event.title}">
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p><strong>Date:</strong> ${event.date}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p>${event.description}</p>
                        <a href="#" class="learn-more">Learn More</a>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

