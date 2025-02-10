pub const fn assert_eq_size_align<A, B>() {
	assert!(size_of::<A>() == size_of::<B>() && align_of::<A>() == align_of::<B>());
}

pub const fn assert_non_zst<T>() {
	// comments inside macros trip `rustfmt`, lol
	assert!(size_of::<T>() != 0); // !T::IS_ZST
}
