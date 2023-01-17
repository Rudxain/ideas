Find all non-overlapping palindromes of maximum size. That is, ignoring inner palindromes.

Example:
- `"abba b "` should return `["abba", " b "]`
- `"abbab "` should return `["abba", "bab"]` (overlaps allowed)
- `"abcba"` should NOT return `["c", "bcb", "abcba"]`

I want to rewrite this in either Python or Rust, but IDK what's the equivalent of `splitGraphemes`
