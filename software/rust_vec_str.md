I've noticed how `Vec<String>` is very inefficient, and how even some `std` APIs (such as `lines`) prefer to return stuff such as `Iterator<Item = &str>`. So I was wondering "how can we get the performance of `&str` with the convenience of `String` while also supporting efficient storage of split-strings?". So here's my draft (actually less than a draft) implementation of such a thing:

```rust
/// A cache-optimal `Vec<String>`.
/// as all of the "lifetimes" are always "bound" the owned data
pub struct VecString {
	/// The actual buffer with all the contiguous data
    dat: RawVec,
	/// These are the "pointers" to `dat`.
	/// Each one points to the beginning of a mutable slice
    view: Vec<usize>,
	/// Optional field.
	/// Only useful to improve resize perf of `dat`
	//len
}
```

Before you say "just use `smolstring`" or something like that, I want this to support big strings, so we can't assume "most or all strings will be small enough for the stack". I understand this is a "niche" use-case, but it could be generalized for most `[T]`.

The only downside I can see, is the resize performance:
```rust
// "fast", because each `String` is independent
std_vec_string[0].push('a');

// suspiciously slow,
// if there are many "fake Strings" in the vec
my_vec_string.push_inner(0, 'a');
```

This happens because part of the buffer must be cloned, and all of the following pointers must be updated to reflect the new addresses of the strs. This is especially true for my definition of the type, which doesn't include a `len` field, and the `view` contains thin pointers, so we're forced to always use the full `capacity` of `dat`
