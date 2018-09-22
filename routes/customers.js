const mongoose = require('mongoose')
const express = require('express')
const Joi = require('joi')
const router = express.Router()

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  phone: {
    type: String,
    required: true,
    min: 10,
    max: 11
  },
  isGold: {
    type: Boolean,
    default: false
  }
})

const Customer = mongoose.model('Customer', customerSchema)

router.get('/', async (req,res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

router.get('/:id', async (req,res) => {
  const customer = await Customer.findById(req.params.id)
  if(!customer) return res.status(400).send('Could not find customer with this id..')
  res.send(customer)
})

router.post('/', async (req,res) => {
  const { error } = validateCustomer(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  })
  customer = await customer.save()
  res.send(customer)
})

router.put('/:id', async (req,res) => {
  const { error } = validateCustomer(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    {
      new: true
    })
  if(!customer) return res.status(404).send('Could not find Customer with that id...')
  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = Customer.findByIdAndRemove(req.params.id)
  if(!customer) return res.status(404).send('Could not find Customer with that id...')
  res.send(customer)
})

function validateCustomer(customer){
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(10).max(11).required(),
    isGold: Joi.boolean()
  }
  return Joi.validate(customer, schema)
}

module.exports = router
