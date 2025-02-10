pub use core::num::NonZero;
/// Default integer
pub type Int = u8;
pub type FracInt = (Int, NonZero<Int>);

#[inline]
#[must_use]
const fn nz_eq(a: NonZero<Int>, b: NonZero<Int>) -> bool {
	a.get() == b.get()
}

#[inline]
#[must_use]
pub const fn frac_eq(a: FracInt, b: FracInt) -> bool {
	a.0 == b.0 && a.1.get() == b.1.get()
}

#[inline]
#[must_use]
const fn gcd(mut a: Int, mut b: Int) -> Int {
	while b != 0 {
		(a, b) = (b, a % b);
	}
	a
}

#[inline]
#[must_use]
pub const fn simplify(f: FracInt) -> FracInt {
	let n = f.0;
	let d = f.1.get();
	let g = gcd(n, d);
	(
		n / g,
		match NonZero::<Int>::new(d / g) {
			Some(d) => d,
			_ => unreachable!(),
		},
	)
}
