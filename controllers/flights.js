import { Flight } from '../models/flight.js'
import { destination } from '../models/destination.js'

export {
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  addToDestinations,
}

function addToDestinations(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
      flight.destinations.push(req.body.destinationId)
      flight.save()
      .then(result => res.redirect(`/flights/${flight._id}`))
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
      .then(result => res.redirect(`/flights/${flight._id}`))
      .catch(err => console.log(err))
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec()
  .then(flight => {
    destination.find({ _id: { $nin: flight.destinations } }, function (err, destinations) {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight,
        destinations: destinations,
      })
    })
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }

  const flight = new Flight(req.body)

  flight.save()
    .then(result => res.redirect('/flights'))
    .catch(err => {
      console.log(err)
      res.redirect('/flights/new')
    })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
}

