# `evar`
Executes variable names using very complex logic.

Context:
- https://github.com/denysdovhan/wtfjs/issues/329#issuecomment-2413832248
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols

The basic idea is to use `eval` to execute arbitrary JS from the names of variables, by brute-force guessing the encoding of said names.

The algorithm would `try` (with silent `catch`) to decode as (after removing the 1st `_`):
- No encoding use name as itself
- Hexadecimal
- base64
- base32
- all of the above with different Caesar-Cipher keys
- and more...

The algorithm will also try to eval brainfuck code, possibly as a last resort.

I may even include my own [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) that interprets consecutive underscores between letters to correspond to different operators. Some sequences of underscores would also correspond to JSfuck characters.

## Why

The goal is to make a nasty and insane DSL, that makes everyone be even more disgusted of JS!

I should take inspiration from "Old PHP"
