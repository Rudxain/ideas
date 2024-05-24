#![allow(clippy::nursery)]

pub fn uniq_cont_bit<I: IntoIterator<Item = bool>>(bit_strs: &[I]) {}

pub fn uniq_cont_bit_with_index<I: IntoIterator<Item = bool>>(bit_strs: &[I]) {}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn it_works() {
		assert_eq!(4, 4);
	}
}
