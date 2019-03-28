//NPM modules and other files
var axios = require("axios"); //For Axios calls
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment"); //For date in concert-this command
var fs = require("fs"); //For do-what-it-says

var array = [];
var query = process.argv;
var userInput = process.argv[2];
for (var i = 3; i < query.length; i++) {
  array.push(query[i]);
  array.push("+")
}

array.splice(-1); //eliminates last plus sign
var final = array.join("").toLowerCase(); //creates string for URL input

//Spotify

var spotify = new Spotify(keys.spotify);

function spotifyThisSong() {
  if (final === "") {
    final = "ace+of+base+sign"
  }

  spotify.search(
    { type: 'track', query: final },
    function (error, data) {
      if (error) {
        return console.log("Error occurred:" + error + "\nDid you spell the song correctly?")
      }
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name)
    }); //end search function
};

//Concert this

var concertThis = function concertThis() {
  var queryURL = "https://rest.bandsintown.com/artists/" + final + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(
    function (response) {
      if (response.data.length <= 0) {
        console.log("No information. Try another artist or check your spelling!")
      } else {
        for (var i = 0; i < response.data.length; i++) {
          console.log(`Venue: ${response.data[i].venue.name}`);
          console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
          console.log(`Date: ${moment(response.data[i].datetime).format('LL')}`);
        };
      };
    });
};

//OMDB

function movieThis() {
  if (final === "") {
    final = "mr+nobody"
  }

  axios.get("http://www.omdbapi.com/?t=" + final + "&y=&plot=short&r=json&apikey=trilogy").then(
    function (response) {
      console.log("* Title of the movie:         " + response.data.Title);
      console.log("* Year the movie came out:    " + response.data.Year);
      console.log("* IMDB Rating of the movie:   " + response.data.imdbRating);
      console.log("* Country produced:           " + response.data.Country);
      console.log("* Language of the movie:      " + response.data.Language);
      console.log("* Plot of the movie:          " + response.data.Plot);
      console.log("* Actors in the movie:        " + response.data.Actors);
    })
}

//Do what it says

// var doWhatItSays = 
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error)
    }

    var dataArr = data.split(",");
    userInput = dataArr[0];
    final = dataArr[1];
    console.log(final)


    switch (userInput) {
      case "concert-this":
        concertThis();
        break;
      case "spotify-this-song":
        spotifyThisSong();
        break;
      case "movie-this":
        movieThis();
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        outputData("I don't understand that command. Please input a valid one.")
    }
  })
}



switch (userInput) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("I don't understand that command. Please input a valid one.")
}
