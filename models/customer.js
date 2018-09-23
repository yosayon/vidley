const mongoose = require('mongoose')
const Joi = require('joi')

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}))

function validateCustomer(customer){
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(10).max(11).required(),
    isGold: Joi.boolean()
  }
  return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer
