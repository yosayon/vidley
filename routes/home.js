const express = require('express')
const router = express.Router();

//home
router.get('/', (req,res) => {
  res.render('index.pug',{ title: 'Vidley', message: "Welcome to Vidley"})
})

module.exports = router
