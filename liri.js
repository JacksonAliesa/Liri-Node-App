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

//switch statement

switch (action) {
	//case 1 to retrieve info from the BandsInTown API
	case 'concert-this':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		concertInfo();
		break;

	//case 2 to retrieve info from the OMDB API
	case 'movie-this':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		// need if else statement just incase the user does not request a valid movie entry
		//default to Mr. Nobody's movie info
		// if (userSearch === "") {

		// } else {
		// 	console.log('Insert Valid Movie Name');
		// }
		userMovie();

		break;

	//case 3 to retrieve info from the Spotify API
	case 'spotfiy-this-song':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		// spotifyInfo();

		// check if userCommand is "spotify-this-song"
		// Using Spotify Node package info and documentation, make a call to the Spotify API using the user's search term

		
		spotify
			.search({ type: 'artist OR album OR track', query: 'My Search Query', limit: 20 })
			.then(function(response) {
				console.log(response);
			})
			.catch(function(err) {
				console.log(err);
			});

		// Display to the user:
		// * Artist(s)
		// * The song's name
		// * A preview link of the song from Spotify
		// * The album that the song is from
		break;

	//case 4 to retrieve info from the Spotify API when it is requested through a Txt file
	case 'do-what-it-is':
		console.log('command: ' + action);
		console.log('Search: ' + userSearch);
		break;
	// when the criteria does not fit into any of the cases this is the default msg
	default:
		console.log('Try Again!');
}

//made functions for each action made by user. will call the function necessary for each case

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
		console.log('Upcoming concerts for ' + userSearch + ':');
		//display the name of venue, venue location, and date of event
		//format the date of the event to be MM/DD/YYYY
		console.log(response.data[1].venue.name);
		console.log(response.data[1].venue.city);
		console.log(response.data[1].venue.region);
		console.log(response.data[1].datetime);
	});
}

// function spotifyInfo() {
// 	spotify.search({ type: userRequest, query: userSearch, limit: 20 }).then(function(response) {
// 		console.log(response);
// 		console.log(response.data);
// 	});
// }
