require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':response-time ms - :method :url - status :status - :body'))

app.post('/api/persons', (request, response, next) => {
  const newPerson = {
    name: request.body.name,
    number: request.body.number,
  }

  new Person(newPerson)
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      response.json(person)
    })
    .catch((error) => next(error))
})

// app.get("/info", (request, response) => {
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`,
//   );
// });

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = request.body.name
      person.number = request.body.number

      return person
        .save()
        .then((updatedPerson) => {
          response.json(updatedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
