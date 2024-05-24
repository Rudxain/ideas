use core::num::NonZeroU8;

mod util;
//#[allow(clippy::wildcard_imports)]
//use util::*;

/// Checks if the numeric value of `n`
/// written in radix `base`
/// matches the regex `^h+l+$`,
/// where `h` is a digit of value `high`
/// and `l` is a digit of value `low`.
///
/// Basically, `n` must be a "binary" rep-digit.
#[must_use]
pub const fn matcher(n: u128, base: NonZeroU8, high: u8, low: u8) -> bool {
	let b = base.get();
	// implicit zeros would imply non-unique matching
	if high == 0 || high >= b || low >= b {
		return false;
	}

	let b = b as u128;
	let mut n = n;
	let mut is_h = false;
	let mut iter0 = true;
	while n > 0 {
		let digit = n % b;
		n /= b;
		if digit != if is_h { high } else { low } as u128 {
			if iter0 || is_h {
				// there must be at least 1 LSD
				return false;
			}
			is_h = true;
		}
		iter0 = false;
	}
	false
}

fn main() {
	println!("3333331 % 17 = {}", 333_333_331 % 17);
}
