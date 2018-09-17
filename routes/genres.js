const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    lowercase: true,
  }
})

const Genre = mongoose.model('Genre', genreSchema)

//CREATE
router.post('/', async (req,res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  let genre = new Genre({ name: req.body.name })
  try {
    genre = await genre.save()
    res.send(genre)
  }
  catch(ex){
    for(field in ex.errors)
      console.log(ex.errors[field].message)
  }
})

//READ
router.get('/', (req,res) => {
  res.send(await Genre.find().sort('name'))
})

router.get('/:id', async (req,res) => {
  const genre = await Genre.findById(req.params.id)
  if(!genre) return res.status(404).send('Genre not found')
  res.send(genre);
})

//Update
router.put('/:id', async (req,res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  })
  if(!genre) return res.status(404).send('Genre not found')
  res.send(genre)
})

//Delete
router.delete('/:id', async (req,res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if(!genre) return res.status(404).send('Genre not found')
  res.send(genre)
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router
