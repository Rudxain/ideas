#![warn(clippy::pedantic, clippy::nursery)]
#![no_std]

mod util;
use util::*;

/// Generalization of this problem:
/// > In a room of 100 people, 99% are left-handed.
/// > How many left-handed people have to leave the room
/// > to bring that percentage down to 98%?
///
/// 100 is `n`, 99 is `n-1`, 98% (49/50) is `target_frac`
pub const fn f(n1: NonZero<Int>, target_frac: FracInt) -> Option<Int> {
	let n0 = n1.get();
	let n_frac = (
		match n0.checked_sub(1) {
			Some(n) => n,
			_ => unreachable!(),
		},
		n1,
	);
	assert!(frac_eq(n_frac, simplify(n_frac)));

	let target_frac = simplify(target_frac);
	// compare numerators and denominators
	let solution_exists = n0 - 1 == target_frac.0 && n0 == target_frac.1.get();
	if !solution_exists {
		return None;
	}
	// both fractions are "aligned"
	todo!()
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn idempotent_simpl() {
		for numerator in 0..0xff {
			for denominator in 1..0xff {
				let frac = simplify((
					numerator,
					NonZero::new(denominator).unwrap_or_else(|| unreachable!()),
				));
				assert_eq!(frac, simplify(frac));
			}
		}
	}
}
