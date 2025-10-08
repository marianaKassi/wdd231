import { fetchEthnicGroups, filterGroupsByRegion, filterGroupsByLanguageFamily } from 'scripts/api.js';
import { openModal, closeModal, setupModal } from 'scripts/modal.js';

let allEthnicGroups = [];
let filteredGroups = [];

// DOM Elements
const culturesGrid = document.getElementById('culturesGrid');
const regionFilter = document.getElementById('regionFilter');
const familyFilter = document.getElementById('familyFilter');
const resetFilters = document.getElementById('resetFilters');
const festivalsList = document.getElementById('festivalsList');
const artsList = document.getElementById('artsList');
const cuisineList = document.getElementById('cuisineList');

// Initialize cultures page
document.addEventListener('DOMContentLoaded', async () => {
    await initializeCulturesPage();
    setupEventListeners();
    setupModal();
});

async function initializeCulturesPage() {
    try {
        allEthnicGroups = await fetchEthnicGroups();
        filteredGroups = [...allEthnicGroups];
        
        displayAllCultures(filteredGroups);
        displayCulturalTraditions(allEthnicGroups);
        
        console.log('Cultures page initialized');
        
    } catch (error) {
        console.error('Error initializing cultures page:', error);
        showError('Failed to load cultural data.');
    }
}

function displayAllCultures(groups) {
    const culturesHTML = groups.map(group => `
        <div class="group-card" data-group="${group.id}">
            <h3>${group.name}</h3>
            <div class="group-details">
                <p><strong>Region:</strong> ${getRegionName(group.region)}</p>
                <p><strong>Population:</strong> ${group.population}</p>
                <p><strong>Language:</strong> ${group.language}</p>
                <p><strong>Family:</strong> ${getLanguageFamilyName(group.languageFamily)}</p>
            </div>
            <div class="group-highlights">
                <p><strong>Art:</strong> ${group.traditionalArt.split(',')[0]}</p>
                <p><strong>Festival:</strong> ${Array.isArray(group.festivals) ? group.festivals[0] : group.festivals}</p>
            </div>
            <button class="learn-more" onclick="openGroupModal('${group.id}')">
                Explore Culture
            </button>
        </div>
    `).join('');

    culturesGrid.innerHTML = culturesHTML;
}

function displayCulturalTraditions(groups) {
    // Extract unique festivals
    const allFestivals = groups.flatMap(group => 
        Array.isArray(group.festivals) ? group.festivals : [group.festivals]
    );
    const uniqueFestivals = [...new Set(allFestivals)].slice(0, 5);
    
    // Extract unique arts
    const allArts = groups.flatMap(group => 
        group.traditionalArt.split(',').map(art => art.trim())
    );
    const uniqueArts = [...new Set(allArts)].slice(0, 5);
    
    // Extract unique cuisine
    const allCuisine = groups.flatMap(group => 
        Array.isArray(group.cuisine) ? group.cuisine : [group.cuisine]
    );
    const uniqueCuisine = [...new Set(allCuisine)].slice(0, 5);
    
    // Display traditions
    displayTraditionList(festivalsList, uniqueFestivals, 'festival');
    displayTraditionList(artsList, uniqueArts, 'art');
    displayTraditionList(cuisineList, uniqueCuisine, 'cuisine');
}

function displayTraditionList(container, items, type) {
    const itemsHTML = items.map(item => `
        <div class="tradition-item" data-type="${type}">
            <span class="tradition-icon">${getTraditionIcon(type)}</span>
            <span class="tradition-text">${item}</span>
        </div>
    `).join('');
    
    container.innerHTML = itemsHTML;
}

function getTraditionIcon(type) {
    const icons = {
        festival: '🎭',
        art: '🎨',
        cuisine: '🍛'
    };
    return icons[type] || '🌟';
}

function setupEventListeners() {
    // Filter event listeners
    if (regionFilter) {
        regionFilter.addEventListener('change', applyFilters);
    }
    
    if (familyFilter) {
        familyFilter.addEventListener('change', applyFilters);
    }
    
    if (resetFilters) {
        resetFilters.addEventListener('click', resetAllFilters);
    }
}

function applyFilters() {
    let filtered = [...allEthnicGroups];
    
    // Apply region filter
    const selectedRegion = regionFilter.value;
    if (selectedRegion && selectedRegion !== 'all') {
        filtered = filterGroupsByRegion(filtered, selectedRegion);
    }
    
    // Apply language family filter
    const selectedFamily = familyFilter.value;
    if (selectedFamily && selectedFamily !== 'all') {
        filtered = filterGroupsByLanguageFamily(filtered, selectedFamily);
    }
    
    filteredGroups = filtered;
    displayAllCultures(filteredGroups);
    
    // Show filter results count
    showFilterResults(filtered.length);
}

function resetAllFilters() {
    if (regionFilter) regionFilter.value = 'all';
    if (familyFilter) familyFilter.value = 'all';
    
    filteredGroups = [...allEthnicGroups];
    displayAllCultures(filteredGroups);
    hideFilterResults();
}

function showFilterResults(count) {
    // Remove existing results message
    hideFilterResults();
    
    const resultsMessage = document.createElement('div');
    resultsMessage.className = 'filter-results';
    resultsMessage.innerHTML = `Showing ${count} of ${allEthnicGroups.length} ethnic groups`;
    resultsMessage.style.cssText = `
        background: var(--accent);
        color: var(--text);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        margin: 1rem 0;
        text-align: center;
        font-weight: bold;
    `;
    
    culturesGrid.parentNode.insertBefore(resultsMessage, culturesGrid);
}

function hideFilterResults() {
    const existingMessage = document.querySelector('.filter-results');
    if (existingMessage) {
        existingMessage.remove();
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
    `;
    
    document.querySelector('main').prepend(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Global function for modal
window.openGroupModal = async (groupId) => {
    try {
        const group = allEthnicGroups.find(g => g.id === groupId);
        
        if (group) {
            const modalContent = `
                <h2>${group.name} Cultural Profile</h2>
                <div class="modal-group-details">
                    <div class="detail-section">
                        <h3>Basic Information</h3>
                        <p><strong>Region:</strong> ${getRegionName(group.region)}</p>
                        <p><strong>Population:</strong> ${group.population}</p>
                        <p><strong>Language:</strong> ${group.language}</p>
                        <p><strong>Language Family:</strong> ${getLanguageFamilyName(group.languageFamily)}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Cultural Heritage</h3>
                        <p><strong>Traditional Arts:</strong> ${group.traditionalArt}</p>
                        <p><strong>Cultural Customs:</strong> ${group.customs}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Festivals & Cuisine</h3>
                        <p><strong>Major Festivals:</strong> ${Array.isArray(group.festivals) ? group.festivals.join(', ') : group.festivals}</p>
                        <p><strong>Culinary Specialties:</strong> ${Array.isArray(group.cuisine) ? group.cuisine.join(', ') : group.cuisine}</p>
                    </div>
                </div>
                
                ${group.description ? `
                <div class="modal-description">
                    <h3>Cultural Overview</h3>
                    <p>${group.description}</p>
                </div>
                ` : ''}
            `;
            
            openModal(modalContent);
        }
    } catch (error) {
        console.error('Error opening group modal:', error);
        showError('Failed to load group information.');
    }
};