var dotenv = require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var omdb = require("omdb");
var keys = require("./keys.js");
var bandsintown = require("bandsintown-rest");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var command = process.argv[2]
var search = process.argv[3]
var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");

//create several stand alone functions for each command to be actioned
//function movieSearch
//function spotifySearch
//function concertSearch
//function readRandom

//need a function to choose which command is executed
//function decisionMaker

// function start (runCommands){
switch(command){

    case "movie-this":
        if (search === undefined){
            search = "Mr. Nobody"
        }
        axios.get("https://www.omdbapi.com/?t="+ search +"&apikey=" + keys.omdb.id).then(
            
            function(responseOMDB){
                var results = [
                "Movie Title: " + responseOMDB.data.Title,
                "Year Released: " + responseOMDB.data.Year,
                "IMDB Rating: " + responseOMDB.data.imdbRating,
                "Rotten Tomatoe Rating: " + responseOMDB.data.Ratings[1].Value,
                "Country Released: " + responseOMDB.data.Country,
                "Language of Movie: " + responseOMDB.data.Language,
                "Plot: " + responseOMDB.data.Plot,
                "Actors/Actresses: " + responseOMDB.data.Actors,
                ].join("\n\n")
                console.log(results)
        })
    break;

    case "spotify-this-song":
        if(search === undefined){
            search = "The Sign"
        }
        spotify.search({type: "track", query: search, limit: 3,},
            function(err, responseSpotify){
                for (let i=0; i<3; i++){
                var results = [
                "Artists's name: " + responseSpotify.tracks.items[i].artists[0].name, //artist name
                "Albums's name: " + responseSpotify.tracks.items[i].album.name, //album name
                "Song's name: " + responseSpotify.tracks.items[i].name,  //song name
                "Song preview: " + responseSpotify.tracks.items[i].preview_url,  //song preview
                ].join("\n\n")
                console.log(results)

            }})

    break;

    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/"+ search +"/events?app_id=" + keys.bit.id).then(
            function(responseBands){
                for (let i=0; i<3; i++){
                var date = moment(responseBands.data[i].datetime);
                var momentDate = date.format("MM/DD/YYY hh:mm")
                var results = [
                "Venue name: " + responseBands.data[i].venue.name,
                "Venue city and country: " + responseBands.data[i].venue.city + ", " + responseBands.data[i].venue.country,
                "Concert date: " + momentDate,
                ].join("\n\n")
                console.log(results)
            }})
    break;

    case "do-what-it-says":

        fs.readFile("random.txt", "utf8", function(error, data){
            if (error) {
                return console.log(error);
              }

            console.log(data)

            var input = data.split(",")
            console.log(input)

            var command = input[0]
            console.log(command)
            var search = input[1]
            console.log(search)
            // start()
            //run a final function that decides which command to use
        })

    break;
}
// }
// start()
