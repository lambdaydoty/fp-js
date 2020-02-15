Ramda                         | Sanctuary
------------------------------|------------------------------
`R.add(a, b)`                 | `S.add (a) (b)`
`R.addIndex(f)`               |
`R.adjust(f, i, xs)`          |
`R.all(pred, xs)`             | `S.all (pred) (xs)` generalized to Foldable
`R.allPass(preds, x)`         | `S.all (S.T (x)) (preds)`
`R.always(x)()`               | `S.K (x) (y)`
`R.and(a, b)`                 | `S.and (a) (b)`
`R.any(pred, xs)`             | `S.any (pred) (xs)` generalized to Foldable
`R.anyPass(preds, x)`         | `S.any (S.T (x)) (preds)`
`R.ap(a, b)`                  | `S.ap (a) (b)`
`R.aperture()`                |
`R.append(x, xs)`             | `S.append (x) (xs)` generalized to Semigroups of Applicative
`R.apply()`                   |
`R.applySpec()`               |
`R.ascend()`                  |
`R.assoc(s, x, o)`            | `S.insert (s) (x) (o)`
`R.assocPath()`               |
`R.binary(f)`                 | `S.curry2 (f)`
`R.bind()`                    |
`R.both(p, q)`                | `x => p (x) && q (x)`
`R.call(f, x)`                | `f (x)`
`R.chain(a, b)`               | `S.chain (a) (b)`
`R.clamp(a, b, c)`            | `S.clamp (a) (b) (c)`
`R.clone()`                   |
`R.comparator()`              |
`R.complement(f)`             | `S.complement (f)`
`R.compose(f, g)`             | `S.compose (f) (g)` generalized to Semigroupoid
`R.composeK(f, g)`            | `S.compose (S.chain (f)) (g)`
`R.composeP()`                |
`R.concat(xs, ys)`            | `S.concat (xs) (ys)`
`R.cond()`                    |
`R.construct()`               |
`R.constructN()`              |
`R.contains(xs)`              | `S.elem (xs)` generalized to Foldable
`R.converge()`                |
`R.countBy()`                 |
`R.curry(f)`                  | `S.curry<n> (f)`
`R.curryN(f)`                 | `S.curry<n> (f)`
`R.dec(x)`                    | `S.sub (1) (x)`
`R.defaultTo(x, y)`           |
`R.descend()`                 |
`R.difference()`              |
`R.differenceWith()`          |
`R.dissoc(s, o)`              | `S.remove (s) (o)`
`R.dissocPath()`              |
`R.divide(x, y)`              | `S.div (y) (x)` order is reversed to facilitate partial application
`R.drop(n, xs)`               | `S.drop (n) (xs)` generalized to Foldable, returns a Maybe
`R.dropLast(n, xs)`           | `S.dropLast (n) (xs)` generalized to Foldable, returns a Maybe
`R.dropLastWhile()`           |
`R.dropRepeats()`             |
`R.dropRepeatsWith()`         |
`R.dropWhile(f, xs)`          | `S.dropWhile (f) (xs)`
`R.either(p, q)`              | `x => p (x) || q (x)`
`R.empty(x)`                  | `S.empty (x.constructor)`
`R.eqBy(f, a, b)`             | `S.on (S.equals) (f) (a) (b)`
`R.eqProps(x, a, b)`          | `S.on (S.equals) (S.prop (x)) (a) (b)`
`R.equals(a, b)`              | `S.equals (a) (b)`
`R.evolve(a, b)`              | `S.ap (b) (a)` generalized to Apply
`R.F(x)`                      | `S.K (false) (x)`
`R.filter(pred, xs)`          | `S.filter (pred) (xs)` generalized to Filterable
`R.find(pred, xs)`            | `S.find (pred) (xs)` generalized to Foldable
`R.findIndex()`               |
`R.findLast(pred, xs)`        | `S.find (pred) (S.reverse (xs))`
`R.findLastIndex()`           |
`R.flatten(xs)`               |
`R.flip(f)`                   | `S.flip (f)` generalized to Functor
`R.forEach()`                 |
`R.forEachObjIndexed()`       |
`R.fromPairs(xs)`             | `S.fromPairs (xs)` generalized to Foldable of Pairs
`R.groupBy()`                 |
`R.groupWith()`               |
`R.gt(x, y)`                  | `S.gt (y) (x)` generalized to Ord, order is reversed to facilitate partial application
`R.gte(x, y)`                 | `S.gte (y) (x)` generalized to Ord, order is reversed to facilitate partial application
`R.has()`                     |
`R.hasIn()`                   |
`R.head(xs)`                  | `S.head (xs)` generalized to Foldable, returns a Maybe
`R.identical()`               |
`R.identity(x)`               | `S.I (x)`
`R.ifElse(f, g, h, o)`        | `S.ifElse (f) (g) (h) (o)`
`R.inc(x)`                    | `S.add (1) (x)`
`R.indexBy()`                 |
`R.indexOf()`                 |
`R.init(xs)`                  | `S.init (xs)` generalized to Foldable, returns a Maybe
`R.insert()`                  |
`R.insertAll()`               |
`R.intersection()`            |
`R.intersectionWith()`        |
`R.intersperse()`             |
`R.into()`                    |
`R.invert()`                  |
`R.invertObj()`               |
`R.invoker()`                 |
`R.is(X, x)`                  | `S.is (X) (x)`
`R.isArrayLike()`             |
`R.isEmpty()`                 |
`R.isNil()`                   |
`R.join(sep, ss)`             | `S.joinWith (sep) (ss)`
`R.juxt()`                    |
`R.keys(o)`                   | `S.keys (o)`
`R.keysIn()`                  |
`R.last(xs)`                  | `S.last (xs)` generalized to Foldable, returns a Maybe
`R.lastIndexOf()`             |
`R.length(xs)`                | `S.size (xs)` generalized to Foldable
`R.lens()`                    |
`R.lensIndex()`               |
`R.lensPath()`                |
`R.lensProp()`                |
`R.lift()`                    |
`R.liftN()`                   |
`R.lt(x, y)`                  | `S.lt (y) (x)` generalized to Ord, order is reversed to facilitate partial application
`R.lte(x, y)`                 | `S.lte (y) (x)` generalized to Ord, order is reversed to facilitate partial application
`R.map(f, xs)`                | `S.map (f) (xs)`
`R.mapAccum()`                |
`R.mapAccumRight()`           |
`R.mapObjIndexed()`           |
`R.match()`                   |
`R.mathMod()`                 |
`R.max(x, y)`                 | `S.max (x) (y)` generalized to Ord
`R.maxBy()`                   |
`R.mean(xs)`                  | `S.mean (xs)` generalized to Foldable, returns a Maybe
`R.median()`                  |
`R.memoize()`                 |
`R.merge(o1, o2)`             | `S.concat (o1) (o2)`
`R.mergeAll()`                |
`R.mergeWith()`               |
`R.mergeWithKey()`            |
`R.min(x, y)`                 | `S.min (x) (y)` generalized to Ord
`R.minBy()`                   |
`R.modulo()`                  |
`R.multiply(x, y)`            | `S.mult (x) (y)`
`R.nAry()`                    |
`R.negate(x)`                 | `S.negate (x)`
`R.none(pred, xs)`            | `S.none (pred) (xs)` generalized to Foldable
`R.not(b)`                    | `S.not (b)`
`R.nth(n, xs)`                |
`R.nthArg()`                  |
`R.objOf(s, x)`               | `S.singleton (s) (x)`
`R.of(x)`                     | `S.of (typeRep) (x)`
`R.omit()`                    |
`R.once()`                    |
`R.or(x, y)`                  | `S.or (x) (y)`
`R.over()`                    |
`R.pair(x, y)`                | `S.Pair (x) (y)` returns a Pair
`R.partial()`                 |
`R.partialRight()`            |
`R.partition(f, xs)`          | `S.Pair (S.filter (f) (xs)) (S.reject (f) (xs))`
`R.path(p, o)`                | `S.props (p) (o)`
`R.pathEq()`                  |
`R.pathOr()`                  |
`R.pathSatisfies()`           |
`R.pick()`                    |
`R.pickAll()`                 |
`R.pickBy()`                  |
`R.pipe(f1, f2, ...)`         | `S.pipe ([f1, f2, ...])`
`R.pipeK(f1, f2, ...)`        | `S.pipeK ([f1, f2, ...])`
`R.pipeP()`                   |
`R.pluck(p, xs)`              | `S.map (S.prop (p)) (xs)`
`R.prepend(x, xs)`            | `S.prepend (x) (xs)` generalized to Semigroups of Applicative
`R.product(xs)`               | `S.product (xs)` generalized to Foldable
`R.project()`                 |
`R.prop(s, o)`                | `S.prop (s) (o)`
`R.propEq(s, a, o)`           | `S.equals (S.prop (s) (o)) (a)`
`R.propIs(t, s, o)`           | `S.is (t) (S.prop (s) (o))` `t` must be a Type defined using https://github.com/sanctuary-js/sanctuary-def/#type-constructors
`R.propOr(x, k, m)`           | `S.fromMaybe (x) (S.value (k) (m))`
`R.props`                     |
`R.propSatisfies()`           |
`R.range(n, m)`               | `S.range (n) (m)`
`R.reduce(f, d, xs)`          | `S.reduce (f) (d) (xs)` generalized to Foldable
`R.reduceBy()`                |
`R.reduced()`                 |
`R.reduceRight()`             |
`R.reduceWhile()`             |
`R.reject(pred, xs)`          | `S.reject (pred) (xs)` generalized to Filterable
`R.remove(n, m, xs)`          | `S.concat (S.take (n) (xs)) (S.takeLast (m) (xs))` returns a Maybe
`R.repeat(x, n)`              | `S.unfoldr (i => i < n ? S.Just (S.Pair (x) (i + 1)) : S.Nothing) (0)`
`R.replace()`                 |
`R.reverse(xs)`               | `S.reverse (xs)` generalized to List-like (Monoids of Foldable Applicatives)
`R.scan()`                    |
`R.sequence(f, xs)`           | `S.sequence (F) (xs)` takes a type representative
`R.set()`                     |
`R.slice(n, m, xs)`           |
`R.sort(xs)`                  | `S.sort (xs)` generalized to List-like (Monoids of Foldable Applicatives) and Ord
`R.sortBy(f, xs)`             | `S.sortBy (f) (xs)` generalized to List-like (Monoids of Foldable Applicatives) and Ord
`R.sortWith()`                |
`R.split(str, s)`             | `S.splitOn (str) (s)`
`R.split(regex, s)`           | `S.splitOnRegex (regex) (s)`
`R.splitAt()`                 |
`R.splitEvery()`              |
`R.splitWhen()`               |
`R.subtract(x, y)`            | `S.sub (y) (x)` order is reversed to facilitate partial application
`R.sum(xs)`                   | `S.sum (xs)` generalized to Foldable
`R.symmetricDifference()`     |
`R.symmetricDifferenceWith()` |
`R.T(x)`                      | `S.K (true) (x)`
`R.tail(xs)`                  | `S.tail (xs)` generalized to Foldable, returns a Maybe
`R.take(n, xs)`               | `S.take (n) (xs)` generalized to Foldable, returns a Maybe
`R.takeLast(n, xs)`           | `S.takeLast (n) (xs)` generalized to Foldable, returns a Maybe
`R.takeLastWhile()`           |
`R.takeWhile(f, xs)`          | `S.takeWhile (f) (xs)`
`R.tap()`                     |
`R.test(r, s)`                | `S.test (r) (s)`
`R.times()`                   |
`R.toLower(s)`                | `S.toLower (s)`
`R.toPairs(o)`                | `S.pairs (o)` returns an Array of Pairs
`R.toPairsIn()`               |
`R.toString(x)`               | `S.show (x)`
`R.toUpper(s)`                | `S.toUpper (s)`
`R.transduce()`               |
`R.transpose()`               |
`R.traverse(f, g, xs)`        | `S.traverse (F) (g) (xs)` `F` must be a TypeRep
`R.trim(s)`                   | `S.trim (s)`
`R.tryCatch()`                |
`R.type(s)`                   | `S.type (x)`
`R.unapply()`                 |
`R.unary()`                   |
`R.uncurryN()`                |
`R.unfold(f :: b -> [a], d)`  | `S.unfoldr (f :: b -> Maybe (Pair a b)) (d)`
`R.union()`                   |
`R.unionWith()`               |
`R.uniq()`                    |
`R.uniqBy()`                  |
`R.uniqWith()`                |
`R.unless(f, g, x)`           | `S.unless (f) (g) (x)`
`R.unnest(m)`                 | `S.join (m)`
`R.until()`                   |
`R.update()`                  |
`R.useWith()`                 |
`R.values(o)`                 | `S.values (o)` all values must be of the same type
`R.valuesIn()`                |
`R.view()`                    |
`R.when(f, g, x)`             | `S.when (f) (g) (x)`
`R.where()`                   |
`R.whereEq()`                 |
`R.without()`                 |
`R.xprod(xs, ys)`             | `S.lift2 (S.Pair) (xs) (ys)` returns an Array of Pairs
`R.zip(xs, ys)`               | `S.zip (xs) (ys)` returns an Array of Pairs
`R.zipObj(xs, ys)`            | `S.fromPairs (S.zip (xs) (ys))`
`R.zipWith(f, xs, ys)`        | `S.zipWith (f) (xs) (ys)`
