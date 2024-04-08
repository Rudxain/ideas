A programming language.

- Default radix is 1 (unary)
- Default radix can be specified via the global `Num.RADIX`. As a byproduct, it can only be specified using unary (either directly or indirectly)
- Arbitrary numerals can be written as `radix#NUM`, where `radix` is a constant expression wrapped in parentheses or a mere literal in default radix
- Ints are ranged, like in Ada
- There are no floats, only fractions.
- Fractions can have immutable denominators, allowing floating-point optimizations if denom is of the form 2^-n.
- Keywords are inspired by conlangs, usually latin-based
- Syntax is Python-like, but without ":"
- There's a borrow-checker, like in Rust
- There are 3 types of chars: Unit, Point, Grapheme. Therefore 3 string types: u_cad, p_cad, g_cad
- Whitespace is the main delimiter, just like Lisp. So any Unicode identifier is valid, so long as it doesn't contain space (zero-width chars are forbidden too)
- Everything is immutable by default.
- Mutable variables don't inherently make their values have inner mutability, so strings are immutable by default without the need of being primitives
