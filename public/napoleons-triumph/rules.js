"use strict"

// === CONSTANTS ===

const FRENCH = "French"
const ALLIED = "Allied"

const ROLES = [ FRENCH, ALLIED ]
const R_FRENCH = 0
const R_ALLIED = 1

const SCENARIOS = [ "2 December", "1 December" ]

// Unit types
const INFANTRY = 0
const CAVALRY = 1
const ARTILLERY = 2
const GUARD_INFANTRY = 3

// Command types
const CMD_CORPS_MOVE = "corps_move"
const CMD_DETACH_MOVE = "detach_move"
const CMD_ATTACH = "attach"
const CMD_UNIT_MOVE = "unit_move"

// Position types
const POS_RESERVE = "reserve"
const POS_APPROACH = "approach"

// Attack phases
const PHASE_NONE = 0
const PHASE_ATTACK_THREAT = 1
const PHASE_RETREAT_OPTION = 2
const PHASE_FEINT_OPTION = 3
const PHASE_DEFENSE_DECLARATION = 4
const PHASE_ATTACK_DECLARATION = 5
const PHASE_INITIAL_RESULT = 6
const PHASE_COUNTER_ATTACK = 7
const PHASE_FINAL_RESULT = 8
const PHASE_ATTACKER_LOSSES = 9
const PHASE_DEFENDER_LOSSES = 10
const PHASE_COMPLETION = 11

// Starting morale
const FRENCH_STARTING_MORALE = 23
const ALLIED_STARTING_MORALE = 27

// Command limits
const ALLIED_CORPS_COMMAND_LIMIT = 5
const ALLIED_INDEPENDENT_COMMAND_LIMIT = 3
const FRENCH_INDEPENDENT_COMMAND_LIMIT = 4

// === MAP DATA ===
// Import locale data from data.js
const data = require("./data.js")
const LOCALES = data.LOCALES
const MAIN_ROADS = data.MAIN_ROADS
const LOCAL_ROADS = data.LOCAL_ROADS
const SETUP_LOCALES = data.SETUP_LOCALES

// === COMMANDERS ===

const FRENCH_COMMANDERS = [
	{ id: "lannes", name: "Lannes", min_units: 4 },
	{ id: "murat", name: "Murat", min_units: 3 },
	{ id: "soult", name: "Soult", min_units: 4 },
	{ id: "bernadotte", name: "Bernadotte", min_units: 2, reinforcement: true },
	{ id: "davout", name: "Davout", min_units: 2, reinforcement: true },
	{ id: "legrand", name: "Legrand", min_units: 2 },
]

const ALLIED_COMMANDERS = [
	{ id: "bagration", name: "Bagration", min_units: 4 },
	{ id: "constantine", name: "Constantine", min_units: 3 },
	{ id: "liechtenstein", name: "Liechtenstein", min_units: 3 },
	{ id: "kollowrat", name: "Kollowrat", min_units: 3 },
	{ id: "miloradovich", name: "Miloradovich", min_units: 2 },
	{ id: "przybyszewski", name: "Przybyszewski", min_units: 3 },
	{ id: "langeron", name: "Langeron", min_units: 3 },
	{ id: "dokhturov", name: "Dokhturov", min_units: 3 },
	{ id: "kienmayer", name: "Kienmayer", min_units: 2 },
]

// === INITIAL ARMY COMPOSITIONS ===
// These define the starting units available to each side

const FRENCH_UNITS = {
	guard_infantry: 2,  // 3-strength guard infantry
	infantry_3: 8,      // 3-strength infantry
	infantry_2: 4,      // 2-strength infantry
	cavalry_3: 2,       // 3-strength heavy cavalry
	cavalry_2: 6,       // 2-strength cavalry
	artillery_1: 4,     // 1-strength artillery
}

const ALLIED_UNITS = {
	guard_infantry: 1,  // 3-strength guard infantry (Russian Guard)
	infantry_3: 10,     // 3-strength infantry
	infantry_2: 6,      // 2-strength infantry
	cavalry_3: 2,       // 3-strength heavy cavalry
	cavalry_2: 4,       // 2-strength cavalry
	artillery_1: 5,     // 1-strength artillery
}

// === FRAMEWORK GLOBALS ===

var G, L, R, V
const P = {}

// === SETUP ===

