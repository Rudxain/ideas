use oorandom::Rand32;

/// A PRNG producing a 1-bit output.
///
/// The current implementation is whatever [`oorandom::Rand32`] uses.
#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub struct RandBool {
	state: Rand32,
	/// register where RNG yield is placed
	reg: u32,
	/// bit index within `reg`
	i: u8,
}
impl RandBool {
	#[must_use]
	pub fn new(seed: u64) -> Self {
		Self {
			state: Rand32::new(seed),
			reg: 0,
			i: 0,
		}
	}
}
#[expect(clippy::copy_iterator)]
impl Iterator for RandBool {
	type Item = bool;
	fn next(&mut self) -> Option<Self::Item> {
		// SAFETY: all primitive ints are small
		#[allow(unsafe_code)]
		let len = unsafe { size_of_val(&self.reg).unchecked_mul(8) };

		if self.i as usize >= len {
			self.i = 0;
			self.reg = self.state.rand_u32();
		} else {
			self.i += 1;
			todo!();
		}
		Some(((self.reg >> self.i) & 1) == 1)
	}
}

#[inline(never)]
pub const fn assert_eq_types<T>(_a: &T, _b: &T) {}

#[expect(clippy::cast_possible_truncation)]
#[inline]
#[must_use]
pub const fn half_xor(n: u128) -> u64 {
	(n >> u64::BITS) as u64 ^ (n as u64)
}
