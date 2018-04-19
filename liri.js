require("dotenv").config();

// Dependencies/Linked Files
const keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)