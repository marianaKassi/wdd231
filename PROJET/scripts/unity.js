import { fetchEthnicGroups } from './scripts/api.js';

let allEthnicGroups = [];

// DOM Elements
const harmonyStories = document.getElementById('harmonyStories');
const exchangePrograms = document.getElementById('exchangePrograms');

// Initialize unity page
document.addEventListener('DOMContentLoaded', async () => {
    await initializeUnityPage();
});

async function initializeUnityPage() {
    try {
        allEthnicGroups = await fetchEthnicGroups();
        displayHarmonyStories();
        displayExchangePrograms();
        
        console.log('Unity page initialized');
        
    } catch (error) {
        console.error('Error initializing unity page:', error);
    }
}

function displayHarmonyStories() {
    const stories = [
        {
            title: "Inter-ethnic Marriage Traditions",
            description: "How mixed marriages between different ethnic groups have created unique cultural fusion traditions.",
            groups: ["Baoulé", "Malinké", "Dioula"]
        },
        {
            title: "Shared Marketplaces",
            description: "Traditional markets where different ethnic groups exchange not just goods, but cultural practices and languages.",
            groups: ["All Regions"]
        },
        {
            title: "Cultural Festival Collaborations",
            description: "Joint celebrations where multiple ethnic groups participate in each other's traditional festivals.",
            groups: ["Sénufo", "Bété", "Yacouba"]
        },
        {
            title: "Language Exchange Programs",
            description: "Community initiatives promoting multilingualism and cross-cultural understanding.",
            groups: ["Urban Centers", "Educational Institutions"]
        }
    ];

    const storiesHTML = stories.map(story => `
        <div class="story-card">
            <h3>${story.title}</h3>
            <p>${story.description}</p>
            <div class="involved-groups">
                <strong>Involved Groups:</strong> ${Array.isArray(story.groups) ? story.groups.join(', ') : story.groups}
            </div>
        </div>
    `).join('');

    harmonyStories.innerHTML = storiesHTML;
}

function displayExchangePrograms() {
    const programs = [
        {
            name: "Youth Cultural Exchange",
            description: "Program connecting young people from different ethnic backgrounds to learn about each other's traditions.",
            impact: "500+ participants annually"
        },
        {
            name: "Traditional Arts Workshop",
            description: "Master artisans from different groups teaching their crafts to interested learners from all backgrounds.",
            impact: "15 different art forms taught"
        },
        {
            name: "Culinary Heritage Program",
            description: "Cooking classes and food festivals showcasing the diverse cuisine of Ivory Coast's ethnic groups.",
            impact: "50+ traditional recipes shared"
        },
        {
            name: "Language Preservation Initiative",
            description: "Documenting and teaching endangered languages while promoting multilingualism.",
            impact: "12 languages documented"
        }
    ];

    const programsHTML = programs.map(program => `
        <div class="program-card">
            <h3>${program.name}</h3>
            <p>${program.description}</p>
            <div class="program-impact">
                <strong>Impact:</strong> ${program.impact}
            </div>
        </div>
    `).join('');

    exchangePrograms.innerHTML = programsHTML;
}