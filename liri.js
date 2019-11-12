require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
moment().format();

// capture the command that the user puts in
var action = process.argv[2]; //the action "concert-this, movie-this, "spotify", "do what it says""
var userRequest = process.argv; //everything that the user types
var userSearch = ''; // takes in everything starting at index of 3+-

//for loop to go through every word in the node
for (var i = 3; i < userRequest.length; i++) {
	if (i > 3 && i < userRequest.length) {
		userSearch = userSearch + '+' + userRequest[i];
	} else {
		userSearch += userRequest[i];
	}
}

//switch statement

switch (action) {
	//case 1 to retrieve info from the BandsInTown API
	case 'concert-this':
		if (!userSearch) {
			userSearch = 'u2';
		}
		concertInfo(userSearch);
		break;

	//case 2 to retrieve info from the OMDB API
	case 'movie-this':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		// need if else statement just incase the user does not request a valid movie entry
		//default to Mr. Nobody's movie info

		if (action === 'movie-this') {
		    userMovie(userSearch);
			}
			

		else if (!userSearch) {
			userSearch = "Mr+Nobody"
			userMovie(userSearch);
		}
		break;

	//case 3 to retrieve info from the Spotify API
	case 'spotify-this-song':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
			// if no artist, track, or album is typed in default to Jhene Aiko
		if (!userSearch) {
			userSearch = 'Jhene Aiko';
		}
		spotifyInfo(userSearch);
		break;

	//case 4 to retrieve info from the Spotify API when it is requested through a Txt file
	case 'do-what-it-says':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		dowhatitSays(userSearch);
		break;
	// when the criteria does not fit into any of the cases this is the default msg
	default:
		console.log('Try Again!');
}

//made functions for each action made by user. will call the function necessary for each case

function userMovie(userSearch) {
	//inject the users search term in the queryURL
	// Then run a request with axios to the OMDB API with the movie specified
	var queryUrl = 'http://www.omdbapi.com/?t=' + userSearch + '&y=&plot=short&apikey=trilogy';
	console.log(queryUrl);

	// retrieves the requested data from OMDB
	axios.get(queryUrl).then(function(response) {
		console.log('Title: ' + response.data.Title);
		console.log('Release Year: ' + response.data.Year);
		console.log('IMDB Rating: ' + response.data.imdbRating + '/10');
		console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
		console.log('Country: ' + response.data.Country);
		console.log('Language: ' + response.data.Language);
		console.log('Plot: ' + response.data.Plot);
		console.log('Actors: ' + response.data.Actors);
	});
}

function concertInfo() {
	var queryUrl = 'https://rest.bandsintown.com/artists/' + userSearch + '/events?app_id=codingbootcamp';
	console.log(queryUrl);

	// retrieves the requested data from bands in town API
	axios.get(queryUrl).then(function(response, data) {
		console.log('Upcoming concerts for ' + userSearch + ':');
		console.log("-----------------------------------")
		//display the name of venue, venue location, and date of event


		var bandSearch = response.data;
		for(i = 0; i < bandSearch.length; i++){
		console.log(bandSearch[i].venue.name);
		console.log(bandSearch[i].venue.city);
		console.log(bandSearch[i].venue.region);
		//used to moment to format the date of event structure 
		var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 a")
		console.log(concertDate);
		console.log("-----------------------------------")
		}
		

		


	});
}

function spotifyInfo(userSearch) {
	spotify.search({ type: 'track', query: userSearch, limit: 5 }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		// var spotifyArr = data.tracks.items;
		var spotifyArr = data.tracks.items;
		// to go loop through the object on spotify API
		
		for (i = 0; i < spotifyArr.length; i++) {
			console.log("-----------------------------------")
			//pulling artist
			console.log("Artists: " + spotifyArr[i].artists[0].name);
			//pull song title
			console.log("Song Title: " + spotifyArr[i].name);
			//pulling album
			console.log("Album: " + spotifyArr[i].album.name);
			//pull preview URL
			console.log("Preview URL: " + spotifyArr[i].preview_url);
			console.log("-----------------------------------")
			
			
		}

	
	});
}
//end of function

function dowhatitSays(userSearch){
	// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

	// If the code experiences any errors it will log the error to the console.
	if (error) {
	  return console.log(error);
	}
  
	// We will then print the contents of data
	console.log(data);
	data.split();


});
}
//end of function
