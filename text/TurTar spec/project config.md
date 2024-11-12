# `turtar.ini`
This file defines the root of a project, similarly to `Cargo.toml`, `tsconfig.json`, `package.json`, `pyproject.toml`, etc...

It must include metadata such as (but not limited to):
- The _brainfoid identifier:_ the compiler uses it to assume the language (syntax, grammar, and semantics), of the source files. This ensures that the resulting `*.ttbc` files work as intended.
- A list of glob patterns that include or exclude files from the project. This helps a lot, because most esolangs don't have standard file extensions (and even when they do, they could collide with other well-established extensions)
- Semantics disambiguation: to declare any behavior that's undocumented or undefined, such as: out-of-bounds access, pointer underflow, mismatched braces, I-O protocol/handling, etc... Or to change the existing behavior (only allowed for reasonable cases, such as memory size)
