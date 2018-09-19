const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();
const home = require('./routes/home');

mongoose.connect('mongodb://localhost/vidley', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
