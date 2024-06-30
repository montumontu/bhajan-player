const { itsFestivalDay } = require('./festival');
const date = require('date-and-time'); // Install using: npm install date-and-time
const fs = require('fs');
const path = require('path');

const getListToPlay = () => {
    // decide which CSV file to read
    const [festivalList, dayList] = identifyTheList();
    console.log("List to play ", dayList);
    // Retrive the list and store them in an array and return
    let bhajanList;
    if (festivalList) {
        bhajanList = retriveList(festivalList);
    }
    if (!bhajanList) {
        bhajanList = retriveList(dayList);
    }
    console.log(bhajanList);
    return bhajanList;
}



const identifyTheList = () => {
    // Find if its any festival
    const festivalName = itsFestivalDay();
    // if festival day return
    let festivalPath;
    if (festivalName) {
        festivalPath = `../config/bhajanList/festival/${festivalName}.json`;
    }
    // Get the day of the week and return
    dayMusicFilePath = `../config/bhajanList/weekdays/${getDay()}.json`;
    return [festivalPath, dayMusicFilePath ];
}

const retriveList = (fileName) => {
    // Read the json file and return.
    console.log("retrive list", __dirname, fileName);
    const filePath = path.join(__dirname, fileName);
    console.log("retrive list2");

    try {
        // Read the JSON file synchronously
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON content
        const jsonData = JSON.parse(fileContent);

        return jsonData;
    } catch (error) {
        console.error(`File not found -  ${fileName}: ${error.message}`);
        return null;
    }
}



const getDay = () => {
    // Get the current date
    const today = new Date();

    // Format the date to get the day of the week
    const dayOfWeek = date.format(today, 'dddd');

    return dayOfWeek;
};
module.exports = { getListToPlay };
