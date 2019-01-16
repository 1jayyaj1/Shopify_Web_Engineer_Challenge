const express = require('express');
const data = require('./client/src/assets/data.json');
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')));

app.post('/', function (req, res) {
	const name = req.body.title
	console.log(name);
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

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);