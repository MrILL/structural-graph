'use strict'
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DB_URL = process.env['DB_URL']

module.exports.up = function (next) {
  mongoose.connect(DB_URL)

  const eventModel = mongoose.model('Event')

  //TODO get all events
  eventModel
    .find()
    .exec()
    .then(events => {
      events.forEach(event => {
        console.log(event)
        //TODO from all event extract:
        // 'synopsis', 'choises', 'criteria', 'effects', 'trivia', 'manyText'
        // fields

        // create new EventDetails from this

        // use Id of new EventDetails to add detailsId ref to event
      })
    })
    .then(() => {
      return next()
    })
}

module.exports.down = function (next) {
  next()
}
