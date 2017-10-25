const express = require('express')
const app = express()
const http = require('http');
app.use(express.static('public'));
var array=[];
var str_arr;
var index = {};
fs = require('fs')
const file = fs.createWriteStream("ttt.txt");
function load(cb) {
  http.get("http://terriblytinytales.com/test.txt", response => {
    cb(response);
  });
}
function read(response) {
  response.pipe(file);
  fs.readFile('ttt.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    str_arr = data.toString().replace(/(\r\n|\n|\r|\.|,|\/|\?|!|;|-|\(|\)|–|@)/gm, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
    //console.log(str_arr.toString());
    str_arr.forEach(function (word) {
      if (!(index.hasOwnProperty(word))) {
        index[word] = 0;
      }
      index[word]++;
    });
    for(i in index)
    {
      array.push({key:i,value:index[i]});
    }
    array.sort(function(a, b){return b.value - a.value});
    //console.log(array);
    //console.log("reading done");
  });
}
load(read);
app.get('/getn',function(req,res){
  var s=parseInt(req.query.n);
  if(s>array.length||s<1)
  {
    res.send("error");
  }
  else
  {
    var se_arr=array.slice(0,s);
    res.send(JSON.stringify(se_arr));
  }
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})
app.get('/delay', function (req, res) {
  console.log("new req");
  setTimeout(() => { res.send("Hello World!") }, 2000);
})
var server = app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
server.timeout = 100000;