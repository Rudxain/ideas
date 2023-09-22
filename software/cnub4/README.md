# cnub4
Pronounced as "Seen You Before", it's a browser extension that reminds you of a user that you've probably seen somewhere else on the web.

# How it works
Whenever you visit a page, the extension will look for username-handles in the viewport, and it'll associate them to the URL where they were found.

If the same username shows up in the viewport at a different URL, a small notification reminds you where and when you've seen them.

If you click the notification, you can see a full history of sightings, for the selected user.

The way it recognizes usernames is pretty simple, just look for "@" or "u/" prefixes within hyperlinks.

For GH, this is much trickier, as GH only uses "@" for mentions/pings, and profile URLs never contain "@". I'm still thinking of a solution... 🤔
