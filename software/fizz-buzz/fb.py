#!/usr/bin/env python3
from typing import Final, List, Dict
from sys import argv

def is_multiple(x: float | int, m: float | int, /):
	return x == 0 if m == 0 else x % m == 0

# tests
assert is_multiple(0,0)
assert is_multiple(0,1) and not is_multiple(1,0)
assert is_multiple(2,1) and not is_multiple(1,2)
assert is_multiple(4,2) and not is_multiple(2,4)
assert is_multiple(9,3) and not is_multiple(3,9)

def generic_fizzbuzz(n: int, cases: Dict[int, str]):
	a: List[int | str] = []
	for i in range(0, n):
		a.append(''.join(v for k, v in cases.items() if is_multiple(i, k)) or i)
	return a

def main(*args: str):
	if len(args) > 0:
		n = int(args[0])
	else:
		n = 3*5*7 + 1
	print(generic_fizzbuzz(n, {3: "Fizz", 5: "Buzz", 7: "Bazz"}))

if __name__ == '__main__':
	main(*argv[1:])
