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

// Display 20 most recent tweets when twitter function is called
var myTweets = function() {
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
        };
    });
}


var getArtistNames = function(artist) {
    return artist.name;
}

// Spotify search
var spotifyThisSong = function(songName) {

    spotify.search({ type: 'track', query: songName }
    , function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(
                getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('---------------------------------');
        }
    });
}


var movieThis = function(movieName) {


request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', 
    function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    })
}

var doWhatItSays = function() {
    fs.readFile('random.txt'), 'utf8', function (err, data) {
        if(err) throw err;
        
        var dataArr = data.split(',');

        if (dataArr.length ==2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    };
}

// Switch statement that holds different arguments from user
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            myTweets();
            break;
        case 'spotify-this-song':
        spotifyThisSong(functionData);
            break;
        case 'movie-this':
            movieThis(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log("Invalid Command");
    }
}

// Take arguments input into Liri and input them into pick function
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

// Referencing the arguments the user enters
runThis(process.argv[2], process.argv[3]);







