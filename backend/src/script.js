import fs from 'fs';

// Read the raw data file
const rawData = JSON.parse(fs.readFileSync('transformedTours.json', 'utf-8'));

// Recursive function to remove `_id` from all objects
const removeIds = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(removeIds);
    } else if (obj !== null && typeof obj === 'object') {
        const { _id, ...rest } = obj; // Remove _id
        return Object.fromEntries(
            Object.entries(rest).map(([key, value]) => [key, removeIds(value)])
        );
    }
    return obj;
};

// Process data
const transformedData = removeIds(rawData);

// Write the transformed data to a new file
fs.writeFileSync('Tours.json', JSON.stringify(transformedData, null, 2), 'utf-8');

console.log('All _id fields removed from all levels. Saved as transformedTours.json');
