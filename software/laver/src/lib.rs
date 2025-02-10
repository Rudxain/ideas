use std::{hint::unreachable_unchecked, ops::Deref};

use num_bigint::BigUint;
use num_integer::Integer;
use num_traits::{One, Zero};

#[derive(Clone)]
pub struct NonZeroInt<T: Integer>(T);

impl<T: Integer> NonZeroInt<T> {
	#[must_use]
	fn new(n: T) -> Option<Self> {
		if n.is_zero() {
			None
		} else {
			Some(Self(n))
		}
	}
	#[must_use]
	unsafe fn new_unchecked(n: T) -> Self {
		Self::new(n).unwrap_unchecked()
	}
	#[must_use]
	fn get(self) -> T {
		self.0
	}
}
impl<T: Integer> Deref for NonZeroInt<T> {
	type Target = T;
	fn deref(&self) -> &Self::Target {
		&self.0
	}
}

#[allow(dead_code)]
impl NonZeroInt<BigUint> {
	fn one() -> Self {
		// SAFETY: 1 != 0
		unsafe { Self::new_unchecked(BigUint::one()) }
	}
	/// increment
	fn inc(&mut self) {
		// SAFETY: if n >= 0 then n + 1 > 0
		unsafe {
			self.0.inc();
			if self.0.is_zero() {
				unreachable_unchecked();
			}
		};
	}
	fn add1(self) -> Self {
		// SAFETY: if n >= 0 then n + 1 > 0
		unsafe { Self::new_unchecked(self.0 + BigUint::one()) }
	}
}

pub fn laver(
	n: usize,
	mut x: NonZeroInt<BigUint>,
	mut y: NonZeroInt<BigUint>,
) -> NonZeroInt<BigUint> {
	let n1 = NonZeroInt::<BigUint>::one();
	loop {
		if *x == ((*n1).clone() << n) {
			return y;
		}
		if *y == *n1 {
			return x.add1();
		}
		// SAFETY: `y` cannot be 1,
		// otherwise the previous `if` would've returned.
		// This implies `y >= 2`, therefore `y - 1 > 0`
		x = laver(n, x, unsafe {
			NonZeroInt::new_unchecked(y.get() - (*n1).clone())
		});
		y = x.clone().add1();
	}
}

pub fn laver_s(
	n: usize,
	mut x: NonZeroInt<BigUint>,
	mut y: NonZeroInt<BigUint>,
) -> NonZeroInt<BigUint> {
	let n1 = NonZeroInt::<BigUint>::one();
	// SAFETY: 1 * 2^n > 0
	let n = unsafe { NonZeroInt::new_unchecked((*n1).clone() << n) };

	// stack
	let mut s = vec![[x.clone(), y.clone()]];
	loop {
		let Some(deep_top) = s.pop() else { return x };
		if *deep_top[0] == *n {
			let Some(mut outer_top) = s.pop() else {
				return y;
			};
			// CoW?
			x = deep_top[1].clone();
			outer_top[0] = x.clone();
			// CoW?
			y = outer_top[0].clone().add1();
			outer_top[1] = y.clone();
			continue;
		}
		if *deep_top[1] == *n1 {
			let Some(mut outer_top) = s.pop() else {
				return x.add1();
			};
			// CoW?
			x = deep_top[0].clone().add1();
			outer_top[0] = x.clone();
			// CoW?
			y = outer_top[0].clone().add1();
			outer_top[1] = y.clone();
			continue;
		}
		s.push([
			x.clone(),
			NonZeroInt::new((*y).clone() - (*n1).clone()).unwrap(),
		]);
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test() {
		for n in 0..=2 {
			for x in 1u8..=1 {
				for y in 1u8..=2 {
					println!("{n} {x} {y}");
					let x = NonZeroInt::new(BigUint::from(x)).unwrap();
					let y = NonZeroInt::new(BigUint::from(y)).unwrap();
					assert_eq!(
						*laver(n, x.clone(), y.clone()),
						*laver_s(n, x.clone(), y.clone())
					);
				}
			}
		}
	}
}
