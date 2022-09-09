'use strict'
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DB_URL = process.env['DB_URL']

const setupConnection = () => mongoose.connect(DB_URL)

const setupModels = () => {
  return {
    eventModel: mongoose.model(
      'Event',
      new mongoose.Schema({}, { strict: false }),
      'events',
    ),
    eventDetailsModel: mongoose.model(
      'EventDetail',
      new mongoose.Schema({}, { strict: false }),
      'eventdetails',
    ),
  }
}

///

const affectedFields = [
  'synopsis',
  'choises',
  'criteria',
  'effects',
  'trivia',
  'manyText',
]

module.exports.up = function (next) {
  setupConnection()
  const { eventModel, eventDetailsModel } = setupModels()

  eventModel
    .find()
    .exec()
    .then(events => {
      return Promise.all(
        events.map(async event => {
          const newEventDetailPayload = Object.fromEntries(
            affectedFields.map(field => [field, event[field]]),
          )
          const newEventDetail = await eventDetailsModel.create(
            newEventDetailPayload,
          )

          affectedFields.forEach(field => {
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
  setupConnection()
  const { eventModel, eventDetailsModel } = setupModels()

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

          affectedFields.forEach(field => {
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
