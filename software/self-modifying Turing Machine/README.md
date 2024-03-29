# About

## Basics

A programming language for Busy Beavers and binary Turing Machines. It'll be compilable to a native executable. Before compiling, the compiler will check if there's a `.tape_init.bin` file in the same directory as the source file, and it'll use that to define the initial memory/tape of the TM. The compiled TM also supports passing "tape files" via `arg[1]` (as path) and `stdin` (as raw) to use a different initializer at invocation-time.


## State-Table encoding

Everything but state labels can be encoded in 1bit. State labels could be mapped to arbitrary-size state-IDs when compiling. The "halt" state is not special, as any ID that points to a non-existent (or null/void/empty) state should cause the TM to halt.

For the TM to know what's part of the ST and what's "out-of-bounds", we need a small metadata that specifies the size of ST. This metadata will always be placed at the same tape address, adjacent to ST. It'll be implemented as a var-int, to support theoretically-infinite states.

Most of this assumes the TM uses the Von Neumann architecture. A standard TM uses the Hardvard Architecture, but doesn't have "opcodes" for rewriting ST.

There are too many valid ways to define a self-modifying Hardvard TM:

- Do we use 2 STs concatenated with each other? Or do we merge them into 1?
- If we do concatenate them, what order is most "natural"?
- Should we have 2 TMs (where 1 rewrites the 2nd TM's ST, such that both are driven by the same "clock"), or 1 double-tape double-head TM?
- Should ST be written in an arbitrary alphabet (**multi-alphabet** TM), or the native alphabet of the TM?
- Should ST be alphabet-encoded at all, or should it be a purely abstract mathematical object? (no double-tape)

In contrast, VN (despite being harder to debug) is much more straightforward:

- 1 "standard" ST
- 1 tape and head
- native-alphabet ST
- if TM is binary, use binary-encoded ST

Since TMs are supposed to be "the simplest Turing-Complete models of computation", and because I'm lazy, I choose VN over HV.


## Implementation

The compiler will be written in Python when drafting, and Rust when stabilizing.

The compiler backend will be GCC when drafting, and LLVM when stabilizing.

To emulate infinite memory, buffering will be performed, non-buffered memory would be stored in a `.tape_swap.bin` file. Since TM-heads only do sequential memory access, we can exploit that, to buffer data similarly to Minecraft (locality of reference is strong).

To reduce the frequency of read-write syscalls, we'll use an **overlapping chunk** system, unlike MC's non-overlapping chunk. This allows us to have a **load-distance of 1**, since 1 big overlapping-chunk is equivalent to multiple small non-overlapping-chunks. In this system, we update the load-zone only when the TM-head reaches a 64b-word at either end of the loaded-chunk. Since the head always "spawns" at the center of the load-zone, we can treat this zone as a **1D circle,** where the default distance from head to end is the *"load-radius"*. I've realized that, in a 1D context, **Pi=1**, because the *diameter is the circumference* (or is it undefined?).

The tape will have something similar to Minecraft JE "spawn chunks", because ST must always be loaded, for obvious performance reasons.
