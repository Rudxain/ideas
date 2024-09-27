# Amotify
Inspired by Nintendo DS. An Android app that plays specific audio/music based on foreground app. It can be a playlist for each app or only 1 audio for a list of apps. Name is derived from "app" + "motif", and the prefix reminds me of ඞamogus, lol.

Default audio could be none (only listed apps play audio, any other app is silent), or all-sound (all apps play a place-holder audio, except the ones explicitly set to silent).

`main.flo` is the [LL-AM](https://llamalab.com/automate) flow draft implementation.

I decided to not make this cross-platform, because development would be absolute madness, specially on multi-window desktop environments.

## Theme package format
I haven't wrote the specification yet, but I have a vague idea.

Supports "./" paths, which are relative to theme-pack root directory. Pack-root is where the manifest is placed (like Cargo.toml and package.json). Support for parent-dirs ("..") and arbitrary path-traversal will be added later (for security reasons, and because I'm lazy).

### Directory tree
This is arbitrary, so a pack-dev can decide whatever structure they want, as long as it matches the manifest. Of course, devs are encouraged to keep the structure consistent and organized.
I personally recommend to **not** place audio files at pack-root, to prevent "namespace pollution".

Despite the fact that this app will only be used on Android (ext4 and FAT32 file-systems), path-names must also be compatible with NTFS and APFS. This is to ensure portability between development environments.

Path names must be **valid UTF-8** (no control chars, no unpaired surrogates, no BOM)

### Manifest
The schema is vaguely (and implicitly) described [here](main.flo), but that's subject to change (unstable).

I'm considering TOML rather than JSON. **I'll never use YAML**, because I'm an advocate for tab-indentation, lol.

Name will probably be `Amotify.toml`

## License?
I still haven't chosen a license, so it's "all rights reserved" while I choose one.

If you want to help me choose a license, thank you! I'm looking for a license like "Creative Commons Attribution Non-Commercial", but allowing derivative works to be commercial, such that "the more modified it is, the more money they can get from my idea, and less money goes to me", because "more modifications" means it's "less mine".

If it helps in the decision, I'm planning to put ads when the app is finally ready for release, and add an option to opt-out of ads by paying a subscription. I'm also considering making the app "more free", and make donations optional, but I need money (for me and my family) :(
