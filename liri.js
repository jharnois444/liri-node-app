require('dotenv').config();

// Dependencies/Linked Files
var Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    inquirer = require('inquirer'),
    request = require('request'),
    fs = require('fs'),
    keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)
    params = { screen_name: 'jharnois444'};
    movieName = process.argv[3];
    liriReturn = process.argv[2];

// Make it so liri.js can take in one of the following commands:



// my-tweets
switch (liriReturn) {
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
function myTweets() { 
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            };
            } else{
                console.log("error: " + err)
        }
    })
}



// function spotifySong(songName)
//     spoify.search({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);