use std::collections::VecDeque;

#[derive(Default, Debug, Copy, Clone, PartialEq, Eq)]
enum Alphabet {
	/// Blank
	#[default]
	O,
	I,
}
impl Alphabet {
	/// `std::mem::variant_count` is nightly
	const RADIX: u8 = 2;
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
enum Dir {
	L,
	R,
}

#[derive(Debug, Copy, Clone)]
struct Op {
	/// write symbol
	w: Alphabet,
	/// shift
	s: Dir,
	/// go-to
	g: usize,
}

#[derive(Debug, Clone)]
struct TM<const N: usize> {
	program: [[Op; Alphabet::RADIX as usize]; N],
	/// Pointer to an array of `Op`s within `program`
	state: usize,
	tape: VecDeque<Alphabet>,
	head: isize,
}
impl TM {
	const fn head_as_index(&self) -> usize {
		todo!()
	}
}
impl Iterator for TM<_> {
	type Item = (usize, &VecDeque<Alphabet>, isize);
	fn next(&mut self) -> Option<Self::Item> {
		let symbol = self
			.tape
			.get(self.head_as_index())
			.map(|ref_sym| *ref_sym)
			.unwrap_or_default();

		let op = self.program.get(self.state)?[symbol as usize];
		self.tape[self.head_as_index()] = op.w;
		(op.g. &self.tape, self.head)
	}
}

fn main() {
	// std::iter::successors(, )
}
