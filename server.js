const express = require('express');
const data = require('./client/src/assets/data.json');
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

for (var result in data) {
	data[result].isFavourite = false;
}

app.post('/', function (req, res) {
	const name = req.body.title
	console.log(name);
	var results = [];
	var searchVal = "my Name";
	for (var i=0 ; i < data.length ; i++)
	{
	    if (data[i].keywords.includes(name) === true) {
	    	results.push(data[i]);
	    }
	}
	res.send(results)
	console.log(results[1])
})



// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);