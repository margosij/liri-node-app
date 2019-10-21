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

function runCommands (command, search){
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
                "Artists's name: " + responseSpotify.tracks.items[i].artists[0].name,
                "Albums's name: " + responseSpotify.tracks.items[i].album.name,
                "Song's name: " + responseSpotify.tracks.items[i].name,
                "Song preview: " + responseSpotify.tracks.items[i].preview_url,
                ].join("\n\n")
                console.log(results+"\n")

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
                console.log(results+"\n")
            }})
    break;

}
}

if (command !== "do-what-it-says"){
    runCommands(command, search)
}
else{
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
          }

        var input = data.split(",")

        var superCommand = input[0]
        var superSearch = input[1]
        runCommands(superCommand, superSearch)
    })
}
