# Ramsy
A programming lang whose level of abstraction is between Haskell and Lambda Calculus. Not quite a [TT](https://en.wikipedia.org/wiki/Turing_tarpit) but extremely close to being one, as it doesn't include a `std`-lib, not even a `core`-lib such as Rust.

## Name
Inspired by Gordon Ramsay's infamous line:
> **"WHERE'S THE LAMB SAUCE?!**

Pun explanation:
- Lambda -> Lamb
- Source code -> Sauce
- Ramsay -> Ramsy

[FR](https://en.wikipedia.org/wiki/Frank_Ramsey_(mathematician)) was also an inspiration for the name.

"Ramsy" could be misinterpreted as "RAM-C", which would be a [misnomer](https://en.wikipedia.org/wiki/Misnomer), as the lang is **totally devoid** of physical implementation details, opting to be solely mathematically low-level.

## Informal spec
- No operators, only functions
- Identifiers can contain any char, except Unicode whitespace. This allows fns to _look_ like operators.
- `struct` and `enum` [ADT](https://en.wikipedia.org/wiki/Algebraic_data_type) support
- No primitive types, such as `string`s or `int`s. Define vectors of enums instead.
- [PFP](https://en.wikipedia.org/wiki/Purely_functional_programming) is the only paradigm allowed
- [TCO](https://en.wikipedia.org/wiki/Tail_call), because loops don't exist, not even `for-each` or `map`
- Rudimentary [NTS](https://en.wikipedia.org/wiki/Nominal_type_system)
- Simple Lisp-like syntax and [SOP](https://en.wikipedia.org/wiki/Stack-oriented_programming)





