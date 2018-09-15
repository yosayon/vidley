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

//home
app.get('/', (req,res) => {
  res.send('Welcome to Vidley')
})

// get list of genres
app.get(url, (req,res) => {
  res.send(genres)
})

app.listen(port, () => console.log(`Listening on Port ${port}`))
