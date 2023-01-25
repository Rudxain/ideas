# Samsung rant

> NSFW!

## Intro

I was already bored/tired of using Samsung products (specially phones), but now I'm at my **absolute limit.**

## Background

All started when I was using my Galaxy J3 Mission, tinkering around, looking at the "Running processes" section of the dev settings.
Then, I notice that the launcher (Samsung Experience Home) was running **all the time** since the device was turned on (it matched "Up Time").
The culprit was the "notification listener service", which I couldn't turn off because it was **hidden from the "Notification Access" list.**
This was very annoying, because it constantly consumed RAM for no reason.

## Present

I was gifted a Galaxy A31, I was disappointed I got yet another Samsung phone (before the J3, I had a Sony Xperia Z5, and before that I got a Galaxy S4).
But I was very happy that I could finally use Android 12, and even happier because I finally have an **unlockable bootloader!**
(I was so unlucky that the Z5 was hard-locked, not even the official Sony codes helped me. The J3 was "even-harder-locked" because of Verizon's fault)

I was doing the same monitoring+tinkering process... when suddenly... **the Game Launcher was running** for no reason. I went to the details, and guess what...
**IT'S THE FUCKING NOTIFICATION LISTENER AGAIN! AND IT'S ALSO HIDDEN FROM THE NOTIFICATION ACCESS LIST!!!**

## Other stuff I hate

### SMS history
For some reason, Samsung thought it's a good idea to log SMSs in the Phone app, **even if "Show messages" is disabled.**
So if you want to save storage, or increase your privacy, you're forced to enable "Show messages" to delete them.
This is even worse when the vast majority of messages are useless carrier ads and reminders, now you're forced to delete those messages **ON BOTH APPS**.

### Recent files
Speaking of logging, "My Files" logs recently used files **even if the list is hidden**, meaning you also have to remember to clear it.

### Useless account
S forces users to use a Samsung Account, even for *looking at the list of app updates in Galaxy Store.*
So if you want to control auto-updates for individual apps, you gotta login to a useless S Account! Amazing, isn't it?! /s
That is just the tip of the iceberg, S forces you to use that account for lots of other unnecessary things!

### Duped apps
S has an obsession with making and pre-installing apps that Google already made.
As a minimalist person, this is absolutely disgusting:

- "So you like Google Assistant? How about you use Bixby instead?"
- "You still use G lens? How about you use Bixby Vision?"
- "G Tasks doesn't exist! Use Reminder!"
- "Don't use Google Autofill! Use S Pass"
- "Chrome is so 2016, use S Internet"
- "Gmail sucks, use S Mail"

Ok Samsung, how about you stop leeching off of Android, and make your own motherfucking operating system? (just like Huawei).

### Blue Light Filter

When I was looking at hidden app activities in my J3 Mission, I noticed S made its own "BLF" independent of AOSP's "Night Light",
but it was no-op, so I had to resort to the AOSP version (which was also hidden from Settings, for some reason).

Everytime I wanted to toggle NL, I had to use an Automate-flow that changed the setting. And if I wanted to configure the color temperature or schedule, I had to use Automate to open the hidden activity.

They literally updated my device from Android 7 to 8, and decided to hide a well-behaved fully-functional feature, just because they were working on a cheap clone...

Thank you, Samsung, for being so annoying!

### Memory "optimization"
Something I find pointless, and perhaps harmful, is Device Care app.
The battery optimization features are nice and all, *but why Memory?*
It doesn't "close background apps", it **deletes RAM-cache**, that's the *opposite* of device optimization.
Even worse, they added "Auto-Optimize", and it's **enabled by default,** meaning that every single day, your device **discards ALL of its RAM-cache**, only to generate it again.

This has been an issue **for years**, before One UI even existed.

### Persistent swap memory
Speaking of that, there's a "RAM Plus" feature that's set to **4GB by default**. This has several problems:

- the "Virtual RAM" is **always active**, unlike Linux's swap (which is only active when RAM explodes). this considerably reduces flash-storage lifespan, because of the frequent write-operations
- more background apps means more battery wasted
- storage is already slower than memory, and running too many BG apps will decrease performance

The good news is that "One UI 5" will allow users to easily turn it off. I have "One UI 4" so I had to [use ADB to disable it](https://forum.xda-developers.com/t/disable-samsung-ram-plus.4491743).
To control it easily, I granted /Llamalab/Automate `WRITE_SECURE_SETTINGS` permission. This also allows me to [enable it again](https://reddit.com/r/galaxys10/comments/zj7itl/comment/izw7y8q) (just-in-case)

## Conclusion

Needless to say, I fucking hate Samsung, **almost as much as Apple**. I wish I had a phone by any other brand (except Huawei and Xiaomi, those are useless to me)

S knows they have a monopoly over the smartphone market, and they love to abuse that power.
**S is following the steps of YouTube**

To be fair, S is a good hardware designer/manufacturer, I just think they suck at software design.
BTW, I think this is the reason why Google and S complement each other, because G sucks at hardware.

I've never used a Galaxy Nexus, but I guess it was a high-quality phone for its time (for the reasons mentioned previously)
