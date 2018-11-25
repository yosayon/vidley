const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function(){
  mongoose.connect('mongodb://localhost/vidley', {useNewUrlParser: true})
    .then(() => winston.info('Connected to MongoDB...'))

}
