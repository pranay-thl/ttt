const express = require('express')
const app = express()
const http = require('http');
app.use(express.static('public'));
app.set('port', (process.env.PORT || 8000));
var array = [];
fs = require('fs')
const file = fs.createWriteStream("ttt.txt");
function load(cb) {
  http.get("http://terriblytinytales.com/test.txt", response => {
    response.pipe(file);
    cb();
  });
}
function preprocessing(data, cb) {
  var str_arr = data.toString().replace(/(\r\n|\n|\r|\.|,|\/|\?|!|;|-|\(|\)|–|@)/gm, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
  cb(str_arr);
}
function indexing(str_arr, cb) {
  var index = {};
  str_arr.forEach(function (word) {
    if (!(index.hasOwnProperty(word))) {
      index[word] = 0;
    }
    index[word]++;
  });
  cb(index);
  //console.log("index");
}
function sort_words(index, cb) {
  for (i in index) {
    array.push({ key: i, value: index[i] });
  }
  cb();
}
function read() {
  fs.readFile('ttt.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    //console.log(str_arr.toString());
    preprocessing(data, function (str_arr) {
      indexing(str_arr, function (index) {
        sort_words(index, function () {
          array.sort(function (a, b) { return b.value - a.value });
        });
      });
    })
    //console.log(array);
    //console.log("reading done");
  });
}
app.get('/getn', function (req, res) {
  var s = parseInt(req.query.n);
  if (s > array.length || s < 1) {
    res.send("error");
  }
  else {
    var se_arr = array.slice(0, s);
    res.send(JSON.stringify(se_arr));
  }
})
load(function(){
  read();
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});