# liri-node-app

Here's a link to the [GitHub page!](https://github.com/margosij/liri-node-app)
Here's the link to the video of the liri app in [action!](https://youtu.be/fRH1Fy1Oiz8)

The purpose of the liri app is to do one of four things:

    1. Find the next three concerts of your favorite artist. This will include the name of the venue, location of the venue and the date of the event.

    2. Search Spotify by song title and it will show you different names of bands that have a song by that name, song's name, preview link of the song on Spotify and the ablum of the song you searched.

    3. Seaches OMDB for a movie title and brings back the movie title, year it came out, IMDB and Rotten Tomatoes movie ratings, country it was produced and language, plot and actors of the movie.

    4. Search a random topic in a random API based on what you've entered in the random.txt file.

I split the functionality of my app in two sections on my liri.js page. I had all of my require and process.argv variables at the top of my page, then created a switch function so the code knows which case to run based on what command was entered.
I stored the keys for the three api's on a seperate file that only I could get to so no one could mess with them. I also created a page that would ignore the keys file so it wouldn't upload onto GitHub.

The technologies that were used in the app were:
    1. axios
    2. fs
    3. node.js
    4. moment
    5. omdb
    6. spotify
    7. bands in town
    8. javaScript

My role in the development of this app was the designer and writer of the code.


In order to use this application you will need to:

    1. Open your terminal which can be done via CTRL + `

    2. Type in the four needed inputs: node, liri.js, one of the four commands listed below, either a movie, song or band of your choice
        a. movie-this
        b. spotify-this-song
        c. concert-this
        d. do-what-it-says ** Note: You will not need to enter in a fourth input for this command because it will read what it needs off the random.txt file

    3. Once you have the above typed in your terminal; hit Enter and see the result.
