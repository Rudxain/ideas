//#![no_std]
#![warn(clippy::pedantic, clippy::nursery)]

use std::{panic, ptr};

mod util;
use util::*;

/// `map`s the slice by `f`
pub fn s_map_in_place_ref<T, F: FnMut(&T) -> T>(a: &mut [T], mut f: F) {
	for x in a {
		*x = f(x);
	}
}

/// lets `f` map each element of the slice.
pub fn s_map_in_place<T, F: FnMut(&mut T)>(a: &mut [T], mut f: F) {
	for x in a {
		f(x);
	}
}

/// `map`s the slice by `f`,
/// cloning every element before passing it to `f`,
/// which is required because `f` may `panic`.
pub fn s_map_in_place_cloned<T: Clone, F: FnMut(T) -> T>(a: &mut [T], mut f: F) {
	for x in a {
		*x = f(x.clone());
	}
}

/// `map`s the slice by `f`, `abort`ing on `panic` to avoid UB.
pub fn s_map_in_place_managed<T, F: FnMut(T) -> T>(a: &mut [T], mut f: F) {
	for x in a {
		unsafe {
			ptr::write(
				x,
				panic::catch_unwind(panic::AssertUnwindSafe(|| f(ptr::read(x))))
					.unwrap_or_else(|_| ::std::process::abort()),
			);
		}
	}
}

/// `map`s the slice by `f`.
///
/// # Safety
/// `f` is assumed to not `panic`.
/// If it does, the slice will end in an invalid state,
/// where exactly 1 of the elements has already been dropped (assuming `unwind`, not `abort`).
/// Trying to access that element in **any way** is immediate UB.
pub unsafe fn s_map_in_place_moved<T, F: FnMut(T) -> T>(a: &mut [T], mut f: F) {
	for x in a {
		ptr::write(x, f(ptr::read(x)));
	}
}

/// `map`s the array by `f`, with minimal stack usage
/// (unlike `core::array::map`)
///
/// - `I` & `O` must have the same size and alignment,
///   otherwise compilation will fail,
///   to prevent UB and "stack-leaks".
/// - This `fn` doesn't know how to handle ZSTs.
pub fn a_map_in_place<const N: usize, I, O, F: FnMut(I) -> O>(a: [I; N], f: F) -> [O; N] {
	const {
		assert_eq_size_align::<I, O>();
		assert_non_zst::<I>();
	}
	todo!()
}

/// `map`s `a` by `f` to a new vec.
/// There's no guarantee that it won't allocate,
/// but the optimizer may reuse the buffer (if possible).
///
/// If `O` is bigger than `I`, it will allocate.
///
/// The buffer is allowed to shrink.
#[must_use]
pub fn v_map<I, O, F: FnMut(I) -> O>(a: Vec<I>, f: F) -> Vec<O> {
	a.into_iter().map(f).collect()
}

/// `map`s `a` by `f` in the same vec. 0-alloc guaranteed!
/// This implies `a` **will never shrink**,
/// even if `O` is smaller than `I`.
///
/// - If `I` is not `Copy`, this `fn` may leak memory.
/// - `I` & `O` must have the same size and alignment,
///   otherwise compilation will fail, to prevent UB.
/// - In theory, `O` can be smaller than `I`,
///   but this `fn` can't handle that (yet)
/// - This `fn` doesn't know how to handle ZSTs.
/// - `f` takes `&I` instead of `I`, because we want to avoid `drop`ping `a`.
///   making implementation easier, and preventing UB.
pub fn v_map_in_place_ref<I, O, F: FnMut(&I) -> O>(
	mut a: Vec<I>, //Box<[I]> ?
	mut f: F,      // assumed to never access elements from previous iterations,
	               // as we take ownership of `a`
) -> Vec<O> {
	const {
		assert_eq_size_align::<I, O>();
		assert_non_zst::<I>();
	}
	for x in &mut a {
		// just-in-case: we need `f` to not hold `&I`
		// so that we can "safely" have a raw-ptr to it.
		let o = f(x);
		// `&I` no longer used
		let r: *mut O = std::ptr::from_mut(x).cast();
		// is this sound?
		unsafe { *r = o };
	}
	// `from_raw_parts` only makes sense if `O` is smaller than `I`
	unsafe { std::mem::transmute(a) }
}

#[cfg(test)]
mod tests {
	use super::*;

	const fn inc(n: &u8) -> u8 {
		*n + 1
	}

	#[test]
	fn test() {
		let mut a = [0u8; 8];
		// s_map_in_place(&mut a, inc);
	}
}
