const STORAGE_PREFIX = 'ivoryCoastCulture_';

export function saveToStorage(key, data) {
    try {
        const storageKey = STORAGE_PREFIX + key;
        const serializedData = JSON.stringify(data);
        localStorage.setItem(storageKey, serializedData);
        console.log(`Data saved to localStorage: ${key}`, data);
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

export function getFromStorage(key) {
    try {
        const storageKey = STORAGE_PREFIX + key;
        const item = localStorage.getItem(storageKey);
        
        if (item) {
            const data = JSON.parse(item);
            console.log(`Data retrieved from localStorage: ${key}`, data);
            return data;
        }
        
        return null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

export function removeFromStorage(key) {
    try {
        const storageKey = STORAGE_PREFIX + key;
        localStorage.removeItem(storageKey);
        console.log(`Data removed from localStorage: ${key}`);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

export function clearStorage() {
    try {
        // Only clear items with our prefix
        Object.keys(localStorage)
            .filter(key => key.startsWith(STORAGE_PREFIX))
            .forEach(key => localStorage.removeItem(key));
        
        console.log('All app data cleared from localStorage');
        return true;
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
    }
}

export function getStorageStats() {
    const appKeys = Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX));
    
    return {
        totalItems: appKeys.length,
        totalSize: appKeys.reduce((total, key) => total + (localStorage[key]?.length || 0), 0),
        keys: appKeys.map(key => key.replace(STORAGE_PREFIX, ''))
    };
}