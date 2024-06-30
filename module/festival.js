const path = require('path');
const fs = require('fs');
const date = require('date-and-time'); // Install using: npm install date-and-time


const itsFestivalDay = () => {
    // Step 1: Find today's date
    const today = new Date();

    // Step 2: Load festival data from festival.json
    const festivalFilePath = path.join(__dirname, '../config/festival.json');
    
    try {
        const festivalData = JSON.parse(fs.readFileSync(festivalFilePath, 'utf8'));

        // Step 3: Check if today's date matches any festival date
        const matchingFestival = festivalData.find(festival => {
            const festivalDate = new Date(festival.date);
            return date.format(today, 'YYYY-MM-DD') === date.format(festivalDate, 'YYYY-MM-DD');
        });

        // Step 4: Return the festival file name if there is a match
        return matchingFestival ? matchingFestival.name : null;
    } catch (error) {
        console.error('Error reading or parsing festival data:', error.message);
        return null;
    }
}

module.exports = { itsFestivalDay };
