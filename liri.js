//concert-this searches the BiT API and brings back "name of venue", "venue location", "date of venue"
var dotenv = require("dotenv").config();
var axios = require("axios");
var omdb = require("omdb");
// var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var bandsintown = require("bandsintown-rest");
var Spotify = require("node-spotify-api");

var command = process.argv[2]
var search = process.argv[3]
var spotify = new Spotify(keys.spotify);
var keys = require("./keys.js");
// var movieInput = "";


switch(command){

    case "movie-this":
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
        spotify.search({type: "track", query: search, limit: 3,},
        // axios.get("https://api.spotify.com/v1/search?q="+ search +"&type=artist", 
        // spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
                    // {"headers": {"Authorization": "Bearer BQDgNKWffNNRaJDd2MoDdTdLgQAbLSpnQfONIbAY4zP4fTTsVOIQhdUaq29G36T7x2XwzkcDm7CKePgHwwqr_MG8_BSFGf1m5HDl04GrVbkcz7FJ-dri5Z3HkkXGPphc7z-LxcqNykFPDIEZVP_oowG-8RJalvKQEQ"}})
                    // .then(
            function(err, responseSpotify){
                for (let i=0; i<1; i++){
                console.log(responseSpotify.tracks.items[i].artists.name); //artist name
                console.log(responseSpotify.tracks.items[i].album.name); //album name
                console.log(responseSpotify.tracks.items[i].name);  //song name
                console.log(responseSpotify.tracks.items[i].preview_url)  //song preview

            }})
            // function(err, data){
            //     console.log("Error occurred: " + err)
            // }
    break;

    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/"+ search +"/events?app_id=" + keys.bit.id).then(
            function(responseBands){
                for (let i=0; i<3; i++){
                console.log(responseBands.data[i].venue.name);
                console.log(responseBands.data[i].venue.city + ", " + responseBands.data[i].venue.country);
                console.log(responseBands.data[i].datetime);
            }})
    break;

    case "do-what-it-says":

    break;
}