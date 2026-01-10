const data = require("../data.js")

function clean_name(s) {
	return s.toUpperCase()
		.replace(" - ", "_")
		.replace(/[ /-]/g, "_")
		.replace(/[!,*"'.]/g, "")
}

console.log("")

console.log("// SPACES")
for (let s of data.spaces) {
	console.log("const S_" + clean_name(s.ascii_name) + " = " + s.space_id)
}

console.log("")

console.log("// CARDS")
for (let c of data.cards) {
	if (c)
		console.log("const C_" + clean_name(c.name) + " = " + c.number)
}

console.log("")
