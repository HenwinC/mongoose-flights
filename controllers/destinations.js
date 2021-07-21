import { destination } from "../models/destination.js"

export {
  newDestination,
  create,
}

function newDestination(req, res) {
  destination.find({})
  .then(destinations =>{
      res.render("destinations/new", { title: "New Destination", destinations: destinations})
  })
  .catch(err => {
      console.log(err)
  })
}

function create(req, res) {
  destination.create(req.body)
  .then(result => res.redirect("/destinations/new"))
  .catch(err => console.log(err))
}