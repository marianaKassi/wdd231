    // Update last modified date
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleDateString();

document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp on page load
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toISOString();

    // Modal functionality
    const modals = document.querySelectorAll(".modal");
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            const modalId = card.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Animation for cards
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add("show");
        });
    }, 100);
});