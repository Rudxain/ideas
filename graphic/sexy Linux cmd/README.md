A YT Short titled "This Unix command makes me wet 🥵" (mild clickbait).

The cmd:
```sh
# no need for `dd`!
head -c$((1<<16)) /dev/sd_ | sha256sum
```

In the short, I explain why being able to hash a slice of a device in such a concise and readable way is "elegant" (some people may consider it sexy). Also take the opportunity to slander Windows for being unable to do this in PowerShell.

This cmd is very useful to verify that an ISO/IMG was flashed successfully
