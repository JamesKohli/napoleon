"use strict"

// === CONSTANTS ===

const FRENCH = "French"
const ALLIED = "Allied"

const INFANTRY = 0
const CAVALRY = 1
const ARTILLERY = 2
const GUARD_INFANTRY = 3

const UNIT_TYPE_NAMES = [ "Infantry", "Cavalry", "Artillery", "Guard Infantry" ]

// === UI ELEMENTS ===

const e_french_morale = document.getElementById("french_morale")
const e_allied_morale = document.getElementById("allied_morale")
const e_round_number = document.getElementById("round_number")
const e_turn_player = document.getElementById("turn_player")
const e_corps_remaining = document.getElementById("corps_remaining")
const e_indep_remaining = document.getElementById("indep_remaining")
const e_locales = document.getElementById("locales")
const e_pieces = document.getElementById("pieces")
const e_map = document.getElementById("map")

// LOCALES, MAIN_ROADS, LOCAL_ROADS, SETUP_LOCALES are loaded from data.js

// Size of locale hit areas (in pixels)
const LOCALE_SIZE = 60

// === STATE ===

let ui = {
	selected_unit: null,
	selected_commander: null,
	selected_locale: null,
}

// === INITIALIZATION ===

function on_init(scenario, options, static_view) {
	console.log("Napoleon's Triumph initialized")
	console.log("Scenario:", scenario)

	// Set up map background
	// TODO: Load actual map image

	// Build initial UI structure
	build_map_ui()
}

function build_map_ui() {
	// Clear any existing locale overlays
	e_locales.innerHTML = ""

	// Debug: check if LOCALES is defined
	console.log("LOCALES defined?", typeof LOCALES !== 'undefined')
	if (typeof LOCALES === 'undefined') {
		console.error("LOCALES is not defined! Check that data.js is loaded.")
		return
	}
	console.log("LOCALES has", Object.keys(LOCALES).length, "entries")

	// Create clickable locale overlays
	for (let id in LOCALES) {
		let locale = LOCALES[id]
		let el = document.createElement("div")
		el.className = "locale"
		el.id = "locale_" + id
		el.style.left = (locale.x - LOCALE_SIZE / 2) + "px"
		el.style.top = (locale.y - LOCALE_SIZE / 2) + "px"
		el.style.width = LOCALE_SIZE + "px"
		el.style.height = LOCALE_SIZE + "px"
		el.dataset.localeId = id

		// Show locale name as tooltip
		if (locale.name)
			el.title = locale.name + " (#" + id + ")"
		else
			el.title = "Locale #" + id

		el.addEventListener("click", () => on_click_locale(parseInt(id)))
		e_locales.appendChild(el)
	}

	console.log("Built", Object.keys(LOCALES).length, "locale overlays")
}

// === UPDATE ===

function on_update() {
	// Update morale display
	e_french_morale.textContent = view.french_morale
	e_allied_morale.textContent = view.allied_morale

	// Update turn info
	e_round_number.textContent = view.round
	e_turn_player.textContent = view.turn === 0 ? "Allied" : "French"

	// Update command track
	if (player === ALLIED) {
		e_corps_remaining.textContent = 5 - view.commands_used.corps
		e_indep_remaining.textContent = 3 - view.commands_used.independent
	} else {
		e_corps_remaining.textContent = "∞"
		e_indep_remaining.textContent = 4 - view.commands_used.independent
	}

	// Update pieces on map
	update_pieces()

	// Update action buttons
	update_actions()
}

function update_pieces() {
	// Clear existing pieces
	e_pieces.innerHTML = ""

	// Render commanders
	for (let cmd of view.commanders) {
		if (cmd.locale !== null && !cmd.eliminated) {
			render_commander(cmd)
		}
	}

	// Render units
	for (let unit of view.units) {
		if (unit.locale !== null) {
			render_unit(unit)
		}
	}
}

