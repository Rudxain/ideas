#![allow(dead_code)]
#![feature(explicit_tail_calls)]

fn fix<T: Clone + PartialEq, F: Fn(T) -> T>(f: F, x: T) -> T {
    let tmp = f(x.clone());
    #[expect(clippy::eq_op)]
    if x == tmp || x != x || tmp != tmp {
        return x;
    }
    become fix(f, tmp)
}

fn fix_s<T: Clone + PartialEq, F: Fn(T) -> T>(x: T, f: F) -> T {
    std::iter::successors(Some((x.clone(), f(x))), move |(x, tmp)| {
        #[expect(clippy::eq_op)]
        if x == tmp || x != x || tmp != tmp {
            None
        } else {
            Some((tmp.to_owned(), f(x.clone())))
        }
    })
    .last()
    .unwrap_or_else(|| unreachable!())
    .0
}

fn fix_i<T: Clone + PartialEq, F: Fn(T) -> T>(mut x: T, f: F) -> T {
    let mut tmp = f(x.clone());
    #[expect(clippy::eq_op)]
    while x != tmp && x == x && tmp == tmp {
        (x, tmp) = (tmp, f(x.clone()));
    }
    x
}

fn fix_s_steps<T: Clone + PartialEq, F: Fn(T) -> T>(x: T, f: F) -> usize {
    std::iter::successors(Some((x.clone(), f(x), 0)), move |(x, tmp, dist)| {
        #[expect(clippy::eq_op)]
        if x == tmp || x != x || tmp != tmp {
            None
        } else {
            Some((tmp.to_owned(), f(x.clone()), (*dist).checked_add(1)?))
        }
    })
    .last()
    .unwrap_or_else(|| unreachable!())
    .2
}

fn fix_i_steps<T: Clone + PartialEq, F: Fn(T) -> T>(mut x: T, f: F) -> usize {
    let mut tmp = f(x.clone());
    let mut dist: usize = 0;
    #[expect(clippy::eq_op)]
    while x != tmp && x == x && tmp == tmp {
        (x, tmp) = (tmp, f(x.clone()));
        dist = match dist.checked_add(1) {
            Some(d) => d,
            _ => break//return dist
        };
    }
    dist
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn consensus() {
        let f = f32::sin;
        let i = 1.0;
        assert_eq!(fix_s(i, f), fix_i(i, f));
    }
}

fn main() {
    println!("{}", fix_i_steps(1.0, f32::sin));
}

