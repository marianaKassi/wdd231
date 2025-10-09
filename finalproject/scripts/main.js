import { fetchEthnicGroups } from 'data/ethnic-groups.json';
import { openModal, closeModal, setupModal } from './scripts/modal.js';
import { saveToStorage, getFromStorage } from './scripts/storage.js';



async function fetchMembers() {
    const response = await fetch('data/ethnic-groups.json');
    const data = await response.json();
    return data;
}





// Global variables
let allEthnicGroups = [];

// DOM Elements
const featuredGroupsContainer = document.getElementById('featuredGroups');
const exploreBtn = document.getElementById('exploreBtn');
const culturalForm = document.getElementById('culturalForm');
const culturalMap = document.getElementById('culturalMap');

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
    setupEventListeners();
    setupMapInteractions();
});

async function initializeApp() {
    try {
        // Fetch ethnic groups data
        allEthnicGroups = await fetchEthnicGroups();
        
        // Display featured groups on homepage
        displayFeaturedGroups(allEthnicGroups);
        
        // Load and apply user preferences
        loadUserPreferences();
        
        console.log('Application initialized successfully');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        showError('Failed to load cultural data. Please refresh the page.');
    }
}

function displayFeaturedGroups(groups) {
    // Use array methods to process data
    const featuredGroups = groups
        .filter(group => group.featured)
        .slice(0, 6); // Show 6 featured groups on homepage

    // Generate HTML using template literals
    const groupsHTML = featuredGroups.map(group => `
        <div class="group-card" data-group="${group.id}">
            <h3>${group.name}</h3>
            <p><strong>Region:</strong> ${getRegionName(group.region)}</p>
            <p><strong>Population:</strong> ${group.population}</p>
            <p><strong>Language Family:</strong> ${getLanguageFamilyName(group.languageFamily)}</p>
            <p><strong>Traditional Art:</strong> ${group.traditionalArt.split(',')[0]}</p>
            <button class="learn-more" onclick="openGroupModal('${group.id}')">
                Learn More
            </button>
        </div>
    `).join('');

    featuredGroupsContainer.innerHTML = groupsHTML;
}

function setupEventListeners() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Explore button click
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('.featured-groups').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Form submission
    if (culturalForm) {
        culturalForm.addEventListener('submit', handleFormSubmit);
    }

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('culturalModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function setupMapInteractions() {
    if (!culturalMap) return;

    const regions = culturalMap.querySelectorAll('.region');
    
    regions.forEach(region => {
        region.addEventListener('click', () => {
            const regionName = region.dataset.region;
            showRegionGroups(regionName);
        });
    });
}

function showRegionGroups(region) {
    const regionGroups = allEthnicGroups.filter(group => group.region === region);
    
    if (regionGroups.length > 0) {
        const groupsList = regionGroups.map(group => 
            `<li>${group.name} - ${group.population}</li>`
        ).join('');
        
        openModal(`
            <h2>Ethnic Groups in ${getRegionName(region)} Region</h2>
            <ul>${groupsList}</ul>
            <p>Total groups: ${regionGroups.length}</p>
        `);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(culturalForm);
    const userPreferences = {
        name: formData.get('name'),
        email: formData.get('email'),
        interest: formData.get('interest'),
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveToStorage('userPreferences', userPreferences);
    
    // Show success message
    showSuccess('Thank you for your interest! We will contact you soon.');
}

function loadUserPreferences() {
    const preferences = getFromStorage('userPreferences');
    if (preferences) {
        // Apply user preferences to form if they exist
        if (culturalForm) {
            const nameInput = culturalForm.querySelector('#name');
            const emailInput = culturalForm.querySelector('#email');
            const interestSelect = culturalForm.querySelector('#interest');
            
            if (nameInput && preferences.name) nameInput.value = preferences.name;
            if (emailInput && preferences.email) emailInput.value = preferences.email;
            if (interestSelect && preferences.interest) interestSelect.value = preferences.interest;
        }
        
        console.log('Loaded user preferences:', preferences);
    }
}

// Helper functions
function getRegionName(regionCode) {
    const regions = {
        'north': 'Northern',
        'central': 'Central', 
        'west': 'Western',
        'east': 'Eastern',
        'south': 'Southern'
    };
    return regions[regionCode] || regionCode;
}

function getLanguageFamilyName(familyCode) {
    const families = {
        'akan': 'Akan',
        'mandé': 'Mandé',
        'gur': 'Gur',
        'kru': 'Kru'
    };
    return families[familyCode] || familyCode;
}

function showError(message) {
    // Create and display error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #ffebee;
        color: #c62828;
        padding: 1rem;
        margin: 1rem;
        border-radius: 4px;
        border-left: 4px solid #c62828;
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        max-width: 300px;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    // Create and display success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #e8f5e8;
        color: #2e7d32;
        padding: 1rem;
        margin: 1rem;
        border-radius: 4px;
        border-left: 4px solid #2e7d32;
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        max-width: 300px;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Global function for modal (attached to window for HTML onclick)
window.openGroupModal = async (groupId) => {
    try {
        const group = allEthnicGroups.find(g => g.id === groupId);
        
        if (group) {
            const modalContent = `
                <h2>${group.name} People</h2>
                <div class="modal-group-info">
                    <p><strong>Region:</strong> ${getRegionName(group.region)}</p>
                    <p><strong>Population:</strong> ${group.population}</p>
                    <p><strong>Language:</strong> ${group.language}</p>
                    <p><strong>Language Family:</strong> ${getLanguageFamilyName(group.languageFamily)}</p>
                    <p><strong>Traditional Arts:</strong> ${group.traditionalArt}</p>
                    <p><strong>Cultural Customs:</strong> ${group.customs}</p>
                    <p><strong>Major Festivals:</strong> ${Array.isArray(group.festivals) ? group.festivals.join(', ') : group.festivals}</p>
                    <p><strong>Culinary Specialties:</strong> ${Array.isArray(group.cuisine) ? group.cuisine.join(', ') : group.cuisine}</p>
                </div>
                ${group.description ? `<div class="modal-description"><p>${group.description}</p></div>` : ''}
            `;
            
            openModal(modalContent);
        }
    } catch (error) {
        console.error('Error opening group modal:', error);
        showError('Failed to load group information.');
    }
};










// Fetch and display weather data
    async function fetchWeather() {
        const apiKey = "07318ee6b4bfd153ec3177dd487f63a6"; // Replace with your API key
        const city = "Yamoussoukro"; // Replace with your city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const weatherContainer = document.getElementById("weather-container");

            weatherContainer.innerHTML = `
                <p>🌤️Current Temperature: ${data.main.temp}°C</p>
                <p>🌤️Weather: ${data.weather[0].description}</p>
                <p>🌤️Humidity: ${data.main.humidity}%</p>
                <p>🌤️Visibility: ${data.visibility} km</p> 
                <p> 🌤️Pressure:${data.main.pressure} hPa</p
            `;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather-container").innerHTML = "<p>Unable to load weather data.</p>";
        }
    }









// Setup modal when script loads
setupModal();