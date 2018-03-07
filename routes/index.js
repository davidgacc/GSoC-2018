var express = require('express');
var request = require('request');
var router = express.Router();

var url = "https://petscan.wmflabs.org/?format=json&psid="

// Home Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project GSoC' });
});

// List all the articles given a PSID
router.post('/test/submit',function(req,res,next){
	//Get PSID
	var id = req.body.id;
	//Get Full Url
	var full_url = url+id;
	var list = [];
	request(full_url, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
			var obj = JSON.parse(body);
			var arr = obj["*"][0]["a"]["*"];
			for(var i =0;i<arr.length;i++){
				list.push(arr[i]["title"]);
			}
 		}else{
    		console.log("Error "+response.statusCode);
  		}
		res.send(list);
	});
});

module.exports = router;
