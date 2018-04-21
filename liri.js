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

/**
 * Capture User Input
 * @param {string} liriReturn Commands: my-tweets, spotify-this-song, movie-this, do-what-it-says
 * @param {string} parameter Optional input
 */

function userInput(liriReturn, parameter) {
    if (liriReturn) {
        log('Processing %s command', liriReturn)
    }

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

function spotifyThisSong() {
    spotify
    .search({ type: 'track', query: 'All the Small Things' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        console.log("The movie's title: " + JSON.parse(body).Title +
                    "\nYear of Release: " + JSON.parse(body).Year +
                    "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                    "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                    "\nCountry where movie was produced: " + JSON.parse(body).Country +
                    "\nLanguage: " + JSON.parse(body).Language +
                    "\nPlot: " + JSON.parse(body).Plot +
                    "\nFeatured Actors: " + JSON.parse(body).Actors
                );
    }
    });
}

// function to access "do what it says" from random.txt file
function doWhatItSays() {
	
	// read record from random.txt file
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}
	});
}}