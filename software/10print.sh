#!/usr/bin/env bash
set -euf
shopt -s checkwinsize
(:)

readonly A=(' ' O)

clear
while :
do
	COL=${COLUMNS:-}
	c=$COL
	while [[ $c -gt 0 ]]
	do
		printf %s "${A[RANDOM % 2]}"
		((c--))
	done
	echo
	# this could be done in pure Bash,
	# but I'm too lazy to re-implement fixed-point division
	sleep "$(bc -e "scale=5; 8 / $COL")"
done
