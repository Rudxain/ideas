#![no_std]
#![warn(clippy::pedantic, clippy::nursery)]

use core::{ops::Deref, num::NonZeroU8};

pub const MAX_LEN: u8 = 39;

#[derive(Copy, Clone)]
pub struct HyphenErr {
    // Starts with 1 or more dashes
    start: bool,
    // Ends with 1 or more dashes
    end: bool,
    // Contains 1 or more instances of consecutive dashes
    consec: bool,
}

/// If a field is `None` it means that error isn't present.
/// If all fields are `None`, it implies `Empty: true` (virtual field)
#[derive(Copy, Clone, Default)]
pub struct InvalidGHUser {
    /// Wraps the diff
    TooLong: Option<usize>,
    /// Hyphenation pattern error
    Hyphen: Option<HyphenErr>,
    /// Wraps the offending character
    Charset: Option<char>,
}

#[derive(Copy, Clone)]
// should it be `<const LEN: usize>`?
pub struct GHUserName {
    buffer: [u8; MAX_LEN as usize],
    // more correct and efficient than `usize`
    len: NonZeroU8,
}
impl GHUserName {
    // https://github.com/shinnn/github-username-regex
    pub const fn new(user: &str) -> Result<Self, InvalidGHUser> {
        const max_len: usize = MAX_LEN as usize;
        // check all possible errors before returning the struct
        todo!();
        if user.len() > max_len {
            return Err(InvalidGHUser {
                TooLong: Some(user.len() - max_len),
                Hyphen: None,
                Charset: None,
            });
        }
        #[expect(clippy::cast_possible_truncation)]
        match NonZeroU8::new(user.len() as u8) {
            Some(l) => Ok(Self {
                buffer: [0x61; max_len],
                len: l,
            }),
            None => Err(InvalidGHUser::default()),
        }
    }

    #[inline]
    #[must_use]
    pub const fn len(self) -> usize {
        self.len.get() as usize
    }
}
impl Deref for GHUserName {
    type Target = [u8];
    fn deref(&self) -> &Self::Target {
        &self.buffer[0..self.len()]
    }
}
