pub fn trampoline<F, A, C, T>(f: F, args: A) -> T
where
    F: FnOnce(A) -> Result<C, T>,
    C: FnOnce() -> Result<C, T>,
{
    let mut out = f(args);
    // `while let` would require an awkward
    // `if let Err(x) return x; unreachable!()` at the end.
    // https://users.rust-lang.org/t/is-there-any-way-to-express-while-let-some-true/72527/2
    loop {
        match out {
            Ok(thunk) => out = thunk(),
            Err(x) => return x,
        }
    }
}
