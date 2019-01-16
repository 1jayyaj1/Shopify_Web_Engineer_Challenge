const express = require('express');
const data = require('./Toronto_waste_data/data.json');
var bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	//
	app.get('*', (req, res) => {
	  res.sendfile(path.join(__dirname = 'client/build/index.html'));
	})
}

//build mode
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


app.post('/', function (req, res) {
	const name = req.body.title.toLowerCase();
	var results = [];
	var searchVal = "my Name";
	for (var i=0 ; i < data.length ; i++)
	{
	    if (data[i].keywords.includes(name) === true) {
	    	data[i].isFavourite = false;
	    	results.push(data[i]);
	    }
	}
	res.send(results)
	console.log(results[1])
})

app.listen(port, () => `Server running on port ${port}`);