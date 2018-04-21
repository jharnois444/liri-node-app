require('dotenv').config();

// Dependencies/Linked Files
 const spotify = new Spotify(keys.spotify);
 const client = new Twitter(keys.twitter);
 const keys = require('./keys.js');

 const Twitter = require('twitter');
 const request = require('request');
 const inquirer = require('inquirer');
 const Spotify = require('node-spotify-api');
 const fs = require('fs');
    


//     Make it so liri.js can take in one of the following commands:

// my-tweets
switch (command) {
    case 'my-tweets':
        showTweets()
        break

// spotify-this-song
    case 'spotify-this-song':
        spotifySpng(parameter || DEFAULT_SONG)
        break
        
// movie-this
    case 'movie-this':
        omdbMovie(parameter || DEFAULT_MOVIE)
        break
// do-what-it-says
    case 'do-what-it-says':
        performTaskFromFile()
        break
    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
        break
}

// Display most recent 20 tweets
function showTweets() {
    client.get('statuses/user_timeline', TWEET_PARAMS,
        function(error, tweets, response) {
            if (!error) {
                tweets.forEach(tweet => {
                    log(SEPARATOR)
                    log(tweet.text)
                    log('Tweeted on %s'.dim, moment(tweet.created_at, TWITTER_DATE_FORMAT).format(OUTPUT_DATE_FORMAT))
                })
                log(SEPARATOR)
            }
            promptToContinue()
        }
    )
}



// function spotifySong(songName)
//     spoify.search({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);