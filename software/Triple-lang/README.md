# CZR
A programming lang with split-personality syndrome!

This is a general-purpose lang that's actually 3 specialized langs. It's not intended to be esoteric, though it may feel that way.

In the global scope, there's no default, so you must specify which of the 3 you want to use for a given block of code. Unless the file extension is the name of the lang.

- Cranket can contain blocks of any lang
- Zogah and Ramsy can contain each other, but not Cranket

I'll explain why, in the lang sections.

All 3 langs have very similar module and package systems, each intended to seamlessly interoperate.

## Naming
Originally, the collective name was "Ying Yang Yeng", and each word was the individual name of a lang. But that is misleading, as each lang is very different and have some things in common, so they aren't "absolute complements".

I've noticed that the names "Cranket", "Cranklet", "Zogah", and "Ramsy", are already in use... Damn, I'll have to invent new names 🥲

BTW, I'm looking for a new collective name. "CZR" is bad. The collective name will be used for "neutral" file extensions.

## Cranket
Its name is meant to communicate pragmatism and realism, while representing inanimate objects rather than self-aware beings, despite being the "most human" of the triplet.

Think of it as "the lang of engineers, hackers, and glue-coders/scripters".

This lang is akin to Rust and Zig, but has "better" syntax than both.

This lang is intended to do "the dirty work", as its `std` lib solely contains APIs and types for dealing with the outside world. The only times you'll see a Cranket API doing "pure data processing" is because that processing is tied to some standard in the real world (like URI/URL parsing, or date-time localization and formatting). This implies Cranket doesn't have a `core` lib like Rust does. If you need to do data processing (string manipulation, math, etc...), you should use Zogah's or Ramsy's `std`-libs, not write your own "dirty" subroutines in Cranket.

It must never have lang-level abstractions for `async`. Instead, those abstractions will be provided by `std` and 3rd-party packages, similarly to Rust.

