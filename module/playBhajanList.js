const path = require('path');
const { exec } = require('child_process');
const play = require('play-sound')({ player: 'mpg321' }); // 'mpg321' is used for playing mp3 files


const playBhajanList = (bhajanList, index = 0) => {
    if (index < bhajanList.length) {
        const song = bhajanList[index];
        const fileName = song.bhajan_name;

        // Adjust the file path based on your actual directory structure
        const filePath = path.join(__dirname, '../bhajans', fileName); 

        // Use mpg321 command-line tool to play the music
        const playCommand = `mpg321 "${filePath}"`;

        // Execute the command
        const childProcess = exec(playCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error playing ${fileName}: ${err}`);
            } else {
                console.log(`Played: ${fileName}`);
            }
        });

        // Listen for the 'exit' event to play the next song
        childProcess.on('exit', () => {
            // Play the next song after the current one completes
            playBhajanList(bhajanList, index + 1);
        });
    }
};

module.exports = { playBhajanList };