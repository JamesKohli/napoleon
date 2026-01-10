const fs = require("fs")

let boxes = []
let mode, name, x, y, w, h

function flush() {
	if (mode === 'rect') {
		boxes[name] = [ x |0, y |0, w |0, h |0 ]
	}
	x = y = w = h = 0
	name = null
}

for (let line of fs.readFileSync("tools/layout.svg", "utf-8").split("\n")) {
	line = line.trim()
	if (line.startsWith("<rect")) {
		flush()
		mode = "rect"
		x = y = w = h = 0
	} else if (line.startsWith('x="'))
		x = Math.round(Number(line.split('"')[1]))
	else if (line.startsWith('y="'))
		y = Math.round(Number(line.split('"')[1]))
	else if (line.startsWith('width="'))
		w = Math.round(Number(line.split('"')[1]))
	else if (line.startsWith('height="'))
		h = Math.round(Number(line.split('"')[1]))
	else if (line.startsWith('inkscape:label="'))
		name = line.split('"')[1]
}

flush()

console.log("var LAYOUT = {")
for (let key of Object.keys(boxes).sort())
	console.log("\t\"" + key + "\": " + JSON.stringify(boxes[key]) + ",")
console.log("}")
