An esolang where the program is allowed to modify itself, *and the interpreter,* **at runtime.** A lang where you can mutate a table of opcodes to make the interpreter execute an entirely different opcode when it finds it (basically, **runtime operator overloading**, with absolutely no constraints). The funniest thing is that you can mutate the table directly, or mutate via a **pointer table** where each pointer points to an opcode. So you can swap, delete, and shadow opcodes by **value AND/OR by reference**, because the interpreter only accesses the op-table via the pointer-table.

There's built-in multithreading, but no built-in mutexes, so you must implement it yourself. **You can use GoTos to jump into arbitrary threads** (I'm so evil!!). Actually, there are no gotos, you must **mutate the instruction-pointer** just like any other register (this lang has many registers, each one special, but there's **no special handling**, and there's **no way to distinguish** between them unless you've read the docs)

But hell doesn't stop there! Each thread has its own op and ptr tables, copied (inherited) from the parent thread. **ALL THREADS CAN MUTATE THE CODE AND TABLES OF ANY OTHER THREAD!! At any time!**

The lang is typeless, so you're always dealing with raw binary data. And **each byte is 11 bits wide** just for the sake of triggering OCD
