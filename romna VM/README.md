# Name

**romna**, a permutation (anagram) of "Norma", "Ramon", "Maron", and "Roman".

"Norma" means "standard" in Esperanto. It's a reference to how the VM "shuffles-up" standard-de-factos. "I'm not like the others" lol

"Ramón" is just a latino name. "Marron" (an extra "r") is "brown" in spanish, brown is a weird color. "Roman" is just that, lol.

## Features

- CISC, for performance.
- Both a stack machine and a register machine.
- ALL instructions have a conditional counterpart (predicated ISA) and a virtual-SIMD counterpart where 32bit indices are 64b packed (128b support in the future).
- Support for all bit/Byte/Word endianeses and all their combinations. Support for Gray Code in the future.
- Endianess-agnostic memory addresses (as an opt-in mode specified in the binary's header)
- Different levels of addressing granularity: Word, Byte, and bit.
- Supports self-modifying code, but it's disabled by default for security reasons.
- Allows low level access to the host computer's hardware and OS via interrupts.
- `clear x` instead of `XOR x x`
- no `jump`, only copy to IP
- `copy` acts like `MOV`
- `move` **ACTUALLY moves** (clears source register after copy)
- modular (wrapping) arithmetic, clamped (saturating) arithmetic, and arbitrary precision (with V-SIMD).

## Instructions

Bitwise: NOT, OR, AND, XOR, NOR, NAND, XNOR, SHIFTL, SHIFTR, ROTL, ROTR, REV (reverse), TEND (transcode endianess), LBS (leftmost bit set), RBS (rightmost bit set), BCLMUL (binary carry-less multiplication), BBLDIV (binary borrow-less division).

zfor, xzfor, for, revfor. Inspired by [myself](https://github.com/Rudxain/zigzagfor)

gravity up, gravity down, and unconditional gravity switch. These persistently change the direction of execution, they make the virtual CPU iterate over instructions in reverse, or reset to iterating downward (forward).

bounce back, bounce forward, and bi-bounce. These are the same as gravity, but have 1 operand instead of 0. The operand specifies how many instructions will be executed until the gravity auto-switches again.

Integer and Float Math: ADD, SUB, MUL, MUL3 (triplicate), DIV, DIV3 (n/3), GCD, LCM, SQRT, CBRT, POW, LOG, GCLMUL (any base), GBLDIV (any base), AKMN (efficient 64bit Ackermann function).

## etc

[Helpful link](https://reddit.com/r/AskProgramming/comments/sxhejz/what_langs_are_recommended_for_coding_a_vm)
