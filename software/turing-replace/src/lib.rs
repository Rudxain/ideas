#[derive(Debug, Clone)]
pub struct MapEntry<T: Eq, It: IntoIterator<Item = T>> {
	/// Key
	pattern: It,
	/// Value
	replace: It,
}

/// Generic replacement-rule automaton.
/// Halts if there are no matches.
#[derive(Debug, Clone)]
pub struct Replacer<T: Eq, It: IntoIterator<Item = T>, I2: IntoIterator<Item = MapEntry<T, It>>> {
	/// Input tape
	mem: Vec<T>,
	map: I2,
	/// Pattern pointer. An index to `map`.
	i: usize,
	/// Resets the pattern pointer if it finds a match,
	/// otherwise it tries to match all.
	reset: bool,
	/// Determinism. If `true` and there are duplicate patterns,
	/// it always chooses the 1st;
	/// if `false`, it picks a random dupe.
	_det: bool,
}
impl<T: Eq, It: IntoIterator<Item = T>, I2: IntoIterator<Item = MapEntry<T, It>>> Iterator
	for Replacer<T, It, I2>
{
	type Item = usize;
	fn next(&mut self) -> Option<Self::Item> {
		todo!()
	}

}
