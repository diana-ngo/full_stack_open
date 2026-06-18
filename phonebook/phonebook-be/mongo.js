const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('usage:')
  console.log('node mongo.js <password> - to view entries')
  console.log('node mongo.js <password> <name> <number> - to add an entry')
  process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI, { family: 4 })

const phonebookSchema = new mongoose.Schema({ name: String, number: String })

const Person = mongoose.model('Person', phonebookSchema)

const nameToAdd = process.argv[3]
const numberToAdd = process.argv[4]

if (!nameToAdd || !numberToAdd) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({ name: nameToAdd, number: numberToAdd })

  person.save().then(() => {
    console.log(`added ${nameToAdd} ${numberToAdd} to phonebook`)
    mongoose.connection.close()
  })
}