function on_setup(scenario, options) {
	G.scenario = scenario
	G.round = scenario === "1 December" ? 0 : 1
	G.turn = 0 // 0 = Allied turn, 1 = French turn

	// Morale tracks
	G.french_morale = FRENCH_STARTING_MORALE
	G.allied_morale = ALLIED_STARTING_MORALE

	// Command tracking per turn
	G.commands_used = {
		corps: 0,
		independent: 0
	}

	// Units: array of unit objects
	// { id, owner, type, strength, max_strength, corps, locale, position, approach, face_up }
	G.units = []

	// Commanders: array of commander objects
	// { id, owner, name, locale, position, approach, eliminated }
	G.commanders = []

	// Corps assignments: commander_id -> [unit_ids]
	G.corps = {}

	// Track which units have moved this turn
	G.moved_units = []

	// Track reinforcement entry
	G.french_reinforcements_entered = false

	// Track elite unit commitment
	G.french_heavy_cavalry_committed = false
	G.allied_heavy_cavalry_committed = false
	G.french_guard_committed = false
	G.allied_guard_committed = false
	G.french_guard_attack_failed = false
	G.allied_guard_attack_failed = false

	// Fixed battery (French artillery that cannot move)
	G.fixed_battery = null

	// Attack state (when in combat)
	G.attack = null

	// Initialize armies
	init_armies()

	G.active = ALLIED
	G.state = "setup_allied"
}

function init_armies() {
	let unit_id = 1

	// Create French units
	for (let i = 0; i < FRENCH_UNITS.guard_infantry; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, GUARD_INFANTRY, 3))
	}
	for (let i = 0; i < FRENCH_UNITS.infantry_3; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, INFANTRY, 3))
	}
	for (let i = 0; i < FRENCH_UNITS.infantry_2; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, INFANTRY, 2))
	}
	for (let i = 0; i < FRENCH_UNITS.cavalry_3; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, CAVALRY, 3))
	}
	for (let i = 0; i < FRENCH_UNITS.cavalry_2; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, CAVALRY, 2))
	}
	for (let i = 0; i < FRENCH_UNITS.artillery_1; i++) {
		G.units.push(create_unit(unit_id++, FRENCH, ARTILLERY, 1))
	}

	// Create Allied units
	for (let i = 0; i < ALLIED_UNITS.guard_infantry; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, GUARD_INFANTRY, 3))
	}
	for (let i = 0; i < ALLIED_UNITS.infantry_3; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, INFANTRY, 3))
	}
	for (let i = 0; i < ALLIED_UNITS.infantry_2; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, INFANTRY, 2))
	}
	for (let i = 0; i < ALLIED_UNITS.cavalry_3; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, CAVALRY, 3))
	}
	for (let i = 0; i < ALLIED_UNITS.cavalry_2; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, CAVALRY, 2))
	}
	for (let i = 0; i < ALLIED_UNITS.artillery_1; i++) {
		G.units.push(create_unit(unit_id++, ALLIED, ARTILLERY, 1))
	}

	// Create commanders
	for (let cmd of FRENCH_COMMANDERS) {
		G.commanders.push({
			id: cmd.id,
			owner: FRENCH,
			name: cmd.name,
			locale: null,
			position: null,
			approach: null,
			eliminated: false,
			reinforcement: cmd.reinforcement || false
		})
		G.corps[cmd.id] = []
	}

	for (let cmd of ALLIED_COMMANDERS) {
		G.commanders.push({
			id: cmd.id,
			owner: ALLIED,
			name: cmd.name,
			locale: null,
			position: null,
			approach: null,
			eliminated: false
		})
		G.corps[cmd.id] = []
	}
}

function create_unit(id, owner, type, strength) {
	return {
		id: id,
		owner: owner,
		type: type,
		strength: strength,
		max_strength: strength,
		corps: null,      // commander id or null if detached
		locale: null,     // locale id
		position: null,   // POS_RESERVE or POS_APPROACH
		approach: null,   // adjacent locale id if blocking approach
		face_up: false
	}
}

// === VIEW ===

function on_view() {
	V.scenario = G.scenario
	V.round = G.round
	V.turn = G.turn
	V.french_morale = G.french_morale
	V.allied_morale = G.allied_morale
	V.commands_used = G.commands_used
	V.attack = G.attack

	// Show all commanders (they are always visible)
	V.commanders = G.commanders.map(c => ({
		id: c.id,
		owner: c.owner,
		name: c.name,
		locale: c.locale,
		position: c.position,
		approach: c.approach,
		eliminated: c.eliminated
	}))

	// Show units - hide face-down enemy units
	V.units = G.units.map(u => {
		let visible = u.face_up || u.owner === ROLES[R]
		return {
			id: u.id,
			owner: u.owner,
			locale: u.locale,
			position: u.position,
			approach: u.approach,
			corps: u.corps,
			// Only show type/strength if visible
			type: visible ? u.type : null,
			strength: visible ? u.strength : null,
			face_up: u.face_up
		}
	})

	V.corps = G.corps
}

// === STATE MACHINE ===

// Setup states
P.setup_allied = {
	prompt() {
		prompt("Allied player: Organize your corps and place them on the map.")
		// TODO: Implement corps organization UI
		button("done")
	},
	done() {
		G.state = "setup_french"
		G.active = FRENCH
	}
}

P.setup_french = {
	prompt() {
		prompt("French player: Organize your corps, place them, and select fixed battery.")
		// TODO: Implement corps organization UI
		button("done")
	},
	done() {
		G.state = "allied_turn"
		G.active = ALLIED
		start_turn()
	}
}

