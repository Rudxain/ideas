Video: [Can You Solve This Tricky Multiple Choice Question?](https://youtu.be/h_fLW4xlOyA)

My reaction to that information:
> I wonder what would be the time complexity of a general algorithm to solve this kind of questions.
> We can encode each possible answer as an integer, so the list of all answers is an array.
> A positive sign means the answer refers to higher indices (below), and negative refers to previous indices (above).
> To encode "none, one, two... all" we need to add an offset, because 0 doesn't have a sign, so "none of the above" would be -1, "none of below" is +1, "one of the above" is -2, 0 is none for both sides, and N+1 (N = answers available after or before the currently selected answer) would mean "all of the below or above" (depending on sign).
>
> The answers in the video would be encoded as:
> [+6, +1, -3, -2, -1, -1]

[Original source at SE](https://math.stackexchange.com/questions/2217248/which-answer-in-this-list-is-the-correct-answer-to-this-question)

[lib](lib.py) attempts to be a general algorithm to solve questions of this kind. IDK if it's even possible, it may require solving [SAT](https://en.wikipedia.org/wiki/Boolean_satisfiability_problem), [HT](https://en.wikipedia.org/wiki/Halting_problem), **or both**
