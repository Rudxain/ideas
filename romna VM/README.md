# Name

**romna**, a permutation (anagram) of "Norma", "Ramon", "Maron", and "Roman".

"Norma" means "standard" in Esperanto, it's a reference to how the VM isn't following any standard de facto. "I'm not like the others"

"Ramón" is just a latino name. "Marron" (an extra "r") is "brown" in spanish, brown is a weird color. "Roman" is just that, lol.

## Features

CISC, for performance. ALL instructions have a conditional counterpart (predicated ISA) and a SIMD counterpart where indices are packed 32bit values.

Support for all bit/Byte/Word endianeses and all their combinations. Support for Gray Code in the future.

Endianess-agnostic memory addresses (as an opt-in mode specified in the binary's header)

Different levels of addressing granularity: Word, Byte, and bit.

- `clear x` instead of `XOR x x`
- no `jump`, only copy to IP
- `copy` acts like `MOV`
- `move` **ACTUALLY moves** (clears source register after copy)
- modular (wrapping) arithmetic, clamped (saturating) arithmetic, and arbitrary precision.

## Instructions

Bitwise: NOT, OR, AND, XOR, NOR, NAND, XNOR, SHIFTL, SHIFTR, ROTL, ROTR, REV (reverse), TEND (transcode endianess), LBS (leftmost bit set), RBS (rightmost bit set), BCLMUL (binary carry-less multiplication), BBLDIV (binary borrow-less division).

zfor, xzfor, for, revfor. Inspired by [myself](https://github.com/Rudxain/zigzagfor)

bounce back, bounce forward, and bi-bounce. These change the direction of execution, they make the virtual CPU iterate over instructions in reverse, or reset to iterating downward (forward).

Integer and Float Math: ADD, SUB, MUL, MUL3 (triplicate), DIV, DIV3 (n/3), GCD, LCM, SQRT, CBRT, POW, LOG, GCLMUL (any base), GBLDIV (any base), AKMN (efficient 64bit Ackermann function).

## etc

[Helpful link](https://reddit.com/r/AskProgramming/comments/sxhejz/what_langs_are_recommended_for_coding_a_vm)
