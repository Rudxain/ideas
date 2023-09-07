> If Busy Beavers are so slow, why not use them for password hashing?

There's only 1 problem: **BBs are stuck at a local maximum**. This is because they are tuned to win if the tape is all zeros, not an arbitrary sequence of 1s and 0s.

Why is this a problem? 2 reasons:

- timing attacks
- unreliability

A BB may stop processing a tape, even before it has touched all the bits between the "boundaries" (the beginning and end, of the data we want to "hash"). So we might have to run the BB multiple times at different "tape addresses" to get "full" diffusion.

Most cryptographic algorithms have some subroutine that's "recursively" iterated over the data, so this isn't a bad thing per-se. The problem is that it **leaks timing information** that could be used to infer some bits of the password. This is **very bad.**

However, in practice, BBs such as the current 5-state winner are so unpredictable, that timing-info will be near-useless.

But there's also the **Halting Problem**, which is the opposite problem of halting prematurely. Even just a single BB-iteration may enter an **infinite loop**, which is totally undesirable and undecidable (pun intended)

This means we also have to set a runtime limit to guard against this:

- Setting a timeout will make the digest non-deterministic. This is a no-go.
- Forcing a halt after the whole password has been processed, is not enough. It may enter an infinite loop that never digests the full password.
- Setting a *shift* limit is a reliable alternative.

For a standard BB, the number of shifts is directly proportional to the number of times any bit has been processed, which is sometimes proportional to the number of *unique* bits processed.

This has the advantage that different shift limits will yield different hashes deterministically.

Now, how do we ensure the resulting tape has a fixed size? If we turn the BB into a Linear-Bounded-Automaton, the tape would have the same length as the password, which is not very helpful. We could truncate the hash by using an XOR-hasher, which preserves (and sometimes increases) _entropy-density_.
