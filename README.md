# Bhajan Player
Plays bhajan as per the day and festival.

# Instal Modules
``` npm i ```

# Install mpg321

For Linux (Debian/Ubuntu):
```sudo apt-get update
sudo apt-get install mpg321
```


For macOS (using Homebrew):
```
brew install mpg321
```
For Windows:

1. Download the mpg321 binary from the official website: mpg321.sourceforge.net
2. Add the mpg321 executable to your system's PATH.

# Running the Project
```
node play.js
```
# About the Song List

1. The song list is located in the config/bhajanList folder, organized by folders for festivals and weekdays.
2. The song list is represented as an array of objects to enhance customization.
3. Inside the config folder, find a file named festival.json containing festival names and dates.
4. If a festival name is listed in festival.json, a corresponding festival_name.json file should exist in config/bhajanList/festival.
