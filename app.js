
const express = require('express');
const app = express();
const url = '/api/genres'
const genres = require('./routes/genres')
const morgan = require('morgan')
const debug = require('debug')('app:startup')
const config = require('config')
const helmet = require('helmet')

app.use(express.json())
app.use(express.urlencoded({extend: true}))
app.use(express.static('./public'))
app.use(helmet())
app.use('/api/genres', genres)


const port = process.env.PORT || 3000
app.listen(port, () => debug(`Listening on Port ${port}`))