function render_commander(cmd) {
	let locale = LOCALES[cmd.locale]
	if (!locale) return

	let el = document.createElement("div")
	el.className = "commander " + cmd.owner.toLowerCase()
	// Position commander slightly offset from center
	el.style.left = (locale.x - 14) + "px"
	el.style.top = (locale.y - 40) + "px"
	el.textContent = cmd.name.charAt(0)
	el.title = cmd.name

	if (ui.selected_commander === cmd.id)
		el.classList.add("selected")

	el.addEventListener("click", () => on_click_commander(cmd.id))
	e_pieces.appendChild(el)
}

function render_unit(unit) {
	let locale = LOCALES[unit.locale]
	if (!locale) return

	let el = document.createElement("div")
	el.className = "unit " + unit.owner.toLowerCase()

	if (unit.face_up || unit.type !== null) {
		el.classList.add(get_unit_type_class(unit.type))
		el.textContent = unit.strength || "?"
	} else {
		el.classList.add("hidden")
		el.textContent = "?"
	}

	// Offset based on position within locale
	let offset = get_unit_offset(unit, locale)
	el.style.left = (locale.x + offset.x - 18) + "px"
	el.style.top = (locale.y + offset.y - 12) + "px"

	if (ui.selected_unit === unit.id)
		el.classList.add("selected")

	el.addEventListener("click", () => on_click_unit(unit.id))
	e_pieces.appendChild(el)
}

function get_unit_type_class(type) {
	switch (type) {
		case INFANTRY: return "infantry"
		case CAVALRY: return "cavalry"
		case ARTILLERY: return "artillery"
		case GUARD_INFANTRY: return "guard"
		default: return "unknown"
	}
}

function get_unit_offset(unit, locale) {
	// Calculate offset to prevent stacking overlap
	// Find all units at this locale and determine position
	let units_at_locale = view.units.filter(u => u.locale === unit.locale)
	let index = units_at_locale.indexOf(unit)
	if (index < 0) index = 0

	// Arrange units in a grid pattern around the locale center
	let row = Math.floor(index / 3)
	let col = index % 3
	return {
		x: (col - 1) * 40,
		y: row * 28
	}
}

function update_locales() {
	// Clear all locale highlights
	for (let id in LOCALES) {
		let el = document.getElementById("locale_" + id)
		if (el) {
			el.classList.remove("valid-target", "selected")
		}
	}

	// Highlight valid locale targets
	if (view.actions && view.actions.locale) {
		for (let locale_id of view.actions.locale) {
			let el = document.getElementById("locale_" + locale_id)
			if (el)
				el.classList.add("valid-target")
		}
	}

	// Highlight selected locale
	if (ui.selected_locale) {
		let el = document.getElementById("locale_" + ui.selected_locale)
		if (el)
			el.classList.add("selected")
	}
}

function update_actions() {
	// Update locale highlighting
	update_locales()

	// Show action buttons based on available actions
	if (view.actions) {
		if (view.actions.end_turn) {
			action_button("end_turn", "End Turn")
		}
		if (view.actions.done) {
			action_button("done", "Done")
		}
	}
}

// === CLICK HANDLERS ===

function on_click_unit(unit_id) {
	console.log("Clicked unit:", unit_id)

	if (view.actions && view.actions.unit) {
		if (view.actions.unit.includes(unit_id)) {
			send_action("unit", unit_id)
		}
	}

	ui.selected_unit = unit_id
	on_update()
}

function on_click_commander(commander_id) {
	console.log("Clicked commander:", commander_id)

	if (view.actions && view.actions.commander) {
		if (view.actions.commander.includes(commander_id)) {
			send_action("commander", commander_id)
		}
	}

	ui.selected_commander = commander_id
	on_update()
}

function on_click_locale(locale_id) {
	console.log("Clicked locale:", locale_id)

	if (view.actions && view.actions.locale) {
		if (view.actions.locale.includes(locale_id)) {
			send_action("locale", locale_id)
		}
	}

	ui.selected_locale = locale_id
	on_update()
}

// === PROMPT FORMATTING ===

function on_prompt(text) {
	return text
}

function on_log(text) {
	let el = document.createElement("div")
	el.textContent = text
	return el
}
