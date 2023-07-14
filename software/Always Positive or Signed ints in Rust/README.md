Same as `NonZero*`, but "Making the invalid state unrepresentable"™

This library exports `P*` (positive ints) and `S*` (always signed ints). These have the following properties:

`P*` is the same as `U*`, but the entire range is offset by `+1`. Therefore, the binary representation of `1` is all-zeros, and the numerical value of all-ones is exactly 2^n (where n is the bit-width).

`S*` is the same as `I*`, but perfectly symmetrical. Now the cardinality of the negative-side is exactly the same as the positive-side, because the "slot" that was previously occupied by `0` is now occupied by another positive int
