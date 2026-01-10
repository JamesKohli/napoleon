const { parse_hex, format_hex, lrgb_from_any, rgb_from_any, oklab_from_any } = require("./colors.js")

const white = "#ffffff"
const black = "#000000"

function lerp(a, b, n) {
	return a + (b - a) * n
}

function blend(a, b, n) {
	a = lrgb_from_any(parse_hex(a))
	b = lrgb_from_any(parse_hex(b))
	return format_hex({
		mode: "lrgb",
		r: lerp(a.r, b.r, n),
		g: lerp(a.g, b.g, n),
		b: lerp(a.b, b.b, n)
	})
}

function multiply_luminance(hex, m) {
	let oklab = oklab_from_any(parse_hex(hex))
	oklab.l = Math.max(0, Math.min(1, oklab.l * m))
	return format_hex(oklab)
}

function add_luminance(hex, m) {
	let oklab = oklab_from_any(parse_hex(hex))
	oklab.l = Math.max(0, Math.min(1, oklab.l + m))
	return format_hex(oklab)
}

function make_3d_colors(base) {
	return [
		base,
		multiply_luminance(base, 0.9),
		multiply_luminance(base, 0.8),
		multiply_luminance(base, 0.7),
		multiply_luminance(base, 0.4)
	]
}

function make_2d_colors(base) {
	return [
		base,
		multiply_luminance(base, 1.2),
		multiply_luminance(base, 0.8),
		multiply_luminance(base, 0.4)
	]
}

function make_2d_colors_add(base) {
	return [
		base,
		add_luminance(base, 0.2),
		add_luminance(base, -0.2),
		add_luminance(base, -0.5),
	]
}

function print(x) {
	console.log(x)
}

function gencss(color, sel) {
	let [ bg, hi, lo, sh ] = make_2d_colors(color)
	print(`${sel} { background-color: ${color}; border-color: ${hi} ${lo} ${lo} ${hi}; box-shadow: 0 0 0 1px ${sh}, 1px 2px 4px #0008; }`)
}

gencss("#bbbbbb", ".marker")
gencss("#c4e2f6", ".demInfl.ctl")
gencss("#c1272d", ".comInfl.ctl")
gencss("#147fc0", "#marker_action_round.dem")
gencss("#c1272d", "#marker_action_round.com")
gencss("#fadb04", "#marker_vp, #marker_turn")
gencss("#f26649", "#marker_com_tst")
gencss("#c4e2f4", "#marker_dem_tst")

