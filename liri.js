//client id: cdfc6f79f8de43c4850d2dea20a6cc94
//client secret: 1b61c644026a412cbeb0041c4cffc4fd
//NPM modules and other files
var axios = require("axios"); //For Axios calls
var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment"); //For date in concert-this command

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

function spotifyThisSong (){
  if (final === ""){
    final = "ace+of+base+sign"
  }

  spotify.search(
    {type: 'track', query: final}, 
    function(error, data){
      if(error){
        return console.log("Error occurred:" + error +"\nDid you spell the song correctly?")
      } 
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name)
  }); //end search function
};

// var userInput = process.argv[2].toLowerCase();
// var song = process.argv[3].toLowerCase();

// if (userInput === undefined) {
//   userInput = "the sign ace of base"
// }

// if (userInput === "spotify-this-song") {
//   spotify.search({ type: 'track', query: `${song}` }, function (err, data) {
//     if (err) {
//       return console.log("Error occurred: " + err);
//     } else {
//       for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
//         if (i === 0) {
//           console.log("Artist(s): " + data.tracks.items[0].artists[i].name)
//         } else {
//           console.log("  ") + data.tracks.items[0].artists[i].name
//         }
//       }
//       console.log("Song: " + data.tracks.items[0].name);
//       console.log("Preview Link: " + data.tracks.items[0].preview_url);
//       console.log("Album: " + data.tracks.items[0].album.name)
//     }
//   });
// };



//Concert this

var concertThis = function concertThis() {
  var queryURL = "https://rest.bandsintown.com/artists/" + final + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(
    function (response) {
      if (response.data.length <= 0) {
        console.log("No information. Try another artist!")
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

function movieThis(final){
  if (final === ""){
    final = "mr+nobody"
  }

  axios.get("http://www.omdbapi.com/?t=" + final + "&y=&plot=short&r=json&apikey=trilogy").then({
    function(response){
      console.log(response);
      console.log("movie response");
      console.log("* Title of the movie:         " + response.data.Title);
      console.log("* Year the movie came out:    " + response.data.Year);
      console.log("* IMDB Rating of the movie:   " + response.data.imdbRating);
      console.log("* Country produced:           " + response.data.Country);
      console.log("* Language of the movie:      " + response.data.Language);
      console.log("* Plot of the movie:          " + response.data.Plot);
      console.log("* Actors in the movie:        " + response.data.Actors);
    }
  })
}

// var movieName = "";

// for (var i = 2; i < process.argv.length; i++) {
//   if (i === 2) {
//     movieName = process.argv[i];
//   } else {
//     movieName = `${process.argv[i]}`;
//   }
// }

// var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy";

// if (userInput === "movie-this") {
//   axios.get(queryURL).then(
//     function (response) {
//       console.log("* Title of the movie:         " + response.data.Title);
//       console.log("* Year the movie came out:    " + response.data.Year);
//       console.log("* IMDB Rating of the movie:   " + response.data.imdbRating);
//       console.log("* Country produced:           " + response.data.Country);
//       console.log("* Language of the movie:      " + response.data.Language);
//       console.log("* Plot of the movie:          " + response.data.Plot);
//       console.log("* Actors in the movie:        " + response.data.Actors);
//     }
//   )
//   console.log(movieName)
// }


//Do what it says

var doWhatItSays = function () {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error)
    }

    var dataArr = data.split(",");

    run(dataArr[0], dataArr[1])
  })
}

var outputData = function (data) {
  console.log(data)

  fs.append("log.txt", "\r\n" + data, function (error) {
    if (error) {
      return console.log(error)
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
  console.log("final is " + final);
    movieThis(final);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    outputData("I don't understand that command. Please input a valid one.")
}


// var movieThis = function (movieQuery) {




//   // if 
//   if (movieQuery === undefined) {
//     movieQuery = "mr nobody";
//   }

//   request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json", function (error, response, body) {
//     //if ?
//     console.log("* Title of the movie:         " + JSON.parse(body).Title);
//     console.log("* Year the movie came out:    " + JSON.parse(body).Year);
//     console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
//     console.log("* Country produced:           " + JSON.parse(body).Country);
//     console.log("* Language of the movie:      " + JSON.parse(body).Language);
//     console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
//     console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
//   })

// }

// if (userInput === "movie-this") {
//   movieThis(movieQuery)
// }
