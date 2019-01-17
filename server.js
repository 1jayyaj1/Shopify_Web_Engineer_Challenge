const express = require('express');
const data = require('./Toronto_waste_data/data.json');
var bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;	// Server runs on port 5000.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('*', (req, res) => {
	  res.sendfile(path.join(__dirname = 'client/build/index.html'));
	})
}

//Build mode
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


app.post('/', function (req, res) {
	const name = req.body.title.toLowerCase();	// Keywords in JSON are in lowercase, therefore, convert searched word -> lowercase.
	var results = [];
	for (var i=0 ; i < data.length ; i++) {	// For every JS object, if its keywords include the searched keyword, add this JS object to a list.
	    if (data[i].keywords.includes(name) === true) {
	    	data[i].isFavourite = false;
	    	results.push(data[i]);
	    }
	}
	res.send(results)	// Send the results list back to the front-end.
})

app.listen(port, () => `Server running on port ${port}`);	// Server listens on port 5000.