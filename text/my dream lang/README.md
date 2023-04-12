## informal spec

Rust but with:
- [Dependent types](https://en.wikipedia.org/wiki/Dependent_type)
- bounded numbers, with set theory syntax to unite/discard intervals/properties of numbers
- default behavior of operators is throw a runtime error on overflow or underflow, don't assume wrapping/modulo
- statically/compile-time checking of **EVERYTHING**, like in Ada
- subset strings that must match a regex at compile-time
- named args
- type inference (only direct) allowed for globals
- no default int type, so `i32` must be explicitly written
- binary ints don't exist, use explicit bounds, like `0 < n < 9`
- no curly braces, use indentation like Py
- `>>^` and `^<<` ops for circular (rotation) shift
- operators don't exist, only functions (variables and functions can have symbolic names), like in Lisp
- support floats with different mantissa and exponent sizes, don't assume IEEE-754
- support different sign bit layout for floats (only allow it at the left of mantissa, or left of exp)
- built-in support for arbitrary precision ints, floats, and fractions
- mother data structure constructor: creates any kind of data structure from the given parameters

## etc

I know I'll never be capable of developing such a lang :( , I need a big team
