def self_ref_solver(A: list[tuple[int, bool]]):
	'''
	https://youtu.be/h_fLW4xlOyA

	format of `A` is `[n,b]`

	The sign of `n` encodes the direction it is referring to:
	- `+`: forwards to higher indices
	- `-`: backwards to lower indices
	- `0`: both directions

	`n` is also the number of statements being referred.
	if `n > v`, where `v` is the number of existing statements
	in the direction being pointed by the currently selected statement,
	then it's interpreted the same way as if `n == v` (clamping)

	`b` specifies the truth value of the statements being pointed at.
	'''

	no = set()
	yes = set()

	i = 0
	if A[0][0] < 0:
		(no if A[i][1] else yes).add(i)
		i += 1
	while i < len(A):
		if A[i][1]:
			pass
		i += 1
