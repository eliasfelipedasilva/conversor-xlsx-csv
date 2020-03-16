const express = require('express');
const app = express();
const download = require("./download");
const lerDir = require("./lerDiretorio");
const logger = require("cf-nodejs-logging-support");

app.get('/', function (req, res) {
  download.downloadArquivos();
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});