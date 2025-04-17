export function loadArtists() {
    fetch('artvision.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('artists-list');
            data.forEach(artwork => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${artwork.title}</strong> by ${artwork.artist}`;
                container.appendChild(div);
            });
        });
}