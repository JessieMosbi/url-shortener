const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  short: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Url', urlSchema)
