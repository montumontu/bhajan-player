const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Function to load the bhajan from the bhajan folder
function loadBhajanList(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files.map((file) => ({ bhajan_name: file }));
  } catch (err) {
    console.error(`Error reading bhajans from folder: ${err.message}`);
    return [];
  }
}

function readJSONFile(filePath) {
try {
    const fileNames = fs.readFileSync(filePath);
    console.log("Read json file", JSON.parse(fileNames));
    return JSON.parse(fileNames);
    } catch (err) {
    console.error(`Error reading the JSON File: ${err.message}`);
    return [];
    }
}

// Function to update and save the song list to the JSON file
function saveBhajanList(folderPath, jsonFileName, newSongName) {
    try {
        console.log("folder path new", folderPath);
      const filePath = path.join(folderPath, jsonFileName);
        console.log("File Path", filePath, jsonFileName);
      // Load the existing song list from the file
      const bhajanList = readJSONFile(filePath, jsonFileName);
  
      // Check if the new song name is already in the list
      const existingSongIndex = bhajanList.findIndex((song) =>
        song.bhajan_name.toLowerCase() === newSongName.toLowerCase()
      );
  
      if (existingSongIndex !== -1) {
        console.log(`Song '${newSongName}' already exists in the list.`);
      } else {
        // Add the new song to the list
        bhajanList.push({ bhajan_name: newSongName });
        console.log(`Song '${newSongName}' added to the list.`);
      }
  
      // Save the updated song list to the file
      fs.writeFileSync(filePath, JSON.stringify(bhajanList, null, 2), 'utf8');
      console.log('Song list updated successfully.');
    } catch (err) {
      console.error(`Error saving song list: ${err.message}`);
    }
  }
  

// Function to search for bhajans based on input
function searchBhajans(input, bhajanList) {
  return bhajanList.filter((bhajan) =>
    bhajan.bhajan_name.toLowerCase().includes(input.toLowerCase())
  );
}

// Function to prompt the user to select a song
function promptForBhajan(results) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Multiple bhajans found. Please refine your search or select a song:');

    results.forEach((song, index) => {
      console.log(`${index + 1}. ${song.bhajan_name}`);
    });

    rl.question('Enter the number corresponding to the desired song: ', (selection) => {
      rl.close();
      const selectedSong = results[parseInt(selection, 10) - 1];
      resolve(selectedSong);
    });
  });
}

// Main program
const bhajanfolderPath = path.join(__dirname, '../bhajans');


if (!bhajanfolderPath) {
  console.error('Usage: node script.js <bhajanfolderPath>');
  process.exit(1);
}

const bhajanList = loadBhajanList(bhajanfolderPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function searchAndPrompt(bhajanFilePath) {
  rl.question('Enter part of the Bhajan name to search: ', (searchInput) => {
    const searchResults = searchBhajans(searchInput, bhajanList);
    const bhajanFolderPath = path.join(__dirname, '../config/bhajanList');
    if (searchResults.length === 1) {
    //   console.log(`Selected song: ${results[0].bhajan_name}`);
      rl.close();
      saveBhajanList(bhajanFolderPath, bhajanFilePath, searchResults[0].bhajan_name);
    } else if (searchResults.length > 1) {
      promptForBhajan(searchResults).then((selectedBhajan) => {
        rl.close();
        saveBhajanList(bhajanFolderPath, bhajanFilePath, selectedBhajan.bhajan_name);
      });
    } else {
      console.log('No matching bhajans found. Please add the bhajan to the bhajan folder.');
      searchAndPrompt();
    }
  });
}

const providedArgument = process.argv[2];

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const bhajanFilePath = weekdays.includes(providedArgument.toLowerCase())
  ? `weekdays/${providedArgument.toLowerCase()}.json`
  : `festival/${providedArgument}.json`;
searchAndPrompt(bhajanFilePath);

