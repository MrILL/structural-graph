'use strict'
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DB_URL = process.env['DB_URL']

module.exports.up = function (next) {
  mongoose.connect(DB_URL)

  const eventModel = mongoose.model(
    'Event',
    new mongoose.Schema({}, { strict: false }),
    'events',
  )
  const eventDetailsModel = mongoose.model(
    'EventDetail',
    new mongoose.Schema({}, { strict: false }),
    'eventdetails',
  )

  eventModel
    .find()
    .exec()
    .then(events => {
      return Promise.all(
        events.map(async event => {
          const { synopsis, choises, criteria, effects, trivia, manyText } =
            event

          const newEventDetail = await eventDetailsModel.create({
            synopsis,
            choises,
            criteria,
            effects,
            trivia,
            manyText,
          })

          ;[
            'synopsis',
            'choises',
            'criteria',
            'effects',
            'trivia',
            'manyText',
          ].forEach(field => {
            event.set(field, undefined)
          })

          event.set('detailsId', newEventDetail._id)
          await event.save()
        }),
      )
    })
    .then(() => {
      return next()
    })
}

module.exports.down = function (next) {
  mongoose.connect(DB_URL)

  const eventModel = mongoose.model(
    'Event',
    new mongoose.Schema({}, { strict: false }),
    'events',
  )
  const eventDetailsModel = mongoose.model(
    'EventDetail',
    new mongoose.Schema({}, { strict: false }),
    'eventdetails',
  )

  eventModel
    .find()
    .exec()
    .then(events => {
      return Promise.all(
        events.map(async event => {
          const eventDetails = await eventDetailsModel
            .findOne({
              _id: event.detailsId,
            })
            .exec()
          if (!eventDetails) {
            return
          }

          ;[
            'synopsis',
            'choises',
            'criteria',
            'effects',
            'trivia',
            'manyText',
          ].forEach(field => {
            event.set(field, eventDetails[field])
          })
          event.set('detailsId', undefined)
          event.save()

          await eventDetailsModel.findByIdAndRemove(eventDetails.id)
        }),
      )
    })
    .then(() => {
      return next()
    })
}
