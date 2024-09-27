use std::ops::{Index, IndexMut};

/// computes the (N+1)th triangular number
#[must_use]
const fn cell_count_from_rows(r: usize) -> Option<usize> {
	// this feels weird
	Some(
		match r.checked_mul(match r.checked_add(1) {
			Some(n) => n,
			_ => return None,
		}) {
			Some(n) => n,
			_ => return None,
		} / 2,
	)
}

#[must_use]
const fn trindex(mut row: usize, cell: usize) -> Option<usize> {
	if cell > row {
		return None;
	};
	row = match row.checked_add(1) {
		Some(r) => r,
		_ => return None,
	};
	let Some(mut c) = cell_count_from_rows(row) else {
		return None;
	};
	c = match c.checked_sub(1) {
		Some(c) => c,
		_ => unreachable!(),
	};
	c = match c.checked_sub(cell) {
		Some(c) => c,
		_ => unreachable!(),
	};
	Some(c)
}

/// Returns inclusive range of indices of 1st and last cell within row `r`
#[must_use]
const fn trirange(r: usize) -> Option<(usize, usize)> {
	match trindex(r, 0) {
		Some(t) => Some((
			t,
			match t.checked_add(r) {
				Some(e) => e,
				_ => return None,
			},
		)),
		_ => None,
	}
}

/// Triangular vector (2D)
#[derive(Debug, PartialEq, Clone)]
#[allow(clippy::module_name_repetitions)]
pub struct TriVec<T>(Vec<T>);

impl<T: Eq> Eq for TriVec<T> {}

impl<T> TriVec<T> {
	/// Constructs a new, empty `Tri<T>`.
	///
	/// The triangle will not allocate until elements are pushed onto it.
	#[inline]
	#[must_use]
	pub fn new() -> Self {
		Self(Vec::new())
	}
	/// Constructs a new, empty `Tri<T>` with at least the specified capacity.
	///
	/// The triangle will be able to hold at least `capacity` rows without
	/// reallocating. This method is allowed to allocate for more rows than
	/// `capacity`. If `capacity` is 0, the triangle will not allocate.
	pub fn with_row_cap(rows: usize) -> Option<Self> {
		Some(Self(Vec::with_capacity(cell_count_from_rows(rows)?)))
	}

	/// Given a coordinate pair, returns a reference to the element at that
	/// position in a row, or `None` if out of bounds.
	///
	/// - `row == 0` is shortest row, with 1 element
	/// - `row` is OOB if `row >= height`
	/// - `el` is OOB if `el >= row_len`
	///
	/// Thus, `el` is considered in-bounds
	/// according to selected `row`.
	#[inline]
	#[must_use]
	pub fn get(&self, row: usize, el: usize) -> Option<&T> {
		self.0.get(trindex(row, el)?)
	}
	/// Returns a mutable reference to an element (see [`get`])
	/// or `None` if the index is out of bounds.
	///
	/// [`get`]: Tri::get
	#[inline]
	#[must_use]
	pub fn get_mut(&mut self, row: usize, el: usize) -> Option<&mut T> {
		self.0.get_mut(trindex(row, el)?)
	}
}

impl<T> Index<usize> for TriVec<T> {
	type Output = [T];
	fn index(&self, row: usize) -> &Self::Output {
		let (start, end) = trirange(row).unwrap();
		&self.0[start..=end]
	}
}
impl<T> IndexMut<usize> for TriVec<T> {
	fn index_mut(&mut self, row: usize) -> &mut Self::Output {
		let (start, end) = trirange(row).unwrap();
		&mut self.0[start..=end]
	}
}

#[cfg(test)]
mod test {
	#![allow(clippy::unwrap_used)]
	use super::*;

	#[test]
	fn check_cap() {
		for (i, j) in [1, 3, 6, 10, 15].into_iter().enumerate() {
			assert_eq!(cell_count_from_rows(i + 1), Some(j));
		}
	}
}
