const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function(){
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log'}))

  process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex)
    process.exit(1)
    //or do throw ex
  })

  winston.add(winston.transports.File, { filename: 'logfile'})
  winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidley',
  level: 'error'
  })

}
