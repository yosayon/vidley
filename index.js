const mongoose = require('mongoose')
const express = require('express')
const app = express()
const home = require('./routes/home')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const helmet = require('helmet')

mongoose.connect('mongodb://localhost/vidley', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use(helmet())
app.use('/', home);
app.use('/api/genres', genres)
app.use('/api/rentals', rentals)
app.use('/api/customers', customers)
app.use('/api/movies', movies)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
