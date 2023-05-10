A game inspired by Geometry Dash. Unlike [OGD](https://github.com/Open-GD/OpenGD), this is **NOT** meant to replicate/remake the original GD. It is meant to "fix RobTop's mistakes" such as floating-point arithmetic (rather than fixed-point, which is unfair and inefficient), game-ticks based on FPS (this will be fixed in 2.2), inconsistent UFO animation (flipped gravity), unfair star ratings, demon difficulties that share the same stars, too much bloat (overwhelming and disorganized GUI, map packs & gauntlets), etc.

This game won't have main levels/maps. Any map I make will be posted on my own account, as if I was any other player.

Since the game will be FLOSS (Free, Libre, & Open Source Code), I'll try my best to make modding/resource-packs as friendly as possible, providing standardized APIs.

The map file-format won't use any base64 encoding, nor XOR encryption, which will make it easier to process. I can't guarantee the file format will be stable, so a "bridge" interface may be needed to ensure any user-land scripts continue working indefinitely.

The game will be completely offline (serverless). So creators/artists will have to share their maps using social-media platforms, or other cloud-hosting services. This also means there are no "featured" nor "officially rated" levels/maps. Creators & players are entirely responsible for properly rating their maps (this will be included in the metadata), and the community will decide which maps deserve to be "featured".

The game will be distributed as a WASM PWA, so it'll be cross-platform, with minimal development cost, but slightly slower than a native app (don't worry, I'll use WebGL in the future)

Difficulties & scores. f(n) = 4^n - 1:
0. Safe Auto, 0: No matter what you do, you can't die.
1. Unsafe Auto, 1: If you click, you might die.
2. Easy \[2, 7] ("Easy" to "Normal")
3. Medium \[8, 31] ("Hard" to "Harder")
4. Hard \[32, 127] ("Harder" to "Medium-Demon")
5. Extreme \[128, 511] ("H.D." to "E.D.")
