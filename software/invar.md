# invaria
A game where the player's avatar is a simple shape (JSaB/GD REFERENCE?!1?!1?1). They wake up next to a terminal+shell that gives them access to programs that grants them near god-like powers. The commands can manipulate individual factors of reality, such as:
- Avatar width and height
- Avatar mass. 0 = light-speed (1 unit of length per game-tick)
- Avatar acceleration
- World gravity vector
- Air friction (and/or density). 0 = vacuum.
- Game-tick speed (Planck Time). It can be **negative** to rewind time, but simulation memory is limited so it can only undo 0x100 ticks.

Since the terminal doesn't have a multiplexer, and there's no way to fork processes/threads, the player can only run 1 program at a time.

The shell commands can also provide information about:
- avatar
- player
- nearby objects
- world stats
- entities

The game should have a story and _lore_. I was considering to start the game with the player running the `hist login` sub-cmd and noticing their name **already written** there with a timestamp between 0x100 and 2^0x10
