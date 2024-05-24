Given a (unordered) set of `N` (ordered) bit-strings, can you find a _common index_ where each contiguous sub-str of lenght `ceil(lb(N))` uniquely identifies every bit-string within the set?

That is, can you construct a **perfect hash** fn for an immutable data-set known ahead-of-time, such that the fn simply maps strs to their own sub-strs?

Idea from my ["Settings Finder V2"](https://llamalab.com/automate/community/flows/39979)

Currently, I have no idea how to efficiently implement this general algorithm
