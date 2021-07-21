import mongoose from 'mongoose'

export {
  destination
}

const Schema = mongoose.Schema

const destinationSchema = new Schema({
  airport: {
    type: String,
    unique: true,
  }
})

const destination = mongoose.model('destination', destinationSchema)