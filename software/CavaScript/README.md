# CavaScript
An extremely-unsafe systems scripting language! 

This lang is "the worst of both worlds" between C and JS.

Yes, this is just a joke. Don't worry about people trying to rewrite everything in it.

The syntax and semantics come mostly from ECMAScript. However, this lang has 1st-class support for raw pointers (just like C!).

Most expressions that return `undefined` would now be considered Undefined Behavior.

This lang doesn't have an exception system (no `throw`, `try ... catch`, etc...), so anything that would "normally" (JS is [not normal](https://github.com/denysdovhan/wtfjs))
 `throw` will obviously be UB. Yes, this means `eval` is orders-of-magnitude more unsafe and useless, as any invalid string would invoke UB.

`char` is 16bits wide, as [JS is _mostly_ UTF-16](https://mathiasbynens.be/notes/javascript-encoding). `string` is just an alias of `char *`.

[`sort`ing](https://github.com/denysdovhan/wtfjs/blob/6f832d987472b30e1e3ede82de22e517af69e40b/README.md#default-behavior-arrayprototypesort) a list of strings (which is just a `string` pointer) actually **sorts by reference** (if you don't provide a callback pointer). Yes, that means the strings aren't sorted lexico-graphically, but rather by the numerical value of their pointers!
