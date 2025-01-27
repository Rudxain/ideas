# CZY
A programming lang with split-personality syndrome!

This is a general-purpose lang that's actually 3 specialized langs. It's not intended to be esoteric, though it may feel that way.

## Cranket
Its name is meant to communicate pragmatism and realism, while representing inanimate objects rather than self-aware beings.

This lang is akin to Rust and Zig, but has better syntax than both.

- Statically-typed, partially strong, with basic type-inference
- Only supports structural typing, like Go
- It's honest about abstractions (intentionally "[leaky](https://en.wikipedia.org/wiki/Leaky_abstraction)")
- Has built-in operators, because they are common among CPUs.
- Only supports fixed-precision "generic" (arbitrary) binary integers and [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) floats
- Default number-literal radix is decimal, but powers of 2 are supported.
- It's safe by default (opt-in `unsafe`ty)
- Has move semantics (because I love the [type-state](https://cliffle.com/blog/rust-typestate) pattern and [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization))
- [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type)s
- [Practically TC](https://gavinhoward.com/2024/03/what-computers-cannot-do-the-consequences-of-turing-completeness), not theoretically

Ideally, this lang should have an opt-in stable ABI in the future. I say "opt-in" because you don't have to sacrifice optimizations for your entire program, only the parts that expose ABIs will be left intact.

## Zogah
Its name is basically "Zoe"×"Logan"×"Anah", and is somewhat inspired by Ada. Call me sexist/transphobic all you want, but I wanted this name to be "feminine" as it creates contrast with Crankett's "masculinity".

This is an **extremely-[pure](https://en.wikipedia.org/wiki/Purely_functional_programming)** functional lang, with aggressive auto-parallelization, like Bend and Kind. As such, there is no I-O. Think of it like a "Turing-Complete calculator". The only way to make use of it, is by explicitly passing values from the other 2 langs, and evaluating Zogah's expressions.

Similarly to HVM, it doesn't need GC, but it doesn't have pointers or move-semantics.

It has Lisp-like syntax (also [SOP](https://en.wikipedia.org/wiki/Stack-oriented_programming)) and Haskell's strong type-system.

This lang is both theoretically and practically TC, be careful!

Its `std` lib forces you to handle **all** errors (no built-in panicking). However, you can opt-out of error-handling by calling the `diverge` fn, which isn't a compiler built-in, it's literally defined as an infinite recursive loop. The compiler is allowed (but not required) to optimize trivial infinite-loops as "panics".

Other features:
- No operators, only functions
- Identifiers can contain any char, except Unicode whitespace. This allows fns to _look_ like operators.
- `struct` and `enum` [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type) support
- No primitive types, such as `string`s or `int`s. Its `std` provides lists of enums instead, with attached methods.
- Literals are interpreted according to macros. The only supported radix for binary integers and floats is binary itself (for simplicity).
- `std` provides binary and ternary positional numerals, also [Church Numerals](https://en.wikipedia.org/wiki/Church_encoding)
- All ints and floats have dynamic arbitrary precision, but you can easily define modular/wrapping ints, and specify the max float-precision for calculations.
- [TCO/TCE](https://en.wikipedia.org/wiki/Tail_call)
- [NTS](https://en.wikipedia.org/wiki/Nominal_type_system)

## Yeng/Ramsy
Name inspired by Gordon Ramsay's infamous line:
> **"WHERE'S THE LAMB SAUCE?!**

Pun explanation:
- Lambda -> Lamb
- Source code -> Sauce
- Ramsay -> Ramsy

[FR](https://en.wikipedia.org/wiki/Frank_Ramsey_(mathematician)) and Ying-Yang were also an inspiration for the name.

Its purpose is to be a [formally-verifiable](https://en.wikipedia.org/wiki/Formal_verification) lang, as such it's **not TC at all**, it's more akin to a [PDA](https://en.wikipedia.org/wiki/Pushdown_automaton) or even [FSM](https://en.wikipedia.org/wiki/Finite-state_machine). It's **always safe**, so you can't have raw-pointers or FFI bindings.

It's pure, but only because it has an effects-system (like Koka and Eff), with opt-in monads.

This lang (and its `std`) does have a concept of panicking, but it has to be enabled explicitly for blocks of code

The only built-in numbers are integers, because **floats are a plague that must be erradicated**. The default radix for literals is [unary](https://en.wikipedia.org/wiki/Unary_numeral_system), the only other supported radix is binary.

There are no macros, but something like Zig's `comptime` could be included.

This lang has ranged integers, like Ada
