const IDtoURL = id => "https://newgrounds.com/audio/listen/" + String(id).replace(/\D/g, '')

const UItoURL = ui => {
	// it seems I have to use `exec`
	ui = String(ui).match(/^.*?((?:https?:\/\/)?(?:www\.)?newgrounds\.com\/audio\/listen\/\d+).*$/si)[1]
	return (/^https?:\/\/.+$/si.test(ui) ? "" : "https://") + ui
}

///** text response from HTTP request */
//src = replaceAll(matches(src, "(?s).+?(https:\\\\/\\\\/audio\\.ngfiles\\.com\\\\/\\d++\\\\/{id}_[\\w\\-.]+\\.\\w++).++")[1], "\\\\")
