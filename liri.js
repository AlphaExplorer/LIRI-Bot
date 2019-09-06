require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var value = process.argv.slice(3).join(' ');

switch (command) {
    case "concert-this":
        concert_this(value);
      break;
    
    case "spotify-this-song":
        spotify_this(value);
      break;
    
    case "movie-this":
        movie_this(value);
      break;
    
    case "do-what-it-says":
        do_it();
      break;
    }
  

    function concert_this(artist)
    {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function(response) {
              console.log("The name of the venue is: " + response.data[0].venue.name);
              console.log("The venue location is: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
              console.log("The date of the event is: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));
            }).catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
    };

    function spotify_this(song)
    {
      if(song=="")
      {
        var song = "the sign"
      spotify
      .search({
          type: 'track',
          query: song,
          limit: 1
      })
      .then(response => {
        let songMatches = response.tracks.items;

        for (match of songMatches)
        {   
            console.log('Artist: ' + match.artists[0].name
                    + '\nSong Name: ' + match.name
                    + '\nLink: ' + match.href
                    + '\nAlbum: ' + match.album.name
                    + '\n');
        }
      })
      .catch(error => {
          console.log('An error occured:', error);
      })
      } else 
      {
        spotify
        .search({
            type: 'track',
            query: song,
            limit: 1
        })
        .then(response => {
          let songMatches = response.tracks.items;
  
          for (match of songMatches)
          {   
              console.log('Artist: ' + match.artists[0].name
                      + '\nSong Name: ' + match.name
                      + '\nLink: ' + match.href
                      + '\nAlbum: ' + match.album.name
                      + '\n');
          }
        })
        .catch(error => {
            console.log('An error occured:', error);
        })
      }
    };

    function movie_this(title)
    {
      if(title == "")
      {
      var title = "Mr. Nobody" 
      axios.get("http://www.omdbapi.com/?t="+title+"&apikey=trilogy").then(
        function(response) {
          console.log("The title of the movie is: " + response.data.Title);
          console.log("The year the movier came out was: " + response.data.Year);
          console.log("IMDB Rating of the movie: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
          console.log("Country Produced: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          
        }).catch(function(error) {
          console.log('An error occured', error);
          });
      } else
      {
        axios.get("http://www.omdbapi.com/?t="+title+"&apikey=trilogy").then(
          function(response) {
            console.log("The title of the movie is: " + response.data.Title);
            console.log("The year the movier came out was: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            
          }).catch(function(error) {
            console.log('An error occured', error);
            });
      }
    };

    function do_it()
    {
      fs.readFile('./random.txt', 'utf-8', (error, data) => {
        if (error) 
        {
            console.log('An error occured:', error);
        }
        else
        {
          var random_array = data.split(',');
          var new_command = random_array[0];
          console.log(new_command)
          var new_value = random_array[1];
          console.log(new_value)

          switch (new_command) {
            case "concert-this":
                concert_this(new_value);
              break;
            
            case "spotify-this-song":
                spotify_this(new_value);
              break;
            
            case "movie-this":
                movie_this(new_value);
              break;
            }
        }
    });
    };