// Main game states
P.allied_turn = {
	prompt() {
		let corps_remaining = ALLIED_CORPS_COMMAND_LIMIT - G.commands_used.corps
		let indep_remaining = ALLIED_INDEPENDENT_COMMAND_LIMIT - G.commands_used.independent
		prompt(`Allied turn. Corps commands: ${corps_remaining}, Independent: ${indep_remaining}`)

		// TODO: Show available actions
		button("end_turn")
	},
	end_turn() {
		end_turn()
	}
}

P.french_turn = {
	prompt() {
		let indep_remaining = FRENCH_INDEPENDENT_COMMAND_LIMIT - G.commands_used.independent
		prompt(`French turn. Independent commands: ${indep_remaining}`)

		// TODO: Show available actions
		button("end_turn")
	},
	end_turn() {
		end_turn()
	}
}

// === TURN MANAGEMENT ===

function start_turn() {
	G.commands_used = { corps: 0, independent: 0 }
	G.moved_units = []
}

function end_turn() {
	if (G.active === R_ALLIED) {
		G.active = FRENCH
		G.state = "french_turn"
		G.turn = 1
	} else {
		// End of round
		G.round++
		G.turn = 0
		G.active = ALLIED
		G.state = "allied_turn"

		// Check for game end
		if (check_victory()) {
			return
		}

		// Check for night turn
		if (G.scenario === "1 December" && G.round === 1) {
			G.state = "night"
		}
	}
	start_turn()
}

// === VICTORY ===

function check_victory() {
	if (G.french_morale <= 0) {
		finish(R_ALLIED, "Allied decisive victory! French army demoralized.")
		return true
	}
	if (G.allied_morale <= 0) {
		finish(R_FRENCH, "French decisive victory! Allied army demoralized.")
		return true
	}

	// Check for end of game (round limit)
	let max_rounds = G.scenario === "1 December" ? 14 : 9
	if (G.round > max_rounds) {
		return check_marginal_victory()
	}

	return false
}

function check_marginal_victory() {
	// TODO: Implement objective control checking
	finish("Draw", "Game ended in a draw.")
	return true
}

// === HELPER FUNCTIONS ===

function get_unit(id) {
	return G.units.find(u => u.id === id)
}

function get_commander(id) {
	return G.commanders.find(c => c.id === id)
}

function get_units_in_locale(locale_id) {
	return G.units.filter(u => u.locale === locale_id)
}

function get_units_in_corps(commander_id) {
	return G.corps[commander_id].map(id => get_unit(id))
}

function get_locale_capacity(locale_id) {
	let locale = LOCALES[locale_id]
	return locale ? locale.capacity : 0
}

function count_units_in_locale(locale_id, owner) {
	return G.units.filter(u => u.locale === locale_id && u.owner === owner).length
}

function is_enemy_occupied(locale_id, owner) {
	let enemy = owner === FRENCH ? ALLIED : FRENCH
	return G.units.some(u => u.locale === locale_id && u.owner === enemy)
}

function get_adjacent_locales(locale_id) {
	let locale = LOCALES[locale_id]
	if (!locale) return []
	return Object.keys(locale.approaches).map(Number)
}

function get_approach_data(from_locale, to_locale) {
	let locale = LOCALES[to_locale]
	if (!locale || !locale.approaches[from_locale]) return null
	return locale.approaches[from_locale]
}

// === FRAMEWORK INCLUDE ===
// Copy of public/common/framework.js goes here
// (Will be included at end of file)

// === EXPORTS ===

exports.scenarios = SCENARIOS
exports.roles = ROLES

exports.setup = function (seed, scenario, options) {
	G = {
		seed: seed,
		log: [],
		undo: [],
		active: null,
		state: null,
	}
	L = null
	on_setup(scenario, options)
	return G
}

exports.view = function (game, player) {
	G = game
	R = ROLES.indexOf(player)
	V = {
		log: G.log,
		prompt: null,
		actions: null,
	}

	on_view()

	if (G.state && P[G.state]) {
		let state = P[G.state]
		if (G.active === R && state.prompt) {
			V.actions = {}
			state.prompt()
		}
	}

	return V
}

exports.action = function (game, player, action, arg) {
	G = game
	R = ROLES.indexOf(player)

	if (G.state && P[G.state] && P[G.state][action]) {
		P[G.state][action](arg)
	}

	return G
}

// Utility functions for prompts and actions
function prompt(text) {
	V.prompt = text
}

function button(action, enabled = true) {
	if (enabled)
		V.actions[action] = 1
}

function action(name, value) {
	if (!V.actions[name])
		V.actions[name] = []
	V.actions[name].push(value)
}

function finish(result, message) {
	G.active = -1
	G.result = result
	G.victory = message
	log(message)
}

function log(text) {
	G.log.push(text)
}
