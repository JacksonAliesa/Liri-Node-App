require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');

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

//check if usercommand is "concert-this"
//run an API call using Axios to the bands-in-town API

//switch statement

switch (action) {
	case 'concert-this':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		concertInfo();
		break;

	case 'movie-this':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		// need if else statement to tell user to insert valid movie title
		// if (userRequest === userSearch){
		//     userMovie();
		// }
		// else{
		//     console.log('Insert Valid Movie Name')
		// }
		userMovie();

		break;

	case 'spotfiy-this-song':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);

		break;

	case 'do-what-it-is':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		break;

	default:
		console.log('Try Again!');
}

function userMovie() {
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
	axios.get(queryUrl).then(function(response) {
		console.log(response.data);
        //display the name of venue, venue location, and date of event
        //format the date of the event to be MM/DD/YYYY
        console.log(response.offers.venue.name);
		
		// console.log(response.data.datetime);
	});
}

//check if userCommand

//check if usercommand is "movie-this"

//check if usercommand is "spotify-this-song"

//check if usercommand is "do-what-it-is"

//otherwise, display a message to the user that says try again

//movie-this code
