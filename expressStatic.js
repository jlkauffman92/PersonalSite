var express = require('express');
var app = express();

app.use(express.static('/public'));

//Serves all the request which includes /img in the url from Images folder
app.use('/img', express.static(__dirname + '/img'));

var server = app.listen(8080);