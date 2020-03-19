const rand = () => ~~(Math.random() * 100)

const intro = { sicp: rand(), htdp: rand() }
const scheme = { tls: rand(), tss: rand() }
const relational = { trs: rand() }
const advanced = { tlm: rand(), tlp: rand(), alj: rand(), tlt: rand() }
const semantics = { 'plt-redex': rand() }

const objs = [
  intro,
  scheme,
  relational,
  advanced,
  semantics,
]

const collect = (a, e) => a.concat([e])
const link = (a, b) => [b, a]
const concatenate = (a, o) => ({ ...a, ...o })
const delegate = (a, b) => Object.assign(Object.create(a), b)

const log =
  x => console.log(
    require('util').inspect(x, false, null, true /* enable colors */)
  )

log(objs)
log('')

log('@Aggregates(3-way):')
log(objs.reduce(collect, []))
log(objs.reduceRight(link, []))
log(objs.reduce(concatenate, {}))
log('')
log('@Delegates:')
const del = objs.reduceRight(delegate, {})
log({ del })
console.log(`
  del.sicp => ${del.sicp},
  del.tls => ${del.tls},
  del['plt-redex'] => ${del['plt-redex']},
`)
