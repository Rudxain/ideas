mod util;
#[allow(clippy::wildcard_imports)]
use util::*;

fn simulate(x_0: u128, trials: usize, seed: u64) -> usize {
	const N1: u128 = u128::MAX;

	let mut rng = RandBool::new(seed);

	let mut succ: usize = 0;
	assert_eq_types(&succ, &trials);

	for _ in 0..trials {
		let mut x = x_0;

		while 0 < x && x < N1 {
			let radius = x.min(N1 - x);
			x = if rng.next().unwrap_or_else(|| unreachable!()) {
				u128::checked_add
			} else {
				u128::checked_sub
			}(x, radius)
			.unwrap_or_else(|| unreachable!());
		}
		if x == N1 {
			succ = succ.checked_add(1).unwrap_or_else(|| unreachable!());
		};
	}
	succ
}

fn main() {
	let mut seed = [0u8; size_of::<u128>()];
	// TODO: ask user for seed
	getrandom::getrandom(&mut seed).expect("random seed shouldn't fail");
	let seed = u128::from_ne_bytes(seed);

	let trials = u16::MAX;

	println!(
		"success rate: {} / {trials}",
		simulate(seed, trials as usize, half_xor(seed))
	);
}
