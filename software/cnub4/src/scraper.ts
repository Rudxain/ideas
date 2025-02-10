// should be shared among all instances of the content-script
const forget_me_not = new Set<string>()

const user_digest: string[] = []
for (const user of new Set(
	document.body.innerText.matchAll(/(@|u\/)[\w\-]+/gis),
))
	if (forget_me_not.has(user)) user_digest.push(user)

// TO-DO: send notification to extension user
