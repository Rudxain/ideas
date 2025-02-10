//! <https://reddit.com/r/rust/comments/7apri3/when_to_use_slices_vs_their_owned_counterparts>
#![warn(clippy::pedantic, clippy::nursery)]

// These could be arrays,
// but we want immutability, and dynamic `len`s
pub struct CharSet<'a> {
	/// consonants
	cons: &'a [char],
	/// vowels
	vows: &'a [char],
}

impl<'a> CharSet<'a> {
	#[must_use]
	pub const fn new(cons: &'a [char], vows: &'a [char]) -> Self {
		CharSet { cons, vows }
	}

	/// Based on the consonants and vowels in the `CharSet`.
	/// This `fn` is infallible in all senses!
	///
	/// Whichever of `cons` or `vows` is exhausted,
	/// it'll repeat. If both, then both, independently.
	///
	/// If either/both `cons` or `vows` is empty,
	/// then `mem` is left intact,
	/// and `false` is returned.
	pub const fn syllables_in_place(&self, mem: &mut [(char, char)]) -> bool {
		let cons_len = self.cons.len();
		let vows_len = self.vows.len();
		if cons_len & vows_len == 0 {
			return false;
		}

		let mut i = 0;
		while i < mem.len() {
			mem[i] = (
				self.cons[(i / cons_len) % cons_len],
				self.vows[i % vows_len],
			);
			i += 1;
		}
		true
	}
	/// Based on the consonants and vowels in the `CharSet`
	///
	/// # Panics
	/// If the product of the counts of cons and vows is
	/// bigger than the available memory.
	/// However, this is extremely unlikely.
	/// More likely to return `None`.
	#[must_use]
	pub fn syllables_alloc(&self) -> Option<Vec<(char, char)>> {
		let mut result = Vec::with_capacity(self.cons.len().checked_mul(self.vows.len())?);
		for c in self.cons {
			for v in self.vows {
				result.push((*c, *v));
			}
		}
		Some(result)
	}
	/// Based on the consonants and vowels in the `CharSet`
	pub fn syllables_iter(&'a self) -> impl Iterator<Item = (char, char)> + 'a {
		let cons_len = self.cons.len();
		let vows_len = self.vows.len();
		(0..(cons_len.saturating_mul(vows_len)))
			.map(move |i| (self.cons[i / cons_len], self.vows[i % vows_len]))
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn it_works() {
		assert_eq!(4, 4);
	}
}
