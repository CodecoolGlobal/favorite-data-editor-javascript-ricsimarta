const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // !!IMPORTANT!! WHEN USING JSON

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.get('/editor/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/editor.html`));
})

app.use('/public', express.static(`${__dirname}/../frontend/static`));

app.get('/api/cats', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/cats.json`));
});

app.get('/api/cats/:id', (req, res) => {
  fs.readFile(`${__dirname}/data/cats.json`, 'utf8', (err, rawData) => {
    if (err) {
      console.log("error at reading file", err);
      res.status(500).json("error at reading file");
    } else {
      const data = JSON.parse(rawData);

      const found = data.find(obj => obj.id === Number(req.params.id));

      if (found) {
        res.json(found);
      } else {
        res.status(404).json(`no cat found with ${req.params.id} id`);
      }
    }
  })
});

app.post('/api/cats/new', (req, res) => {
  fs.readFile(`${__dirname}/data/cats.json`, 'utf8', (err, rawData) => {
    if (err) {
      console.log("error at reading file", err);
      res.status(500).json("error at reading file");
    } else {
      const data = JSON.parse(rawData);

      const sortedData = [...data].sort((a, b) => b.id - a.id);
      const newId = sortedData[0].id + 1;

      const newData = { ...req.body, id: newId };
      data.push(newData);

      fs.writeFile(`${__dirname}/data/cats.json`, JSON.stringify(data, null, 2), () => {
        res.json(`new data with ${newId} id has been added successfully`);
      })
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});