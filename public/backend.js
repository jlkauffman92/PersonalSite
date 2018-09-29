var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var img = q.image;
    fs.readFile(filename, "utf-8", function (err, data){
        if (err){
            if((filename == "./")||(filename == "./home")){
                showPage('index.html', req, res);

            }
            else if((filename.indexOf(".") < 2)||(!filename.includes(".css"))||(!filename.includes(".js"))||(!filename.includes(".ico"))){
                var cleanFile = filename + ".html";
                showPage(cleanFile, req, res);
            }
            else if ((filename.includes(".JPG"))||(filename.includes(".png"))){
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                console.log("Image Loaded");
                res.end(content);
            }
            else { 
                error(req, res, filename);
            }
        }
        else if ((filename.includes(".JPG"))||(filename.includes(".png"))){
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            console.log("loaded image: "+ filename);
            res.end(data);
        }
        else if (filename.includes(".css")){
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            return res.end();
        }
        else if (filename.includes(".js")){
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            return res.end();
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(80);

function showPage (FileName, req, res){
    fs.readFile(FileName, "utf-8", function(err, page){
        if (err){
            error(req, res, FileName);
        }
        else{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(page);
            res.end();
        }

    })
}

function error(req, res, filename){
    fs.readFile("fourOhFour.html", "utf-8", function(err, page){
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write(page);
        var errorData = "\n" + Date() + " " + filename;
        fs.appendFile('404errors.txt', errorData, function (err){
            if(err) throw err;
        });
        res.end();
    })
}