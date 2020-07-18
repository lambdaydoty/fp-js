/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const util = require ('util')
const fs = require ('fs')
const { F } = require ('../sanctuary') ()

const path1 = './Ij8cEo3etJQwsw.txt'
const path2 = './JHaExHAzILgi2A.txt'
const MESSAGE = 'Hello, world!'
const content = _ => Promise.resolve (MESSAGE)
const opts = { encoding: 'utf8' }

// Promise
test ('testPromise', async (done) => {
  expect.assertions (1)

  const path = path1

  await util.promisify (fs.writeFile) (
    path,
    await content (),
    opts,
  )

  const text = await util.promisify (fs.readFile) (
    path,
    opts,
  )
  expect (text).toEqual (MESSAGE)

  done ()
})

// Future
test ('testFuture', (done) => {
  expect.assertions (1)

  const path = path2

  const saveToTextFile = path => contents => F.node (
    done => fs.writeFile (path, contents, opts, done),
  )

  const readTextFile = path => _ => F.node (
    done => fs.readFile (path, opts, done),
  )

  const contentP = F.encaseP (content)

  const app = contentP ()
    .pipe (F.chain (saveToTextFile (path)))
    .pipe (F.chain (readTextFile (path)))

  const error = done => _ => done ()
  const assert = done => text => {
    expect (text).toEqual (MESSAGE)
    done ()
  }

  F.fork (error (done)) (assert (done)) (app)
})
