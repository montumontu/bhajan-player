const { playBhajanList } = require('./module/playBhajanList'); 
const { getListToPlay } = require('./module/musicList');


const playBhajan = () => {
    // which list to play
    const bhajanList = getListToPlay();
    // play the song list
    if (!bhajanList || !bhajanList.length) {
        console.log("bhajanList length is not valid");
        return;
    }
    playBhajanList(bhajanList);
}


playBhajan();
