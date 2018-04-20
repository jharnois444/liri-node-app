require("dotenv").config();

// Dependencies/Linked Files
const keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter);

const Twitter = require("twitter"),
    request = require("request"),
    inquirer = require("inquirer"),
    Spotify = require("node-spotify-api"),
    fs = require("fs"),
    keys = require("./keys.js")