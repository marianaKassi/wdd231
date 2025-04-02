document.addEventListener("DOMContentLoaded", () => {
    // Embedded JSON data
    const data = {
        profile: {
            name: "Rubia Magdelena Francesco",
            location: "Tolokia, Madagascar"
        },
        courses: [
            { code: "CSE 110", category: "CSE" },
            { code: "WDD 130", category: "WDD" },
            { code: "CSE 111", category: "CSE" },
            { code: "CSE 210", category: "CSE" },
            { code: "WDD 131", category: "WDD" },
            { code: "WDD 231", category: "WDD" }
        ]
    };

    // Update last modified date
    document.getElementById("last-modified").textContent = new Date(document.lastModified).toLocaleString();
    const lastModified = document.getElementById("last-modified");
    const formattedDate = new Date(document.lastModified).toLocaleString();
    lastModified.textContent = formattedDate;

    // Filter certificates
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const certificatesContainer = document.querySelector(".certificate-grid");

    // Initialize certificates in the DOM
    function initializeCertificates() {
        certificatesContainer.innerHTML = ""; // Clear previous content
        data.courses.forEach(course => {
            const certificateDiv = document.createElement("div");
            certificateDiv.className = `certificate ${course.category}`;
            certificateDiv.textContent = course.code;
            certificatesContainer.appendChild(certificateDiv);
        });
    }

    // Apply filter to certificates
    function filterCertificates(filter) {
        const certificates = document.querySelectorAll(".certificate");
        certificates.forEach(cert => {
            if (filter === "all" || cert.classList.contains(filter)) {
                cert.style.display = "block";
            } else {
                cert.style.display = "none";
            }
        });
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterCertificates(button.dataset.filter);
        });
    });

    // Initialize certificates and set default filter ("all")
    initializeCertificates();
    filterCertificates("all");
});

