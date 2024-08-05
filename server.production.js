const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const DIST_DIR = path.join(__dirname, 'public/build');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = 3000;

app.use('/admin/flightcrs/flightaggregation/*', (req, res) => {
  const tempUrl = req.originalUrl.split('/admin/flightcrs/')[1];
  const url = `${process.env.flightcrsaggregationLB}${tempUrl}`;
  console.log(req.originalUrl, tempUrl, url);
  let r = null;
  if (req.method === 'POST') {
    r = request.post({uri: url, json: req.body});
  } else {
    r = request(url);
  }
  req.pipe(r).pipe(res);
});

// app.use('/admin/gordon', express.static(DIST_DIR));
app.get('*', (req, res) => res.sendFile(HTML_FILE));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
