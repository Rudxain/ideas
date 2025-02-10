The N-map performance metric only applies to libraries.

This is an example of 2-map, as the pipeline/chain is only 2 fn calls:

```rust
#[must_use]
pub fn trim_low_natural(s: &str) -> String {
	// only 1 implicit `clone`
	s.trim().to_lowercase()
}

#[must_use]
pub fn trim_low_forced(s: &str) -> String {
	// no "temporary value dropped while borrowed"...
	// that's odd, but nice!
	s.to_lowercase().trim().to_string()
	// 2 implicit `clone`s.
	// Intermediary fn needed
}
```

Therefore, for this particular example, we can assume that the Rust `std` lib is "naturally optimal", as it makes sub-optimal code more "unnatural".

For a "deeply accurate" measurement, we would have to **check every possible pair** of `fn`s.

If sub-optimal code fails to be accepted by the compiler, that increases the score. If it compiles, the scores decreases. The opposite is true for optimal code
