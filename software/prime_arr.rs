#![no_std]
#![feature(unsigned_is_multiple_of)]
#![warn(clippy::pedantic, clippy::nursery)]

/// Two
const PRIME_EVEN: usize = 2;
const _: () = assert!(is_even(PRIME_EVEN));

#[inline]
#[must_use]
const fn is_even(n: usize) -> bool {
    n.is_multiple_of(PRIME_EVEN)
}
#[inline]
#[must_use]
const fn is_odd(n: usize) -> bool {
    !is_even(n)
}

/*
optional to-do:
Test if `unsafe` `unchecked` prime generator that
creates unchecked `Prime` wrapper struct
is optimized in the same way as an identical fn that returns checked `Prime`s.

`Prime` should be a wrapper that validates the input is prime
*/
#[must_use]
const fn is_prime(n: usize) -> bool {
    if n == PRIME_EVEN {
        return true;
    }
    // order-sensitive!
    if n < PRIME_EVEN || is_even(n) {
        return false;
    }
    assert!(n >= 3);
    // the 1st odd composite is nine
    if n < 9 {
        return true;
    }
    assert!(n >= 9);

    #[expect(clippy::items_after_statements)]
    const INIT: usize = 3;
    const { assert!(INIT > 1 && is_odd(INIT)) }
    let mut i = INIT;

    let rt = n.isqrt();
    // https://github.com/rust-lang/rust/issues/132763
    // SAFETY: guaranteed `i == 3`, implied `rt >= 3`
    unsafe { core::hint::assert_unchecked(i <= rt) };
    loop {
        if n.is_multiple_of(i) {
            return false;
        }
        i = match i.checked_add(PRIME_EVEN) {
            Some(i) => i,
            _ => unreachable!(),
        };
        debug_assert!(is_odd(i));
        if i > rt {
            break;
        }
    }
    assert!(i > INIT);
    true
}

#[derive(Debug, Copy, Clone)]
pub struct PrimeArr<T, const LEN: usize>([T; LEN]);
impl<T, const LEN: usize> PrimeArr<T, LEN> {
    #[must_use]
    pub const fn new(a: [T; LEN]) -> Self {
        const { assert!(is_prime(LEN)) };
        Self(a)
    }
}

impl<T, const LEN: usize> core::ops::Deref for PrimeArr<T, LEN> {
    type Target = [T; LEN];
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[must_use]
    const fn digit_to_bool(d: u8) -> Option<bool> {
        if d < b'0' || d > b'9' {
            return None;
        }
        Some(d != b'0')
    }

    #[test]
    fn primality() {
        assert!((*b"00110101000101000")
            .into_iter()
            .map(|b| digit_to_bool(b).unwrap_or_else(|| unreachable!()))
            .enumerate()
            .all(|(i, b)| is_prime(i) == b));
    }
}
