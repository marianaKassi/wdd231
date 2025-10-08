const API_URL = 'data/ethnic-groups.json';

export async function fetchEthnicGroups() {
    try {
        console.log('Fetching ethnic groups data...');
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Successfully fetched ethnic groups:', data.ethnicGroups.length);
        return data.ethnicGroups;
        
    } catch (error) {
        console.error('Error fetching ethnic groups:', error);
        throw new Error('Unable to load cultural data. Please try again later.');
    }
}

export function filterGroupsByRegion(groups, region) {
    return groups.filter(group => 
        group.region.toLowerCase() === region.toLowerCase()
    );
}

export function filterGroupsByLanguageFamily(groups, family) {
    return groups.filter(group => 
        group.languageFamily.toLowerCase() === family.toLowerCase()
    );
}

export function sortGroupsByPopulation(groups, ascending = true) {
    return groups.sort((a, b) => {
        const popA = parseInt(a.population.replace(/,/g, ''));
        const popB = parseInt(b.population.replace(/,/g, ''));
        return ascending ? popA - popB : popB - popA;
    });
}

export function searchGroups(groups, searchTerm) {
    const term = searchTerm.toLowerCase();
    return groups.filter(group => 
        group.name.toLowerCase().includes(term) ||
        group.region.toLowerCase().includes(term) ||
        group.languageFamily.toLowerCase().includes(term) ||
        group.language.toLowerCase().includes(term)
    );
}

export function getUniqueRegions(groups) {
    return [...new Set(groups.map(group => group.region))];
}

export function getUniqueLanguageFamilies(groups) {
    return [...new Set(groups.map(group => group.languageFamily))];
}