// var http = require("http");
// http.createServer(function(req, res) {
//   res.write("Xin chào!");
//   res.end();
// }).listen(1234);
// console.log("Node.js đang chạy trên cổng 1234");
//====== cach 1
// var http = require("http");
// var fs = require("fs");

// http.createServer(function(req,res){
//     res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
//     fs.ReadStream("index.html").pipe(res);
// }).listen(8080);
// console.log("Node.js đang chạy trên cổng 3000");

//====== cach 2
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    fs.readFile(__dirname + "/index.html","utff8",function(err,cont){
        if(err){
            console.log(err); 
        }else{
            res.writeHead(200,{"Content-type":"text/html"});
            res.write(content);
            res.end();
        }
    })
}).listen(3000);