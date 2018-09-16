const Joi = require('joi');
const express = require('express');
const app = express();

const url = '/api/genres'
const port = process.env.PORT || 3000

app.use(express.json())

const genres = [
  { id: 1, genre: "Horror" },
  { id: 2, genre: "Romance" },
  { id: 3, genre: "Adventure" },
  { id: 4, genre: "Drama" },
  { id: 5, genre: "Animated" },
  { id: 6, genre: "Action" },
  { id: 7, genre: "Documentary" },
  { id: 8, genre: "Western" },
  { id: 9, genre: "Crime" },
  { id: 10, genre: "Fiction" },
  { id: 11, genre: "Fantasy" },
  { id: 12, genre: "Mystery" },
  { id: 13, genre: "Historical Fiction" },
  { id: 14, genre: "Magical Realism" },
  { id: 15, genre: "Satire" },
  { id: 16, genre: "Urban" },
  { id: 17, genre: "Speculative" }
]

//validation
const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().required()
  }
  return Joi.validate(genre, schema)
}

//home
app.get('/', (req,res) => {
  res.send('Welcome to Vidley')
})

//Implement CRUD through RESTful convention.

//CREATE
app.post(url, (req,res) => {
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(genre)
  res.send(genre)
})

//READ
app.get(url, (req,res) => {
  res.send(genres)
})

app.get(`${url}/:id`, (req,res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if(!genre) return res.status(404).send('Genre not found')
  res.send(genre);
})

//Update
app.put(`${url}/:id`, (req,res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if(!genre) return res.status(404).send('Genre not found')
  const { error } = validateGenre(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  const isUnique = genres.map(g => g.name === genre.name ? false : true)
  if(isUnique){
    genre.name = req.body.name
    res.send(genre)
  } else {
    res.status(400).send('This genre already exists') 
  }
})

app.listen(port, () => console.log(`Listening on Port ${port}`))
