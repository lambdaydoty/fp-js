/**
 *
 * Functions map: a => b
 * Functions map with context: Functor(a) => Functor(b)
 * Monands flatten and map with context: Monad(Monad(a)) => Monand(b)
 *
 * Type lift : a => Functor(a)  // viz. Wrapper: to put in a context
 * Flatten: Functor(a) => a     // viz. Unwrapper: to get from a context
 */


/**
 * Composing simple functions:
 *
 *  g:       a => b
 *  f:            b => c
 *  o(f, g): a ======> c
 *
 *
 * Composing with functors F:
 *
 * g:        F(a) => F(b)
 * f:                F(b) => F(c)
 * o(f, g):  F(a) =========> F(c)
 *
 *
 * Composing with monands M:
 *
 * g:             a => M(b)
 * f:                    b => M(c)
 * flatMap(f, g): a ========> M(c)
 *
 */

/**
 * Examples of M:
 *   * Functions producing side effects: Promises, Streams, ...
 *   * Handling branching: Maybe, ...
 *   * Dealing with exceptions: Either, ...
 */
