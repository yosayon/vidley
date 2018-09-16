const express = require('express');
const app = express();
const genres = require('./routes/genres')
const home = require('./routes/home')
const morgan = require('morgan')
const debug = require('debug')('app:startup')
const config = require('config')
const helmet = require('helmet')


app.use(express.json())
app.use(express.urlencoded({extend: true}))
app.use(express.static('./public'))
app.use(helmet())
app.use('/api/genres', genres)
app.use('/', home)
app.set('view engine', 'pug')

if(app.get('env') === 'development'){
  app.use(morgan('tiny'))
  debug('Morgan enabled...')
}

const port = process.env.PORT || 3000
app.listen(port, () => debug(`Listening on Port ${port}`))
