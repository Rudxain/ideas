# 🤓👁👁👁
A nerdy linter pretending to be an oracle.

This linter exploits implementation details of a given compiler, in order to detect:
- Characteristics of variables, such as ranges. No more silly `u16` when you know for a fact that it's a `FibPrime12` (12bit Fibonacci Prime)
- Unreachable code, dead code, and unintentional infinite loops
- Implicit panic points, such as `x / potentially_zero` and out-of-bounds access
- Code that could be re-written to allow the compiler to optimize it
- ... and more!

Since this is language-specific, we cannot take an approach similar to [LSP](https://en.wikipedia.org/wiki/Language_Server_Protocol), so it has to be rewritten for every lang that we want to support. Originally, this was meant for `rustc` only.

## Pros
- Better than regular linters
- Reduces the need for writing tests
- Catch almost all bugs at compile-time

## Cons
- Many false positives
- Many false negatives
- Unstable lints, requiring warnings instead of errors
- Doesn't use AI to detect human intent (this is a pro, too)
- Too slow, because it depends on release-mode optimizations
