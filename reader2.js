/* eslint func-call-spacing: ["error", "always"] */
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */
const { S } = require ('./sanctuary') ()
const { map, chain } = require ('fantasy-land')

const Reader = computation => ({
  run: ctx => computation (ctx),
  [map]: f => Reader (ctx => f (computation (ctx))),
  [chain]: f => Reader (ctx => {
    const a = computation (ctx)
    return f (a).run (ctx)
  }),
})

// https://jaysoo.ca/2017/05/10/learn-fp-with-react-part-2/

const addP = y => '<p>' + y + '</p>'
const addFooter = y => '<footer>' + y + '</footer>'
const addH1 = y => '<h1>' + y + '</h1>'
const addHeader = y => '<header>' + y + '</header>'

const copyrightNoticeV = ({ author, year }) => `© ${author} ${year}`
const titleV = ({ title }) => `${title}`

const footer = Reader (
  ({ author, year }) => S.contramap (S.K ({ author, year })) (copyrightNoticeV)
)

// TODO
const footer2 = S.pipe ([
  S.map (S.map (addP)),
  S.map (S.map (addFooter)),
]) (footer)

const title = Reader (
  ({ title }) => S.contramap (S.K ({ title })) (titleV)
)

const title2 = S.pipe ([
  S.map (S.map (addH1)),
  S.map (S.map (addHeader)),
]) (title)

S.pipe ([
  // r => r.run ({ author: 'hello', year: 2020 }),
  r => r.run ({ title: 'title' }),
  v => v (),
  console.log,
]) (title2)
