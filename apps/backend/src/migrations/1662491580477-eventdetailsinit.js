'use strict'
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DB_URL = process.env['DB_URL']

module.exports.up = function (next) {
  console.log(DB_URL)
  console.log(process.cwd())
  mongoose.connect(DB_URL)

  const eventModel = mongoose.model('Event', new mongoose.Schema({}), 'events')
  const eventDetailsModel = mongoose.model(
    'EventDetail',
    new mongoose.Schema({}),
    'eventdetails',
  )

  //TODO get all events
  eventModel
    .find()
    .exec()
    .then(events => {
      return Promise.all(
        events.map(async event => {
          // console.log(event)
          //TODO from all event extract:
          // 'synopsis', 'choises', 'criteria', 'effects', 'trivia', 'manyText'
          // fields

          const { synopsis, choises, criteria, effects, trivia, manyText } =
            event

          // create new EventDetails from this
          const newEventDetail = await eventDetailsModel.create({
            synopsis,
            choises,
            criteria,
            effects,
            trivia,
            manyText,
          })

          const newEventDetailRes = await newEventDetail.save()
          console.log('details: ', newEventDetail)
          console.log('details res: ', newEventDetailRes)

          // use Id of new EventDetails to add detailsId ref to event

          const res = await eventModel.updateOne(
            { _id: event._id },
            {
              $unset: {
                synopsis: '',
                choises: '',
                criteria: '',
                effects: '',
                trivia: '',
                manyText: '',
              },
              $set: {
                detailsId: newEventDetail._id,
              },
            },
          )
          // const res = await eventModel.updateOne({ _id: event._id }, newEvent)
          console.log(res)

          throw new Error()
        }),
      )
    })
    .then(() => {
      return next()
    })
}

module.exports.down = function (next) {
  next()
}
