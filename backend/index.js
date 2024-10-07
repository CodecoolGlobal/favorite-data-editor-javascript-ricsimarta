const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json()); // !!IMPORTANT!! WHEN USING JSON

app.get('/api/cats', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/cats.json`));
});

app.post('/api/cats/new', (req, res) => {
  console.log(req.body);
  
  // save the data to the file
  // important: create id


  res.send("ok");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});