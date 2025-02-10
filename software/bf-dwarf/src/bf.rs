use bitvec::{
	mem::{aligned_to_size, layout_eq},
	prelude::*,
};
use std::cell::Cell;

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
#[repr(u8)]
pub enum Op {
	/// `+` "plus"
	P,
	/// `,` "input"
	I,
	/// `-` "minus"
	M,
	/// `.` "output"
	O,
	/// `<` "left"
	L,
	/// `>` "right"
	R,
	/// `[` "while"
	W,
	/// `]` "close"
	C,
}
impl TryFrom<char> for Op {
	type Error = ();
	fn try_from(c: char) -> Result<Self, Self::Error> {
		Ok(match c {
			'+' => Self::P,
			',' => Self::I,
			'-' => Self::M,
			'.' => Self::O,
			'<' => Self::L,
			'>' => Self::R,
			'[' => Self::W,
			']' => Self::C,
			_ => return Err(()),
		})
	}
}
impl TryFrom<u8> for Op {
	type Error = ();
	fn try_from(n: u8) -> Result<Self, Self::Error> {
		[
			Self::P,
			Self::I,
			Self::M,
			Self::O,
			Self::L,
			Self::R,
			Self::W,
			Self::C,
		]
		.get(n as usize)
		.copied()
		.ok_or(())
	}
}

impl BitStore for Op {
	type Mem = u8;
	type Access = Cell<u8>;
	type Alias = Self;
	type Unalias = Self;
	// `From` isn't `const`
	const ZERO: Self = Self::P;
	const ALIGNED_TO_SIZE: [(); 1] = [(); aligned_to_size::<Self>() as usize];
	const ALIAS_WIDTH: [(); 1] = [(); layout_eq::<Self, Self::Alias>() as usize];

	fn new(n: Self::Mem) -> Self {
		todo!()
	}
	fn load_value(&self) -> Self::Mem {
		todo!()
	}
	fn store_value(&mut self, n: Self::Mem) {
		todo!()
	}
	fn get_bit<O>(&self, i: bitvec::index::BitIdx<Self::Mem>) -> bool
	where
		O: BitOrder,
	{
		todo!()
	}
}

pub type Prog = BitVec<Op>;

#[cfg(test)]
mod tests {
	use super::*;
	#[test]
	fn t() {
		Prog::new();
	}
}