Other features:
- Statically-typed, partially strong, with basic type-inference
- Only supports structural typing, like Go
- Opt-in effects-system (like Koka and Eff)
- Goroutines and green-threads... maybe?
- Opt-in guaranteed/auto-enforced constant-evaluation, like Rust's `const {}` blocks.
- **Functions don't exist**, only "subroutines" (I love that Ada makes a distinction between both)
- Subroutines can explicitly capture (like a "closure") parts of their context
- It's honest about abstractions (intentionally "[leaky](https://en.wikipedia.org/wiki/Leaky_abstraction)")
- Only supports machine-word-sized numbers: binary-integers and [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) floats. Arbitrary ("generic") fixed-precision ints aren't guaranteed to fit perfectly in a register.
- Has built-in arithmetic and bit-wise operators for ints, because they are common among CPUs.
- Has some "niche" operators like `>>^` and `^<<`, for circular-shifting ("rotation")
- Its `std` provides many IEEE-754 functions (`sin`, `tan`, `log`, `sqrt`), as Zogah doesn't care about floats and Ramsy is too strict about determinism.
- Default number-literal radix is decimal. Bin, octal, and hex,  are also supported.
- It's safe by default (opt-in `unsafe`ty)
- `unsafe` mode disables move semantics (the borrow checker is still active) so that you don't have to `mem::forget` or `ManuallyDrop`
- Has move semantics (because I love the [type-state](https://cliffle.com/blog/rust-typestate) pattern and [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization))
- [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type)s
- [Practically TC](https://gavinhoward.com/2024/03/what-computers-cannot-do-the-consequences-of-turing-completeness), not theoretically

[Similarly to Odin](https://odin-lang.org/#batteries-included), Cranket's `std` will provide safe wrappers for unsafe hardware-acceleration APIs. This includes:
- GPU: OpenGL, GLSL, Vulkan, OpenCL. CUDA, DirectX, and Apple Metal, are proprietary, so I'm hesitant to support them in `std`.
- NPU: OpenCL, and any API for neural acceleration.
- QPU: Some standard API for quantum-computing, either through the network or locally. There will be an intentional split between the local and network APIs, as hiding such implementation details is against Cranket's design philosophy.

Ideally, this lang should have an opt-in stable ABI in the future. I say "opt-in" because you don't have to sacrifice optimizations for your entire program, only the parts that expose ABIs will be left intact.

## Zogah
Its name is basically "Zoe"×"Logan"×"Hannah", and is somewhat inspired by Ada. Call me sexist/transphobic all you want, but I wanted this name to be "feminine" as it creates contrast with Cranket's "masculinity".

_Zogah is a dreamer_ (idealist, I guess), she isn't concerned with "real world" problems. As such, she is a big fan of [λC](https://en.wikipedia.org/wiki/Lambda_calculus).

Think of it as "the lang of mathematicians, artists, philosophers, logicians, and scientists".

This is an **extremely-[pure](https://en.wikipedia.org/wiki/Purely_functional_programming)** functional lang, with aggressive auto-parallelization, like Bend and Kind. As such, there is no I-O. Think of it like a "Turing-Complete calculator". The only way to make use of it, is by explicitly passing values from the other langs, and evaluating Zogah's expressions.

Being data-driven and "timeless", it doesn't have a concept of `async`. If you have any long-running computations, you should split them in multiple Zogah blocks evaluated by `async` (or explicit threads) Cranket code.

Similarly to HVM, it doesn't need GC, but it doesn't have pointers or move-semantics.

It has Lisp-like syntax (also [SOP](https://en.wikipedia.org/wiki/Stack-oriented_programming)) and Haskell's strong type-system.

This lang is both theoretically and practically TC, be careful!

Its `std` lib forces you to handle **all** errors (no built-in panicking). However, you can opt-out of error-handling by calling the `diverge` fn, which isn't a compiler built-in, it's literally defined as an infinite recursive loop. The compiler is allowed (but not required) to optimize trivial infinite-loops as errors.

Zogah should never panic on its own. That is, any memory-overflows and/or trivial-`diverge`s should evaluate to a `Result::err` on Cranket's and Ramsy's side. Zogah is lazily-evaluated by default, so unused Zogah expressions are removed from the binary, *even in debug mode*. However, if a Zogah expression is used, even if it's unreachable, it should still be included in debug mode.

This lang is kinda "alien", as not all names are english. This takes some inspiration from APL and [conlangs](https://en.wikipedia.org/wiki/Constructed_language), without being "too extreme".

Other features:
- No operators, only functions
- Identifiers can contain any char (zero-width chars are forbidden), except Unicode white-space. This allows fns to _look_ like operators.
- `struct` and `enum` [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type) support like Haskell and the ML-family
- Pattern `match`ing and [logic](https://en.wikipedia.org/wiki/Logic_programming)
- No primitive types, such as `string`s or `int`s. Its `std` provides lists of enums instead, with attached methods.
- `bool`s are just `bit`s (`enum`s), and a `list` of them will be packed (by the compiler) to its canonical size.
- Literals are interpreted according to macros. The only supported radix for binary integers and fractions is binary itself (for simplicity).
- `std` provides binary and ternary positional numerals, also [Church Numerals](https://en.wikipedia.org/wiki/Church_encoding)
- `std` ints and fractions have dynamic arbitrary precision, there's also modular/wrapping ints (with some aliases for interoperation with Cranket), and you can round fractions to save memory.
- Fractions can have fixed denominators, allowing optimizations if denom is of the form $2^{-n}$.
- You can losslessly round-trip cast binary-ints and lists-of-bits. Ints only provide mathematical operations, but bit-lists allow you to do bit-shifting, rotations, and much more! Who said "abstract" langs cannot deal with "low-level" stuff?
- [TCO/TCE](https://en.wikipedia.org/wiki/Tail_call)
- [NTS](https://en.wikipedia.org/wiki/Nominal_type_system)

## Ramsy
Name inspired by Gordon Ramsay's infamous line:
> **WHERE'S THE LAMB SAUCE?!**

Pun explanation:
- Lambda -> Lamb
- Source code -> Sauce
- Ramsay -> Ramsy

[FR](https://en.wikipedia.org/wiki/Frank_Ramsey_(mathematician)) was also an inspiration for the name.

Ramsy wishes that systems weren't so complex and unreliable. As such they are "simple-minded".

This lang doesn't have a "target audience" or "personality", yet.

Its purpose is to be a [total](https://en.wikipedia.org/wiki/Total_functional_programming) and [formally-verifiable](https://en.wikipedia.org/wiki/Formal_verification) lang, as such it's **not TC at all**, it's more akin to a [PDA](https://en.wikipedia.org/wiki/Pushdown_automaton) or even [FSM](https://en.wikipedia.org/wiki/Finite-state_machine).

It's **always safe**, so you can't have raw-pointers or FFI bindings.

It's pure, but not internally (opt-in mutable variables exist). That is, there are no _observable_ side-effects, **not even memory allocation**.  If you want Ramsy to deal with the heap, you must pass references to it from Cranket. Think of it like [`no-std` Rust](https://matklad.github.io/2022/10/06/hard-mode-rust.html).

Since this lang doesn't manage resources on its own, it doesn't need move-semantics (no RAII), but borrow-checking is useful.

This lang (and its `std`) does have a concept of panicking, but it has to be enabled explicitly for blocks of code. This makes it suitable for robust kernel development. It should have an optional "Erlang mode" where anything can panic but is auto-restarted. It should also have a built-in concept of `async`, and JavaScript's non-blocking Event-Loop/Task-Queue system (is this unnecessary?). This is literally the only revolutionary thing about JS.

The only built-in numbers are integers, because **[floats are a plague](https://reddit.com/r/ProgrammerHumor/comments/13gt6co/standagainstfloats/) that must be eradicated** ("implementation-defined" my ass, we want **absolute determinism**). The default radix for literals is [unary](https://en.wikipedia.org/wiki/Unary_numeral_system), the only other supported radix is binary.

By default, all arithmetic is "clamping" (saturating), unlike Cranket which is "wrapping" (modular).

There are no macros, but something like Zig's `comptime` could be included.

This lang has ranged integers, like Ada. The ranges will be subject to function-aware [FST](https://en.wikipedia.org/wiki/Flow-sensitive_typing) (maybe even [DT](https://en.wikipedia.org/wiki/Dependent_type)s), so that you can statically catch more bugs
