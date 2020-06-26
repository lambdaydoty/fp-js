/**
 *
 * https://gist.github.com/dypsilon/883e878ca1c05a7c355e41fb28a2f3e3
 *
 * dypsilon/reader.js
 *
 */

const Reader = require('fantasy-readers')
const R = require('ramda')
const crypto = require('crypto')

// our mock database
const database = [
  { email: 'user@example.org', password: 'e0538fd8f022bb3b139d72cf12766cb0e31690ff' },
  { email: 'admin@example.org', password: '42c4fbf6fec201c66b82c97833b08d936d2cd526' },
]

// creates a statefull database connection
const connectTo = (db) => {
  return {
    insert: (doc) => db.push(doc),
    get: (i) => db[i],
    delete: (i) => db.splice(i, 1),
    list: () => db,
  }
}

// some utility functions
const encrypt = (i) => console.log({ i }) || crypto.createHash('sha1').update(i).digest('hex')
const encPassword = R.evolve({ password: encrypt })
const getInput = () => ({ email: 'new@example.org', password: 'secret' })

// this is how you access the db connection inside the reader
const save = (user) => {
  return Reader.ask.map((db) => {
    db.insert(user)
    return db.list()
  })
}

// the body of the program
const prog = R.pipe(
  Reader.of,
  R.map(encPassword),
  R.chain(save)
)

// this is our db connection now
const dbCon = connectTo(database)

// this is how you pass the db connection in
const result = prog(getInput())
  .run(dbCon)

// show the output
console.log(result)
