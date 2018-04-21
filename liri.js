require('dotenv').config();

// Dependencies/Linked Files
const Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    inquirer = require('inquirer'),
    request = require('request'),
    fs = require('fs'),
    keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)
    params = { screen_name: 'jharnois444'};

// Make it so liri.js can take in one of the following commands:

// my-tweets
switch (command) {
    case 'my-tweets':
        myTweets()
        break

// spotify-this-song
    case 'spotify-this-song':
        spotifyThisSong()
        break
        
// movie-this
    case 'movie-this':
        movieThis()
        break
// do-what-it-says
    case 'do-what-it-says':
        doWhatItSays()
        break
    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
        break
}

// Display most recent 20 tweets
function getTweets () { 
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log("-----------")
                console.log(tweet.text)
                console.log("Tweet written on " + tweet.created_at)
            })
        }
    })
}



// function spotifySong(songName)
//     spoify.search({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);