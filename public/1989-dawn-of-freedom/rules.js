"use strict"

// vim:set foldmethod=marker:

const { spaces, cards, power_cards } = require("./data.js")

var game, view, states = {}

const DEM = "Democrat"
const COM = "Communist"

const first_strategy_card = 1
const last_strategy_card = 110

// BEGIN CONSTANTS {{{

// SPACES
const S_SCHWERIN = 0
const S_ROSTOCK = 1
const S_BERLIN = 2
const S_GERMAN_WRITERS = 3
const S_WALTER_ULBRICHT_ACADEMY = 4
const S_LUTHERAN_CHURCH = 5
const S_MAGDEBURG = 6
const S_HALLE = 7
const S_LEIPZIG = 8
const S_ERFURT = 9
const S_KARL_MARX_STADT = 10
const S_DRESDEN = 11
const S_SZCZECIN = 12
const S_GDANSK = 13
const S_BYDGOSZCZ = 14
const S_POZNAN = 15
const S_WARSZAWA = 16
const S_BIALYSTOK = 17
const S_WROCLAW = 18
const S_CATHOLIC_CHURCH_POLAND = 19
const S_LODZ = 20
const S_KATOWICE = 21
const S_KRAKOW = 22
const S_LUBLIN = 23
const S_JAGIELLONIAN_UNIVERSITY = 24
const S_POLISH_WRITERS = 25
const S_PLZEN = 26
const S_CESKE_BUDEJOVICE = 27
const S_PRAHA = 28
const S_CHARLES_UNIVERSITY = 29
const S_CZECH_WRITERS = 30
const S_BRNO = 31
const S_OSTRAVA = 32
const S_BRATISLAVA = 33
const S_CATHOLIC_CHURCH_CZECHOSLOVAKIA = 34
const S_PRESOV = 35
const S_KOSICE = 36
const S_CATHOLIC_CHURCH_HUNGARY = 37
const S_GYOR = 38
const S_TATABANYA = 39
const S_MISKOLC = 40
const S_DEBRECEN = 41
const S_SZOMBATHELY = 42
const S_SZEKESFEHERVAR = 43
const S_BUDAPEST = 44
const S_HUNGARIAN_WRITERS = 45
const S_EOTVOS_LORAND_UNIVERSITY = 46
const S_SZEGED = 47
const S_PECS = 48
const S_TIMISOARA = 49
const S_CLUJ_NAPOCA = 50
const S_TARGU_MURES = 51
const S_IASI = 52
const S_BABES_BOLYAI_UNIVERSITY = 53
const S_ROMANIAN_WRITERS = 54
const S_HARGHITA_COVASNA = 55
const S_BRASOV = 56
const S_ORTHODOX_CHURCH_ROMANIA = 57
const S_PLOIESTI = 58
const S_CRAIOVA = 59
const S_BUCURESTI = 60
const S_GALATI = 61
const S_CONSTANTA = 62
const S_PLEVEN = 63
const S_ORTHODOX_CHURCH_BULGARIA = 64
const S_RUSE = 65
const S_SOFIA_UNIVERSITY = 66
const S_SOFIA = 67
const S_STARA_ZAGORA = 68
const S_RAZGRAD = 69
const S_BURGAS = 70
const S_VARNA = 71
const S_BULGARIAN_WRITERS = 72
const S_PLOVDIV = 73
const S_SLIVEN = 74

// CARDS
const C_LEGACY_OF_MARTIAL_LAW = 1
const C_SOLIDARITY_LEGALIZED = 2
const C_WALESA = 3
const C_MICHNIK = 4
const C_GENERAL_STRIKE = 5
const C_BROUGHT_IN_FOR_QUESTIONING = 6
const C_STATE_RUN_MEDIA = 7
const C_PRUDENCE = 8
const C_THE_WALL = 9
const C_CULT_OF_PERSONALITY = 10
const C_DISSIDENT_ARRESTED = 11
const C_APPARATCHIKS = 12
const C_STASI = 13
const C_GORBACHEV_CHARMS_THE_WEST = 14
const C_HONECKER = 15
const C_NOMENKLATURA = 16
const C_ROUNDTABLE_TALKS = 17
const C_POSZGAY_DEFENDS_THE_REVOLUTION = 18
const C_PAPAL_VISIT = 19
const C_DEUTSCHE_MARKS = 20
const C_COMMON_EUROPEAN_HOME = 21
const C_POWER_STRUGGLE_POLAND = 22
const C_POWER_STRUGGLE_HUNGARY = 23
const C_ST_NICHOLAS_CHURCH = 24
const C_PERESTROIKA = 25
const C_HELSINKI_FINAL_ACT = 26
const C_CONSUMERISM = 27
const C_FACTORY_PARTY_CELLS = 28
const C_JAN_PALACH_WEEK = 29
const C_TEAR_GAS = 30
const C_INTELLIGENTSIA = 31
const C_PEASANT_PARTIES = 32
const C_SAJUDIS = 33
const C_FIDESZ = 34
const C_HEAL_OUR_BLEEDING_WOUND = 35
const C_DASH_FOR_THE_WEST = 36
const C_NAGY_REBURIED = 37
const C_THE_JULY_CONCEPT = 38
const C_ECO_GLASNOST = 39
const C_HUNGARIAN_DEMOCRATIC_FORUM = 40
const C_CEAUSESCU = 41
const C_POWER_STRUGGLE_EAST_GERMANY = 42
const C_POWER_STRUGGLE_BULGARIA = 43
const C_INFLATIONARY_CURRENCY = 44
const C_SOVIET_TROOP_WITHDRAWALS = 45
const C_GOODBYE_LENIN = 46
const C_BULGARIAN_TURKS_EXPELLED = 47
const C_WE_ARE_THE_PEOPLE = 48
const C_FOREIGN_CURRENCY_DEBT_BURDEN = 49
const C_THE_SINATRA_DOCTRINE = 50
const C_40TH_ANNIVERSARY_CELEBRATION = 51
const C_NORMALIZATION = 52
const C_LI_PENG = 53
const C_THE_CROWD_TURNS_AGAINST_CEAUSESCU = 54
const C_POWER_STRUGGLE_CZECHOSLOVAKIA = 55
const C_FOREIGN_TELEVISION = 56
const C_CENTRAL_COMMITTEE_RESHUFFLE = 57
const C_AUSTRIA_HUNGARY_BORDER_REOPENED = 58
const C_GRENZTRUPPEN = 59
const C_TOXIC_WASTE = 60
const C_THE_MONDAY_DEMONSTRATIONS = 61
const C_YAKOVLEV_COUNSELS_GORBACHEV = 62
const C_GENSCHER = 63
const C_LEGACY_OF_1968 = 64
const C_PRESIDENTIAL_VISIT = 65
const C_NEW_FORUM = 66
const C_REFORMER_REHABILITATED = 67
const C_KLAUS_AND_KOMAREK = 68
const C_SYSTEMATIZATION = 69
const C_SECURITATE = 70
const C_KISS_OF_DEATH = 71
const C_PEASANT_PARTIES_REVOLT = 72
const C_LASZLO_TOKES = 73
const C_FRG_EMBASSIES = 74
const C_EXIT_VISAS = 75
const C_WARSAW_PACT_SUMMIT = 76
const C_SAMIZDAT = 77
const C_WORKERS_REVOLT = 78
const C_THE_THIRD_WAY = 79
const C_NEPOTISM = 80
const C_THE_BALTIC_WAY = 81
const C_SPITZEL = 82
const C_MODROW = 83
const C_BREAKAWAY_BALTIC_REPUBLICS = 84
const C_TANK_COLUMN_TANK_MAN = 85
const C_THE_WALL_MUST_GO = 86
const C_KOHL_PROPOSES_REUNIFICATION = 87
const C_ADAMEC = 88
const C_DOMINO_THEORY = 89
const C_CIVIC_FORUM = 90
const C_MY_FIRST_BANANA = 91
const C_BETRAYAL = 92
const C_SHOCK_THERAPY = 93
const C_UNION_OF_DEMOCRATIC_FORCES = 94
const C_POWER_STRUGGLE_ROMANIA = 95
const C_THE_CHINESE_SOLUTION = 96
const C_THE_TYRANT_IS_GONE = 97
const C_POLITBURO_INTRIGUE = 98
const C_LIGACHEV = 99
const C_STAND_FAST = 100
const C_ELENA = 101
const C_NATIONAL_SALVATION_FRONT = 102
const C_GOVERNMENT_RESIGNS = 103
const C_NEW_YEARS_EVE_PARTY = 104
const C_PUBLIC_AGAINST_VIOLENCE = 105
const C_SOCIAL_DEMOCRATIC_PLATFORM_ADOPTED = 106
const C_MASSACRE_IN_TIMISOARA = 107
const C_ARMY_BACKS_REVOLUTION = 108
const C_KREMLIN_COUP = 109
const C_MALTA_SUMMIT = 110

// END CONSTANTS }}}

const MAGIC_NEW_YEARS_EVE_PARTY = 111
const EXTRA_PRUDENCE = 800

const dem_tst_req = [5, 5, 6, 6, 7, 8, 9, 10]
const com_tst_req = [6, 6, 7, 7, 8, 7, 6, 5]
const scoring_cards = [22, 23, 42, 43, 55, 95]
const leader_cards = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
const rallies = [1, 2, 3, 4, 5, 6]
const petitions = [31, 32, 33, 34, 35, 36]
const wildcards = [49, 50, 51, 52]
const elite_leaders = [37, 38, 39, 40]
const leaders = [1, 4, 5, 6, 7]
const support_loss_roll = [0, 0, 1, 1, 2, 2, 3, 4]
const vp_roll = [0, 0, 1, 1, 2, 2, 3, 4]
const countries = ['Poland', 'Hungary', 'East_Germany', 'Bulgaria', 'Czechoslovakia', 'Romania']
const elite_spaces = [11, 14, 26, 42, 50, 68]
const all_power_cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52 ]
const numberless_cards = [1, 2, 3, 4, 5, 6, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52 ]
const auto_resolve_events = [C_GENERAL_STRIKE, C_PRUDENCE, C_THE_WALL, C_STASI, C_ROUNDTABLE_TALKS, C_PERESTROIKA, C_HELSINKI_FINAL_ACT, C_TEAR_GAS, C_HEAL_OUR_BLEEDING_WOUND, C_THE_SINATRA_DOCTRINE, C_LI_PENG, C_THE_CROWD_TURNS_AGAINST_CEAUSESCU, C_AUSTRIA_HUNGARY_BORDER_REOPENED, C_GRENZTRUPPEN, C_YAKOVLEV_COUNSELS_GORBACHEV, C_GENSCHER, C_PRESIDENTIAL_VISIT, C_SECURITATE, C_PEASANT_PARTIES_REVOLT, C_FRG_EMBASSIES, C_THE_WALL_MUST_GO, C_LIGACHEV, C_NATIONAL_SALVATION_FRONT, C_ARMY_BACKS_REVOLUTION ]
const switch_events = [C_BROUGHT_IN_FOR_QUESTIONING, C_DEUTSCHE_MARKS, C_KISS_OF_DEATH ]
const one_turn_events = [ C_PRUDENCE, C_STASI, C_PERESTROIKA, C_THE_SINATRA_DOCTRINE, C_GENSCHER, C_FRG_EMBASSIES, C_FOREIGN_CURRENCY_DEBT_BURDEN, C_AUSTRIA_HUNGARY_BORDER_REOPENED, C_GRENZTRUPPEN, C_STAND_FAST, C_ELENA ]
const ceausecu_events = [ C_CULT_OF_PERSONALITY, C_CEAUSESCU, C_SYSTEMATIZATION, C_ELENA, C_MASSACRE_IN_TIMISOARA ]
const romania_battlegrounds = [S_TIMISOARA, S_CLUJ_NAPOCA, S_IASI, S_BRASOV, S_BUCURESTI, S_GALATI]

const card_name = cards.map(x => x ? clean_name(x.name) : "")
const quoted_card_name = cards.map(x => x ? `\u201c` + clean_name(x.name) + `\u201d` : "")

const PC_SUPPORT_FALTERS = 49
const PC_SUPPORT_SURGES = 50
const PC_SCARE_TACTICS = 51
const PC_TACTIC_FAILS = 52

const THE_CROWD_TURNS_AGAINST_CEAUSESCU_OCCURRED = 540
const THE_TYRANT_IS_GONE_OCCURRED = 970

// COUNTRY CONSTANTS

const S_EAST_GERMANY = [0,1,2,3,4,5,6,7,8,9,10,11]
const S_POLAND = [12,13,14,15,16,17,18,19,20,21,22,23,24,25]
const S_CZECHOSLOVAKIA = [26,27,28,29,30,31,32,33,34,35,36]
const S_HUNGARY = [37,38,39,40,41,42,43,44,45,46,47,48]
const S_ROMANIA = [49,50,51,52,53,54,55,56,57,58,59,60,61,62]
const S_BULGARIA = [63,64,65,66,67,68,69,70,71,72,73,74]

// SOCIO_ECONOMIC CONSTANTS

const SOCIO_ELITE = 1
const SOCIO_BUREAUCRACY = 2
const SOCIO_FARMER = 3
const SOCIO_WORKER = 4
const SOCIO_INTELLECTUAL = 5
const SOCIO_STUDENT = 6
const SOCIO_CHURCH = 7
const SOCIO_MINORITY = 8

exports.scenarios = [
	"Standard",
	"Democrat +1 SP",
	"Democrat +2 SP"
]

exports.roles = [ DEM, COM ]

// --- SET UP ---

exports.setup = function (seed, scenario, _options) {
	game = {
		seed: seed,
		log: [],
		undo: [],
		summary: [],
		active: null,
		state: 'place_starting_infl',
		return: '',
		vm: null,
		vm_event: 0,

		available_ops: 0,
		vm_available_ops: 0,
		valid_spaces: [],
		valid_cards: [],

		vp: 0,
		turn: 0,
		round: 0,
		round_player: COM,
		stability: 0,
		dem_tst_position: 0,
		com_tst_position: 0,
		dem_tst_attempted: 0,
		com_tst_attempted: 0,
		dem_tst_attempted_this_turn: 0,
		com_tst_attempted_this_turn: 0,

		demInfl: [],
		comInfl: [],

		strategy_deck: [],
		strategy_discard: [],
		discard: false,
		view_opp_hand: false,
		strategy_removed: [],
		persistent_events: [],
		power_struggle_deck: [],
		power_struggle_discard: [],
		dem_hand_limit: 8,
		com_hand_limit: 8,
		democrat_hand: [],
		communist_hand: [],

		is_pwr_struggle: false,
		dem_pwr_hand_limit: 0,
		com_pwr_hand_limit: 0,
		dem_pwr_hand: [],
		com_pwr_hand: [],
		times_held: [0, 0, 0, 0, 0, 0],
		revolutions: [false, false, false, false, false, false],
	}

	log_h1("1989 Dawn of Freedom")
	game.active = COM
	if (scenario === "Standard")
		standard_setup()
	else if (scenario === "Democrat +1 SP")
		democrat_setup_1()
	else if (scenario === "Democrat +2 SP")
		democrat_setup_2()
	else
		throw new Error("Unknown scenario:", scenario)
	start_game()
	return game
}

function start_game() {
	// Draw cards
	game.strategy_deck = draw_deck()

	// Set starting influence
	spaces.forEach((space, index) => {
		game.demInfl[index] = space.demInfl
		game.comInfl[index] = space.comInfl
	})

	// Set starting placement ops

	game.temp = 0

	// Set variable event cards where event is playable at start of game

	game.playable_cards = [C_THE_WALL, C_GORBACHEV_CHARMS_THE_WEST, C_HONECKER, C_MALTA_SUMMIT]

	draw_cards(game.strategy_deck, game.democrat_hand, game.communist_hand, game.dem_hand_limit, game.com_hand_limit)

	valid_spaces_setup()
	game.available_ops = 2
	log_h2("Starting Support Points")
	log('Communist SP:')
}

function standard_setup() {
	game.starting_infl = [2, 3, 3, 4, 2]
}

function democrat_setup_1() {
	game.starting_infl = [2, 3, 3, 4, 2, 1]
}

function democrat_setup_2() {
	game.starting_infl = [2, 3, 3, 4, 2, 2]
}

exports.view = function (state, player) {
	game = state

	view = {
		log: game.log,
		active: game.active,
		prompt: null,
		actions: null,

		played_card: game.played_card,
		vm_event: game.vm_event,
		valid_spaces: game.valid_spaces,
		valid_cards: game.valid_cards,

		demInfl: game.demInfl,
		comInfl: game.comInfl,
		turn: game.turn,
		round: game.round,
		round_player: game.round_player,
		vp: game.vp,
		stability: game.stability,
		dem_tst: game.dem_tst_position,
		com_tst: game.com_tst_position,
		persistent_events: game.persistent_events,
		systematization: game.systematization,
		the_tyrant_is_gone: game.the_tyrant_is_gone,

		strategy_deck: game.strategy_deck.length,
		strategy_removed: game.strategy_removed,
		discard: game.discard,
		show_opp_hand: game.view_opp_hand /* Is this still needed? */,

		democrat_hand: game.democrat_hand.length,
		communist_hand: game.communist_hand.length,
		democrat_power_hand: game.dem_pwr_hand.length,
		communist_power_hand: game.com_pwr_hand.length,
		ceausescu_cards: game.ceausescu_cards,
		times_held: game.times_held,
		revolutions: game.revolutions,

		hand: [],
	}

	if (game.is_pwr_struggle) {
		view.scoring_card = scoring_cards[countries.indexOf(game.pwr_struggle_in)]
		view.power_struggle_deck = game.power_struggle_deck.length
		view.power_struggle_discard = game.power_struggle_discard
		view.played_power_card = game.played_power_card
		view.power_card_1 = game.power_card_1
		view.power_card_2 = game.power_card_2
		view.is_pwr_struggle = true
	}
	view.strategy_discard = game.strategy_discard

	if (player === game.active && game.vm && game.vm.draw)
		view.drawn = game.vm.draw

	if (player === game.active) {
		if (game.selected_space >= 0)
			view.selected_space = game.selected_space
	}

	if (player === DEM) {
		view.hand = game.democrat_hand
		if (game.communist_hand_red) {
			view.opp_hand = game.communist_hand_red
		}
		view.power_hand = [ ...game.dem_pwr_hand ].sort((a, b) => a - b)
	} else if (player === COM) {
		view.hand = game.communist_hand
		if (game.opp_power_hand && game.pwr_struggle_in === 'Romania') {
			view.opp_power_hand = [ ...game.dem_pwr_hand ].sort((a, b) => a - b)
		}
		view.power_hand = [ ...game.com_pwr_hand ].sort((a, b) => a - b)
	}

	if (player === DEM) {
		view.samizdat = game.samizdat_card
	}

	if (game.state === "game_over") {
		view.prompt = game.victory
	} else if (game.active !== player) {
		if (states[game.state]) {
			let inactive = states[game.state].inactive
			if (!inactive)
				inactive = "resolve " + quoted_card_name[this_card()]
			view.prompt = `Waiting for ${game.active} to ${inactive}.`
		} else {
			view.prompt = "A Unknown state: " + game.state
		}
	} else {
		view.actions = {}

		if (states[game.state])
			states[game.state].prompt(player)
		else
			view.prompt = "B Unknown state: " + game.state
		if (view.actions.undo === undefined) {
			if (game.undo && game.undo.length > 0)
				view.actions.undo = 1
			else
				view.actions.undo = 0
		}
	}
	return view
}

// === ACTIONS ===========

function gen_action(action, argument) {
	if (argument === undefined) {
		view.actions[action] = 1
	} else {
		if (!(action in view.actions)) {
			view.actions[action] = []
		}
		view.actions[action].push(argument)
	}
}

function gen_action_space(space) {
	gen_action("space", space)
}

function gen_action_card(card) {
	gen_action("card", card)
}

function gen_action_power_card(card) {
	gen_action("power_card", card)
}

exports.action = function (state, player, action, arg) {
	game = state
	if (states[game.state] && action in states[game.state]) {
		states[game.state][action](arg, player)
	} else {
		if (action === "undo" && game.undo && game.undo.length > 0)
			pop_undo()
		else
			throw new Error("Invalid action: " + action)
	}
	return game
}

// ============= GAME STATES =======================

states.place_starting_infl = {
	inactive: 'place additional SPs',
	prompt() {
		let n = game.temp + 1
		let m = game.starting_infl.length
		view.prompt = `Setup ${n} / ${m}: `
		if (game.available_ops > 0) {
			view.prompt += `Place ${pluralize(game.available_ops, 'additional SP')}.`
			for (let space_id of game.valid_spaces)
				gen_action_space(space_id)
		} else if (game.available_ops === 0) {
			view.prompt += "Done."
			if (n === m)
				gen_action("start")
			else
				gen_action("done")
		}
	},
	space(space) {
		add_infl(space, 'available_ops')
	},
	done() {
		summary_flush()
		game.temp ++
		game.available_ops = game.starting_infl[game.temp]
		change_player()
		log(`${game.active} SP:`)
		valid_spaces_setup()
	},
	start() {
		summary_flush()
		delete game.starting_infl
		new_turn()
		clear_undo()
		game.state = 'choose_card'
	},
}

states.choose_card = {
	inactive: 'play a card',
	prompt() {
		view.prompt = "Action Round: "
		if (
			(game.active === DEM && game.democrat_hand.length === 0) ||
			(game.active === COM && game.communist_hand.length === 0)
		) {
			view.prompt += "No cards remaining."
			gen_action('pass')
		} else {
			view.prompt += "Play a card."
			let available_cards
			if (game.active === DEM) {
				available_cards = game.democrat_hand
			} else {
				available_cards = game.communist_hand
			}
			for (let card of available_cards) {
				gen_action_card(card)
			}
		}
	},
	card(card) {
		push_undo()

		// Check if player is at risk of losing game due to held scoring card
		if (!scoring_cards.includes(card)) {
			let scoring_cards_count = count_scoring_cards()

			if (game.round !== 8 && scoring_cards_count >= 8 - game.round) {
				game.temp = card
				game.state = 'confirm_card'
				return
			}
		}
		select_card(card)
	},
	pass() {
		log_pass_banner()
		game.state = 'end_round'
	},
}

states.confirm_card = {
	inactive: 'play a card',
	prompt() {
		let scoring_cards_count = count_scoring_cards()
		view.prompt = `${pluralize(scoring_cards_count, 'scoring card')} in hand with ${pluralize(8-game.round,'Action Round')} remaining. Scoring cards may not be held. Continue?`
		gen_action('continue')
	},
	continue() {
		select_card(game.temp)
	},
}

states.play_card = {
	get inactive() {
		return `play ${quoted_card_name[game.played_card]}`
	},
	prompt() {
		view.prompt = "Play " + quoted_card_name[game.played_card] + "."

		if (scoring_cards.includes(game.played_card)) {
			gen_action('event')
			return
		}

		// Check for events
		if (event_is_playable(game.played_card)) {
			if (
				(game.active === DEM &&
					cards[game.played_card].side === 'C' &&
					game.dem_tst_position >= 7 &&
					game.com_tst_position < 7 &&
					!game.tst_7) ||
				(game.active === COM &&
					cards[game.played_card].side === 'D' &&
					game.com_tst_position >= 7 &&
					game.dem_tst_position < 7 &&
					!game.tst_7)
			) {
				gen_action('tst_7')
			}
			if (
				(game.active === DEM &&
					cards[game.played_card].side !== 'C' &&
					game.dem_tst_position >= 8 &&
					game.com_tst_position < 8 &&
					!game.tst_8) ||
				(game.active === COM &&
					cards[game.played_card].side !== 'D' &&
					game.com_tst_position >= 8 &&
					game.dem_tst_position < 8 &&
					!game.tst_8)
			) {
				gen_action('tst_8')
			}

			// Continue with normal logic
			if (cards[game.played_card].side === 'D') {
				if (game.active === DEM) view.actions.event = 1
				if (game.active === COM) view.actions.opp_event = 1
			} else if (cards[game.played_card].side === 'C') {
				if (game.active === COM) view.actions.event = 1
				if (game.active === DEM) view.actions.opp_event = 1
			} else {
				view.actions.event = 1
			}
		} else {
			if (cards[game.played_card].side === 'D') {
				if (game.active === DEM) view.actions.event = 0
				if (game.active === COM) view.actions.opp_event = 0
			} else if (cards[game.played_card].side === 'C') {
				if (game.active === COM) view.actions.event = 0
				if (game.active === DEM) view.actions.opp_event = 0
			} else {
				view.actions.event = 0
			}
		}

		// Special check for Reformer Rehabilitated
		if (game.played_card === C_REFORMER_REHABILITATED && game.playable_cards.includes(C_REFORMER_REHABILITATED)) {
			if (game.active === DEM && (game.dem_tst_position > game.com_tst_position)) {
				gen_action('event')
				view.actions.event = 1
			}
			if (game.active === COM && (game.dem_tst_position < game.com_tst_position)) {
				gen_action('event')
				view.actions.event = 1
			}
		}

		gen_action('influence')
		gen_action('support_check')

		if (
			(game.active === DEM && game.dem_tst_attempted_this_turn === 0 && game.dem_tst_position < 8) ||
			(game.active === COM && game.com_tst_attempted_this_turn === 0 && game.com_tst_position < 8)
		) {
			gen_action('tst')
		}
	},
	event() {
		push_undo()
		if (scoring_cards.includes(game.played_card)) {
			log_struggle_banner(game.played_card)
			if (check_ligachev_event(game.played_card))
				return
		} else {
			log_event_banner()
			if (check_ligachev_event(game.played_card))
				return
			log_event(game.played_card)
		}
		game.vm_infl_to_do = false
		game.return = game.active
		if (switch_events.includes(game.played_card)) {
			change_player()
		}
		game.vm_event = game.played_card
		goto_vm(game.vm_event)
	},
	opp_event() {
		push_undo()
		log_ops_banner()
		if (check_ligachev_event(game.played_card))
			return
		log_event(game.played_card)
		game.vm_infl_to_do = true
		game.return = game.active
		game.vm_event = game.played_card
		if (is_auto_resolve(game.played_card) || switch_events.includes(game.played_card)) {
			goto_vm(game.vm_event)
		} else {
			change_player()
			goto_vm(game.vm_event)
		}
	},
	influence() {
		push_undo()
		log_ops_banner()
		if (check_ligachev_non_event())
			return
		if (check_ceh()) //TODO: Add new state to offer UNDO before game ends?
			return
		log('Placed SP:')
		finish_play_card()

		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'add_influence'
		valid_spaces_infl()
	},
	tst() {
		push_undo()
		log_ops_banner()
		if (check_ligachev_non_event())
			return
		if (check_ceh()) //TODO: Add new state to offer UNDO before game ends?
			return
		log('Tiananmen Square Attempt:')
		finish_play_card()
		game.state = 'tiananmen_square_attempt'
	},
	support_check() {
		push_undo()
		log_ops_banner()
		if (check_ligachev_non_event())
			return
		if (check_ceh()) //TODO: Add new state to offer UNDO before game ends?
			return
		log('Support Checks:')
		finish_play_card()
		game.available_ops = 2
		game.state = 'support_check_prep'
		valid_spaces_sc()
	},
	tst_7() { /* Cancel opponent event */
		push_undo()
		log_ops_banner()
		if (check_ligachev_non_event())
			return
		log(`Event cancelled using TST Award.`)
		game.tst_7 = true
		game.vm_infl_to_do = true
		game.state = 'resolve_opponent_event'
	},
	tst_8() { /* Play card for ops and event */
		push_undo()
		log_tst_8_banner()
		game.vm_event_to_do = true
		game.vm_infl_to_do = true
		game.tst_8 = true
		game.state = 'vm_tst_8'
	},
	end_round() {
		end_round()
	},
}

states.resolve_opponent_event = {
	get inactive() {
		return `play ${quoted_card_name[game.played_card]}`
	},
	prompt() {
		view.prompt = "Play " + quoted_card_name[game.played_card]
		if (game.vm_infl_to_do) {
			view.prompt += " \u2014 opponent's Event resolved."
			gen_action('influence')
			gen_action('support_check')
		} else if (game.vm_event_to_do) {
			// Check for Tiananmen Square Track ability - play opponent card without triggering event
			if (
				(game.active === DEM && game.dem_tst_position >= 7 && game.com_tst_position < 7 && !game.tst_7) ||
				(game.active === COM && game.com_tst_position >= 7 && game.dem_tst_position < 7 && !game.tst_7)
			) {
				gen_action('tst_7')
			}
			view.prompt += ` \u2014 you must resolve opponent's Event.`
			gen_action('opp_event')
		} else {
			prompt_event("Done.")
			gen_action('end_round')
		}
	},
	influence() {
		push_undo()
		log_gap('Placed SP:')
		// If ABHR - Set AHBR tracker to true
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'add_influence'
		valid_spaces_infl()
	},
	support_check() {
		push_undo()
		log_gap('Support Checks:')
		game.available_ops = 2
		game.state = 'support_check_prep'
		valid_spaces_sc()
	},
	opp_event() {
		game.vm_event_to_do = false
		game.return_state = 'resolve_opponent_event'
		game.vm_event = game.played_card
		log_event(game.played_card)
		if (is_auto_resolve(game.played_card) || switch_events.includes(game.played_card)) {
			game.return = game.active
			goto_vm(game.vm_event)
		} else {
			if (game.active === DEM) {
				game.return = COM
			} else {
				game.return = DEM
			}
			change_player()
			goto_vm(game.vm_event)
		}
	},
	tst_7() {
		push_undo()
		log('Event cancelled using TST Award.')
		game.tst_7 = true
		game.vm_event_to_do = false
	},
	end_round() {
		push_undo()
		end_round()
	},
}

states.add_influence = {
	inactive: 'place SPs',
	prompt() {
		if (game.available_ops <= 0) {
			view.prompt = 'Place SPs: Done.'
			if (!game.vm_event_to_do) {
				gen_action("end_round")
			} else {
				gen_action('done')
			}
		} else if (game.valid_spaces.length === 0) {
			view.prompt = 'Place SPs: No spaces remaining.'
			if (!game.vm_event_to_do) {
				gen_action("end_round")
			} else {
				gen_action('done')
			}
		} else {
			view.prompt = `Place ${pluralize(game.available_ops, "SP")}.`
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		add_infl(space, 'available_ops')
	},
	end_round() {
		push_undo()
		summary_flush()
		end_round()
	},
	done() {
		summary_flush()
		reset_austria_hungary_border_reopened()
		game.state = 'resolve_opponent_event'
	},
}

states.tiananmen_square_attempt = {
	inactive: 'do Tiananmen Square Attempt',
	prompt() {
		view.prompt = 'Tiananmen Square Attempt: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		game.vm_event_to_do = false
		do_tst_attempt()
	},
}

states.tiananmen_square_attempt_success = {
	inactive: 'do Tiananmen Square Attempt',
	prompt() {
		if (game.vm_event > 200) { // TODO magic number
			view.prompt = 'Tiananmen Square Attempt: Successful. Claim award.'
			gen_action('claim')
		} else {
			view.prompt = 'Tiananmen Square Attempt: Successful.'
			gen_action('end_round')
		}
	},
	claim() {
		push_undo()
		goto_vm(game.vm_event)
	},
	end_round() {
		push_undo()
		end_round()
	},
}

states.tiananmen_square_attempt_fail = {
	inactive: 'do Tiananmen Square Attempt',
	prompt() {
		view.prompt = 'Tiananmen Square Attempt: Failed.'
		gen_action('end_round')
	},
	end_round() {
		push_undo()
		end_round()
	},
}

states.tiananmen_square_attempt_done = {
	inactive: 'do Tiananmen Square Attempt',
	prompt() {
		view.prompt = 'Tiananmen Square Attempt: Done.'
		gen_action('end_round')
	},
	end_round() {
		end_round()
	},
}

states.tst_goddess = {
	inactive: 'claim Tiananmen Square award',
	prompt() {
		// TODO: at start of turn?
		view.prompt = 'Tiananmen Square Award: Discard non-Scoring Card, and draw replacement card.'
		for (let card of game.valid_cards) {
			gen_action_card(card)
		}
		gen_action('pass')
	},
	card(card) {
		push_undo()
		discard(card)
		game.state = 'tst_goddess_draw'
	},
	pass() {
		push_undo()
		log('Did not discard.')
		end_goddess()
	},
}

states.tst_goddess_draw = {
	inactive: 'claim Tiananmen Square award',
	prompt() {
		view.prompt = 'Tiananmen Square Award: Draw a replacement card.'
		gen_action('draw')
	},
	draw() {
		if (game.active === DEM) {
			draw_cards(
				game.strategy_deck,
				game.democrat_hand,
				game.communist_hand,
				game.democrat_hand.length + 1,
				game.communist_hand.length
			)
		} else {
			draw_cards(
				game.strategy_deck,
				game.democrat_hand,
				game.communist_hand,
				game.democrat_hand.length,
				game.communist_hand.length + 1
			)
		}
		end_goddess()
	},
}

states.support_check_prep = {
	inactive: 'do Support Checks',
	prompt() {
		if (game.valid_spaces.length === 0 && game.available_ops > 0) {
			view.prompt = 'Support Checks: No targets remaining. Pass.'
			gen_action('pass')
		} else if (game.available_ops === 0) {
			if (game.is_pwr_struggle) {
				view.prompt = 'The Crowd Turns Against Ceausescu: Support Checks done.'
				gen_action('done')
			} else if (!game.vm_event_to_do) {
				view.prompt = 'Support Checks done.'
				gen_action('end_round')
			} else {
				view.prompt = 'Support Checks done.'
				gen_action('done')
			}
		} else if (game.available_ops > 0) {
			view.prompt = `Support Checks: Choose ${pluralize(game.available_ops, 'space')}.`
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		game.selected_space = space

		// Check for Austria-Hungary Border Reopened - check on first Support Check only
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			if (game.active === DEM && game.available_ops > 1) {
				if (
					spaces[game.selected_space].country === 'East_Germany' &&
					game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
					game.active === DEM
				) {
					game.state = 'austria_hungary_border_reopened_check'
					return
				}
			}
		}

		game.state = 'do_support_check'
	},
	end_round() {
		push_undo()
		end_round()
	},
	done() {
		push_undo()
		if (check_for_crowd())
			return
		game.state = 'resolve_opponent_event'
	},
	pass() {
		push_undo()
		if (check_for_crowd())
			return
		end_round()
	}
}

states.do_support_check = {
	inactive: 'do Support Checks',
	prompt() {
		view.prompt = `Support Check in ${spaces[game.selected_space].name_unique}: Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_sc(game.selected_space)
		game.available_ops--
		if (game.available_ops > 0 && !game.is_pwr_struggle)
			log_br()
		if (game.available_ops === 0) {
			game.valid_spaces = []
		}
		if (check_vp()) {
			return
		} else {
			game.state = 'support_check_prep'
			return
		}
	},
}

states.austria_hungary_border_reopened_check = {
	inactive: 'decide Austria-Hungary Border Reopened',
	prompt() {
		view.prompt = 'Austria-Hungary Border Reopened: Will both Support Checks be in East Germany?'
		gen_action('yes')
		gen_action('no')
	},
	yes() {
		game.austria_hungary_border_reopened_tracker = true
		game.state = 'do_support_check'
	},
	no() {
		game.state = 'do_support_check'
	},
}

states.end_round = {
	inactive: 'finish playing a card',
	prompt() {
		prompt_event('End the Action Round.')
		gen_action('end_round')
	},
	end_round() {
		push_undo()
		end_round()
	},
}

//======================= POWER STRUGGLE ===============================

states.draw_power_cards = {
	inactive: 'draw cards',
	prompt() {
		prompt_event(`Draw Power Struggle cards.`)
		gen_action('draw')
	},
	draw() {
		push_undo()
		game.power_struggle_deck = [...all_power_cards]
		let presence = check_presence(game.pwr_struggle_in)
		if (presence.dem_spaces > 0) {
			game.dem_pwr_hand_limit = 6 + 2 * (presence.dem_spaces - 1)
		} else {
			game.dem_pwr_hand_limit = 0
		}
		if (presence.com_spaces > 0) {
			game.com_pwr_hand_limit = 6 + 2 * (presence.com_spaces - 1)
		} else {
			game.com_pwr_hand_limit = 0
		}
		// Events which affect cards drawn
		if (game.persistent_events.includes(C_ROUNDTABLE_TALKS)) {
			if (game.com_pwr_hand_limit >= 2) {
				log(`Democrat receives 2 cards from Communist due to C${C_ROUNDTABLE_TALKS}.`)
				game.dem_pwr_hand_limit += 2
				game.com_pwr_hand_limit -= 2
			}
			game.persistent_events = game.persistent_events.filter(n => n !== C_ROUNDTABLE_TALKS)
			game.strategy_discard.push(C_ROUNDTABLE_TALKS)
		}

		if (game.persistent_events.includes(C_PEASANT_PARTIES_REVOLT)) {
			let farmer_check
			for (let space of spaces) {
				if (space && space.country === game.pwr_struggle_in && space.socio === SOCIO_FARMER && check_dem_control(space.space_id)) {
					farmer_check = true
				}
			}
			if (farmer_check && game.com_pwr_hand_limit > 0) {
				log(`Democrat receives 1 cards from Communist due to C${C_PEASANT_PARTIES_REVOLT}.`)
				game.dem_pwr_hand_limit += 1
				game.com_pwr_hand_limit -= 1
				permanently_remove(C_PEASANT_PARTIES_REVOLT)
			}
		}

		if (
			game.persistent_events.includes(C_NATIONAL_SALVATION_FRONT) &&
			game.dem_pwr_hand_limit >= 2 &&
			(game.pwr_struggle_in === 'Romania' || game.pwr_struggle_in === 'Bulgaria')
		) {
			log(`Communist receives 2 cards from Democrat due to C${C_NATIONAL_SALVATION_FRONT}.`)
			game.dem_pwr_hand_limit -= 2
			game.com_pwr_hand_limit += 2
			permanently_remove(C_NATIONAL_SALVATION_FRONT)
		}

		// Draw Power Cards
		game.is_pwr_struggle = true
		draw_cards(
			game.power_struggle_deck,
			game.dem_pwr_hand,
			game.com_pwr_hand,
			game.dem_pwr_hand_limit,
			game.com_pwr_hand_limit
		)

		log(`Communist: ${game.com_pwr_hand.length} cards`)
		log(`Democrat: ${game.dem_pwr_hand.length} cards`)

		// Check if The Crowd Turns Against Ceausescu occurs
		if (
			game.persistent_events.includes(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU) &&
			!game.persistent_events.includes(THE_CROWD_TURNS_AGAINST_CEAUSESCU_OCCURRED) &&
			game.pwr_struggle_in === 'Romania'
		) {
			if (game.active === COM) {
				game.return = COM
				change_player()
			}
			log_event(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU)
			game.persistent_events.push(THE_CROWD_TURNS_AGAINST_CEAUSESCU_OCCURRED)
			game.state = 'the_crowd_turns_against_ceausescu_prep'
		} else {
			log_h5('Raise the Stakes')
			log(`${game.active}:`)
			game.state = 'raise_stakes_1'
		}
	}
}

states.the_crowd_turns_against_ceausescu_prep = {
	get inactive() {
		return `resolve ${card_name[C_THE_CROWD_TURNS_AGAINST_CEAUSESCU]}`
	},
	prompt() {
		view.prompt = 'The Crowd Turns Against Ceausescu: Draw cards.'
		gen_action('draw')
	},
	draw() {
		game.ceausescu_cards = []
		draw_cards(game.power_struggle_deck, game.ceausescu_cards, game.com_pwr_hand, 15, game.com_pwr_hand.length)
		game.temp = game.ceausescu_cards.filter(card => rallies.includes(card)).length
		log(`Drew ${pluralize(game.temp, 'Rally in the Square')}.`)
		game.vm_available_ops = game.temp * 3
		log(`Democrat takes a ${game.vm_available_ops} Op Action Round.`)
		game.state = 'vm_the_crowd_turns_against_ceausescu'
	}
}

states.vm_the_crowd_turns_against_ceausescu = {
	get inactive() {
		return `resolve ${card_name[C_THE_CROWD_TURNS_AGAINST_CEAUSESCU]}`
	},
	prompt() {
		view.prompt = `You have ${game.vm_available_ops} Operations points. Play for:`
		gen_action('influence')
		gen_action('support_check')
		if (crowd_infl_check())
			view.actions.influence = 0
		if (crowd_sc_check())
			view.actions.support_check = 0
		if (crowd_infl_check() && crowd_sc_check())
			gen_action('pass')
	},
	influence() {
		push_undo()
		valid_spaces_infl()
		game.valid_spaces = game.valid_spaces.filter(n => spaces[n].country === 'Romania')
		log('Placed SP:')
		game.state = 'the_crowd_turns_against_ceausescu_infl'
	},
	support_check() {
		push_undo()
		valid_spaces_sc()
		game.available_ops = 2
		log('Support Checks:')
		game.state = 'support_check_prep'
	},
	pass() {
		log('Passed.')
		check_for_crowd()
	}
}

states.the_crowd_turns_against_ceausescu_infl = {
	inactive: 'place SPs',
	prompt() {
		if (game.vm_available_ops === 0 ) {
			view.prompt = 'Place SPs: done.'
			gen_action("done")
		} else if (game.valid_spaces.length === 0) {
			view.prompt = `Place SPs: no spaces remaining.`
			gen_action('done')	
		} else {
			view.prompt = `Place ${pluralize(game.vm_available_ops, 'SP')}.`
			for (let space of game.valid_spaces) {
				gen_action_space(space)
			}
		}
	},
	space(space) {
		add_infl(space, 'vm_available_ops')
	},
	done() {
		summary_flush()
		check_for_crowd()
	},
}

states.raise_stakes_1 = {
	inactive: 'raise the stakes',
	prompt() {
		if (
			(game.active === DEM && game.dem_pwr_hand.length < 3 && game.raised_stakes_discard === 0) ||
			(game.active === COM && game.com_pwr_hand.length < 3 && game.raised_stakes_discard === 0)
		) {
			view.prompt = 'Raise the Stakes: You must pass.'
			gen_action('pass')
		} else if (game.raised_stakes_discard === 3) {
			view.prompt = 'Raise the Stakes: Done.'
			gen_action('done')
		} else {
			view.prompt = `Raise the Stakes: Discard ${3-game.raised_stakes_discard} cards to raise the stakes.`
			if (game.raised_stakes_discard === 0)
				gen_action('pass')
			for (let card of own_power_hand())
				gen_action_power_card(card)
		}
	},
	power_card(card) {
		push_undo()
		if (numberless_cards.includes(card)) {
			logi(`Discarded P${card}`)
		} else {
			logi(`Discarded P${card} V${power_cards[card].value}`)
		}
		discard(card)
		game.raised_stakes_discard ++
		if (game.raised_stakes_discard === 3)
			game.raised_stakes++
	},
	pass() {
		logi(`Did not raise the stakes.`)
		game.raised_stakes_discard = 0
		change_player()
		log(`${game.active}:`)
		end_raise_stakes()
	},
	done() {
		logi(`Raised the stakes.`)
		game.raised_stakes_discard = 0
		change_player()
		log(`${game.active}:`)
		end_raise_stakes()
	},
}

states.raise_stakes_2 = {
	inactive: 'raise the stakes',
	prompt() {
		if (
			(game.active === DEM && game.dem_pwr_hand.length < 3 && game.raised_stakes_discard === 0) ||
			(game.active === COM && game.com_pwr_hand.length < 3 && game.raised_stakes_discard === 0)
		) {
			view.prompt = 'Raise the Stakes: You must pass.'
			gen_action('pass')
			return
		}
		if (game.raised_stakes_discard === 3) {
			view.prompt = 'Raise the Stakes: Done.'
			gen_action('done')
		} else {
			view.prompt = `Raise the Stakes: Discard ${3-game.raised_stakes_discard} cards to raise the stakes.`
			if (game.raised_stakes_discard === 0)
				gen_action('pass')
			for (let card of own_power_hand())
				gen_action_power_card(card)
		}
	},
	power_card(card) {
		push_undo()
		if (numberless_cards.includes(card))
			logi(`Discarded P${card}`)
		else
			logi(`Discarded P${card} V${power_cards[card].value}`)
		discard(card)
		game.valid_cards = game.valid_cards.filter( c => c !== card)
		game.raised_stakes_discard ++
		if (game.raised_stakes_discard === 3)
			game.raised_stakes++
	},
	pass() {
		logi(`Did not raise the stakes.`)
		goto_struggle()
	},
	done() {
		logi(`Raised the stakes.`)
		goto_struggle()
	},
}

states.power_struggle = {
	inactive: 'play a card',
	prompt() {
		if (game.phase === 0) {
			if (game.valid_cards.length > 0) {
				view.prompt = "Choose a card."
				for (let card of game.valid_cards) {
					gen_action_power_card(card)
				}
			} else if (game.valid_cards.length === 0) {
				view.prompt = 'No valid cards. You must concede.'
				gen_action('concede')
			}
		}
		if (game.phase === 1) {
			let base_prompt = `${power_cards[game.played_power_card].name} played` + (leader_cards.includes(game.played_power_card) ? ` as a ${game.proxy_power_card}.` : ".")
			if (game.valid_cards.length > 0) {
				view.prompt = `${base_prompt} You must match or concede.`
				for (let card of game.valid_cards) {
					gen_action_power_card(card)
				}
			} else {
				view.prompt = `${base_prompt} You must concede.`
			}
			gen_action('concede')
		} else if (game.phase === 2) {
			view.prompt = 'You matched. Roll a die.'
			gen_action('roll')
		}
	},
	power_card(card) {
		push_undo()
		game.valid_cards = []
		game.return_state = 'power_struggle'
		if (game.phase === 0) {
			game.played_power_card = card
			select_power_card()
			if (game.played_power_card === PC_SCARE_TACTICS) {
				log_power_card()
				game.return = ''
				goto_vm(351)
			} else if (game.played_power_card === PC_SUPPORT_SURGES) {
				log_power_card()
				if (game.active === DEM) {
					game.return = COM
				} else {
					game.return = DEM
				}
				goto_vm(350)
			} else if (leader_cards.includes(card))
				game.state = 'power_struggle_confirm_leader'
			else {
				game.state = 'power_struggle_confirm'
			}
		}
		if (game.phase === 1) {
			game.power_card_2 = card
			discard(card)
			if (card === PC_TACTIC_FAILS) {
				log(`${game.active}: P${PC_TACTIC_FAILS}`)
				game.state = 'power_struggle_tactic_fails'
				return
			}
			if (power_cards[game.played_power_card].value === 1) {
				log(`${game.active}: P${card}`)
				log('Takes initiative.')
				game.phase = 0
				log_gap(`Round ${game.ps_round}:`)
				do_valid_cards()
			} else {
				log_power_card()
				game.phase = 2
			}
		}
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		log(`Counterattack: D${roll}`)
		if (roll >= power_cards[game.played_power_card].value) {
			log(`Success: ${roll} >= ${power_cards[game.played_power_card].value}`)
			log(`${game.active} takes initiative.`)
			game.phase = 0
			log_gap(`Round ${game.ps_round}:`)
			do_valid_cards()
		} else {
			log(`Fail: ${roll} < ${power_cards[game.played_power_card].value}`)
			log('No change initiative.')
			game.phase = 0
			log_gap(`Round ${game.ps_round}:`)
			change_player()
			do_valid_cards()
		}
	},
	concede() {
		push_undo()
		game.valid_cards = []
		delete game.power_card_1
		delete game.power_card_2
		log(`${game.active} conceded.`)
		log_h5('Aftermath')
		if (game.phase === 0) {
			game.played_power_card = 0
			game.proxy_power_card = 0
		}
		game.phase = 0
		game.state = 'support_loss'
	},
}

states.power_struggle_confirm = {
	inactive: 'play a card',
	prompt() {
		view.prompt = `Play ${numberless_cards.includes(game.played_power_card)
			? power_cards[game.played_power_card].name
			: `${power_cards[game.played_power_card].name} ${power_cards[game.played_power_card].value}`}.`
		gen_action('done')
	},
	done() {
		log_power_card()
		if (game.played_power_card === PC_SUPPORT_FALTERS) {
			change_player()
			goto_vm(349)
		} else {
			game.phase = 1
			confirm_power_card()
		}
	}
}

states.power_struggle_confirm_leader = {
	inactive: 'play a card',
	prompt() {
		view.prompt = view.prompt = `Play ${power_cards[game.played_power_card].name} as:`
		if (game.tactics_fails !== 'Strike') {
			gen_action('strike')
		}
		if (game.tactics_fails !== 'March') {
			gen_action('march')
		}
		if (game.tactics_fails !== 'Rally in the Square') {
			gen_action('rally')
		}
		if (game.tactics_fails !== 'Petition') {
			gen_action('petition')
		}
	},
	strike() {
		log(`${game.active}: P${game.played_power_card} as Strike.`)
		game.proxy_power_card = 'Strike'
		game.phase = 1
		confirm_power_card()
	},
	march() {
		log(`${game.active}: P${game.played_power_card} as March`)
		game.proxy_power_card = 'March'
		game.phase = 1
		confirm_power_card()
	},
	rally() {
		log(`${game.active}: P${game.played_power_card} as Rally in the Square`)
		game.proxy_power_card = 'Rally in the Square'
		game.phase = 1
		confirm_power_card()
	},
	petition() {
		log(`${game.active}: P${game.played_power_card} as Petition`)
		game.proxy_power_card = 'Petition'
		game.phase = 1
		confirm_power_card()
	}
}

states.power_struggle_tactic_fails = {
	inactive: 'play a card',
	prompt() {
		view.prompt = `Play ${power_cards[PC_TACTIC_FAILS].name}.`
		gen_action('done')
	},
	done() {
		if (game.proxy_power_card) {
			game.tactics_fails = game.proxy_power_card
		} else {
			game.tactics_fails = power_cards[game.played_power_card].name
		}
		game.phase = 0
		log_gap(`Round ${game.ps_round}:`)
		confirm_power_card()
	}
}

states.support_loss = {
	inactive: 'do Support Loss',
	prompt() {
		let ps_state = game.persistent_events.includes(MAGIC_NEW_YEARS_EVE_PARTY) ? "New Year's Eve Party" : "Power Struggle"
		if (game.phase === 0) {
			view.prompt = 'You lost the Power Struggle. Roll a die for Support Loss.'
			gen_action('roll')
		} else if (game.phase === 1 && game.available_ops > 0 && game.valid_spaces.length > 0) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}. Support Loss: Remove ${pluralize(game.available_ops,'SP')}.`
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else if (game.phase === 1 && game.available_ops === 0) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}. Support Loss: Finished.`
			gen_action('done')
		} else if (game.phase === 1 && game.valid_spaces.length === 0) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}. Support Loss: No remaining SPs to remove.`
			gen_action('done')
		}
	},
	roll() {
		game.available_ops = support_loss_roll[get_aftermath_roll('Support Loss')]
		game.phase++
		valid_spaces_support_loss()
		log(`${game.active} removed SP:`)
	},
	space(space) {
		game.remove_opponent_infl = false
		remove_infl(space, 'available_ops')
	},
	done() {
		summary_flush()
		change_player()
		game.phase = 0
		game.state = 'vp_roll'
	},
}

states.vp_roll = {
	inactive: 'do VP Roll',
	prompt() {
		let ps_state = game.persistent_events.includes(MAGIC_NEW_YEARS_EVE_PARTY) ? "New Year's Eve Party" : "Power Struggle"
		if (game.phase === 0) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}: Roll a die for Victory.`
			gen_action('roll')
		} else if (game.phase === 1) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}: Take power.`
			gen_action('take')
		} else if (game.phase === 2) {
			view.prompt = `${ps_state} - ${country_name(game.pwr_struggle_in)}: Proceed to scoring.`
			gen_action('scoring')
		}
	},
	roll() {
		log_br()
		let roll = get_aftermath_roll('Victory Point')
		let vp_change = vp_roll[roll]
		if (game.active === DEM) {
			game.vp_roll = vp_change
			logi(`+${vp_change} VP`)
		} else {
			game.vp_roll = -vp_change
			logi(`-${vp_change} VP`)
		}
		if (game.active === DEM) {
			game.vp += vp_change
		} else {
			game.vp -= vp_change
		}
		if (game.active === DEM && roll >= 4) {
			game.phase = 1
		} else {
			game.phase = 0
			if (game.active === DEM) {
				change_player()
			}
			game.state = 'choose_power'
		}
	},
	take() {
		let scoring_card = scoring_cards[countries.indexOf(game.pwr_struggle_in)]
		permanently_remove(scoring_card)
		log_gap("The Democrat takes Power!")
		take_power(game.pwr_struggle_in)
		game.phase = 2
	},
	scoring() {
		score_country(game.pwr_struggle_in)
		resolve_tyrant()
	},
}

states.choose_power = {
	inactive: 'choose whether to remain in power',
	prompt() {
		if (game.phase === 0) {
			view.prompt = 'Choose whether to remain in power.'
			gen_action('retain')
			gen_action('surrender')
		} else if (game.phase === 1) {
			view.prompt = 'Proceed to scoring.'
			gen_action('scoring')
		}
	},
	retain() {
		push_undo()
		retain_power(game.pwr_struggle_in)
		game.phase = 1
	},
	surrender() {
		push_undo()
		log_gap(`Communist voluntarily surrenders Power.`)
		take_power(game.pwr_struggle_in)
		permanently_remove(scoring_cards[countries.indexOf(game.pwr_struggle_in)])
		game.phase = 1
	},
	scoring() {
		push_undo()
		score_country(game.pwr_struggle_in)
		resolve_tyrant()
	},
}

states.the_tyrant_is_gone = {
	inactive: 'resolve The Tyrant is Gone',
	prompt() {
		view.prompt = 'Play The Tyrant is Gone for the event.'
		gen_action('event')
	},
	event() {
		log_h3(`C${C_THE_TYRANT_IS_GONE}`)
		log('Democrat:')
		game.vm_event = C_THE_TYRANT_IS_GONE
		goto_vm(game.vm_event)
	},
}

states.finish_scoring = {
	inactive: 'finish scoring',
	prompt() {
		view.prompt = 'End power struggle.'
		gen_action('done')
	},
	done() {
		push_undo()
		if (game.persistent_events.includes(MAGIC_NEW_YEARS_EVE_PARTY)) {
			game.state = 'new_years_eve_party'
			return
		}
		if (check_vp()) {
			return
		}
		reset_power()
		//Special check for Domino Theory
		if (game.vm_infl_to_do) {
			if (game.active !== game.round_player)
				change_player()
			if (game.played_card !== C_DOMINO_THEORY)
				game.vm_event = C_DOMINO_THEORY
			else
				delete game.vm_event
			game.available_ops = get_card_ops(C_DOMINO_THEORY)
			game.state = 'resolve_opponent_event'
		} else
			end_round()
	},
}

// ======================================= END TURN STATES ==========================================

states.end_turn_4_5_4 = {
	inactive: 'verify held cards',
	prompt() {
		view.prompt = 'End Turn: Verify held cards.'
		gen_action('check')
	},
	check() {
		log_br()
		log_h2('Verify held cards')
		const dem_has_scoring_card = game.democrat_hand.some(card => scoring_cards.includes(card))
		const com_has_scoring_card = game.communist_hand.some(card => scoring_cards.includes(card))
		if (!dem_has_scoring_card && !com_has_scoring_card) {
			log('No held scoring cards.')
		}
		if (dem_has_scoring_card && com_has_scoring_card) {
			log('Both players have held scoring cards')
			goto_game_over('Draw', `The game is tied due to held scoring cards!`)
		} else if (dem_has_scoring_card) {
			log('Democrat player has a held scoring card')
			goto_game_over(COM, `${COM} won by held scoring card!`)
		} else if (com_has_scoring_card) {
			log('Communist player has a held scoring card')
			goto_game_over(DEM, `${DEM} won by held scoring card!`)
		} else if (game.persistent_events.includes(C_NEW_YEARS_EVE_PARTY)) {
			log_h1(`New Year's Eve Party`)
			game.vm_event = C_NEW_YEARS_EVE_PARTY
			if (game.the_tyrant_is_gone && game.the_tyrant_is_gone > 0) {
				game.vp -= 2
				log(`Communist receives 2 VP from C` + C_THE_TYRANT_IS_GONE + `.`)
			}
			game.persistent_events.push(MAGIC_NEW_YEARS_EVE_PARTY)
			if (game.active !== DEM) {
				change_player()
			}
			game.state = 'new_years_eve_party'
		} else if (game.turn === 10) {
			clear_undo()
			log_h2('Final Scoring')
			if (game.the_tyrant_is_gone && game.the_tyrant_is_gone > 0) {
				game.vp -= 2
				log(`Communist receives 2 VP from C`+ C_THE_TYRANT_IS_GONE + '.')
			}
			game.state = 'final_scoring_held'
		} else {
			new_turn()
		}
	},
}

states.final_scoring_held = {
	inactive: 'resolve final scoring',
	prompt() {
		view.prompt = 'Final Scoring: Communist scores VP bonus for the number of countries they retain power.'
		gen_action('bonus')
	},
	bonus() {
		const held_countries = game.revolutions.filter(value => value === false).length
		let vp_gain = 4 * held_countries
		log(`Communist holds power in ${pluralize(held_countries, 'country', 's')}: -${vp_gain} VP.`)
		game.vp -= 4 * held_countries
		game.temp = {
			East_Germany: false,
			Poland: false,
			Czechoslovakia: false,
			Hungary: false,
			Romania: false,
			Bulgaria: false,
		}
		log_gap('Country scoring:')
		game.state = 'final_scoring'
	},
}

states.final_scoring = {
	inactive: 'score countries',
	prompt() {
		if (
			game.temp['East_Germany'] &&
			game.temp['Poland'] &&
			game.temp['Czechoslovakia'] &&
			game.temp['Hungary'] &&
			game.temp['Romania'] &&
			game.temp['Bulgaria']
		) {
			view.prompt = 'Final Scoring: Done.'
			gen_action('end')
		} else {
			view.prompt = 'Choose a country to score:'
			if (!game.temp['East_Germany']) {
				gen_action('east_germany')
			}
			if (!game.temp['Poland']) {
				gen_action('poland')
			}
			if (!game.temp['Czechoslovakia']) {
				gen_action('czechoslovakia')
			}
			if (!game.temp['Hungary']) {
				gen_action('hungary')
			}
			if (!game.temp['Romania']) {
				gen_action('romania')
			}
			if (!game.temp['Bulgaria']) {
				gen_action('bulgaria')
			}
		}
	},
	east_germany() {
		score_country('East_Germany')
		game.temp['East_Germany'] = true
	},
	poland() {
		score_country('Poland')
		game.temp['Poland'] = true
	},
	czechoslovakia() {
		score_country('Czechoslovakia')
		game.temp['Czechoslovakia'] = true
	},
	hungary() {
		score_country('Hungary')
		game.temp['Hungary'] = true
	},
	romania() {
		score_country('Romania')
		game.temp['Romania'] = true
	},
	bulgaria() {
		score_country('Bulgaria')
		game.temp['Bulgaria'] = true
	},
	end() {
		delete game.temp
		if (game.vp > 0) {
			goto_game_over(DEM, `${DEM} wins on Victory Point Track!`)
		} else if (game.vp < 0) {
			goto_game_over(COM, `${COM} wins on Victory Point Track!`)
		} else if (game.vp === 0) {
			goto_game_over('Draw', `The game is tied!`)
		}
	},
}

states.game_over = {
	get inactive() {
		return game.victory
	},
	prompt() {
		view.prompt = game.victory
	},
}

// ========================== EVENT SPECIFIC STATES =================================

states.general_strike = {
	inactive: 'discard a card',
	prompt() {
		if (game.communist_hand.length === 0) {
			view.prompt = 'General Strike: No cards remaining. You must	pass.'
			gen_action('pass')
		} else {
			view.prompt = 'General Strike: You must discard a card or play a Scoring Card.'
			game.communist_hand
			for (let card of game.communist_hand) {
				gen_action_card(card)
			}
		}
	},
	card(card) {
		push_undo()
		silent_discard(card)
		game.played_card = card
		game.available_ops = get_card_ops(card)
		if (scoring_cards.includes(card)) {
			game.vm_event = card
			log(`Played C${card} for the event.`)
			log_struggle_banner(game.played_card)
			game.return_state = 'end_round'
			goto_vm(game.vm_event)
		} else {
			log(`Discarded C${card}.`)
			game.state = 'general_strike_roll'
		}
	},
	pass() {
		log("No cards to discard.")
		game.state = 'end_round'
	}
}

states.general_strike_roll = {
	inactive: 'discard a card',
	prompt() {
		view.prompt = 'General Strike: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		log(`Roll: D${roll}`)
		logi(`+${game.available_ops} Ops`)
		let total = roll + game.available_ops
		if (total > 5) {
			log(`Success: ${total} > 5.`)
			log('The strike is over.')
			permanently_remove(C_GENERAL_STRIKE)
			game.persistent_events = game.persistent_events.filter(n => n !== 5)
		} else {
			log(`Fail: ${total} <= 5.`)
			log('The strike continues.')
		}
		game.state = 'end_round'
	},
}

states.honecker = {
	inactive: 'resolve Honecker',
	prompt() {
		view.prompt = 'Honecker: You may take an extra Action Round.'
		gen_action('extra')
		gen_action('pass')
	},
	extra() {
		push_undo()
		game.round++
		log_gap(`Communist chooses to take an extra Action Round due to C${C_HONECKER}.`)
		log_round()
		game.round_player = COM
		permanently_remove(C_HONECKER)
		if (game.persistent_events.includes(C_GENERAL_STRIKE)) {
			log('.cC' + C_GENERAL_STRIKE)
			game.state = 'general_strike'
		} else {
			game.state = 'choose_card'
		}
	},
	pass() {
		push_undo()
		log(`C${C_HONECKER}: passed.`)
		permanently_remove(C_HONECKER)
		game.state = 'end_round'
	},
}

states.new_years_eve_party = {
	get inactive() {
		return `resolve ${card_name[C_NEW_YEARS_EVE_PARTY]}`
	},
	prompt() {
		if (!game.is_pwr_struggle) {
			view.prompt = `New Year's Eve Party: You may choose a country to have a final Power Struggle.`
			if (!game.revolutions[0]) {gen_action('poland')}
			if (!game.revolutions[1]) {gen_action('hungary')}
			if (!game.revolutions[2]) {gen_action('east_germany')}
			if (!game.revolutions[3]) {gen_action('bulgaria')}
			if (!game.revolutions[4]) {gen_action('czechoslovakia')}
			if (!game.revolutions[5]) {gen_action('romania')}
			gen_action('pass')
		} else {
			view.prompt = `New Year's Eve Party: Done.`
			gen_action('end')
		}
	},
	east_germany() {
		push_undo()
		log('Chose to score East Germany.')
		game.vm_event = C_POWER_STRUGGLE_EAST_GERMANY
		goto_vm(C_POWER_STRUGGLE_EAST_GERMANY)
	},
	poland() {
		push_undo()
		log('Chose to score Poland.')
		game.vm_event = C_POWER_STRUGGLE_POLAND
		goto_vm(C_POWER_STRUGGLE_POLAND)
	},
	czechoslovakia() {
		push_undo()
		log('Chose to score Czechoslovakia.')
		game.vm_event = C_POWER_STRUGGLE_CZECHOSLOVAKIA
		goto_vm(C_POWER_STRUGGLE_CZECHOSLOVAKIA)
	},
	hungary() {
		push_undo()
		log('Chose to score Hungary.')
		game.vm_event = C_POWER_STRUGGLE_HUNGARY
		goto_vm(C_POWER_STRUGGLE_HUNGARY)
	},
	romania() {
		push_undo()
		log('Chose to score Romania.')
		game.vm_event = C_POWER_STRUGGLE_ROMANIA
		goto_vm(C_POWER_STRUGGLE_ROMANIA)
	},
	bulgaria() {
		push_undo()
		log('Chose to score Bulgaria.')
		game.vm_event = C_POWER_STRUGGLE_BULGARIA
		goto_vm(C_POWER_STRUGGLE_BULGARIA)
	},
	pass() {
		push_undo()
		log('No final power struggle.')
		if (game.vp > 0) {
			goto_game_over(DEM, `New Year's Eve Party: ${DEM} wins on Victory Point Track!`)
		} else if (game.vp < 0) {
			goto_game_over(COM, `New Year's Eve Party: ${COM} wins on Victory Point Track!`)
		} else if (game.vp === 0) {
			goto_game_over('Draw', `New Year's Eve Party: The game is tied!`)
		}
	},
	end() {
		if (game.vp > 0) {
			goto_game_over(DEM, `New Year's Eve Party: ${DEM} wins on Victory Point Track!`)
		} else if (game.vp < 0) {
			goto_game_over(COM, `New Year's Eve Party: ${COM} wins on Victory Point Track!`)
		} else if (game.vp === 0) {
			goto_game_over('Draw', `New Year's Eve Party: The game is tied!`)
		}
	},
}

states.stasi_end_round = {
	inactive: 'choose next card due to Stasi',
	prompt() {
		if (game.democrat_hand.length === 0) {
			view.prompt = 'Stasi: No cards remaining.'
			gen_action('pass')
			return
		}
		view.prompt = 'Stasi: You must select your next card to play.'

		for (let card of game.democrat_hand) {
			gen_action_card(card)
		}
	},
	card(card) {
		push_undo()
		log(`Democrat selected C${card} as next card.`)
		game.stasi_card = card
		if (!scoring_cards.includes(card) && count_scoring_cards() >= (7-game.round)){
			game.temp = card
			game.state = 'stasi_confirm_scoring_card'
			return
		}
		game.state = 'stasi_finish'
	},
	pass() {
		log('Stasi: Democrat has no remaining cards.')
		game.stasi_card = 0
		end_stasi_choose_card()
	},
}

states.stasi_confirm_scoring_card = {
	inactive: 'choose a card',
	prompt() {
		view.prompt = `${pluralize(count_scoring_cards(),'scoring card')} in hand with ${pluralize(7-game.round,'Action Round')} remaining. Scoring cards may not be held. Continue?`
		gen_action('continue')
	},
	continue() {
		push_undo()
		end_stasi()
	},
}

states.stasi_finish = {
	inactive: 'choose next card due to Stasi',
	prompt() {
		view.prompt = 'Stasi: Choose card done.'
		gen_action('done')
	},
	done() {
		push_undo()
		end_stasi_choose_card()
	},
}

states.stasi_confirm = {
	inactive: 'choose next card due to Stasi',
	prompt() {
		view.prompt = `If Common European Home selected, it must be played for Operations. Otherwise select the opponent's card instead.`
		gen_action('done')
	},
	done() {
		end_stasi()
	}
}

states.stasi_play_card = {
	inactive: 'play a card',
	prompt() {
		if (game.democrat_hand.length === 0) {
			view.prompt = 'Stasi: You must pass.'
			gen_action('pass')
		} else {
			view.prompt = `Stasi: You must play ${quoted_card_name[game.stasi_card]}.`
			gen_action_card(game.stasi_card)
		}
	},
	card(card) {
		push_undo()
		game.played_card = card
		remove_from_hand(card)
		game.available_ops = get_card_ops(card)

		if (game.democrat_hand.includes(C_COMMON_EUROPEAN_HOME) && cards[card].side === "C") {
			game.state = 'stasi_resolve_common_european_home'
		} else {
			game.state = 'play_card'
		}
	},
	pass() {
		log_pass_banner()
		game.state = 'end_round'
	},
	done() {
		if (game.democrat_hand.includes(C_COMMON_EUROPEAN_HOME)) {
			game.state = 'stasi_resolve_common_european_home'
		} else {
			game.state = 'play_card'
		}
	},
}

states.stasi_resolve_common_european_home = {
	inactive: 'play a card',
	prompt() {
		view.prompt = `Stasi: Play ${quoted_card_name[game.played_card]} with Common European Home?`
		gen_action('yes')
		gen_action('no')
	},
	yes() {
		push_undo()
		silent_discard(C_COMMON_EUROPEAN_HOME)
		game.vm_infl_to_do = true
		game.vm_event_to_do = false
		game.state = 'stasi_play_ceh'
	},
	no() {
		push_undo()
		game.state = 'play_card'
	},
}

states.stasi_play_ceh = {
	get inactive() {
		return `play ${quoted_card_name[game.played_card]}`
	},
	prompt() {
		view.prompt = 'Play ' + quoted_card_name[game.played_card]
		gen_action('influence')
		gen_action('support_check')
	},
	influence() {
		push_undo()
		log_ops_banner()
		log(`Played C${game.played_card} with C${C_COMMON_EUROPEAN_HOME}.`)
		if (check_ligachev_non_event())
			return
		log('Placed SP:')
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'add_influence'
		valid_spaces_infl()
	},
	support_check() {
		push_undo()
		log_ops_banner()
		log(`Played C${game.played_card} with C${C_COMMON_EUROPEAN_HOME}.`)
		if (check_ligachev_non_event())
			return
		log('Support Checks:')
		game.available_ops = 2
		game.state = 'support_check_prep'
		valid_spaces_sc()
	},
}

// ==================== SUPPORTING STATE FUNCTIONS =============================

function add_infl(space, ops) {
	push_undo()

	if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
		if (spaces[space].country !== 'East_Germany') {
			game.austria_hungary_border_reopened_tracker = false
		}
	}

	// TODO: move these checks to start of influence ops
	// Check Genscher
	if (
		game.persistent_events.includes(C_GENSCHER) &&
		game.active === DEM &&
		spaces[space].country === 'East_Germany' &&
		check_com_control(space)
	) {
		game[ops]--
		if (!game.genscher_logged) {
			logi(`C${C_GENSCHER}`)
			game.genscher_logged = true
		}
	} else if (check_opp_control(space)) {
		game[ops] -= 2
		// Check if Austria Hungary Border Reopened was used to place last SP in a controlled space in East Germany. If so, game.available_op will be negative
		if (game[ops] < 0) {
			if (!game.ahbr_logged) {
				logi(`C${C_AUSTRIA_HUNGARY_BORDER_REOPENED}`)
				game.ahbr_logged = true
			}
		}
	} else {
		game[ops]--
	}

	if (game.active === COM) {
		game.comInfl[space]++
	} else {
		game.demInfl[space]++
	}
	summary_influence(space)
	check_tyrant()

	// Check Austria Hungary Border Reopened is true and condition has been met
	if (
		game[ops] === 0 &&
		game.active === DEM &&
		game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
		game.austria_hungary_border_reopened_tracker
	) {
		game[ops] ++
		if (!game.ahbr_logged) {
			logi(`C${C_AUSTRIA_HUNGARY_BORDER_REOPENED}`)
			game.ahbr_logged = true
		}
		game.austria_hungary_border_reopened_tracker = false
		game.valid_spaces = game.valid_spaces.filter(n => spaces[n].country === 'East_Germany')
	}

	// If only 1 IP remaining, may not place in opponent controlled spaces unless Genscher/AHBR
	if (game[ops] === 1) {
		if (game.active === DEM) {
			if (game.persistent_events.includes(C_GENSCHER) || (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) && game.austria_hungary_border_reopened_tracker)) {
				game.valid_spaces = game.valid_spaces.filter(n => !(check_opp_control(n) && spaces[n].country !== 'East_Germany'))
			} else {
				game.valid_spaces = game.valid_spaces.filter(n => !check_opp_control(n))
			}
		} else {
			game.valid_spaces = game.valid_spaces.filter(n => !check_opp_control(n))
		}
	}
	if (game[ops] <= 0) {
		game.valid_spaces = []
	}
}

function remove_infl(space, ops) {
	push_undo()
	if (game.remove_opponent_infl === true) {
		if (game.active === COM) {
			game.demInfl[space]--
			if (game.demInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		} else {
			game.comInfl[space]--
			if (game.comInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		}
	} else {
		if (game.active === COM) {
			game.comInfl[space]--
			if (game.comInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		} else {
			game.demInfl[space]--
			if (game.demInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		}
	}
	summary_influence(space)
	check_tyrant()
	game[ops]--
	if (game.vm_influence_added && game.vm_influence_added[space] >= 0) {
		game.vm_influence_added[space]++
	}
	if (game[ops] === 0) {
		game.valid_spaces = []
	}
}

function do_sc(space) {
	clear_undo()
	let tear_gas_start = game.persistent_events.includes(C_TEAR_GAS)
	let the_wall_start = game.persistent_events.includes(C_THE_WALL)
	let roll = roll_d6()
	log(`%${space}: D${roll}`)

	if (game.active === COM && game.persistent_events.includes(C_THE_WALL) && spaces[space].country === 'East_Germany')
		logi(`No adjacency for Democrats due to C${C_THE_WALL}`)

	// Get SC ops
	if (game.is_pwr_struggle) {
		roll += game.vm_available_ops
		logi(`+${game.vm_available_ops} Ceausescu`)
	} else if (game.state === 'vm_tst_6_sc') {
		roll += get_tst_6_ops()
		roll += 2
		logi('+2 TST award')
	} else {
		let card_ops = get_card_ops(this_card())
		roll += card_ops
		logi(`+${card_ops} card ops`)
	}
	// Get support check modifiers
	if (game.support_check_modifier > 0) {
		roll += game.support_check_modifier
		logi(`+${game.support_check_modifier} event`)
	}
	if (game.active === COM && game.persistent_events.includes(C_TEAR_GAS) && spaces[space].socio === SOCIO_STUDENT) {
		roll ++
		logi(`+1 C${C_TEAR_GAS}`)
		permanently_remove(C_TEAR_GAS)
		game.persistent_events = game.persistent_events.filter(n => n !== C_TEAR_GAS)
	}
	if (
		game.active === DEM &&
		spaces[space].region === 'Eastern Europe' &&
		game.persistent_events.includes(C_FRG_EMBASSIES)
	) {
		roll++
		logi(`+1 C${C_FRG_EMBASSIES}`)
	}
	if (
		game.active === DEM &&
		spaces[space].country === 'East_Germany' &&
		game.persistent_events.includes(C_GRENZTRUPPEN)
	) {
		roll--
		logi(`-1 C${C_GRENZTRUPPEN}`)
	}
	if (
		(game.active === COM && game.stand_fast === DEM && check_dem_control(space)) ||
		(game.active === DEM && game.stand_fast === COM && check_com_control(space))
	) {
		roll--
		logi(`-1 C${C_STAND_FAST}`)
	}
	if (game.active === DEM && game.persistent_events.includes(C_ELENA) && spaces[space].country === 'Romania') {
		roll--
		logi(`-1 C${C_ELENA}`)
	}
	if (
		game.active === DEM &&
		game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
		game.austria_hungary_border_reopened_tracker
	) {
		roll++
		logi(`+1 C${C_AUSTRIA_HUNGARY_BORDER_REOPENED}`)
	}

	// Check for adjacency
	const adj = count_adj(space)
	if (game.active === COM && game.persistent_events.includes(C_THE_WALL) && spaces[space].country === 'East_Germany') {
		roll += adj.com_adj
		if (adj.com_adj > 0)
			logi(`+${adj.com_adj} adjacency`)
		permanently_remove(C_THE_WALL)
	} else {
		if (adj.dem_adj > 0 || adj.com_adj > 0) {
			if (game.active === DEM) {
				roll += adj.dem_adj
				roll -= adj.com_adj
				if (adj.dem_adj > 0)
					logi(`+${adj.dem_adj} adjacency`)
				if (adj.com_adj > 0)
					logi(`-${adj.com_adj} opponent adjacency`)
			} else {
				roll += adj.com_adj
				roll -= adj.dem_adj
				if (adj.com_adj > 0)
					logi(`+${adj.com_adj} adjacency`)
				if (adj.dem_adj > 0)
					logi(`-${adj.dem_adj} opponent adjacency`)
			}
		}
	}
	//Stability and final support check calcs
	const stability = spaces[space].stability
	logi(`-${stability*2} stability (x2)`)
	const change_infl = Math.max(0, roll - stability*2)
	if (change_infl > 0) {
		if (game.active === DEM) {
			if (change_infl > game.comInfl[space]) {
				const residual = change_infl - game.comInfl[space]
				game.comInfl[space] = 0
				game.demInfl[space] += residual
			} else {
				game.comInfl[space] -= change_infl
			}
			if (game.comInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		} else {
			if (change_infl > game.demInfl[space]) {
				const residual = change_infl - game.demInfl[space]
				game.demInfl[space] = 0
				game.comInfl[space] += residual
			} else {
				game.demInfl[space] -= change_infl
			}
			if (game.demInfl[space] === 0) {
				game.valid_spaces = game.valid_spaces.filter(id => id !== space)
			}
		}
		log(change_infl + ' SP for ' + game.active + '.')
		check_tyrant_sc()
	} else {
		log('No change SP.')
	}
	// Check VP awards
	if (
		game.active === COM &&
		game.persistent_events.includes(C_HELSINKI_FINAL_ACT) &&
		(spaces[space].socio === SOCIO_INTELLECTUAL || spaces[space].socio === SOCIO_STUDENT)
	) {
		log('+1 VP from C' + C_HELSINKI_FINAL_ACT)
		game.vp ++
	}
	if (game.active === COM && game.persistent_events.includes(C_ECO_GLASNOST) && spaces[space].space_id === S_RUSE) {
		log('+1 VP from C' + C_ECO_GLASNOST)
		game.vp++
	}
	let tear_gas_end = game.persistent_events.includes(C_TEAR_GAS)
	let the_wall_end = game.persistent_events.includes(C_THE_WALL)
	if (tear_gas_start && !tear_gas_end) {
		log(`C${C_TEAR_GAS} no longer in effect.`)
	}
	if (the_wall_start && !the_wall_end) {
		log(`C${C_THE_WALL} no longer in effect.`)
	}
	// If Austria-Hungary Border Reopened used, all future Support Checks must be in East Germany
	if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
		if (game.austria_hungary_border_reopened_tracker) {
			game.valid_spaces = game.valid_spaces.filter(n => spaces[n].country === 'East_Germany')
		}
	}
	delete game.selected_space
}

function valid_spaces_setup() {
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (game.active === COM) {
			let infl = game.demInfl[i]
			if (infl === 0)
				game.valid_spaces.push(space.space_id)
		} else {
			let infl = game.comInfl[i]
			if (infl === 0)
				game.valid_spaces.push(space.space_id)
		}
	}
}

function valid_spaces_sc() {
	let valid_spaces_set = new Set()
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (game.active === DEM) {
			let infl = game.comInfl[i]
			if (infl !== 0)
				valid_spaces_set.add(space.space_id)
		} else {
			let infl = game.demInfl[i]
			if (infl !== 0) {
				if (game.persistent_events.includes(C_SOLIDARITY_LEGALIZED) && space.space_id === S_GDANSK)
					continue
				if (game.persistent_events.includes(C_WE_ARE_THE_PEOPLE) && space.space_id === S_LEIPZIG)
					continue
				if (
					game.persistent_events.includes(C_FOREIGN_CURRENCY_DEBT_BURDEN) &&
					space.country === game.foreign_currency_debt_burden
				)
					continue
				valid_spaces_set.add(space.space_id)
			}
		}
	}
	game.valid_spaces = Array.from(valid_spaces_set)
	if (
		game.is_pwr_struggle &&
		game.pwr_struggle_in === 'Romania' &&
		game.persistent_events.includes(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU)
	) {
		game.valid_spaces = game.valid_spaces.filter((n) => spaces[n].country === 'Romania')
	}
	return game.valid_spaces
}

function valid_spaces_support_loss() {
	let valid_spaces_set = new Set()
	for (let i = 0; i < game.demInfl.length; i++) {
		let space = spaces[i]
		if (game.active === DEM) {
			let infl = game.demInfl[i]
			if (infl > 0 && space.country === game.pwr_struggle_in)
				valid_spaces_set.add(space.space_id)
		} else {
			let infl = game.comInfl[i]
			if (infl > 0 && space.country === game.pwr_struggle_in)
				valid_spaces_set.add(space.space_id)
		}
	}
	game.valid_spaces = Array.from(valid_spaces_set)
	return game.valid_spaces
}

function valid_spaces_infl() {
	let ops = game.state.startsWith("vm") ? game.vm_available_ops : game.available_ops

	let valid_spaces_set = new Set()
	for (let i = 0; i < game.demInfl.length; i++) {
		let space = spaces[i]
		let player_influence = game.active === COM ? game.comInfl[i] : game.demInfl[i]
		if (player_influence > 0) {
			if (
				ops > 1 ||
				!check_opp_control(space.space_id) ||
				(game.active === DEM && space.country === 'East_Germany' && game.persistent_events.includes(C_GENSCHER))
			)
				valid_spaces_set.add(space.space_id)
			let adjacent_spaces = get_adjusted_adjacency(space.space_id)

			for (let adj_space_id of adjacent_spaces) {
				if (adj_space_id >= 0) {
					const adj_piece = spaces[adj_space_id]
					const opponent_control = check_opp_control(adj_piece.space_id)
					if (
						game.active === DEM &&
						adj_piece.country === "East_Germany" &&
						game.persistent_events.includes(C_GENSCHER)
					) {
						valid_spaces_set.add(adj_piece.space_id)
					} else if (ops >= 2 || !opponent_control) {
						valid_spaces_set.add(adj_piece.space_id)
					}
				}
			}
		}
	}
	game.valid_spaces = Array.from(valid_spaces_set)
	return game.valid_spaces
}

function valid_cards(player_hand, presence) {
	const valid_cards_set = new Set()
	if (game.phase === 0) {

		for (let c of player_hand) {
			let card = power_cards[c]
			if (c === PC_TACTIC_FAILS)
				continue
			if (card.name === game.tactics_fails)
				continue
			if (card.socio === 0)
				valid_cards_set.add(c)
			else if (leaders.includes(card.socio) && presence[card.socio])
				valid_cards_set.add(c)
		}
	} else if (game.phase === 1) {
		for (let c of player_hand) {
			let card = power_cards[c]
			if (!leader_cards.includes(c) && card.name === power_cards[game.played_power_card].name) {
				valid_cards_set.add(c)
			} else if (card.name === game.proxy_power_card) {
				valid_cards_set.add(c)
			} else if (leaders.includes(card.socio) && presence[card.socio]) {
				valid_cards_set.add(c)
			} else if (c === PC_TACTIC_FAILS) {
				valid_cards_set.add(c)
			}
		}
	}
	game.valid_cards = Array.from(valid_cards_set)
	return game.valid_cards
}

function do_valid_cards() {
	let presence = check_presence(game.pwr_struggle_in)
	if (game.active === DEM) {
		valid_cards(game.dem_pwr_hand, presence.dem_leaders)
	} else {
		valid_cards(game.com_pwr_hand, presence.com_leaders)
	}
}

function count_adj(space_id) {
	let dem_adj = 0
	let com_adj = 0

	let adjacent_spaces = get_adjusted_adjacency(space_id)
	for (let adj_space_id of adjacent_spaces) {
		if (check_dem_control(adj_space_id))
			dem_adj++
		if (check_com_control(adj_space_id))
			com_adj++
	}
	return {dem_adj, com_adj}
}

function is_controlled(space_id) {
	if ((game.comInfl[space_id] - game.demInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else if ((game.demInfl[space_id] - game.comInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else {
		return false
	}
}

function check_opp_control(space_id) {
	if (game.active === DEM && ((game.comInfl[space_id] - game.demInfl[space_id]) >= spaces[space_id].stability)) {
		return true
	} else if (game.active === COM && ((game.demInfl[space_id] - game.comInfl[space_id]) >= spaces[space_id].stability)) {
		return true
	} else {
		return false
	}
}

function check_dem_control(space_id) {
	if ((game.demInfl[space_id] - game.comInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else {
		return false
	}
}

function check_com_control(space_id) {
	if ((game.comInfl[space_id] - game.demInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else {
		return false
	}
}

function crowd_infl_check() {
	for (let s of S_ROMANIA) {
		if (game.demInfl[s] > 0)
			return false
	}
	if (game.demInfl[S_SZEGED] > 0)
		return false
	if (game.demInfl[S_VARNA] > 0)
		return false
	return true
}

function crowd_sc_check() {
	for (let s of S_ROMANIA) {
		if (game.comInfl[s] > 0)
			return false
	}
	return true
}

function do_tst_attempt() {
	let roll = roll_d6()
	logi(`D${roll}`)
	roll += game.available_ops
	logi(`+${game.available_ops} card Ops`)

	if ((game.active === DEM && game.dem_tst_attempted === 1) || (game.active === COM && game.com_tst_attempted === 1)) {
		roll++
		logi('+1 previous TST attempts')
	}
	if (game.active === DEM && game.dem_tst_position >= 1 && game.com_tst_position === 0) {
		roll ++
		logi('+1 TST award')
	}
	if (game.active === COM && game.com_tst_position >= 1 && game.dem_tst_position === 0) {
		roll ++
		logi('+1 TST award')
	}
	if (
		(game.active === DEM && cards[this_card()].side === 'D') ||
		(game.active === COM && cards[this_card()].side === 'C')
	) {
		roll++
		logi('+1 playing own card')
	}
	if (game.active === COM && game.persistent_events.includes(C_LI_PENG)) {
		roll ++
		logi('+1 C' + C_LI_PENG)
	}
	game.return = game.round_player

	if (game.active === DEM) {
		game.dem_tst_attempted_this_turn = 1
		if (roll >= dem_tst_req[game.dem_tst_position]) {
			log(`Success: ${roll} >= .dT${dem_tst_req[game.dem_tst_position]}`)
			game.dem_tst_position++
			game.dem_tst_attempted = 0

			// Check if they have reached box 7 or 8 first
			if (game.dem_tst_position === 7 && game.com_tst_position < 7) {
				game.tst_7 = false
			}
			if (game.dem_tst_position === 8 && game.com_tst_position < 8) {
				game.tst_8 = false
			}
			// Check if they have caught up to box 7 or 8
			if (game.dem_tst_position >= 7 && game.com_tst_position >= 7) {
				delete game.tst_7
			}
			if (game.dem_tst_position >= 8 && game.com_tst_position >= 8) {
				delete game.tst_8
			}
			// Check if TST events occur
			if (game.dem_tst_position === 3 && game.com_tst_position < 3) {
				game.vm_event = 203
			} else if (game.dem_tst_position === 4 && game.com_tst_position < 4) {
				game.vm_event = 204
			}
			game.state = 'tiananmen_square_attempt_success'
		} else {
			log(`Fail: ${roll} < .dT${dem_tst_req[game.dem_tst_position]}`)
			game.dem_tst_attempted = 1
			game.state = 'tiananmen_square_attempt_fail'
		}
	} else {
		game.com_tst_attempted_this_turn = 1
		if (roll >= com_tst_req[game.com_tst_position]) {
			log(`Success: ${roll} >= .cT${com_tst_req[game.com_tst_position]}`)
			game.com_tst_position++
			game.com_tst_attempted = 0

			// Check if the Chinese Solution becomes playable
			if (game.active === COM && game.com_tst_position === 7) {
				game.playable_cards.push(C_THE_CHINESE_SOLUTION)
			}
			// Check if they have reached box 7 or 8 first
			if (game.com_tst_position === 7 && game.dem_tst_position < 7) {
				game.tst_7 = false
			}
			if (game.com_tst_position === 8 && game.dem_tst_position < 8) {
				game.tst_8 = false
			}
			// Check if they have caught up to box 7 or 8
			if (game.com_tst_position >= 7 && game.dem_tst_position >= 7) {
				delete game.tst_7
			}
			if (game.com_tst_position >= 8 && game.dem_tst_position >= 8) {
				delete game.tst_8
			}
			// Check if TST events occur
			if (game.com_tst_position === 3 && game.dem_tst_position < 3) {
				game.vm_event = 203
			} else if (game.com_tst_position === 4 && game.dem_tst_position < 4) {
				game.vm_event = 204
			}
			game.state = 'tiananmen_square_attempt_success'
		} else {
			log(`Fail: ${roll} < .cT${com_tst_req[game.com_tst_position]}`)
			game.com_tst_attempted = 1
			game.state = 'tiananmen_square_attempt_fail'
		}
	}
}

function check_presence(country) {
	let dem_spaces = 0
	let com_spaces = 0
	let dem_battlegrounds = 0
	let com_battlegrounds = 0
	let dem_leaders = {1: false, 4: false, 5: false, 6: false, 7: false}
	let com_leaders = {1: false, 4: false, 5: false, 6: false, 7: false}

	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (space.country === country) {
			if (check_dem_control(i)) {
				dem_spaces++
				if (space.battleground === 1)
					dem_battlegrounds++
				if (leaders.includes(space.socio))
					dem_leaders[space.socio] = true
			}
			if (check_com_control(i)) {
				com_spaces++
				if (space.battleground === 1)
					com_battlegrounds++
				if (leaders.includes(space.socio))
					com_leaders[space.socio] = true
			}
		}
	}
	let dem_domination = dem_battlegrounds > com_battlegrounds && dem_spaces > com_spaces && dem_spaces - dem_battlegrounds > 0
	let com_domination = com_battlegrounds > dem_battlegrounds && com_spaces > dem_spaces && com_spaces - com_battlegrounds > 0
	let total_battlegrounds = battlegrounds(country)
	let dem_control = dem_battlegrounds === total_battlegrounds && dem_spaces > com_spaces
	let com_control = com_battlegrounds === total_battlegrounds && com_spaces > dem_spaces
	return {
		dem_spaces: dem_spaces,
		com_spaces: com_spaces,
		dem_battlegrounds: dem_battlegrounds,
		com_battlegrounds: com_battlegrounds,
		dem_domination: dem_domination,
		com_domination: com_domination,
		dem_control: dem_control,
		com_control: com_control,
		dem_leaders: dem_leaders,
		com_leaders: com_leaders,
	}
}

function battlegrounds(country) {
	let battlegrounds = 0
	if (country === 'Hungary') {
		battlegrounds = 4
	} else if (country === 'Bulgaria') {
		battlegrounds = 5
	} else if (country === 'Romania') {
		if (game.systematization && romania_battlegrounds.includes(game.systematization))
			battlegrounds = 5
		else
			battlegrounds = 6
	} else {
		battlegrounds = 6
	}
	return battlegrounds
}

function take_power(country) {
	game.revolutions[find_country_index(country)] = true
	game.times_held[find_country_index(country)] = 1
	game.vp_retain = 0
}

function retain_power(country) {
	game.times_held[find_country_index(country)]++
	let vp_gain = get_value(country) * game.times_held[find_country_index(country)]
	log_gap(`Communist retains power:`)
	logi(`-${vp_gain} VP`)
	game.vp_retain = -vp_gain
	game.vp -= vp_gain
}

function score_country(country) {
	if (game.state === 'final_scoring')
		log_h5(`${country}`)
	else
		log_h5(`Scoring`)
	let value_presence = get_value(country)
	let value_domination = value_presence * 2
	let value_control
	if (country !== 'Hungary') {
		value_control = value_presence * 3
	} else {
		value_control = 4
	}
	let dem_vp = 0
	let com_vp = 0
	let presence = check_presence(country)

	log('Democrat:')
	if (presence.dem_control) {
		logi(`+${value_control} VP Control`)
		dem_vp += value_control
	}
	else if (presence.dem_domination) {
		logi(`+${value_domination} VP Domination`)
		dem_vp += value_domination
	}
	else if (presence.dem_spaces) {
		logi(`+${value_presence} VP Presence`)
		dem_vp += value_presence
	}
	if (presence.dem_battlegrounds > 0) {
		logi(`+${presence.dem_battlegrounds} VP Battlegrounds`)
		dem_vp += presence.dem_battlegrounds
	}
	if (!presence.dem_spaces)
		logi(`+${dem_vp} VP`)

	log('Communist:')
	if (presence.com_control) {
		logi(`-${value_control} VP Control`)
		com_vp -= value_control
	}
	else if (presence.com_domination) {
		logi(`-${value_domination} VP Domination`)
		com_vp -= value_domination
	}
	else if (presence.com_spaces) {
		logi(`-${value_presence} VP Presence`)
		com_vp -= value_presence
	}
	if (presence.com_battlegrounds > 0) {
		logi(`-${presence.com_battlegrounds} VP Battlegrounds`)
		com_vp -= presence.com_battlegrounds
	}
	if (!presence.com_spaces)
		logi(`-${com_vp} VP`)
	game.vp += dem_vp + com_vp
	if (game.state === 'final_scoring') {
		if ((dem_vp + com_vp) > 0)
			log_h4(`Total: +${dem_vp + com_vp} VP`)
		else
			log_h4(`Total: ${dem_vp + com_vp} VP`)
		if (game.vp > 0)
			log(`Score is +${game.vp} VP`)
		else
			log(`Score is ${game.vp} VP`)
	} else {
		let final_vp = dem_vp + com_vp + game.vp_roll + game.vp_retain
		if (final_vp > 0)
			log_h4(`Power Struggle total: +${final_vp} VP`)
		else
			log_h4(`Power Struggle total: ${final_vp} VP`)
	}
}

function get_value(country) {
	let value
	if (country === 'East_Germany' || country === 'Poland') {
		value = 3
	} else if (country === 'Czechoslovakia' || country === 'Romania') {
		value = 2
	} else
		value = 1
	return value
}

function get_end_infl_prompt() {
	prompt_event(`Place SPs done.`)
	if (!game.vm_infl_to_do) {
		gen_action('end_round')
	} else {
		gen_action('done')
	}
}

function get_aftermath_roll(what) {
	clear_undo()
	let roll = roll_d6()
	log(`${what}: D${roll}`)
	let rally_win = 0
	let petition_win = 0
	if (rallies.includes(game.played_power_card) || game.proxy_power_card === 'Rally in the Square') {
		rally_win = 2
	}
	if (petitions.includes(game.played_power_card) || game.proxy_power_card === 'Petition') {
		petition_win = 2
	}
	let modified_roll = roll + game.raised_stakes + rally_win - petition_win
	if (game.state === 'support_loss') {
		if (game.active === COM && game.persistent_events.includes(C_YAKOVLEV_COUNSELS_GORBACHEV)) {
			logi(`+1 C${C_YAKOVLEV_COUNSELS_GORBACHEV}`)
			modified_roll ++
		}
	} else {
		if (game.active === DEM && game.persistent_events.includes(C_YAKOVLEV_COUNSELS_GORBACHEV)) {
			logi(`+1 C${C_YAKOVLEV_COUNSELS_GORBACHEV}`)
			modified_roll ++
		}
	}
	if (modified_roll < 0) {
		modified_roll = 0
	} else if (modified_roll > 7) {
		modified_roll = 7
	}
	if (game.raised_stakes !== 0) {
		logi(`+${game.raised_stakes} Raising the Stakes`)
	}
	if (rally_win !== 0) {
		logi('+2 winning on a P1')
	}
	if (petition_win !== 0) {
		logi('-2 winning on a P31')
	}
	if (modified_roll !== roll) {
		log(`Modified roll: ${modified_roll}`)
	}
	return modified_roll
}

function add_to_persistent_events(card) {
	game.persistent_events.push(card)
	remove_from_discard(card)
}

function permanently_remove(card) {
	game.persistent_events = game.persistent_events.filter(c => c !== card)
	remove_from_discard(card)
	if (!game.strategy_removed.includes(card)) {
		game.strategy_removed.push(card)
	}
}

function check_for_crowd() {
	// Check if in a Power Struggle after Crowd Turns Against Ceausescu
	if (game.is_pwr_struggle) {
		if (game.return !== game.active) {
			change_player()
		}
		game.power_struggle_discard = game.ceausescu_cards
		delete game.ceausescu_cards
		log_h5('Raise the Stakes')
		log(`${game.active}:`)
		game.state = 'raise_stakes_1'
		return true
	}
	reset_austria_hungary_border_reopened()
}

function check_vp() {
	if (game.vp >= 20) {
		goto_game_over(DEM, `${DEM} won an Automatic Victory!`)
		return true
	} else if (game.vp <= -20) {
		goto_game_over(COM, `${COM} won an Automatic Victory!`)
		return true
	}
	return false
}

function goto_game_over(result, victory) {
	clear_undo()
	game.state = "game_over"
	game.active = "None"
	game.result = result
	game.victory = victory
	log_h1("Game Over")
	log(game.victory)
	return
}

function goto_struggle() {
	game.raised_stakes_discard = 0
	game.valid_cards = []
	log_h5('Play Cards')
	game.ps_round = 1
	log_gap(`Round ${game.ps_round}:`)
	change_player()
	game.state = 'power_struggle'
	do_valid_cards()
}

function confirm_power_card() {
	change_player()
	do_valid_cards()
	game.state = 'power_struggle'
}

function log_power_card() {
	let card = game.power_card_2 ? game.power_card_2 : game.played_power_card
	if (numberless_cards.includes(card)) {
		log(`${game.active}: P${card}`)
	} else {
		log(`${game.active}: P${card} V${power_cards[card].value}`)
	}
}

function select_power_card() {
	discard(game.played_power_card)
	game.ps_round++
	game.power_card_1 = game.played_power_card
	delete game.power_card_2
	delete game.proxy_power_card
}

function reset_austria_hungary_border_reopened() {
	delete game.austria_hungary_border_reopened_tracker
	delete game.ahbr_logged
}

function end_stasi_choose_card() {
	if (game.stasi_card === C_COMMON_EUROPEAN_HOME) {
		game.state = 'stasi_confirm'
	} else {
		end_stasi()
	}
}

function end_stasi() {
	game.round_player = COM
	game.round ++
	log_round()
	change_player()
	game.valid_spaces = []
	if (game.persistent_events.includes(C_GENERAL_STRIKE)) {
		log('.cC' + C_GENERAL_STRIKE)
		game.state = 'general_strike'
	} else {
		game.state = 'choose_card'
	}
}

function end_goddess() {
	game.return_state = ''
	game.valid_cards = []
	log_h2("Action Round " + game.round)
	if (game.active === DEM) {
		change_player()
	}
	if (game.persistent_events.includes(C_GENERAL_STRIKE)) {
		game.state = 'general_strike'
	} else {
		game.state = 'choose_card'
	}
}

function end_raise_stakes(){
	if (game.active === DEM){
		if (game.dem_pwr_hand.length >= 3)
			game.state = 'raise_stakes_2'
		else {
			logi('Could not raise the stakes.')
			goto_struggle()
		}
	} else {
		if (game.com_pwr_hand.length >= 3)
			game.state = 'raise_stakes_2'
		else {
			logi('Could not raise the stakes.')
			goto_struggle()
		}
	}
}

function check_ceh() {
	if (game.played_card === C_COMMON_EUROPEAN_HOME) {
		if (game.active === DEM) {
			game.vp --
			logi(`-1 VP for playing C${C_COMMON_EUROPEAN_HOME} for Operations.`)
		} else {
			game.vp ++
			logi(`+1 VP for playing C${C_COMMON_EUROPEAN_HOME} for Operations.`)
		}
		if (check_vp())
			return true
		else
			return false
	} else
		return false
}

function check_if_no_infl_removed() {
	if (game.vm_event === C_KLAUS_AND_KOMAREK && game.vm_available_ops === 2)
		logi('None.')
	else if (game.vm_event === C_THE_TYRANT_IS_GONE && game.vm_available_ops === 4)
		logi('None.')
}

function check_reformer() {
	if (game.dem_tst_position !== game.com_tst_position) {
		if (!game.playable_cards.includes(C_REFORMER_REHABILITATED)) {
			game.playable_cards.push(C_REFORMER_REHABILITATED)
		}
	} else {
		game.playable_cards = game.playable_cards.filter(n => n !== C_REFORMER_REHABILITATED)
	}
}

function count_scoring_cards() {
	let scoring_check
	if (game.active === DEM) {
		scoring_check = game.democrat_hand.filter(card => scoring_cards.includes(card)).length
	} else {
		scoring_check = game.communist_hand.filter(card => scoring_cards.includes(card)).length
	}
	return scoring_check
}

function select_card(card) {
	game.played_card = card
	game.temp = 0
	remove_from_hand(card)
	game.state = 'play_card'
}
function finish_select_card() {
	if (!scoring_cards.includes(game.played_card)) {
		game.available_ops = get_card_ops(game.played_card)
		if (game.state !== 'stasi_play_ceh')
			log(`Played C${game.played_card}.`)
	}
}

function remove_from_hand(card) {
	let find_card
	if (game.active === COM) {
		find_card = game.communist_hand.indexOf(card)
		game.communist_hand.splice(find_card, 1)
	} else {
		find_card = game.democrat_hand.indexOf(card)
		game.democrat_hand.splice(find_card, 1)
	}
	if (!game.strategy_discard.includes(card)) {
		game.strategy_discard.push(card)
	}
}

function check_ligachev_non_event() {
	if (game.active === DEM && game.persistent_events.includes(C_LIGACHEV)) {
		log(`-3 VP from C${C_LIGACHEV}.`)
		game.vp -= 3
		if (check_vp())
			return true
		game.persistent_events = game.persistent_events.filter(n => n !== C_LIGACHEV)
		game.strategy_removed.push(C_LIGACHEV)
		return false
	} else
		return false
}

function check_ligachev_event(card) {
	if (game.active === DEM && game.persistent_events.includes(C_LIGACHEV)) {
		if (card !== C_GORBACHEV_CHARMS_THE_WEST) {
			log(`-3 VP from C${C_LIGACHEV}.`)
			game.vp -= 3
			if (check_vp())
				return true
		}
		game.persistent_events = game.persistent_events.filter(n => n !== C_LIGACHEV)
		game.strategy_removed.push(C_LIGACHEV)
		return false
	} else
		return false
}

function is_auto_resolve(card) {
	if (auto_resolve_events.includes(card)) {
		return true
	} else if (card === C_THE_TYRANT_IS_GONE) {
		if (game.persistent_events.includes(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU)) {
			return true
		}
	} else if (ceausecu_events.includes(card) && game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED)) {
		return true
	} else if (card === C_KOHL_PROPOSES_REUNIFICATION && !game.persistent_events.includes(C_THE_WALL_MUST_GO)) {
		return true
	} else if (card === C_BROUGHT_IN_FOR_QUESTIONING && game.active === DEM) {
		if (game.democrat_hand.length === 0) {
			if (!game.state.startsWith('vm')) {
				log('Democrat has no cards to discard.')
			}
			return true
		}
	} else if (card === C_DEUTSCHE_MARKS && game.active === DEM) {
		if (game.democrat_hand.length === 0) {
			if (!game.state.startsWith('vm')) {
				log('Democrat has no cards to give.')
			}
			return true
		}
	} else if (card === C_KISS_OF_DEATH) {
		if (game.communist_hand.length === 0) {
			if (game.active !== game.round_player)
				change_player()
			return true
		}
	} else if (card === C_DISSIDENT_ARRESTED && game.active === DEM) {
		let dem_intellectual_infl = spaces.filter((space) => space.socio === SOCIO_INTELLECTUAL && game.demInfl[space.space_id] > 0).length
		if (dem_intellectual_infl === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if ((card === C_SAJUDIS || card === C_THE_BALTIC_WAY) && game.active === COM) {
		if (game.systematization && game.systematization === S_HARGHITA_COVASNA) {
			if (check_dem_control(S_RAZGRAD)) {
				if (!game.state.startsWith('vm')) {
					log('Minorities spaces already controlled.')
				}
				return true
			}
		} else if (check_dem_control(S_RAZGRAD) && check_dem_control(S_HARGHITA_COVASNA)) {
			if (!game.state.startsWith('vm')) {
				log('Minorities spaces already controlled.')
			}
			return true
		}
	} else if (card === C_CEAUSESCU && game.active === DEM) {
		let dem_romania_infl = spaces.filter(space => space.country === 'Romania' && game.demInfl[space.space_id] > 0).length
		if (dem_romania_infl === 0) {
			add_to_persistent_events(C_CEAUSESCU)
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_WE_ARE_THE_PEOPLE && game.active === COM) {
		if (game.demInfl[S_LUTHERAN_CHURCH] === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
				add_to_persistent_events(C_WE_ARE_THE_PEOPLE)
			}
			return true
		}
	} else if (card === C_BETRAYAL && game.active === DEM) {
		if (!game.systematization === S_ORTHODOX_CHURCH_ROMANIA) {
			if (game.demInfl[S_ORTHODOX_CHURCH_BULGARIA] === 0) {
				if (!game.state.startsWith('vm')) { log('No influence to remove.') }
				return true
			}
		} else if (game.demInfl[S_ORTHODOX_CHURCH_BULGARIA] === 0 && game.demInfl[S_ORTHODOX_CHURCH_ROMANIA] === 0) {
			if (!game.state.startsWith('vm')) { log('No influence to remove.') }
			return true
		}
	} else if (card === C_GOVERNMENT_RESIGNS && game.active === COM) {
		let uncontrolled_elites = spaces.filter(space => spaces[space.space_id].socio === SOCIO_ELITE && game.comInfl[space.space_id] > 0 && !is_controlled(space.space_id)).length
		if (uncontrolled_elites === 0) {
			if (!game.state.startsWith('vm')) {
				log('No uncontrolled Elite spaces.')
			}
			return true
		}
	} else if (card === C_ST_NICHOLAS_CHURCH && game.active === COM) {
		if (check_dem_control(S_LUTHERAN_CHURCH)) {
			if (!game.state.startsWith('vm')) {
				log('Lutheran Church already controlled.')
			}
			return true
		}
	} else if (card === C_BULGARIAN_TURKS_EXPELLED && game.active === DEM) {
		if (game.demInfl[S_RAZGRAD] === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_NORMALIZATION && game.active === DEM) {
		if (game.demInfl[S_PRAHA] === 0 && game.demInfl[S_PLZEN] === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_DOMINO_THEORY) {
		if (game.revolutions.filter(value => value === true).length < 2) {
			return true
		} else if (!scoring_cards.some(card => game.strategy_discard.includes(card))) {
			return true
		}
	} else if (card === C_UNION_OF_DEMOCRATIC_FORCES && game.active === COM) {
		let bulgarian_presence = spaces.filter(space => space.country === 'Bulgaria' && game.comInfl[space.space_id] > 0).length
		if (bulgarian_presence === 0) {
			if (!game.state.startsWith('vm')) {
				log('No SPs to remove.')
			}
			return true
		}
	} else if (card === C_EXIT_VISAS && game.active === COM) {
		if (game.democrat_hand.length === 0) {
			if (!game.state.startsWith('vm')) {
				log('Democrat has no cards to discard.')
			}
			return true
		}
	} else if (card === C_SAMIZDAT && game.active === COM) {
		if (game.democrat_hand.length === 0) {
			if (!game.state.startsWith('vm')) {
				log('Democrat has no cards to set aside.')
			}
			return true
		}
	} else if (card === C_SPITZEL && game.active === DEM) {
		let dem_germany_infl = spaces.filter(space => space.country === 'East_Germany' && game.demInfl[space.space_id] > 0).length
		if (dem_germany_infl === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_MY_FIRST_BANANA && game.active === COM) {
		let com_germany_infl = spaces.filter(space => space.country === 'East_Germany' && game.comInfl[space.space_id] > 0).length
		if (com_germany_infl === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_POLITBURO_INTRIGUE && game.active === DEM) {
		let dem_bulgaria_infl = spaces.filter(space => space.country === 'Bulgaria' && game.demInfl[space.space_id] > 0).length
		if (dem_bulgaria_infl === 0) {
			if (!game.state.startsWith('vm')) {
				log('No influence to remove.')
			}
			return true
		}
	} else if (card === C_SOLIDARITY_LEGALIZED) {
		let uncontrolled_worker_farmer = vm_valid_spaces_solidarity_legalised()
		if (uncontrolled_worker_farmer.length === 0) {
			if (!game.state.startsWith('vm')) {
				log('No uncontrolled Worker or Farmer spaces in Poland.')
			}
			return true
		}
	} else if (card === C_HONECKER) {
		let valid_cards = false
		for (let c of game.strategy_discard) {
			if (is_honecker_card(c))
				valid_cards = true
		}
		if (!valid_cards) {
			if (game.state === 'vm_brought_in_for_questioning' || !game.state.startsWith('vm')) {
				log('No non-Scoring cards in discard.')
				log(`The Communist may take one extra Action Round this turn.`)
				add_to_persistent_events(C_HONECKER)
			}
			return true
		}
	}
	else {
		return false
	}
}

function event_is_playable(card) {
	if (card === C_REFORMER_REHABILITATED) {
		return false
	} else if (card === C_COMMON_EUROPEAN_HOME) {
		if (game.active === DEM) {
			if (game.stasi_card === C_COMMON_EUROPEAN_HOME) {
				return false
			} else {
				if (ceh_card_check().length > 0)
					return true
			}
		} else {
			if (ceh_card_check().length > 0) {
				return true
			}
		}
	} else if (card === C_GORBACHEV_CHARMS_THE_WEST && !game.playable_cards.includes(C_GORBACHEV_CHARMS_THE_WEST)) {
		return false
	} else if (card === C_SAMIZDAT && game.democrat_hand.length === 0) {
		return false
	} else if (game.playable_cards.includes(card)) {
		return true
	} else if (cards[card].playable) {
		return true
	} else {
		return false
	}
}

function get_card_ops(card) {
	let ops = cards[card].ops
	if (game.persistent_events.includes(C_PERESTROIKA) && game.active === COM) {
		if (
			game.state === 'play_card' ||
			game.state === 'general_strike' ||
			game.state === 'vm_deutsche_marks'
		) {
			log(`+1 Op C${C_PERESTROIKA}.`)
		}
		ops ++
	}
	if (game.persistent_events.includes(C_THE_SINATRA_DOCTRINE) && game.active === DEM) {
		if (
			game.state === 'play_card' ||
			game.state === 'vm_laszlo_tokes'
		) {
			log(`+1 Op C${C_THE_SINATRA_DOCTRINE}.`)
		}
		ops ++
	}
	if (
		(game.active === DEM && game.dem_tst_position >= 2 && game.com_tst_position <= 1 && cards[card].ops === 1) ||
		(game.active === COM && game.com_tst_position >= 2 && game.dem_tst_position <= 1 && cards[card].ops === 1)
	) {
		if (
			game.state === 'play_card' ||
			game.state === 'general_strike'
		) {
			log('+1 Op Tiananmen Square Track.')
		}
		ops ++
	}
	if (game.active === DEM && game.prudence && game.prudence.DEM !== 0) {
		if (
			game.state === 'play_card' ||
			game.state === 'vm_laszlo_tokes'
		) {
			if (ops > 2) {
				log(`${pluralize(game.prudence.DEM,'Op')} C${C_PRUDENCE}.`)
			} else {
				if (ops > 1) {
					log(`-1 Op C${C_PRUDENCE}.`)
				}
			}
		}
		ops += game.prudence.DEM
		if (ops < 1) {
			ops = 1
		}
	}
	if (game.active === COM && game.prudence && game.prudence.COM < 0) {
		if (
			game.state === 'play_card' ||
			game.state === 'general_strike'
		) {
			if (ops > 2) {
				log(`${pluralize(game.prudence.COM,'Op')} C${C_PRUDENCE}.`)
			} else if (ops > 1) {
				log(`-1 Op C${C_PRUDENCE}.`)
			}
		}
		ops += game.prudence.COM
		if (ops < 1) {
			ops = 1
		}
	}
	return ops
}

function get_tst_6_ops() {
	let ops = 0
	if (game.persistent_events.includes(C_PERESTROIKA) && game.active === COM) {
		logi(`+1 Op C${C_PERESTROIKA}.`)
		ops ++
	}
	if (game.persistent_events.includes(C_THE_SINATRA_DOCTRINE) && game.active === DEM) {
		logi(`+1 Op C${C_THE_SINATRA_DOCTRINE}.`)
		ops ++
	}
	if (game.active === DEM && game.prudence && game.prudence.DEM !== 0) {
		if (ops > 0) {
			log(`${pluralize(game.prudence.DEM,'Op')} C${C_PRUDENCE}.`)
		} else {
			logi(`-1 Op C${C_PRUDENCE}.`)
		}
		ops += game.prudence.DEM
		if (ops < -1) {
			ops = -1
		}
	}
	if (game.active === COM && game.prudence && game.prudence.COM < 0) {
		if (ops > 0) {
			logi(`${pluralize(game.prudence.COM,'Op')} C${C_PRUDENCE}.`)
		} else {
			logi(`-1 Op C${C_PRUDENCE}.`)
		}
		ops += game.prudence.COM
		if (ops < -1) {
			ops = -1
		}
	}
	return ops
}

function finish_play_card() {
	if (cards[game.played_card].playable || game.playable_cards.includes(game.played_card)) {
		if (
			(game.active === DEM && cards[game.played_card].side === 'C') ||
			(game.active === COM && cards[game.played_card].side === 'D')
		) {
			game.vm_event_to_do = true
		}
	}
}

function finish_the_wall() {
	if (game.the_wall_must_go['dem_wins'] === 2) {
		delete game.the_wall_must_go
		add_to_persistent_events(C_THE_WALL_MUST_GO)
		game.playable_cards = game.playable_cards.filter(card => card !== C_THE_WALL)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		for (let i = 0; i < spaces.length; i++) {
			let space = spaces[i]
			if (space.country === 'East_Germany' && game.comInfl[i] > 0) {
				game.valid_spaces.push(space.space_id)
			}
		}
		if (game.active === DEM) {
			change_player()
		}
		game.return = COM
		log('Communist removed SP:')
		vm_next()
	} else {
		permanently_remove(C_THE_WALL_MUST_GO)
		delete game.the_wall_must_go
		if (game.vm_infl_to_do) {
			game.return = COM
		} else {
			game.return = game.active
		}
		vm_return()
	}
}

function finish_we_are_the_people() {
	game.valid_spaces = [...S_EAST_GERMANY]
	game.vm_max_infl = 2
	game.vm_available_ops = game.vm_influence_added[S_LUTHERAN_CHURCH]
	log('Placed SP:')
	game.state = 'vm_we_are_the_people_add'
}

// =========== MOVING THROUGH TURNS ============

function end_round() {
	if (game.state === 'game_over') {
		return
	}
	if (game.persistent_events.includes(C_CEAUSESCU)) {
		if (check_ceausescu())
			return
	}
	delete game.played_card
	delete game.temp
	delete game.vm_event
	delete game.phase
	game.remove_opponent_infl = false
	game.is_pwr_struggle = false
	game.vm_infl_to_do = false
	delete game.vm_event_to_do
	delete game.vm_infl_to_do
	delete game.vm_active_country
	delete game.return_state
	game.discard = false
	game.return = ''
	game.valid_cards = []
	game.valid_spaces = []
	delete game.genscher_logged
	reset_austria_hungary_border_reopened()
	check_reformer()

	// Check for duplicate card entries
	let card_check
	if (game.samizdat_card > 0) {
		card_check = [...game.strategy_deck, ...game.strategy_discard, ...game.strategy_removed, ...game.persistent_events, ...game.communist_hand, ... game.democrat_hand, game.samizdat_card]
	} else {
		card_check = [...game.strategy_deck, ...game.strategy_discard, ...game.strategy_removed, ...game.persistent_events, ...game.communist_hand, ... game.democrat_hand]
	}
	card_check = card_check.filter(card => card <= last_strategy_card)
	function check_duplicates(array) {
		return new Set(array).size !== array.length
	}
	function find_duplicates(array) {
		const duplicates = array.filter((item, index) => array.indexOf(item) !== index)
		return [...new Set(duplicates)]
	}
	card_check = card_check.sort((a, b) => a - b)
	if (check_duplicates(card_check)) {
		const duplicates = find_duplicates(card_check)
		throw new Error(`Duplicate cards detected: ${duplicates.join(', ')}`)
	}
	if (game.turn <= 3) {
		if (card_check.length !== 40) {
			throw new Error(`Wrong number of cards: ${card_check.length}`)
		}
	} else if (game.turn <= 7) {
		if (card_check.length !== 81) {
			throw new Error(`Wrong number of cards: ${card_check.length}`)
		}
	} else if (card_check.length !== 110) {
		throw new Error(`Wrong number of cards: ${card_check.length}`)
	}

	// Check if last round and if so resolve end turn events
	if (game.round_player === DEM && game.round === 7) {
		if (game.persistent_events.includes(C_HONECKER)) {
			if (game.active !== COM) {
				change_player()
			}
			game.state = 'honecker'
			return
		} else if (game.dem_tst_position >= 6 && game.com_tst_position <= 5) {
			if (game.active !== DEM) {
				change_player()
			}
			game.return = game.active
			clear_undo()
			game.return_state = 'end_turn_4_5_4'
			goto_vm(206)
			return
		} else if (game.com_tst_position >= 6 && game.dem_tst_position <= 5) {
			if (game.active !== COM) {
				change_player()
			}
			game.return = game.active
			clear_undo()
			game.return_state = 'end_turn_4_5_4'
			goto_vm(206)
			return
		} else {
			clear_undo()
			game.state = 'end_turn_4_5_4'
			return
		}
	}

	// Resolve end action round
	if (game.round_player === COM && game.persistent_events.includes(C_STASI)) {
		if (game.round === 8) {
			clear_undo()
			game.state = 'end_turn_4_5_4'
			return
		}
		game.round_player = DEM
		if (game.active !== DEM) {
			change_player()
		}
		if (game.democrat_hand.includes(game.stasi_card)) {
			game.state = 'stasi_play_card'
		} else {
			game.stasi_card = 0
			game.state = 'choose_card'
		}
		return
	} else if (game.round_player === COM && game.round === 8) {
		clear_undo()
		game.state = 'end_turn_4_5_4'
		return
	} else if (game.round_player === COM) {
		game.round_player = DEM
		if (game.active !== DEM) {
			change_player()
		}
		game.state = 'choose_card'
		return
	}
	if (game.round_player === DEM) {
		if (game.persistent_events.includes(C_STASI)) {
			if (game.active !== DEM) {
				change_player()
			}
			log_h3('C' + C_STASI)
			game.state = 'stasi_end_round'
			return
		} else if (game.round_player === DEM && game.persistent_events.includes(C_GENERAL_STRIKE)) {
			game.state = 'general_strike'
			game.round ++
			log_round()
			game.round_player = COM
			if (game.active !== COM) {
				change_player()
			}
			log('.cC' + C_GENERAL_STRIKE)
			return
		} else {
			game.state = 'choose_card'
			game.round_player = COM
			game.round ++
			log_round()
			if (game.active !== COM) {
				change_player()
			}
		}
	}
}

function new_turn() {
	clear_undo()
	game.turn ++
	game.round = 1
	game.valid_spaces = []
	game.active = COM
	game.round_player = COM
	game.dem_tst_attempted_this_turn = 0
	game.com_tst_attempted_this_turn = 0
	delete game.selected_space
	delete game.return_state
	delete game.stasi_card
	delete game.stand_fast
	if (game.tst_7)
		game.tst_7 = false
	if (game.tst_8)
		game.tst_8 = false

	// Remove events that only last one turn
	let no_longer_in_effect = []
	for (let e of one_turn_events) {
		if (game.persistent_events.includes(e)) {
			end_one_turn_event(e)
			no_longer_in_effect.push(e)
		}
	}
	if (game.prudence) {
		delete game.prudence
		game.persistent_events = game.persistent_events.filter( c => c !== EXTRA_PRUDENCE)
		no_longer_in_effect.push(C_PRUDENCE)
	}
	if (no_longer_in_effect.length > 0) {
		log('No longer in effect:')
		for (let c of no_longer_in_effect)
			logi("C" + c)
	}
	if (game.samizdat_card > 0) {
		game.democrat_hand.push(game.samizdat_card)
		delete game.samizdat_card
	}
	// New Turn
	log_h1("Turn " + game.turn)
	if (game.turn === 4) {
		add_midyear()
	}
	if (game.turn === 8) {
		add_lateyear()
	}
	if (game.turn > 1) {
		if (game.persistent_events.includes(C_PRESIDENTIAL_VISIT)) {
			game.com_hand_limit = 7
			log('Communist draws 7 cards due to C' + C_PRESIDENTIAL_VISIT + '.')
			permanently_remove(C_PRESIDENTIAL_VISIT)
			game.persistent_events = game.persistent_events.filter(card => card !== C_PRESIDENTIAL_VISIT)
		}
		draw_cards(game.strategy_deck, game.democrat_hand, game.communist_hand, game.dem_hand_limit, game.com_hand_limit)
		game.com_hand_limit = 8
	}
	// Check if TST effects need to be resolved
	if (
		(game.dem_tst_position >= 5 && game.com_tst_position <= 4) ||
		(game.com_tst_position >= 5 && game.dem_tst_position <= 4)
	) {
		log_h2('Tiananmen Square Track Award')
		if (
			(game.dem_tst_position >= 5 && game.com_tst_position <= 4 && game.active !== DEM) ||
			(game.com_tst_position >= 5 && game.dem_tst_position <= 4 && game.active !== COM)
		) {
			change_player()
		}
		let hand = game.dem_tst_position >= 5 ? game.democrat_hand : game.communist_hand
		for (let card of hand) {
			if (scoring_cards.includes(card))
				continue
			game.valid_cards.push(card)
		}
		if (game.active === DEM)
			log('Democrat:')
		else
			log('Communist:')
		game.state = 'tst_goddess'
	} else {
		log_h2("Action Round " + game.round)
		if (game.persistent_events.includes(C_GENERAL_STRIKE)) {
			log('.cC' + C_GENERAL_STRIKE)
			game.state = 'general_strike'
		} else {
			game.state = 'choose_card'
		}
	}
}

function end_one_turn_event(event) {
	game.persistent_events = game.persistent_events.filter(n => n !== event)
	game.strategy_removed.push(event)
	if (event === C_FOREIGN_CURRENCY_DEBT_BURDEN)
		delete game.foreign_currency_debt_burden
}

function change_player() {
	clear_undo()
	if (game.active === DEM)
		game.active = COM
	else
		game.active = DEM
}

function random(range) {
	return (game.seed = game.seed * 200105 % 34359738337) % range
}

function roll_d6() {
	return random(6) + 1
}

function find_country_index(country) {
	return countries.indexOf(country)
}

function own_power_hand() {
	if (game.active === COM)
		return game.com_pwr_hand
	else
		return game.dem_pwr_hand
}

function draw_deck() {
	let deck = []
	for (let c = first_strategy_card; c <= last_strategy_card; ++c)
		if (cards[c].period === 1)
			deck.push(c)
	return deck
}

function draw_cards(deck, democrat_hand, communist_hand, dem_hand_limit, com_hand_limit) {
	clear_undo()
	let turn = "communist"
	let did_reshuffle = false
	while (democrat_hand.length < dem_hand_limit || communist_hand.length < com_hand_limit) {
		if (deck.length === 0) {
			did_reshuffle = true
			reshuffle(deck)
		} else if (turn === "communist" && communist_hand.length < com_hand_limit) {
			communist_hand.push(draw_card(deck))
			turn = "democrat"
		} else if (turn === "communist" && communist_hand.length >= com_hand_limit) {
			turn = "democrat"
		} else if (turn === "democrat" && democrat_hand.length < dem_hand_limit) {
			democrat_hand.push(draw_card(deck))
			turn = "communist"
		} else if (turn === "democrat" && democrat_hand.length >= dem_hand_limit) {
			turn = "communist"
		} else {
			break
		}
	}
	if (deck.length === 0) {
		if (game.state.startsWith('vm_support_surges'))
			return
		log("Deck is empty.")
		if (!did_reshuffle)
			reshuffle(deck)
	}
}

function reshuffle(deck) {
	log_h3("--- Reshuffle ---")
	deck.push(...game.strategy_discard)
	game.strategy_discard = []
}

function draw_card(deck) {
	if (deck.length === 0) {
		log_h3('--- Reshuffle ---')
		deck.push(...game.strategy_discard)
		game.strategy_discard = []
	}
	const randomIndex = Math.floor(random(deck.length))
	return deck.splice(randomIndex, 1)[0]
}

function discard(card) {
	let find_card
	if (!game.is_pwr_struggle) {
		if (game.active === COM) {
			find_card = game.communist_hand.indexOf(card)
			game.communist_hand.splice(find_card, 1)
		} else {
			find_card = game.democrat_hand.indexOf(card)
			game.democrat_hand.splice(find_card, 1)
		}
		if (!game.strategy_discard.includes(card)) {
			game.strategy_discard.push(card)
			if (game.state === 'vm_tst_3')
				logi(`Discarded C${card}.`)
			else
				log(`Discarded C${card}.`)
		}
	} else if (game.is_pwr_struggle) {
		if (game.active === COM) {
			find_card = game.com_pwr_hand.indexOf(card)
			game.com_pwr_hand.splice(find_card, 1)
		} else {
			find_card = game.dem_pwr_hand.indexOf(card)
			game.dem_pwr_hand.splice(find_card, 1)
		}
		game.power_struggle_discard.push(card)
	}
}

function silent_discard(card) {
	let find_card
	if (!game.is_pwr_struggle) {
		remove_from_hand(card)
	} else if (game.is_pwr_struggle) {
		if (game.active === COM) {
			find_card = game.com_pwr_hand.indexOf(card)
			game.com_pwr_hand.splice(find_card, 1)
		} else {
			find_card = game.dem_pwr_hand.indexOf(card)
			game.dem_pwr_hand.splice(find_card, 1)
		}
		game.power_struggle_discard.push(card)
	}
}

function remove_from_discard(card) {
	let card_index = game.strategy_discard.indexOf(card)
	if (card_index !== -1) {
		game.strategy_discard.splice(card_index, 1)
	}
}

function discard_card(hand) {
	let card = Math.floor(random(hand.length))
	let discarded_card = hand.splice(card, 1)[0]
	if (game.is_pwr_struggle) {
		if (numberless_cards.includes(discarded_card)) {
			logi(`Discarded P${discarded_card}`)
		} else {
			logi(`Discarded P${discarded_card} V${power_cards[discarded_card].value}`)
		}
		game.power_struggle_discard.push(discarded_card)
	} else {
		if (game.state !== 'vm_brought_in_for_questioning')
			log(`Discarded C${discarded_card}.`)
		game.strategy_discard.push(discarded_card)
	}
	return discarded_card
}

function add_midyear() {
	for (let c = first_strategy_card; c <= last_strategy_card; ++c)
		if (cards[c].period === 2)
			game.strategy_deck.push(c)
	log_h3('Mid-year cards added to draw deck')
}

function add_lateyear() {
	for (let c = first_strategy_card; c <= last_strategy_card; ++c)
		if (cards[c].period === 3)
			game.strategy_deck.push(c)
	log_h3('Late-year cards added to draw deck')
}

function reset_power() {
	game.power_struggle_deck = []
	game.power_struggle_discard = []
	game.dem_pwr_hand = []
	game.com_pwr_hand = []
	game.is_pwr_struggle = false
	delete game.return_state
	delete game.phase
	delete game.raised_stakes_round
	delete game.raised_stakes
	delete game.raised_stakes_discard
	delete game.played_power_card
	delete game.tactics_fails
	delete game.opp_power_hand
	delete game.ps_round
	delete game.vp_roll
	delete game.vp_retain
	let scoring_events = [C_PEASANT_PARTIES_REVOLT, C_YAKOVLEV_COUNSELS_GORBACHEV, C_THE_CROWD_TURNS_AGAINST_CEAUSESCU]
	for (let e of scoring_events) {
		if (e === C_THE_CROWD_TURNS_AGAINST_CEAUSESCU) {
			if (game.persistent_events.includes(e) && game.pwr_struggle_in === 'Romania') {
				permanently_remove(e)
			}
		} else if (game.persistent_events.includes(e)) {
			permanently_remove(e)
		}
	}
}

function check_ceausescu() {
	game.return = game.active
	game.return_state = 'ceausescu_check'
	game.vm_infl_to_do = false
	game.vm_event = C_CEAUSESCU
	goto_vm(game.vm_event)
	return true
}

function check_tyrant() {
	if (game.the_tyrant_is_gone > 0 && check_dem_control(game.the_tyrant_is_gone)) {
		game.tyrant_log = '+2 VP C' + C_THE_TYRANT_IS_GONE + '.'
		game.vp += 2
		if (check_vp()) {
			summary_flush()
			return
		}
		delete game.the_tyrant_is_gone
	}
}

function check_tyrant_sc() {
	if (game.the_tyrant_is_gone > 0 && check_dem_control(game.the_tyrant_is_gone)) {
		log('+2 VP C' + C_THE_TYRANT_IS_GONE + '.')
		game.vp += 2
		if (check_vp()) {
			return
		}
		delete game.the_tyrant_is_gone
	}
}

function resolve_tyrant() {
	if (
		game.persistent_events.includes(C_THE_TYRANT_IS_GONE) &&
		!game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) &&
		game.pwr_struggle_in === 'Romania' &&
		game.persistent_events.includes(THE_CROWD_TURNS_AGAINST_CEAUSESCU_OCCURRED)
	) {
		game.return_state = 'finish_scoring'
		if (game.active !== DEM) {
			change_player()
		}
		game.state = 'the_tyrant_is_gone'
	} else {
		game.state = 'finish_scoring'
	}
}

function check_systematization() {
	if (game.systematization > 0) {
		game.valid_spaces = game.valid_spaces.filter(n => n !== game.systematization)
	}
}

function this_card() {
	return game.vm_event > 0 ? game.vm_event : game.played_card
}

const pluralize = (count, noun, suffix = 's') => {
	if (Math.abs(count) === 1) {
		return `${count} ${noun}`
	} else {
		if (noun.endsWith('y') && !/[aeiou]y$/.test(noun)) {
			noun = noun.slice(0, -1) + 'ie'
		}
		return `${count} ${noun}${suffix}`
	}
}

function clean_name(str) {
	if (str && str.slice(-1) === '*') {
		return str.slice(0, -1)
	} else {
		return str
	}
}

function country_name(country) {
	return country.replace(/_/g, ' ')
}

// ======== LOG FUNCTIONS =============

function log(msg) {
	game.log.push(msg)
}

function log_ops_banner() {
	log_br()
	if (game.active === DEM)
		log('.O.d')
	else
		log('.O.c')
	log_br()
	finish_select_card()
}

function log_pass_banner() {
	log_br()
	if (game.active === DEM)
		log('.P.d')
	else
		log('.P.c')
	log_br()
}

function log_event_banner() {
	log_br()
	if (game.active === DEM)
		log('.V.d')
	else
		log('.V.c')
	log_br()
}

function log_struggle_banner(n) {
	log_br()
	if (game.active === DEM)
		log('.S.dC' + n)
	else
		log('.S.cC' + n)
	log_br()
}

function log_tst_8_banner() {
	log_br()
	if (game.active === DEM)
		log('.T.d')
	else
		log('.T.c')
	log_br()
	finish_select_card()
}

function log_event(n) {
	log_br()
	if (cards[n].side === "C")
		log(".E:C" + n + ".C")
	else if (cards[n].side === "D")
		log(".E:C" + n + ".D")
	else
		log(".E:C" + n + ".N")
}

function log_br() {
	if (game.log.length > 0 && game.log[game.log.length - 1] !== "")
		game.log.push("")
}

function logi(msg) {
	log(">" + msg)
}

function logii(msg) {
	log(">>" + msg)
}

function log_h1(msg) {
	log_br()
	log(".h1 " + msg)
	log_br()
}

function log_h2(msg) {
	log_br()
	log(".h2 " + msg)
	log_br()
}

function log_h3(msg) {
	log_br()
	log(".h3 " + msg)
	log_br()
}

function log_h4(msg) {
	log_br()
	log(".h4 " + msg)
}

function log_h5(msg) {
	log_br()
	log(".h5 " + msg)
}

function log_gap(msg) {
	log_br()
	log(msg)
}

function log_round() {
	log_h2(`Action Round ${game.round}`)
}

// ============= INFLUENCE SUMMARY =============

function summary_influence(space) {
	map_set(game.summary, space, map_get(game.summary, space, 0) + 1)
}

function summary_flush() {
	if (game.summary.length > 0) {
		map_for_each(game.summary, (space, n) => {
			game.log.push(">" + n + " %" + space)
		})
		map_clear(game.summary)
	} else {
		logi("None")
	}
	if (game.tyrant_log) {
		log(game.tyrant_log)
		delete game.tyrant_log
	}
}

// ============ MAP AND SET FUNCTIONS ===========

function array_insert_pair(array, index, key, value) {
	for (let i = array.length; i > index; i -= 2) {
		array[i] = array[i-2]
		array[i+1] = array[i-1]
	}
	array[index] = key
	array[index+1] = value
}

function map_clear(map) {
	map.length = 0
}

function map_get(map, key, missing) {
	let a = 0
	let b = (map.length >> 1) - 1
	while (a <= b) {
		let m = (a + b) >> 1
		let x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else
			return map[(m<<1)+1]
	}
	return missing
}

function map_set(map, key, value) {
	let a = 0
	let b = (map.length >> 1) - 1
	while (a <= b) {
		let m = (a + b) >> 1
		let x = map[m<<1]
		if (key < x)
			b = m - 1
		else if (key > x)
			a = m + 1
		else {
			map[(m<<1)+1] = value
			return
		}
	}
	array_insert_pair(map, a<<1, key, value)
}

function map_for_each(map, f) {
	for (let i = 0; i < map.length; i += 2)
		f(map[i], map[i+1])
}

// ============ UNDO FUNCTIONS ==================

function clear_undo() {
	if (game.undo.length > 0)
		game.undo = []
}

function push_undo() {
	let copy = {}
	for (let k in game) {
		let v = game[k]
		if (k === "undo")
			continue
		else if (k === "log")
			v = v.length
		else if (typeof v === "object" && v !== null)
			v = object_copy(v)
		copy[k] = v
	}
	game.undo.push(copy)
}

function pop_undo() {
	let save_log = game.log
	let save_undo = game.undo
	game = save_undo.pop()
	save_log.length = game.log
	game.log = save_log
	game.undo = save_undo
}

// Fast deep copy for objects without cycles
function object_copy(original) {
	if (Array.isArray(original)) {
		let n = original.length
		let copy = new Array(n)
		for (let i = 0; i < n; ++i) {
			let v = original[i]
			if (typeof v === "object" && v !== null)
				copy[i] = object_copy(v)
			else
				copy[i] = v
		}
		return copy
	} else {
		let copy = {}
		for (let i in original) {
			let v = original[i]
			if (typeof v === "object" && v !== null)
				copy[i] = object_copy(v)
			else
				copy[i] = v
		}
		return copy
	}
}

/* =================== VM FUNCTIONS ========================== */

function goto_vm(proc) {
	let old_vm = game.vm
	game.state = "vm"
	game.vm = {
		prompt: 0,
		fp: proc,
		ip: 0,
	}
	if (old_vm) {
		game.vm.return_vm = old_vm
	}
	vm_exec()
}

function vm_exec() {
	vm_inst(0)()
}

function vm_inst(a) {
	return CODE[game.vm.fp][game.vm.ip][a]
}

function vm_next() {
	if (game.summary.length > 0)
		summary_flush()
	game.vm.ip++
	vm_exec()
}

function vm_log() {
	log(vm_operand(1))
	vm_next()
}

function vm_operand(a) {
	let x = CODE[game.vm.fp][game.vm.ip][a]
	if (a > 0 && typeof x === "function")
		return x()
	return x
}

function vm_if() {
	if (!vm_operand(1)) {
		let balance = 1
		while (balance > 0) {
			++game.vm.ip
			switch (vm_operand(0)) {
				case vm_if:
					++balance
					break
				case vm_endif:
					--balance
					break
				case vm_else:
					if (balance === 1)
						--balance
					break
			}
			if (game.vm.ip < 0 || game.vm.ip > CODE[game.vm.fp].length)
				throw "ERROR"
		}
	}
	vm_next()
}

function vm_else() {
	vm_goto(vm_endif, vm_if, 1, 1)
}

function vm_endif() {
	vm_next()
}

function vm_goto(op, nop, dir, step) {
	let balance = 1
	while (balance > 0) {
		game.vm.ip += dir
		if (vm_inst(0) === op)
			--balance
		if (vm_inst(0) === nop)
			++balance
		if (game.vm.ip < 0 || game.vm.ip > CODE[game.vm.fp].length)
			throw "ERROR"
	}
	game.vm.ip += step
	vm_exec()
}

function prompt_event(str) {
	if (this_card() > 0) {
		view.prompt = card_name[this_card()] + ": " + str
	} else {
		view.prompt = str
	}
}

function event_prompt(str) {
	if (typeof str === "undefined")
		str = CODE[game.vm.fp][game.vm.prompt][1]
	if (typeof str === "function")
		str = str()
	if (!str) {
		str = ""
	}
	return str
}

function vm_prompt() {
	if (game.vm.prompt)
		game.vm._prompt = game.vm.prompt
	game.vm.prompt = game.vm.ip
	vm_next()
}

function vm_return() {
	delete game.support_check_modifier
	delete game.vm_max_infl
	delete game.vm_influence_added
	delete game.communist_hand_red
	game.vm_event = 0

	if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
		reset_austria_hungary_border_reopened()
	}
	if (game.is_pwr_struggle || game.state === 'vm_tst_6' || game.state === 'vm_tst_3' || game.return_state === 'ceausescu_check') {
		vm_end_event()
	} else if ((is_auto_resolve(game.played_card) && game.played_card !== C_KISS_OF_DEATH ) &&
			((cards[game.played_card].side === 'C' && game.active === DEM) ||
				(cards[game.played_card].side === 'D' && game.active === COM))
	) {
		vm_end_event()
	} else {
		game.state = 'vm_end_event'
	}
}

function vm_end_event() {
	if (game.return_state === 'ceausescu_check') {
		end_round()
		return
	}
	if (game.return !== game.active)
		change_player()
	if (game.return_state === 'power_struggle')
		do_valid_cards()
	if (game.return_state && game.return_state !== '')
		game.state = game.return_state
	else if (game.vm_infl_to_do) {
		game.state = 'resolve_opponent_event'
	} else {
		end_round()
	}
}

/* ================== VM ACTIONS =========================== */

function vm_valid_spaces() {
	for (let i = 1; i <= 6; i++) {
		let operand = vm_operand(i)
		if (operand) {
			let space = spaces.find(space => space.ascii_name === operand)
			game.valid_spaces.push(space.space_id)
		}
	}
	check_systematization()
	vm_next()
}

function vm_valid_spaces_opponent() {
	let valid_spaces = []
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (game.active === DEM) {
			let infl = game.comInfl[i]
			if (infl > 0) {
				valid_spaces.push(space.space_id)
			}
		} else {
			let infl = game.demInfl[i]
			if (infl > 0) {
				valid_spaces.push(space.space_id)
			}
		}
	}
	game.valid_spaces = valid_spaces
	vm_next()
}

function vm_valid_spaces_socio() {
	let valid_spaces = []
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (space.socio === vm_operand(1)) {
			valid_spaces.push(space.space_id)
		}
	}
	game.valid_spaces = valid_spaces
	check_systematization()
	vm_next()
}

function vm_valid_spaces_socio_2_sc() {
	let socios = [vm_operand(1), vm_operand(2)]
	valid_spaces_sc()
	game.valid_spaces = game.valid_spaces.filter(s => socios.includes(spaces[s].socio))
	vm_next()
}

function vm_valid_spaces_opponent_socio() {
	let valid_spaces = []
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (game.active === DEM) {
			let infl = game.comInfl[i]
			if (infl > 0 && space.socio === vm_operand(1)) {
				valid_spaces.push(space.space_id)
			}
		} else {
			let infl = game.demInfl[i]
			if (infl > 0 && space.socio === vm_operand(1)) {
				valid_spaces.push(space.space_id)
			}
		}
	}
	game.valid_spaces = valid_spaces
	check_systematization()
	vm_next()
}

function vm_valid_spaces_country() {
	let country
	if (vm_operand(1)) {
		country = vm_operand(1)
	} else {
		country = game.vm_active_country
	}
	for (let space of spaces) {
		if (space.country === country) {
			game.valid_spaces.push(space.space_id)
		}
	}
	check_systematization()
	vm_next()
}

function vm_valid_spaces_sc() {
	valid_spaces_sc()
	vm_next()
}

function vm_valid_spaces_country_opp() {
	let country = ''
	if (vm_operand(1)) {
		country = vm_operand(1)
	} else {
		country = game.vm_active_country
	}
	for (let space of spaces) {
		if (game.active === DEM) {
			if (space.country === country && game.comInfl[space.space_id] > 0) {
				game.valid_spaces.push(space.space_id)
			}
		} else {
			if (space.country === country && game.demInfl[space.space_id] > 0) {
				game.valid_spaces.push(space.space_id)
			}
		}
	}
	vm_next()
}

function vm_valid_spaces_country_sc() {
	let active_country
	if (vm_operand(1)) {
		active_country = vm_operand(1)
	} else {
		active_country = game.vm_active_country
	}
	valid_spaces_sc()
	game.valid_spaces = game.valid_spaces.filter(s => spaces[s].country === active_country)
	vm_next()
}

function vm_valid_spaces_country_socio_2() {
	for (let space of spaces) {
		if (space.space_id === game.systematization)
			continue
		if (
			(space.country === vm_operand(1) && space.socio === vm_operand(2)) ||
			(space.country === vm_operand(1) && space.socio === vm_operand(3))
		) {
			game.valid_spaces.push(space.space_id)
		}
	}
	vm_next()
}

function vm_valid_spaces_region_socio() {
	let valid_spaces = []
	for (let space of spaces) {
		if (space.space_id === game.systematization)
			continue
		if (space.region === vm_operand(1) && space.socio === vm_operand(2)) {
			valid_spaces.push(space.space_id)
		}
	}
	game.valid_spaces = valid_spaces
	vm_next()
}

function vm_valid_spaces_region_opp() {
	let valid_spaces = []
	for (let space of spaces) {
		let s = space.space_id
		if (
			(game.active === DEM && space.region === vm_operand(1) && game.comInfl[s] > 0) ||
			(game.active === COM && space.region === vm_operand(1) && game.demInfl[s] > 0)
		) {
			valid_spaces.push(space.space_id)
		}
	}
	game.valid_spaces = valid_spaces
	vm_next()
}

function vm_valid_spaces_solidarity_legalised() {
	let valid_spaces = []
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		let uncontrolled = !is_controlled(i) && !check_opp_control(i)
		if (
			(space.country === 'Poland' && uncontrolled && space.socio === SOCIO_WORKER) ||
			(space.country === 'Poland' && uncontrolled && space.socio === SOCIO_FARMER)
		) {
			valid_spaces.push(space.space_id)
		}
	}
	return valid_spaces
}

function vm_active_country () {
	game.valid_spaces = game.valid_spaces.filter(space_id => spaces[space_id].country === game.vm_active_country)
	vm_next()
}

function vm_take_control_prep() {
	game.vm_available_ops = vm_operand(1)
	game.state = 'vm_take_control'
}

function vm_take_control(space) {
	if (game.active === DEM) {
		let current_infl = game.demInfl[space]
		let opponent_infl = game.comInfl[space]
		let stability = spaces[space].stability

		if ((current_infl - opponent_infl) < stability) {
			game.demInfl[space] += stability - current_infl + opponent_infl
		}
	} else if (game.active === COM) {
		let current_infl = game.comInfl[space]
		let opponent_infl = game.demInfl[space]
		let stability = spaces[space].stability

		if ((current_infl - opponent_infl) < stability) {
			game.comInfl[space] += stability - current_infl + opponent_infl
		}
	}
	game.valid_spaces = game.valid_spaces.filter(id => id !== space)
	if (game.state === 'vm_kremlin_coup_take_control')
		logi('Took control of %' + space + '.')
	else
		log('Took control of %' + space + '.')
}

function vm_do_add_infl_free(space) {
	push_undo()
	if (game.active === COM) {
		game.comInfl[space]++
	} else {
		game.demInfl[space]++
	}
	summary_influence(space)
	game.vm_available_ops--
	check_tyrant()
}

function vm_add_infl() {
	if (vm_operand(1)) {
		game.vm_available_ops = vm_operand(1)
	}
	game.state = 'vm_add_infl'
}

function vm_add_infl_free() {
	if (vm_operand(1)) {
		game.vm_available_ops = vm_operand(1)
	}
	log('Placed SP:')
	game.state = 'vm_add_infl_free'
}

function vm_add_x_infl() {
	game.vm_available_ops = vm_operand(1)
	if (!(game.vm_event === C_PUBLIC_AGAINST_VIOLENCE &&
		event_prompt() === 'Presov'))
		log('Placed SP:')
	game.state = 'vm_add_x_infl'
}

function vm_do_add_x_infl(space) {
	push_undo()
	if (game.active === COM) {
		game.comInfl[space] += game.vm_available_ops
	} else {
		game.demInfl[space] += game.vm_available_ops
	}
	logi(`${game.vm_available_ops} %${space}`)
	check_tyrant()
	game.vm_available_ops = 0
	game.valid_spaces = []
}

function vm_add_limited_infl() {
	game.vm_available_ops = vm_operand(1)
	game.vm_max_infl = vm_operand(2)
	log('Placed SP:')
	game.state = 'vm_add_limited_infl'
}

function vm_do_add_limited_infl(space, max_infl) {
	push_undo()
	game.vm_available_ops --
	if (!game.vm_influence_added) {
		game.vm_influence_added = {}
	}
	if (!game.vm_influence_added[space]) {
		game.vm_influence_added[space] = 0
	}
	if (game.active === COM) {
		game.comInfl[space] ++
	} else {
		game.demInfl[space] ++
	}
	summary_influence(space)
	game.vm_influence_added[space] ++
	if (game.vm_influence_added[space] === max_infl) {
		game.valid_spaces = game.valid_spaces.filter(id => id !== space)
	}
	check_tyrant()
	if (game.vm_available_ops === 0) {
		game.valid_spaces = []
	}
}

function vm_remove_infl() {
	game.vm_available_ops = vm_operand(1)
	game.state = 'vm_remove_infl'
}

function vm_remove_opp_infl() {
	game.vm_available_ops = vm_operand(1)
	game.remove_opponent_infl = true
	if (game.is_pwr_struggle) {
		game.state = 'vm_scare_tactics'
	} else {
		log('Removed SP:')
		game.state = 'vm_remove_infl'
	}
}

function vm_remove_x_opp_infl() {
	game.vm_available_ops = vm_operand(1)
	game.remove_opponent_infl = true
	log('Removed SP:')
	game.state = 'vm_remove_x_infl'
}

function vm_do_remove_x_infl(space) {
	push_undo()
	if (game.remove_opponent_infl) {
		if (game.active === COM) {
			if (game.demInfl[space] >= game.vm_available_ops) {
				game.demInfl[space] -= game.vm_available_ops
			} else {
				game.vm_available_ops = game.demInfl[space]
				game.demInfl[space] -= game.vm_available_ops
			}
		} else {
			if (game.comInfl[space] >= game.vm_available_ops) {
				game.comInfl[space] -= game.vm_available_ops
			} else {
				game.vm_available_ops = game.comInfl[space]
				game.comInfl[space] -= game.vm_available_ops
			}
		}
	} else {
		if (game.active === COM) {
			if (game.comInfl[space] >= game.vm_available_ops) {
				game.comInfl[space] -= game.vm_available_ops
			} else {
				game.vm_available_ops = game.comInfl[space]
				game.comInfl[space] -= game.vm_available_ops
			}
		} else {
			if (game.demInfl[space] >= game.vm_available_ops) {
				game.demInfl[space] -= game.vm_available_ops
			} else {
				game.vm_available_ops = game.demInfl[space]
				game.demInfl[space] -= game.vm_available_ops
			}
		}
	}
	logi(`${game.vm_available_ops} from %${space}`)
	check_tyrant()
	game.vm_available_ops = 0
	game.valid_spaces = []
}

function vm_remove_limited_opp_infl() {
	game.vm_available_ops = vm_operand(1)
	game.vm_max_infl = vm_operand(2)
	game.remove_opponent_infl = true
	log('Removed SP:')
	game.state = 'vm_remove_limited_infl'
}

function vm_do_remove_limited_infl(space, max_infl) {
	push_undo()
	game.vm_available_ops --
	if (!game.vm_influence_added)
		game.vm_influence_added = {}
	if (!game.vm_influence_added[space])
		game.vm_influence_added[space] = 0
	if (game.active === COM) {
		game.demInfl[space] --
		if (game.demInfl[space] === 0)
			game.valid_spaces = game.valid_spaces.filter(id => id !== space)
	} else {
		game.comInfl[space] --
		if (game.comInfl[space] === 0)
			game.valid_spaces = game.valid_spaces.filter(id => id !== space)
	}
	game.vm_influence_added[space] ++
	if (game.vm_influence_added[space] === max_infl) {
		game.valid_spaces = game.valid_spaces.filter(id => id !== space)
	}
	summary_influence(space)
	check_tyrant()
	if (game.vm_available_ops === 0) {
		game.valid_spaces = []
	}
}

function vm_remove_all_infl() {
	game.vm_available_ops = vm_operand(1)
	game.state = 'vm_remove_all_infl'
}

function vm_do_remove_all_infl(space) {
	push_undo()
	if (game.remove_opponent_infl === true) {
		if (game.active === COM) {
			game.demInfl[space] = 0
			log(`Removed all Democratic SP from %${space}.`)
		} else {
			game.comInfl[space] = 0
			log(`Removed all Communist SP from %${space}.`)
		}
		check_tyrant()

	} else {
		if (game.active === COM) {
			game.comInfl[space] = 0
			log(`Removed all Communist SP from %${space}.`)
		} else {
			game.demInfl[space] = 0
			log(`Removed all Democratic SP from %${space}.`)
		}
		check_tyrant()
	}
	game.vm_available_ops --
	game.valid_spaces = game.valid_spaces.filter(id => id !== space)
}

function vm_replace_all_infl(space_id) {
	if (game.active === DEM) {
		game.demInfl[space_id] += game.comInfl[space_id]
		log(`Replaced ${game.comInfl[space_id]} Communist SP in %${space_id} with Democratic SP.`)
		game.comInfl[space_id] = 0
	} else {
		game.comInfl[space_id] += game.demInfl[space_id]
		log(`Replaced ${game.demInfl[space_id]} Democrat SP in %${space_id} with Communist SP.`)
		game.demInfl[space_id] = 0
	}
	check_tyrant()
}

function vm_1_support_check() {
	game.vm_available_ops = 1
	log('Support Check:')
	if (game.valid_spaces.length === 0)
		logi('None')
	game.state = 'vm_1_support_check_prep'
}

function vm_support_check() {
	game.vm_available_ops = vm_operand(1)
	if (game.vm_available_ops > 1)
		log('Support Checks:')
	else
		log('Support Check:')
	game.state = 'vm_support_check_prep'
}

function vm_support_check_modified() {
	game.vm_available_ops = vm_operand(1)
	game.support_check_modifier = vm_operand(2)
	if (game.vm_available_ops > 1)
		log('Support Checks:')
	else
		log('Support Check:')
	game.state = 'vm_support_check_prep'
}

function vm_switch_infl(space) {
	push_undo()
	game.demInfl[space] -= game.vm_available_ops
	game.comInfl[space] += game.vm_available_ops
	log(`Replaced ${pluralize(game.vm_available_ops,'SP')} in %${space}.`)
	game.vm_available_ops = 0
	check_tyrant()
}

/* ===================== EVENT SPECIFIC FUNCTIONS ========== */

function vm_40th_anniversary_celebration() {
	if (game.vp < 0) {
		game.vm_available_ops = 4
	} else {
		game.vm_available_ops = 2
	}
	vm_next()
}

function vm_40th_anniversary_celebration_vp() {
	game.vp --
	log('-1 VP')
	if (check_vp()) {
		return
	}
	vm_next()
}

function vm_adamec() {
	game.state = 'vm_adamec'
}

function vm_army_backs_revolution() {
	if (game.persistent_events.includes(C_SECURITATE))
		permanently_remove(C_SECURITATE)
	add_to_persistent_events(C_ARMY_BACKS_REVOLUTION)
	log(`C${C_SECURITATE} no longer has any effect.`)
	vm_next()
}

function vm_army_block() {
	permanently_remove(C_SECURITATE)
	log(`Has no effect after C${C_ARMY_BACKS_REVOLUTION}.`)
	vm_next()
}

function vm_austria_hungary_border_reopened() {
	add_to_persistent_events(C_AUSTRIA_HUNGARY_BORDER_REOPENED)
	log(`For the remainder of the turn, cards played by the Democrat have +1 Ops value if all Operations Points are used in East Germany.`)
	game.austria_hungary_border_reopened_tracker = false
	vm_next()
}

function vm_betrayal() {
	if (game.demInfl[S_ORTHODOX_CHURCH_ROMANIA] > 0)
		game.valid_spaces.push(S_ORTHODOX_CHURCH_ROMANIA)
	if (game.demInfl[S_ORTHODOX_CHURCH_BULGARIA] > 0)
		game.valid_spaces.push(S_ORTHODOX_CHURCH_BULGARIA)
	game.state = 'vm_switch_infl'
}

function vm_breakaway_baltic_republics() {
	add_to_persistent_events(C_BREAKAWAY_BALTIC_REPUBLICS)
	log('+5 VP')
	game.vp += 5
	game.stability++
	if (check_vp()) {
		return
	}
	game.playable_cards.push(C_KREMLIN_COUP)
	game.playable_cards = game.playable_cards.filter(n => n !== C_GORBACHEV_CHARMS_THE_WEST)
	if (!check_dem_control(S_HARGHITA_COVASNA) && game.systematization !== S_HARGHITA_COVASNA) {
		game.valid_spaces.push(S_HARGHITA_COVASNA)
	}
	if (!check_dem_control(S_RAZGRAD)) {
		game.valid_spaces.push(S_RAZGRAD)
	}
	vm_next()
}

function vm_brought_in_for_questioning() {
	if (game.active === COM) {
		game.active = DEM
	}
	game.phase = 0
	game.state = 'vm_brought_in_for_questioning'
}

function vm_bulgarian_turks_expelled() {
	game.remove_opponent_infl = true
	game.vp -= 2
	log('-2 VP')
	if (check_vp()) {
		return
	}
	vm_next()
}

function vm_ceausescu_prep() {
	add_to_persistent_events(C_CEAUSESCU)
	vm_next()
}

function vm_ceausescu() {
	game.persistent_events = game.persistent_events.filter(n => n!== C_CEAUSESCU)
	let adj_cluj = false
	let adj_spaces = null
	if (game.systematization !== S_CLUJ_NAPOCA)
		adj_spaces = get_adjusted_adjacency(S_CLUJ_NAPOCA)
	if (adj_spaces) {
		for (let s of adj_spaces) {
			if (game.demInfl[s] > 0)
				adj_cluj = true
		}
	}
	if (adj_cluj && game.comInfl[S_BUCURESTI] > 0) {
		if (game.active !== COM) {
			change_player()
			game.return = game.active
			log_event(C_CEAUSESCU)
		}
		game.valid_spaces = [S_BUCURESTI]
		game.vm_available_ops = 1
		game.remove_opponent_infl = false
		log(`Democrat has SP adjacent to %${S_CLUJ_NAPOCA}.`)
		log('Removed SP:')
		game.state = 'vm_remove_infl'
	} else {
		vm_return()
	}
}

function vm_central_committee_reshuffle() {
	game.state = 'vm_central_committee_reshuffle'
}

function vm_civic_forum_prep() {
	log('+1 VP')
	game.vp++
	if (check_vp()) {
		return
	}
	vm_next()
}

function vm_civic_forum() {
	if (check_dem_control(S_CZECH_WRITERS))
		vm_next()
	else
		vm_return()
}

function vm_cluj_check() {
	if (game.comInfl[S_CLUJ_NAPOCA] > 0)
		game.valid_spaces.push(S_CLUJ_NAPOCA)
	vm_next()
}

function vm_common_european_home() {
	game.valid_cards = ceh_card_check()
	game.state = "vm_common_european_home_choose"
}

function ceh_card_check() {
	let ceh_cards = []
	if (game.active === DEM) {
		for (let c of game.democrat_hand) {
			if (cards[c].side === 'C') {
				ceh_cards.push(c)
			}
		}
	} else {
		for (let c of game.communist_hand) {
			if (cards[c].side === 'D') {
				ceh_cards.push(c)
			}
		}
	}
	return ceh_cards
}

function vm_dash_for_the_west() {
	game.valid_cards = []
	for (let c of game.strategy_discard) {
		if (cards[c].side === 'D' && cards[c].remove && (cards[c].playable || game.playable_cards.includes(c))) {
			game.valid_cards.push(c)
		}
	}
	game.state = 'vm_dash_for_the_west'
}

function vm_deutsche_marks() {
	let max_value = 1
	for (let c of game.democrat_hand) {
		if (cards[c].ops > max_value) {
			max_value = cards[c].ops
		}
	}
	let valid_cards = []
	for (let c of game.democrat_hand) {
		if (cards[c].ops === max_value) {
			valid_cards.push(c)
		}
	}
	game.valid_cards = valid_cards
	game.state = 'vm_deutsche_marks_prep'
}

function vm_domino_theory() {
	game.discard = true
	for (let card of game.strategy_discard) {
		if (scoring_cards.includes(card)) {
			game.valid_cards.push(card)
		}
	}
	game.phase = 0
	game.state = 'vm_play_event_from_discard'
}

function vm_domino_theory_pass() {
	if (game.revolutions.filter(value => value === true).length < 2) {
		log('Democrat holds power in fewer than 2 countries.')
	} else if (!scoring_cards.some(card => game.strategy_discard.includes(card))) {
		log('No scoring cards in discard.')
	}
	vm_next()
}

function vm_eco_glasnost() {
	add_to_persistent_events(C_ECO_GLASNOST)
	log(`+1 VP for Communist Support Checks in Ruse for the rest of the game.`)
	vm_next()
}

function vm_elena() {
	add_to_persistent_events(C_ELENA)
	log(`-1 modifier to Democratic Support Checks in Romania for the rest of this turn.`)
	vm_next()
}

function vm_eliminate(space_id) {
	log(`Eliminated %${space_id}.`)
	if (space_id === S_BUCURESTI) {
		game.demInfl[space_id] = 0
		game.comInfl[space_id] = 0
	} else {
		game.demInfl[space_id] = 0
		game.comInfl[S_BUCURESTI] += game.comInfl[space_id]
		if (game.comInfl[space_id] > 0 ) {
			log(`${pluralize(game.comInfl[space_id],'Communist SP')} relocated to %${S_BUCURESTI}.`)
		}
		game.comInfl[space_id] = 0
	}
}

function get_adjusted_adjacency(space_id) {
	let adjacent_spaces = spaces[space_id].adjacent
	if (adjacent_spaces.includes(game.systematization)) {
		let eliminated_space_id = game.systematization
		adjacent_spaces = adjacent_spaces.map(adj_space_id => {
			if (adj_space_id === eliminated_space_id) {
				return spaces[eliminated_space_id].adjacent
			}
			return adj_space_id
		}).flat()
	}
	adjacent_spaces = adjacent_spaces.filter(s => s !== space_id)
	return adjacent_spaces
}

function vm_exit_visas() {
	game.state = 'vm_exit_visas'
	game.temp = 0
}

function vm_foreign_currency_debt_burden() {
	log('+1 VP')
	game.vp++
	if (check_vp()) {
		return
	}
	add_to_persistent_events(C_FOREIGN_CURRENCY_DEBT_BURDEN)
	game.state = 'vm_foreign_currency_debt_burden'
}

function vm_foreign_television() {
	for (let i = 0; i < spaces.length; i++) {
		if (i === S_DRESDEN) {
			continue
		}
		if (game.comInfl[i] > 0) {
			game.valid_spaces.push(i)
		}
	}
	vm_next()
}
function vm_frg_embassies() {
	add_to_persistent_events(C_FRG_EMBASSIES)
	log(`+1 modifier for Democratic Support Checks in Eastern Europe for the rest of this turn.`)
	vm_next()
}

function vm_general_strike() {
	add_to_persistent_events(C_GENERAL_STRIKE)
	log(`Each Action Round the Communist must instead discard a card and roll a die until the modified die roll exceeds 5.`)
	vm_next()
}

function vm_genscher() {
	add_to_persistent_events(C_GENSCHER)
	log(`Cancels +1 Ops cost to place Democratic SPs in Communist controlled spaces in East Germany for the rest of the turn.`)
	vm_next()
}

function vm_goodbye_lenin() {
	clear_undo()
	game.view_opp_hand = true
	game.communist_hand_red = []
	for (let card of game.communist_hand) {
		if (cards[card].red)
			game.communist_hand_red.push(card)
	}
	for (let card of game.communist_hand_red) {
		if (cards[card].playable || game.playable_cards.includes(card))
			game.valid_cards.push(card)
	}
	game.state = 'vm_goodbye_lenin'
}

function vm_government_resigns() {
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (space.socio === SOCIO_ELITE && game.comInfl[i] > 0 && !is_controlled(i))
			game.valid_spaces.push(i)
	}
	game.remove_opponent_infl = true
	vm_next()
}

function vm_grenztruppen() {
	add_to_persistent_events(C_GRENZTRUPPEN)
	log(`-1 modifier for Democratic Support Checks in East Germany for the rest of this turn`)
	vm_next()
}

function vm_heal_our_bleeding_wounds() {
	let change_vp = 0
	if (game.turn <= 3) {
		change_vp = -3
	} else if (game.turn <= 7) {
		change_vp = -1
	} else
		change_vp = 3
	if (change_vp > 0) {
		log(`+${change_vp} VP`)
	} else {
		log(`${change_vp} VP`)
	}
	game.vp += change_vp
	if (check_vp()) {
		return
	}
	vm_next()
}

function vm_helsinki_final_act() {
	add_to_persistent_events(C_HELSINKI_FINAL_ACT)
	log(`+1 VP for every Support Check by the Communist Player in Student or Intellectual spaces for the rest of the game.`)
	vm_next()
}

function vm_honecker() {
	add_to_persistent_events(C_HONECKER)
	log(`The Communist may take one extra Action Round this turn.`)
	game.valid_cards = []
	for (let c of game.strategy_discard)
		if (is_honecker_card(c))
			game.valid_cards.push(c)
	game.discard = true
	game.state = 'vm_honecker'
}

function is_honecker_card(c) {
	if (scoring_cards.includes(c)) return false
	if (c === C_HONECKER) return false
	if (c === game.played_card) return false
	return true
}

function vm_inflationary_currency() {
	game.state = 'vm_inflationary_currency'
}

function vm_inflationary_currency_discard() {
	//TODO: skip this step if opponent has no cards in hand
	change_player()
	if (game.active === COM) {
		for (let card of game.communist_hand) {
			if (get_card_ops(card) >= 3) {
				game.valid_cards.push(card)
			}
		}
	} else {
		for (let card of game.democrat_hand) {
			if (get_card_ops(card) >= 3) {
				game.valid_cards.push(card)
			}
		}
	}
	log(`${game.active}:`)
	game.state = 'vm_inflationary_currency_discard'
}

function vm_kiss_of_death() {
	game.state = 'vm_kiss_of_death'
}

function vm_klaus_and_komarek() {
	if (game.comInfl[S_PRAHA] > 0) {
		game.valid_spaces = [ S_PRAHA ]
	}
	vm_next()
}

function vm_kohl_proposes_reunification_prep() {
	log('+2 VP')
	game.vp += 2
	if (check_vp()) {
		return
	}
	vm_next()
}
function vm_kohl_proposes_reunification() {
	game.vm_event = C_KOHL_PROPOSES_REUNIFICATION
	game.state = 'vm_common_european_home_play'
}

function vm_kremlin_coup() {
	log('-3 VP')
	game.vp -= 3
	game.stability ++
	if (check_vp()) {
		return
	}
	game.support_check_modifier = 1
	game.temp = []
	countries.forEach(country => {
		if (!game.revolutions[find_country_index(country)]) {
			game.temp.push(country)
		}
	})
	game.playable_cards = game.playable_cards.filter(c => c !== C_MALTA_SUMMIT)
	game.state = 'vm_kremlin_coup_choose_country'
}

function vm_laszlo_tokes_prep() {
	add_to_persistent_events(C_LASZLO_TOKES)
	log(`Allows play of C${C_MASSACRE_IN_TIMISOARA}.`)
	game.playable_cards.push(C_MASSACRE_IN_TIMISOARA)
	vm_next()
}

function vm_laszlo_tokes() {
	game.state = 'vm_laszlo_tokes'
}

function vm_legacy_of_martial_law() {
	game.vm_available_ops = 1
	game.state = 'vm_switch_infl'
}

function vm_legacy_of_1968() {
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (!check_com_control(i) && space.country === 'Czechoslovakia') {
			game.valid_spaces.push(space.space_id)
		}
	}
	vm_next()
}

function vm_li_peng() {
	add_to_persistent_events(C_LI_PENG)
	log(`+1 modifier to all Communist Tiananmen Square Attempts for the rest of the game.`)
	vm_next()
}

function vm_ligachev() {
	add_to_persistent_events(C_LIGACHEV)
	log(`-3 VPs if the Democrat does not play C${C_GORBACHEV_CHARMS_THE_WEST} next Action Round.`)
	vm_next()
}

function vm_malta_summit() {
	game.state = 'vm_malta_summit'
}

function vm_massacre_in_timisoara() {
	game.persistent_events = game.persistent_events.filter(n => n !== C_LASZLO_TOKES)
	game.strategy_removed.push(C_LASZLO_TOKES)
	vm_next()
}

function vm_modrow() {
	game.playable_cards = game.playable_cards.filter(n => n !== C_HONECKER)
	add_to_persistent_events(C_MODROW)
	log(`Prevents play of C${C_HONECKER} for the event.`)
	game.state = 'vm_modrow'
}

function vm_nagy_reburied() {
	if (game.comInfl[S_SZOMBATHELY] > 0) {
		game.valid_spaces.push(S_SZOMBATHELY)
	}
	vm_next()
}

function vm_national_salvation_front() {
	add_to_persistent_events(C_NATIONAL_SALVATION_FRONT)
	log(`In the next Power Struggle in the Balkans, the Communist draws 2 random Power Struggle cards from the Democrat hand.`)
	vm_next()
}

function vm_nepotism() {
	game.state = 'vm_nepotism'
}

function vm_new_years_eve_party() {
	game.state = 'vm_new_years_eve_party'
}

function vm_nomenklatura() {
	game.state = 'vm_nomenklatura'
}

function vm_normalization() {
	if (game.demInfl[S_PLZEN] > 0) {
		game.valid_spaces.push(S_PLZEN)
	}
	if (game.demInfl[S_PRAHA] > 0) {
		game.valid_spaces.push(S_PRAHA)
	}
	game.remove_opponent_infl = true
	vm_next()
}

function vm_peasant_parties_revolt() {
	add_to_persistent_events(C_PEASANT_PARTIES_REVOLT)
	log(`In the next Power Stuggle, if the Democrat controls a Farmer space draw 1 Power Struggle card at random from the Communist hand.`)
	vm_next()
}

function vm_perestroika() {
	add_to_persistent_events(C_PERESTROIKA)
	log(`+1 to Communist Ops for the rest of the turn.`)
	vm_next()
}

function vm_poszgay() {
	let valid_spaces = []
	for (let space of spaces) {
		if (space && space.country === 'Hungary' && !check_dem_control(space.space_id)) {
			valid_spaces.push(space.space_id)
		}
	}
	game.valid_spaces = valid_spaces
	vm_next()
}

function vm_power_struggle() {
	game.is_pwr_struggle = true
	game.phase = 0
	game.raised_stakes = 0
	game.raised_stakes_round = 0
	game.raised_stakes_discard = 0
	game.pwr_struggle_in = countries[scoring_cards.indexOf(game.vm_event)]
	if (game.pwr_struggle_in === 'Romania' && game.persistent_events.includes(C_SECURITATE)) {
		log(`C${C_SECURITATE}: Democrat reveals Power Struggle cards.`)
		game.opp_power_hand = true
	}
	log_h5('Deal Cards')
	game.state = 'draw_power_cards'
}

function vm_presidential_visit() {
	add_to_persistent_events(C_PRESIDENTIAL_VISIT)
	log(`Communist hand size is reduced to 7 next turn.`)
	vm_next()
}

function vm_prudence() {
	if (!game.prudence) {
		game.prudence = { DEM: 0, COM: 0 }
	}
	if (game.active === DEM) {
		game.prudence.COM--
		log(`${game.prudence.COM} to Communist Ops for the rest of the turn.`)
	} else {
		game.prudence.DEM--
		log(`${game.prudence.DEM} to Democrat Ops for the rest of the turn.`)
	}
	if (!game.persistent_events.includes(EXTRA_PRUDENCE))
		game.persistent_events.push(EXTRA_PRUDENCE)
	vm_next()
}

function vm_public_against_violence() {
	game.valid_spaces = []
	if (game.comInfl[S_BRATISLAVA] > 0)
		game.valid_spaces.push(S_BRATISLAVA)
	vm_next()
}

function vm_reformer_rehabilitated() {
	permanently_remove(C_REFORMER_REHABILITATED)
	game.discard = true
	for (let card of game.strategy_discard) {
		if (!event_is_playable(card))
			continue
		if (card === game.played_card)
			continue
		if (card === C_COMMON_EUROPEAN_HOME)
			continue
		if (scoring_cards.includes(card))
			continue
		game.valid_cards.push(card)
	}
	game.state = 'vm_play_event_from_discard'
}

function vm_roundtable_talks() {
	add_to_persistent_events(C_ROUNDTABLE_TALKS)
	log(`In the next Power Struggle the Democrat draws 2 random Power Struggle cards from the Communist hand.`)
	vm_next()
}

function vm_sajudis_check() {
	add_to_persistent_events(C_SAJUDIS)
	if (!check_dem_control(S_RAZGRAD))
		game.valid_spaces.push(S_RAZGRAD)
	if (!check_dem_control(S_HARGHITA_COVASNA)  && game.systematization !== S_HARGHITA_COVASNA)
		game.valid_spaces.push(S_HARGHITA_COVASNA)
	vm_next()
}

function vm_sajudis() {
	game.playable_cards.push(C_THE_BALTIC_WAY)
	game.stability++
	log('+1 VP')
	game.vp++
	if (check_vp()) {
		return
	}
	log(`Allows play of C${C_THE_BALTIC_WAY}.`)
	vm_next()
}

function vm_samizdat() {
	game.state = 'vm_samizdat'
}

function vm_securitate() {
	add_to_persistent_events(C_SECURITATE)
	log(`The Democrat must reveal their Power Struggle cards at the start of Power Struggles in Romania.`)
	vm_next()
}

function vm_shock_therapy() {
	game.state = 'vm_shock_therapy'
}

function vm_social_democratic_platform_adopted() {
	game.state = 'vm_social_democratic_platform_adopted'
}

function vm_solidarity_legalised() {
	game.playable_cards.push(C_WALESA)
	add_to_persistent_events(C_SOLIDARITY_LEGALIZED)
	log(`Allows play of C${C_WALESA}.`)
	vm_next()
}

function vm_solidarity_legalised_spaces() {
	game.valid_spaces = vm_valid_spaces_solidarity_legalised()
	vm_next()
}

function vm_st_nicholas_church() {
	add_to_persistent_events(C_ST_NICHOLAS_CHURCH)
	log(`Allows play of C${C_THE_MONDAY_DEMONSTRATIONS}.`)
	game.playable_cards.push(C_THE_MONDAY_DEMONSTRATIONS)
	vm_next()
}

function vm_stasi() {
	add_to_persistent_events(C_STASI)
	log(`For the rest of this turn the Democrat must reveal the card they will play this Action Round before the Communist player plays a card.`)
	vm_next()
}

function vm_stand_fast() {
	add_to_persistent_events(C_STAND_FAST)
	if (game.active === DEM) {
		log(`-1 Modifier to Support Checks in Democratic controlled spaces for the rest of this turn.`)
		game.stand_fast = DEM
	} else {
		log(`-1 Modifier to Support Checks in Communist controlled spaces for the rest of this turn.`)
		game.stand_fast = COM
	}
	vm_next()
}

function vm_systematization() {
	game.state = 'vm_systematization'
}

function vm_tank_column() {
	log('Advances 1 space on Tiananmen Square Track.')
	if (game.active === DEM) {
		game.dem_tst_position++
		game.dem_tst_attempted = 0
	} else {
		game.com_tst_position++
		game.com_tst_attempted = 0
		if (game.com_tst_position === 7) {
			game.playable_cards.push(C_THE_CHINESE_SOLUTION)
		}
	}
	if (game.active === DEM) {
		if (game.dem_tst_position === 3 && game.com_tst_position < 3) {
			game.vm_event = 203
			goto_vm(game.vm_event)
			return
		} else if (game.dem_tst_position === 4 && game.com_tst_position < 4) {
			game.vm_event = 204
			goto_vm(game.vm_event)
			return
		}
	} else {
		if (game.com_tst_position === 3 && game.dem_tst_position < 3) {
			game.vm_event = 203
			goto_vm(game.vm_event)
			return
		} else if (game.com_tst_position === 4 && game.dem_tst_position < 4) {
			game.vm_event = 204
			goto_vm(game.vm_event)
			return
		}
	}
	vm_next()
}

function vm_tear_gas() {
	add_to_persistent_events(C_TEAR_GAS)
	log(`+1 modifier to the next Communist Support Check in a Student space`)
	vm_next()
}

function vm_the_baltic_way_prep() {
	add_to_persistent_events(C_THE_BALTIC_WAY)
	game.playable_cards.push(C_BREAKAWAY_BALTIC_REPUBLICS)
	game.stability++
	log('+3 VP')
	game.vp += 3
	if (check_vp()) {
		return
	}
	log(`Allows play of C${C_BREAKAWAY_BALTIC_REPUBLICS}.`)
	vm_next()
}

function vm_the_baltic_way() {
	if (!check_dem_control(S_HARGHITA_COVASNA) && game.systematization !== S_HARGHITA_COVASNA)
		game.valid_spaces.push(S_HARGHITA_COVASNA)
	if (!check_dem_control(S_RAZGRAD))
		game.valid_spaces.push(S_RAZGRAD)
	vm_next()
}

function vm_the_chinese_solution() {
	game.state = 'vm_the_chinese_solution'
}

function vm_the_crowd_turns_against_ceausescu() {
	add_to_persistent_events(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU)
	log(`Power Struggle: Romania. Democrat draws 15 Power Struggle cards and takes 1 Action Round using Ops 3 times the number of Rallies. Allows play of C${C_THE_TYRANT_IS_GONE}.`)
	game.playable_cards.push(C_THE_TYRANT_IS_GONE)
	vm_next()
}

function vm_the_monday_demonstrations() {
	if (!check_dem_control(S_LUTHERAN_CHURCH))
		game.valid_spaces.push(S_LUTHERAN_CHURCH)
	if (!check_dem_control(S_LEIPZIG))
		game.valid_spaces.push(S_LEIPZIG)
	vm_next()
}

function vm_the_sinatra_doctrine() {
	add_to_persistent_events(C_THE_SINATRA_DOCTRINE)
	log(`+1 Ops value for cards played by the Democrat for the rest of this turn.`)
	vm_next()
}

function vm_the_third_way() {
	log('-2 VP')
	game.vp -= 2
	if (check_vp()) {
		return
	}
	vm_next()
}

function vm_the_tyrant_is_gone() {
	permanently_remove(C_THE_CROWD_TURNS_AGAINST_CEAUSESCU)
	if (!game.persistent_events.includes(C_THE_TYRANT_IS_GONE))
		add_to_persistent_events(C_THE_TYRANT_IS_GONE)
	add_to_persistent_events(THE_TYRANT_IS_GONE_OCCURRED)
	game.valid_spaces = []
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (game.demInfl[i] === 0 && space.country === 'Romania') {
			if (space.space_id === game.systematization)
				continue
			game.valid_spaces.push(space.space_id)
		}
	}
	game.state = 'vm_the_tyrant_is_gone'
}

function vm_the_tyrant_is_gone_prep() {
	add_to_persistent_events(C_THE_TYRANT_IS_GONE)
	log(`After C${C_THE_CROWD_TURNS_AGAINST_CEAUSESCU} occurs, remove 4 Commuist SPs from the Romanian Elite space. The Democrats choose where the Ceausescus flee to.`)
	vm_next()
}

function vm_tyrant_block() {
	log(`Has no effect after C${C_THE_TYRANT_IS_GONE}.`)
	vm_next()
}

function vm_the_wall() {
	add_to_persistent_events(C_THE_WALL)
	log(`Cancels the modifier for any Democratic controlled spaces for the next Communist Support Check in East Germany.`)
	vm_next()
}

function vm_the_wall_must_go() {
	game.the_wall_must_go = {}
	game.the_wall_must_go['dem_wins'] = 0
	game.the_wall_must_go['com_wins'] = 0
	game.the_wall_must_go['dem_roll'] = 0
	game.the_wall_must_go['com_roll'] = 0
	game.state = 'vm_the_wall_must_go'
}

function vm_warsaw_pact_summit() {
	game.state = 'vm_warsaw_pact_summit'
}

function vm_we_are_the_people() {
	if (game.demInfl[S_LUTHERAN_CHURCH] > 0)
		game.valid_spaces = [ S_LUTHERAN_CHURCH ]
	add_to_persistent_events(C_WE_ARE_THE_PEOPLE)
	log(`The Communist may no longer make Support Checks in Leipzig.`)
	log('Removed SP:')
	if (!game.vm_influence_added)
		game.vm_influence_added = {}
	game.vm_influence_added[S_LUTHERAN_CHURCH] = 0
	game.vm_available_ops = 4
	game.state = 'vm_we_are_the_people_remove'
}

function vm_workers_revolt() {
	if (game.active === DEM) {
		for (let space of spaces) {
			let country = space.country
			if (!game.revolutions[find_country_index(country)] && game.comInfl[space.space_id] > 0 && space.socio === SOCIO_WORKER) {
				game.valid_spaces.push(space.space_id)
			}
		}
	} else {
		for (let space of spaces) {
			let country = space.country
			if (game.revolutions[find_country_index(country)] && game.demInfl[space.space_id] > 0 && space.socio === SOCIO_WORKER) {
				game.valid_spaces.push(space.space_id)
			}
		}
	}
	game.state = 'vm_workers_revolt'
}

function vm_yakovlev_counsels_gorbachev() {
	add_to_persistent_events(C_YAKOVLEV_COUNSELS_GORBACHEV)
	log(`The Democrat receives a +1 modifier to the Support Loss and Victory Point die rolls if they win the next Power Struggle.`)
	vm_next()
}

function vm_permanently_remove() {
	if (game.vm_event !== 0 && cards[game.vm_event].remove && !game.strategy_removed.includes(game.vm_event)) {
		permanently_remove(game.vm_event)
	}
	if (cards[game.played_card].remove && !game.strategy_removed.includes(game.played_card)) {
		permanently_remove(game.played_card)
	}
	vm_next()
}

function discarded_card() {
	return game.temp > 0
}

// =================== TIANANMEN SQUARE TRACK FUNCTIONS ====================

function vm_tst_3() {
	log_gap('Tiananmen Square Track Award:')
	game.state = 'vm_tst_3_prep'
}

function vm_tst_4() {
	log_gap('Tiananmen Square Track Award:')
	game.vm_available_ops = 2
	game.remove_opponent_infl = true
	log('Removed SP:')
	game.state = 'vm_tst_4'
}
function vm_tst_6() {
	log_h3('Tiananmen Square Track Award')
	game.vm_available_ops = 1
	game.temp = 1 // Set temp to 1, so that Card 1 is called during the Support Check, which has 2 ops
	game.state = 'vm_tst_6'
}

function vm_tst_8() {
	game.state = 'vm_goodbye_lenin_ops'
}

// ==================== POWER STRUGGLE FUNCTIONS ======================

function vm_scare_tactics() {
	game.vm_active_country = game.pwr_struggle_in
	vm_next()
}
function vm_support_surges() {
	game.state = 'vm_support_surges_1'
}

function vm_support_falters() {
	game.vm_available_ops = 2
	game.return === game.active
	log(`${game.active}:`)
	game.state = 'vm_support_falters'
}

function vm_kremlin_coup_elite() {
	game.valid_spaces = []
	elite_spaces.forEach(space => {
		if (spaces[space].country === game.vm_active_country && !check_com_control(space)) {
			game.valid_spaces.push(space)
		}
	})
	if (game.valid_spaces.length === 0)
		logi(`Elite space already controlled.`)
	game.state = 'vm_kremlin_coup_take_control'
}

/* ================== VM STATES ============================== */

states.vm_end_event = {
	prompt() {
		prompt_event("Done.")
		if (game.vm_infl_to_do || game.return_state === 'vm_tst_8') {
			gen_action('done')
		} else {
			gen_action('end_round')
		}
	},
	done() {
		push_undo()
		vm_end_event()
	},
	end_round() {
		push_undo()
		game.return_state = ''
		vm_end_event()
	},
}

states.vm_take_control = {
	prompt() {
		if (game.vm_available_ops > 0 && game.valid_spaces.length === 0) {
			prompt_event("All spaces controlled.")
			gen_action('done')
		} else if (game.vm_available_ops > 0) {
			prompt_event(`Take control of ${event_prompt()}.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else {
			prompt_event("Take control done.")
			if (game.vm_infl_to_do) {
				gen_action('done')
			} else {
				gen_action('end_round')
			}
		}
	},
	space(space) {
		push_undo()
		vm_take_control(space)
		game.vm_available_ops--
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			vm_next()
		}
	},
	done() {
		push_undo()
		vm_next()
	},
	end_round() {
		push_undo()
		vm_next()
	},
}

states.vm_add_infl = {
	prompt() {
		if (game.vm_available_ops > 0 && game.valid_spaces.length === 0) {
			prompt_event("No available spaces remaining.")
			gen_action('done')
		} else if (game.vm_available_ops > 0) {
			prompt_event(`Place ${pluralize(game.vm_available_ops,'SP')}${event_prompt()}.`)

			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else {
			get_end_infl_prompt()
		}
	},
	space(space) {
		add_infl(space, 'vm_available_ops')
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			game.vm_event_done = true
			vm_next()
		}
	},
	done() {
		push_undo()
		game.vm_event_done = true
		vm_next()
	},
	end_round() {
		push_undo()
		game.vm_event_done = true
		vm_next()
	},
}

states.vm_add_infl_free = {
	prompt() {
		if (game.vm_available_ops > 0 && game.valid_spaces.length === 0) {
			prompt_event("No available spaces remaining.")
			gen_action('done')
		} else if (game.vm_available_ops > 0) {
			prompt_event(`Place ${game.vm_available_ops} SPs in ${event_prompt()}.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else {
			get_end_infl_prompt()
		}
	},
	space(space) {
		vm_do_add_infl_free(space)
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			game.vm_event_done = true
			vm_next()
		}
	},
	done() {
		push_undo()
		game.valid_spaces = []
		game.vm_event_done = true
		vm_next()
	},
	end_round() {
		push_undo()
		game.valid_spaces = []
		game.vm_event_done = true
		vm_next()
	},
}

states.vm_add_x_infl = {
	prompt() {
		if (game.vm_event === 101 && game.valid_spaces.length === 0) {
			prompt_event("The Romanian Elite space no longer exists.")
			gen_action('done')
		} else if (game.vm_available_ops > 0) {
			prompt_event(`Place ${game.vm_available_ops} SPs in ${event_prompt()}.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		vm_do_add_x_infl(space)
		if (game.vm_available_ops === 0) {
			game.vm_event_done = true
			vm_next()
		}
	},
	done() {
		push_undo()
		game.vm_event_done = true
		vm_next()
	},
}

states.vm_add_limited_infl = {
	prompt() {
		if (game.vm_available_ops > 0 && game.valid_spaces.length > 0) {
			if (game.vm_max_infl === 1) {
				prompt_event(`Place ${pluralize(game.vm_max_infl,'SP')} ${event_prompt()}.`)
			} else {
				prompt_event(`Place ${pluralize(game.vm_available_ops,'SP')} in ${event_prompt()}.`)
			}
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		vm_do_add_limited_infl(space, game.vm_max_infl)
		if (game.vm_available_ops === 0 || game.valid_spaces.length === 0) {
			game.valid_spaces = []
			game.vm_event_done = true
			vm_next()
		}
	},
}

states.vm_remove_infl = {
	prompt() {
		if (game.valid_spaces.length === 0 && game.vm_available_ops > 0) {
			prompt_event("No SPs to remove.")
			gen_action('done')
			return
		}
		if (game.vm_available_ops === 0) {
			prompt_event("Remove SPs done.")
			gen_action('done')
			return
		}
		if (game.remove_opponent_infl) {
			prompt_event(`Remove ${pluralize(game.vm_available_ops, 'opponent SP')}${event_prompt()}.`)
		}
		else {
			if (game.vm_event === C_CEAUSESCU)
				prompt_event(`${event_prompt()}.`)
			else
				prompt_event(`Remove ${pluralize(game.vm_available_ops,'SP')}${event_prompt()}.`)
		}
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		remove_infl(space, 'vm_available_ops')
		game.vm_active_country = spaces[space].country
		let require_done = [C_INFLATIONARY_CURRENCY, C_THE_WALL_MUST_GO]
		if (!require_done.includes(game.vm_event)) {
			if (game.vm_available_ops === 0) {
				vm_next()
			}
		}
	},
	done() {
		summary_flush()
		vm_next()
	},
}

states.vm_remove_x_infl = {
	prompt() {
		if (game.valid_spaces.length === 0 && game.vm_available_ops > 0) {
			prompt_event("No SPs to remove.")
			gen_action('done')
		} else if (game.vm_available_ops > 0) {

			prompt_event(`Remove ${pluralize(game.vm_available_ops,'SP')} from ${event_prompt()}.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		vm_do_remove_x_infl(space)
		if (game.vm_available_ops === 0) {
			game.vm_event_done = true
			vm_next()
		}
	},
	done() {
		game.vm_event_done = true
		check_if_no_infl_removed()
		vm_next()
	},
}

states.vm_remove_limited_infl = {
	prompt() {
		if (game.vm_available_ops > 0 && game.valid_spaces.length > 0) {
			prompt_event(`Remove ${pluralize(game.vm_available_ops,'SP')}${event_prompt()}, no more than ${game.vm_max_infl} per space.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else if (game.valid_spaces.length === 0 && game.vm_available_ops > 0) {
			prompt_event("No further SP to remove.")
			gen_action('done')
		}
	},
	space(space) {
		vm_do_remove_limited_infl(space, game.vm_max_infl)
		if (game.vm_available_ops === 0) {
			game.vm_event_done = true
			vm_next()
		}
	},
	done() {
		game.vm_event_done = true
		vm_next()
	},
}

states.vm_remove_all_infl = {
	prompt() {
		if (game.valid_spaces.length === 0 && game.vm_available_ops > 0) {
			prompt_event("No SPs to remove.")
			gen_action('pass')
		} else if (game.vm_available_ops > 0) {
			prompt_event(`Remove all SPs from ${event_prompt()}.`)
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		vm_do_remove_all_infl(space)
		game.vm_active_country = spaces[space].country
		if (game.vm_available_ops === 0) {
			vm_next()
		}
	},
	pass() {
		push_undo()
		vm_next()
	},
}

states.vm_support_check_prep = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			prompt_event(`No valid targets for Support Check.`)
			gen_action('done')
		} else {
			if (event_prompt() === "") {
				prompt_event(`Select a space. ${pluralize(game.vm_available_ops, 'Support Check')} remaining.`)
			} else {
				prompt_event(`${event_prompt()}. ${pluralize(game.vm_available_ops, 'Support Check')} remaining.`)
			}
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		game.selected_space = space
		if (
			(game.vm_event === C_THE_MONDAY_DEMONSTRATIONS || game.vm_event === C_MY_FIRST_BANANA) &&
			game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)
		) {
			game.austria_hungary_border_reopened_tracker = true
			game.state = 'vm_do_support_check'
			return
		}
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			if (game.active === DEM && game.vm_available_ops > 1) {
				if (
					spaces[game.selected_space].country === 'East_Germany' &&
					game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
					game.active === DEM
				) {
					game.state = 'vm_austria_hungary_border_reopened_check'
					return
				}
			}
		}
		game.state = 'vm_do_support_check'
	},
	done() {
		push_undo()
		game.vm_available_ops = 0
		vm_next()
	},
}

states.vm_ceh_support_check_prep = {
	prompt() {
		if (game.vm_available_ops > 0) {
			view.prompt = `Select a space. ${pluralize(game.vm_available_ops, 'Support Check')} remaining.`

			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
		if (game.valid_spaces.length === 0) {
			view.prompt = 'Support Checks: No targets remaining. Pass.'
			gen_action('pass')
		}
	},
	space(space) {
		push_undo()
		game.selected_space = space
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			if (game.active === DEM && game.vm_available_ops > 1) {
				if (
					spaces[game.selected_space].country === 'East_Germany' &&
					game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
					game.active === DEM
				) {
					game.state = 'vm_austria_hungary_border_reopened_check'
					return
				}
			}
		}
		game.state = 'vm_ceh_do_support_check'
	},
	pass() {
		game.valid_spaces = []
		vm_next()
	}
}

states.vm_ceh_do_support_check = {
	prompt() {
		view.prompt = `Support Check: ${spaces[game.selected_space].name_unique}. Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_sc(game.selected_space)
		game.vm_available_ops--
		if (check_vp())
			return
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			vm_next()
		} else {
			game.state = 'vm_ceh_support_check_prep'
			return
		}
	},
}

states.vm_austria_hungary_border_reopened_check = {
	prompt() {
		view.prompt = 'Austria-Hungary Border Reopened: Will all Support Checks be in East Germany?'
		gen_action('yes')
		gen_action('no')
	},
	yes() {
		game.austria_hungary_border_reopened_tracker = true
		game.state = 'vm_do_support_check'
	},
	no() {
		game.state = 'vm_do_support_check'
	},
}

states.vm_1_support_check_prep = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			prompt_event("No valid targets for Support Check.")
			gen_action('done')
		} else {
			prompt_event(event_prompt())
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		game.selected_space = space
		if (
			game.active === DEM &&
			game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
			spaces[space].country === 'East_Germany'
		) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'vm_do_support_check'
	},
	done() {
		push_undo()
		game.vm_available_ops = 0
		vm_next()
	},
}

states.vm_do_support_check = {
	prompt() {
		view.prompt = `Support Check: ${spaces[game.selected_space].name_unique}. Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_sc(game.selected_space)
		game.vm_available_ops--
		if (check_vp()) {
			return
		} else if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			vm_next()
			return
		} else {
			game.state = 'vm_support_check_prep'
			return
		}
	},
}

states.vm_tiananmen_square_attempt = {
	prompt() {
		view.prompt = 'Tiananmen Square Attempt: Roll a die'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_tst_attempt()
	},
}

//================================== EVENT SPECIFIC STATES ======================================

states.vm_adamec = {
	prompt() {
		view.prompt = 'Adamec: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		logi(`D${roll}`)
		let worker_spaces = spaces.filter(space => space && space.country === 'Czechoslovakia' && space.socio === SOCIO_WORKER && check_dem_control(space.space_id)).length
		if (worker_spaces > 0) {
			logi(`-${worker_spaces} Democrat controlled worker spaces`)
			roll -= worker_spaces
		}
		if (roll > 2) {
			log(`Success: ${roll} >= 3`)
			vm_next()
			return
		}
		log(`Fail: ${roll} < 3`)
		permanently_remove(C_ADAMEC)
		vm_return()
	},
}

states.vm_brought_in_for_questioning = {
	prompt() {
		if (game.democrat_hand.length === 0) {
			view.prompt = 'Brought in for Questioning: No cards to discard.'
			gen_action('pass')
		} else {
			view.prompt = 'Brought in for Questioning: You must discard a random card.'
			gen_action('discard')
		}
	},
	discard() {
		clear_undo()
		game.vm_event = discard_card(game.democrat_hand)
		log(`Democrat discarded C${game.vm_event}.`)
		game.phase = 1
		if (cards[game.vm_event].side === 'C' && (cards[game.vm_event].playable || game.playable_cards.includes(game.vm_event))) {
			if (!game.vm_infl_to_do) {
				if (game.round_player === DEM)
					game.return = COM
				else
					game.return = DEM
			}
			log_event(game.vm_event)
			if (!is_auto_resolve(game.vm_event) && !switch_events.includes(game.vm_event))
				change_player()
			goto_vm(game.vm_event)
		} else {
			log('Event does not occur.')
			if (!game.vm_infl_to_do)
				game.return = DEM
			vm_return()
		}
	},
	pass() {
		log('No cards to discard.')
		vm_return()
	},
}

states.vm_central_committee_reshuffle = {
	prompt() {
		if (game.revolutions.every(n => n === true)) {
			view.prompt = 'Central Committee Reshuffle: No countries to choose.'
			gen_action('pass')
		} else {
			view.prompt = 'Central Committee Reshuffle: Choose a country to place SPs.'
			if (!game.revolutions[0]) {gen_action('poland')}
			if (!game.revolutions[1]) {gen_action('hungary')}
			if (!game.revolutions[2]) {gen_action('east_germany')}
			if (!game.revolutions[3]) {gen_action('bulgaria')}
			if (!game.revolutions[4]) {gen_action('czechoslovakia')}
			if (!game.revolutions[5]) {gen_action('romania')}
		}
	},
	east_germany() {
		push_undo()
		game.vm_active_country = "East_Germany"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_EAST_GERMANY]
		vm_next()
	},
	poland() {
		push_undo()
		game.vm_active_country = "Poland"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_POLAND]
		vm_next()
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = "Czechoslovakia"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_CZECHOSLOVAKIA]
		vm_next()
	},
	hungary() {
		push_undo()
		game.vm_active_country = "Hungary"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_HUNGARY]
		vm_next()
	},
	romania() {
		push_undo()
		game.vm_active_country = "Romania"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_ROMANIA]
		game.valid_spaces = game.valid_spaces.filter(space => space !== game.systematization)
		vm_next()
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = "Bulgaria"
		log(`Chose ${country_name(game.vm_active_country)}.`)
		game.valid_spaces = [...S_BULGARIA]
		vm_next()
	},
	pass() {
		log('Passed.')
		vm_return()
	},
}

states.vm_common_european_home_choose = {
	prompt() {
		view.prompt = `Common European Home: Play an opponent's card; Event does not occur.`
		for (let card of game.valid_cards) {
			gen_action_card(card)
		}
	},
	card(card) {
		push_undo()
		game.valid_cards = []
		silent_discard(card)
		game.vm_event = card
		log(`Played C${game.vm_event}.`)
		game.state = 'vm_common_european_home_play'
	},
}

states.vm_common_european_home_play = {
	prompt() {
		view.prompt = `Play ${card_name[this_card()]} for:`
		gen_action('influence')
		gen_action('support_check')
		if (game.active === DEM && game.vm_event === C_KOHL_PROPOSES_REUNIFICATION) {
			return
		}
	},
	influence() {
		push_undo()
		log('Placed SP:')
		game.vm_available_ops = get_card_ops(game.vm_event)
		valid_spaces_infl()
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'vm_add_infl'
	},
	support_check() {
		push_undo()
		log('Support Checks:')
		game.vm_available_ops = 2
		game.state = 'vm_ceh_support_check_prep'
		valid_spaces_sc()
	},
	tst() {
		push_undo()
		log_gap(`Played C${game.vm_event} to the Tiananmen Square Track`)
		game.state = 'vm_tiananmen_square_attempt'
	},
}

states.vm_dash_for_the_west = {
	prompt() {
		view.prompt = 'Dash for the West: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		log(`Roll: D${roll}`)
		let com_control = check_presence('East_Germany').com_spaces
		if (roll > com_control) {
			log(`Success: ${roll} > ${com_control} Communist controlled spaces in East Germany.`)
			log('+1 VP')
			game.vp++
			if (check_vp()) {
				return
			}
			game.discard = true
			game.state = 'vm_play_event_from_discard'
		} else {
			log(`Fail: ${roll} <= ${com_control} Communist controlled spaces in East Germany.`)
			vm_next()
		}
	},
}

states.vm_play_event_from_discard = {
	prompt() {
		if (game.valid_cards.length === 0) {
			prompt_event(`No valid cards in discard.`)
			gen_action('pass')
		} else {
			view.prompt = event_prompt() + "."
			for (let card of game.valid_cards) {
				gen_action('pass')
				gen_action_card(card)
			}
		}
	},
	card(card) {
		push_undo()
		if (game.active === game.round_player)
			log(`Chose C${card}.`)
		else
			log(`${game.active} chose C${card}.`)
		if (this_card() === C_REFORMER_REHABILITATED) {
			if (
				(game.active === DEM && cards[card].side === 'C') ||
				(game.active === COM && cards[card].side === 'D')
			)
				change_player()
		}
		game.vm_event = card
		game.vm_available_ops = cards[card].ops
		game.discard = false
		if (switch_events.includes(card)) {
			change_player()
		}
		if (!scoring_cards.includes(card))
			log_event(card)
		game.valid_cards = []
		goto_vm(card)
	},
	pass() {
		push_undo()
		if (game.valid_cards.length === 0) {
			log('No valid cards to choose.')
		} else {
			log('Did not choose a card.')
		}
		game.valid_cards = []
		vm_next()
	},
}

states.vm_deutsche_marks_prep = {
	prompt() {
		if (game.valid_cards.length === 0) {
			view.prompt = 'Deutsche Marks: No cards to give.'
			gen_action('pass')
		} else {
			view.prompt = 'Deutsche Marks: Choose a card to give.'
			for (let card of game.valid_cards) {
				gen_action_card(card)
			}
		}
	},
	card(card) {
		push_undo()
		log(`Democrat gave C${card}.`)
		game.valid_cards = []
		silent_discard(card)
		game.state = 'vm_deutsche_marks_confirm'
		game.vm_event = card
	},
	pass() {
		push_undo()
		vm_next()
	},
}

states.vm_deutsche_marks_confirm = {
	prompt() {
		view.prompt = `Deutsche Marks: Give ${quoted_card_name[game.vm_event]}.`
		gen_action('done')
	},
	done() {
		if (cards[game.vm_event].side === "C" 
			&& (cards[game.vm_event].playable || game.playable_cards.includes(game.vm_event))
			&& (is_auto_resolve(game.vm_event) || switch_events.includes(game.vm_event))) {
				log_event(game.vm_event)
				goto_vm(game.vm_event)
		} else {
			change_player()
			game.state = 'vm_deutsche_marks'
		}
	},
}

states.vm_deutsche_marks = {
	prompt() {
		view.prompt = `Deutsche Marks: Play ${quoted_card_name[this_card()]}.`
		if (cards[game.vm_event].side === 'C' && (cards[game.vm_event].playable || game.playable_cards.includes(game.vm_event))) {
			gen_action('event')
		} else {
			gen_action('influence')
			gen_action('support_check')
			if (game.com_tst_attempted_this_turn === 0) {
				gen_action('tst')
			}
		}
	},
	event() {
		push_undo()
		log_event(game.vm_event)
		if (!game.vm_infl_to_do) {
			game.return = game.active
		}
		goto_vm(game.vm_event)
	},
	influence() {
		push_undo()
		game.vm_available_ops = get_card_ops(game.vm_event)
		log('Communist Operations.')
		log(`Placed SP:`)
		valid_spaces_infl()
		game.state = 'vm_add_infl'
	},
	support_check() {
		push_undo()
		log('Communist Operations.')
		log(`Support Checks:`)
		game.vm_available_ops = 2
		game.state = 'vm_support_check_prep'
		valid_spaces_sc()
	},
	tst() {
		push_undo()
		log_gap(`Tiananmen Square Track`)
		game.available_ops = get_card_ops(game.vm_event)
		game.state = 'vm_tiananmen_square_attempt'
	},
}

states.vm_exit_visas = {
	prompt() {
		view.prompt = 'Exit Visas: You may discard cards from your hand and draw replacements.'
		for (let card of game.democrat_hand) {
			gen_action_card(card)
		}
		if (game.temp === 0) {
			gen_action('pass')
		} else {
			gen_action('done')
		}
	},
	card(card) {
		push_undo()
		discard(card)
		game.temp++
	},
	pass() {
		push_undo()
		log('Did not discard.')
		game.state = 'vm_exit_visas_finish'
	},
	done() {
		push_undo()
		game.state = 'vm_exit_visas_finish'
	},
}

states.vm_exit_visas_finish = {
	prompt() {
		if (game.temp > 0) {
			view.prompt = `Exit Visas: Draw ${game.temp} replacement cards.`
			gen_action('draw')
		} else {
			view.prompt = 'Exit Visas: Done.'
			gen_action('done')
		}
	},
	draw() {
		clear_undo()
		draw_cards(
			game.strategy_deck,
			game.democrat_hand,
			game.communist_hand,
			game.democrat_hand.length + game.temp,
			game.communist_hand.length
		)
		game.temp = 0
		vm_next()
	},
	done() {
		vm_next()
	},
}

states.vm_foreign_currency_debt_burden = {
	prompt() {
		view.prompt = 'Choose a country. The Communist may not make Support Checks there for the rest of the turn.'
		gen_action('east_germany')
		gen_action('poland')
		gen_action('czechoslovakia')
		gen_action('hungary')
		gen_action('bulgaria')
	},
	east_germany() {
		push_undo()
		game.foreign_currency_debt_burden = 'East_Germany'
		vm_next()
	},
	poland() {
		push_undo()
		game.foreign_currency_debt_burden = 'Poland'
		vm_next()
	},
	czechoslovakia() {
		push_undo()
		game.foreign_currency_debt_burden = 'Czechoslovakia'
		vm_next()
	},
	hungary() {
		push_undo()
		game.foreign_currency_debt_burden = 'Hungary'
		vm_next()
	},
	bulgaria() {
		push_undo()
		game.foreign_currency_debt_burden = 'Bulgaria'
		vm_next()
	},
}

states.vm_goodbye_lenin = {
	prompt() {
		if (game.valid_cards.length > 0) {
			view.prompt = `Play a red event from your opponent's hand, or play Goodbye Lenin for operations.`
			for (let card of game.valid_cards) {
				gen_action_card(card)
				gen_action('ops')
			}
		} else {
			view.prompt = `Communist has no red events. Play ${quoted_card_name[C_GOODBYE_LENIN]} for operations.`
			gen_action('ops')
		}
	},
	card(card) {
		push_undo()
		log(`Chose to play C${card} for the event`)
		log(`C${card}:`)
		let card_index = game.communist_hand.indexOf(card)
		game.communist_hand.splice(card_index, 1)
		game.vm_event = card
		game.view_opp_hand = false
		goto_vm(card)
	},
	ops() {
		push_undo()
		if (game.valid_cards.length === 0) {
			log('No red events.')
		}
		log("C" + C_GOODBYE_LENIN + " played for Operations.")
		game.view_opp_hand = false
		game.state = 'vm_goodbye_lenin_ops'
	},
}

// TODO: rename/reuse for shared effect with vm_tst_8
states.vm_goodbye_lenin_ops = {
	prompt() {
		view.prompt = `Play ${quoted_card_name[this_card()]}.`
		gen_action('influence')
		gen_action('support_check')
		if (
			(game.active === DEM && game.dem_tst_attempted_this_turn === 0 && game.dem_tst_position < 8) ||
			(game.active === COM && game.com_tst_attempted_this_turn === 0 && game.com_tst_position < 8)
		) {
			gen_action('tst')
		}
	},
	influence() {
		push_undo()
		game.vm_available_ops = get_card_ops(this_card())
		valid_spaces_infl()
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'vm_add_infl'
	},
	support_check() {
		push_undo()
		game.vm_available_ops = 2
		game.state = 'vm_support_check_prep'
		valid_spaces_sc()
	},
	tst() {
		push_undo()
		game.available_ops = get_card_ops(this_card())
		log('Tiananmen Square Attempt:')
		game.state = 'vm_tiananmen_square_attempt'
	},
}

states.vm_honecker = {
	prompt() {
		if (game.valid_cards.length === 0) {
			view.prompt = 'Honecker: No valid cards to choose.'
			gen_action('pass')
		} else {
			view.prompt = 'Honecker: Choose a card to add to your hand.'
			for (let card of game.valid_cards) {
				if (game.played_card === card) continue
				gen_action_card(card)
				gen_action('pass')
			}
		}
	},
	card(card) {
		push_undo()
		game.valid_cards = []
		log(`Took C${card} into hand.`)
		let card_index = game.strategy_discard.indexOf(card)
		game.strategy_discard.splice(card_index, 1)
		game.communist_hand.push(card)
		vm_next()
	},
	pass() {
		log('Did not take a card.')
		game.discard = false
		vm_next()
	},
}

states.vm_inflationary_currency = {
	prompt() {
		if ((game.active === COM && game.revolutions.every(n => n === false)) || (game.active === DEM && game.revolutions.every(n => n === true))) {
			view.prompt = 'Inflationary Currency: No countries to choose.'
			gen_action('pass')
		} else {
			view.prompt = 'Inflationary Currency: Choose a country where your opponent has power.'
			if (game.active === DEM) {
				if (!game.revolutions[0]) {gen_action('poland')}
				if (!game.revolutions[1]) {gen_action('hungary')}
				if (!game.revolutions[2]) {gen_action('east_germany')}
				if (!game.revolutions[3]) {gen_action('bulgaria')}
				if (!game.revolutions[4]) {gen_action('czechoslovakia')}
				if (!game.revolutions[5]) {gen_action('romania')}
			} else {
				if (game.revolutions[0]) {gen_action('poland')}
				if (game.revolutions[1]) {gen_action('hungary')}
				if (game.revolutions[2]) {gen_action('east_germany')}
				if (game.revolutions[3]) {gen_action('bulgaria')}
				if (game.revolutions[4]) {gen_action('czechoslovakia')}
				if (game.revolutions[5]) {gen_action('romania')}
			}
		}
	},
	east_germany() {
		push_undo()
		game.vm_active_country = 'East_Germany'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	poland() {
		push_undo()
		game.vm_active_country = 'Poland'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = 'Czechoslovakia'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	hungary() {
		push_undo()
		game.vm_active_country = 'Hungary'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	romania() {
		push_undo()
		game.vm_active_country = 'Romania'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = 'Bulgaria'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		vm_next()
	},
	pass() {
		log('Passed.')
		vm_return()
	},
}

states.vm_inflationary_currency_discard = {
	prompt() {
		if (game.valid_cards.length === 0) {
			view.prompt = 'Inflationary Currency: No valid cards to discard. You must pass.'
			gen_action('pass')
		} else {
			view.prompt = 'Inflationary Currency: You may discard a 3 Op or higher value card to cancel the Support Check.'
			gen_action('pass')
			for (let card of game.valid_cards) {
				gen_action_card(card)
			}
		}
	},
	card(card) {
		push_undo()
		discard(card)
		game.temp = card
		if (!game.vm_infl_to_do) {
			if (game.round_player === DEM) {
				game.return = COM
			} else {
				game.return = DEM
			}
		}
		vm_next()
	},
	pass() {
		push_undo()
		game.temp = 0
		log(`${game.active} did not discard.`)
		change_player()
		game.vm_available_ops = 1
		vm_next()
	},
}

states.vm_kiss_of_death = {
	prompt() {
		if (game.communist_hand.length === 0) {
			view.prompt = 'Kiss of Death. No cards to discard.'
			gen_action('pass')
		} else {
			view.prompt = 'Kiss of Death: You must randomly discard a card.'
			gen_action('discard')
		}
	},
	discard() {
		clear_undo()
		game.vm_event = discard_card(game.communist_hand)
		change_player()
		if (game.vm_event === C_REFORMER_REHABILITATED && game.dem_tst_position > game.com_tst_position) {
			log_event(game.vm_event)
			game.state = 'vm_kiss_of_death_finish'
		} else if (
			cards[game.vm_event].side !== 'C' &&
			event_is_playable(game.vm_event) &&
			game.vm_event !== C_COMMON_EUROPEAN_HOME
		) {
			log_event(game.vm_event)
			if (is_auto_resolve(game.vm_event) && game.vm_event !== C_PRUDENCE) {
				change_player()
				game.state = 'vm_kiss_of_death_finish'
			} else {
				game.state = 'vm_kiss_of_death_finish'
			}
		} else {
			change_player()
			logi('Event does not occur.')
			vm_next()
		}
	},
	pass() {
		log('No card to discard.')
		vm_next()
	},
}

states.vm_kiss_of_death_finish = {
	prompt() {
		view.prompt = `Play ${quoted_card_name[game.vm_event]} for the event.`
		gen_action('event')
	},
	event() {
		goto_vm(game.vm_event)
	},
}

states.vm_kremlin_coup_choose_country = {
	prompt() {
		if (game.temp.length > 0) {
			view.prompt = 'Kremlin Coup! Select a country where the Communist retains power.'
			for (let country of countries) {
				if (game.temp.includes(country)) {
					gen_action(`${country.toLowerCase()}`)
				}
			}
		} else {
			view.prompt = 'Kremlin Coup! There are no countries where the Communist retains power.'
			gen_action('done')
		}
	},
	east_germany() {
		push_undo()
		game.vm_active_country = 'East_Germany'
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		log(`${country_name(game.vm_active_country)}:`)
		vm_kremlin_coup_elite()
	},
	poland() {
		push_undo()
		game.vm_active_country = 'Poland'
		log(`${country_name(game.vm_active_country)}:`)
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		vm_kremlin_coup_elite()
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = 'Czechoslovakia'
		log(`${country_name(game.vm_active_country)}:`)
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		vm_kremlin_coup_elite()
	},
	hungary() {
		push_undo()
		game.vm_active_country = 'Hungary'
		log(`${country_name(game.vm_active_country)}:`)
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		vm_kremlin_coup_elite()
	},
	romania() {
		push_undo()
		game.vm_active_country = 'Romania'
		log(`${country_name(game.vm_active_country)}:`)
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		vm_kremlin_coup_elite()
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = 'Bulgaria'
		log(`${country_name(game.vm_active_country)}:`)
		game.temp = game.temp.filter(country => country !== game.vm_active_country)
		vm_kremlin_coup_elite()
	},
	done() {
		game.temp = 0
		vm_next()
	},
}

states.vm_kremlin_coup_take_control = {
	prompt() {
		if (game.valid_spaces.includes(game.systematization)) {
			view.prompt = `Kremlin Coup! ${country_name(game.vm_active_country)}'s Elite space no longer exists.`
			gen_action('done')
		} else if (game.valid_spaces.length === 0) {
			view.prompt = `Kremlin Coup! ${country_name(game.vm_active_country)}'s Elite space is already controlled.`
			gen_action('done')
		} else {
			view.prompt = `Kremlin Coup! Take control of the Elite space in ${country_name(game.vm_active_country)}.`
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		vm_take_control(space)
		if (game.vm_active_country === 'East_Germany') {game.selected_space = S_BERLIN }
		if (game.vm_active_country === 'Poland') {game.selected_space = S_WARSZAWA}
		if (game.vm_active_country === 'Czechoslovakia') {game.selected_space = S_PRAHA}
		if (game.vm_active_country === 'Hungary') {game.selected_space = S_BUDAPEST}
		if (game.vm_active_country === 'Romania') {game.selected_space = S_BUCURESTI}
		if (game.vm_active_country === 'Bulgaria') {game.selected_space = S_SOFIA}
		game.state = 'vm_kremlin_coup_sc_prep'
	},
	done() {
		push_undo()
		if (game.vm_active_country === 'East_Germany') {game.selected_space = S_BERLIN }
		if (game.vm_active_country === 'Poland') {game.selected_space = S_WARSZAWA}
		if (game.vm_active_country === 'Czechoslovakia') {game.selected_space = S_PRAHA}
		if (game.vm_active_country === 'Hungary') {game.selected_space = S_BUDAPEST}
		if (game.vm_active_country === 'Romania') {game.selected_space = S_BUCURESTI}
		if (game.vm_active_country === 'Bulgaria') {game.selected_space = S_SOFIA}
		game.state = 'vm_kremlin_coup_sc_prep'
	}
}

states.vm_kremlin_coup_sc_prep = {
	prompt() {
		if (game.persistent_events.includes(C_FOREIGN_CURRENCY_DEBT_BURDEN) && game.foreign_currency_debt_burden === game.vm_active_country) {
			view.prompt = `Kremlin Coup! May not Support Check in ${country_name(game.vm_active_country)} due to Foreign Currency Debt Burden.`
			gen_action('done')	
		} else {
			view.prompt = `Kremlin Coup! Conduct a Support Check in ${country_name(game.vm_active_country)}'s Bureaucratic space.`
			gen_action_space(game.selected_space)
		}
	},
	space(_space) {
		push_undo()
		log('Support check:')
		game.state = 'vm_kremlin_coup_sc'
	},
	done() {
		push_undo()
		if (game.temp.length > 0) {
			game.state = 'vm_kremlin_coup_choose_country'
		} else {
			vm_next()
		}
	}
}

states.vm_kremlin_coup_sc = {
	prompt() {
		view.prompt = `Support Check: ${spaces[game.selected_space].name_unique}. Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_sc(game.selected_space)
		if (game.temp.length > 0) {
			game.state = 'vm_kremlin_coup_choose_country'
		} else {
			vm_next()
		}
	},
}

states.vm_laszlo_tokes = {
	prompt() {
		view.prompt = `Laszlo Tokes. Choose to:`
		gen_action('influence')
		gen_action('support_check')
	},
	influence() {
		push_undo()
		game.vm_available_ops = get_card_ops(C_LASZLO_TOKES)
		valid_spaces_infl()
		game.valid_spaces = game.valid_spaces.filter(space_id => spaces[space_id].country === 'Romania')
		game.phase = 3
		vm_next()
	},
	support_check() {
		push_undo()
		game.vm_available_ops = 2
		valid_spaces_sc()
		game.valid_spaces = game.valid_spaces.filter(space_id => spaces[space_id].country === 'Romania')
		vm_next()
	}
}

states.vm_switch_infl = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			prompt_event(`No SPs to remove.`)
			gen_action("pass")
		} else {
			view.prompt = `${card_name[game.played_card]}: ${event_prompt()}.`
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		if (game.vm_event === C_BETRAYAL) {
			game.vm_available_ops = game.demInfl[space]
		}
		vm_switch_infl(space)
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
		}
		vm_next()
	},
	pass() {
		vm_next()
	},
}

states.vm_malta_summit = {
	prompt() {
		view.prompt = 'Malta Summit: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		logi(`D${roll}`)
		if (game.stability > 0) {
			logi(`+${Math.min(game.stability, 3)} USSR Stability Track`)
		}
		if (roll + game.stability > 3) {
			log(`Success: ${roll + game.stability} >= 4`)
			game.vp += 3
			log('+3 VP')
			if (check_vp()) {
				return
			}
			if (game.comInfl[S_DRESDEN] > 0 ) {game.valid_spaces.push(S_DRESDEN)}
			if (game.comInfl[S_BYDGOSZCZ] > 0 ) {game.valid_spaces.push(S_BYDGOSZCZ)}
			if (game.comInfl[S_PLZEN] > 0 ) {game.valid_spaces.push(S_PLZEN)}
			if (game.comInfl[S_SZOMBATHELY] > 0 ) {game.valid_spaces.push(S_SZOMBATHELY)}
			if (game.comInfl[S_CLUJ_NAPOCA] > 0 ) {game.valid_spaces.push(S_CLUJ_NAPOCA)}
			if (game.comInfl[S_STARA_ZAGORA] > 0 ) {game.valid_spaces.push(S_STARA_ZAGORA)}
			game.remove_opponent_infl = true
			vm_next()
		}
		else {
			log(`Fail: ${roll + game.stability} < 4`)
			vm_return()
		}
	},
}

states.vm_modrow = {
	prompt() {
		view.prompt = `Modrow: Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		let dem_spaces = spaces.filter(space => space && space.country === 'East_Germany' && check_dem_control(space.space_id)).length
		if (roll > dem_spaces) {
			log(`Roll: D${roll}`)
			log(`Success: ${roll} > ${dem_spaces} Democratic spaces`)
			vm_next()
		} else {
			log(`Roll: D${roll}`)
			log(`Fail: ${roll} <= ${dem_spaces} Democratic spaces`)
			permanently_remove(C_MODROW)
			vm_return()
		}
	},
}

states.vm_nepotism = {
	prompt() {
		view.prompt = 'Nepotism: Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		if (roll < 3) {
			log(`Roll: D${roll} adds 4 SPs`)
			game.vm_available_ops = 4
		} else if (roll < 5) {
			log(`Roll: D${roll} adds 3 SPs`)
			game.vm_available_ops = 3
		} else {
			log(`Roll: D${roll} adds 1 SP`)
			game.vm_available_ops = 1
		}
		vm_next()
	},
}

states.vm_new_years_eve_party = {
	prompt() {
		view.prompt = 'Choose whether the game ends at the end of this turn.'
		gen_action('end')
		gen_action('continue')
	},
	end() {
		push_undo()
		add_to_persistent_events(C_NEW_YEARS_EVE_PARTY)
		log('Choses to end the game. There will be no final scoring.')
		let power = game.revolutions.filter(value => value === false).length
		if (power > 3) {
			log(`Communist holds power in ${pluralize(power, 'country', 's')}.`)
			log(`-3 VP`)
			game.vp -= 3
		} else {
			log(`Communist holds power in ${pluralize(power, 'country', 's')}.`)
			log(`+3 VP`)
			game.vp += 3
		}
		if (check_vp()) {
			return
		}
		vm_next()
	},
	continue() {
		push_undo()
		log('Choses to continue.')
		permanently_remove(C_NEW_YEARS_EVE_PARTY)
		vm_next()
	},
}

states.vm_nomenklatura = {
	prompt() {
		view.prompt = 'Nomenklatura: Choose to remove all Democratic SPs from Elite spaces or place 3 SPs in any Elite space(s).'
		gen_action('remove')
		let dem_elites = spaces.filter((space) => space.socio === SOCIO_ELITE && game.demInfl[space.space_id] > 0).length
		if (dem_elites === 0) {
			view.actions.remove = 0
		}
		gen_action('add')
	},
	remove() {
		push_undo()
		game.valid_spaces = []
		for (let i = 0; i < spaces.length; i++) {
			let space = spaces[i]

			if (space.socio === SOCIO_ELITE && game.demInfl[i] > 0) {
				game.valid_spaces.push(space.space_id)
			}
		}
		game.vm_available_ops = game.valid_spaces.length
		game.remove_opponent_infl = true
		log('Removed SP:')
		game.state = 'vm_nomenklatura_remove'
	},
	add() {
		push_undo()
		game.valid_spaces = []
		for (let space of spaces) {
			if (space.socio === SOCIO_ELITE) {
				game.valid_spaces.push(space.space_id)
			}
		}
		check_systematization()
		game.vm_available_ops = 3
		log('Placed SP:')
		game.state = 'vm_nomenklatura_add'
	},
}

states.vm_nomenklatura_remove = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			view.prompt = 'Nomenklatura: No SPs to remove.'
			gen_action('pass')
		} else {
			view.prompt = 'Nomenklatura: Remove all Democratic SPs from Elite spaces.'

			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		vm_do_remove_all_infl(space)
		if (game.valid_spaces.length === 0) {
			vm_next()
		}
	},
	pass() {
		push_undo()
		vm_next()
	},
}

states.vm_nomenklatura_add = {
	prompt() {
		view.prompt = `Nomenklatura: Place ${pluralize(game.vm_available_ops, 'SP')} in any Elite space(s).`
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		vm_do_add_infl_free(space)
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			vm_next()
		}
	},
}

states.vm_samizdat = {
	prompt() {
		view.prompt = 'Samizdat: You may set aside a card from your hand and draw a replacement.'
		for (let card of game.democrat_hand) {
			gen_action_card(card)
		}
		gen_action('pass')
	},
	card(card) {
		push_undo()
		game.samizdat_card = card
		game.democrat_hand = game.democrat_hand.filter(c => c !== card)
		log('Set aside a card.')
		game.state = 'vm_samizdat_finish'
	},
	pass() {
		push_undo()
		log('Did not set aside a card.')
		vm_next()
	},
}

states.vm_samizdat_finish = {
	prompt() {
		view.prompt = 'Draw a replacement card.'
		gen_action('draw')
	},
	draw() {
		clear_undo()
		let card = draw_card(game.strategy_deck)
		if (card > 0)
			game.democrat_hand.push(card)
		vm_next()
	},
}

states.vm_shock_therapy = {
	prompt() {
		if (game.revolutions.every(n => n === false)) {
			view.prompt = 'Shock Therapy: No countries to choose.'
			gen_action('pass')
		} else {
			if (!game.vm_active_country || game.vm_active_country === '') {
				view.prompt = 'Shock Therapy: Choose a country where you hold Power.'
				if (game.revolutions[0]) {gen_action('poland')}
				if (game.revolutions[1]) {gen_action('hungary')}
				if (game.revolutions[2]) {gen_action('east_germany')}
				if (game.revolutions[3]) {gen_action('bulgaria')}
				if (game.revolutions[4]) {gen_action('czechoslovakia')}
				if (game.revolutions[5]) {gen_action('romania')}
			}
			else {
				view.prompt = 'Shock Therapy: Roll a die.'
				gen_action('roll')
			}
		}
	},
	east_germany() {
		push_undo()
		game.vm_active_country = 'East_Germany'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	poland() {
		push_undo()
		game.vm_active_country = 'Poland'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = 'Czechoslovakia'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	hungary() {
		push_undo()
		game.vm_active_country = 'Hungary'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	romania() {
		push_undo()
		game.vm_active_country = 'Romania'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = 'Bulgaria'
		log(`Chose ${country_name(game.vm_active_country)}.`)
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		let worker_farmer = 0
		for (let space of spaces) {
			if (
				space &&
				space.country === game.vm_active_country &&
				check_com_control(space.space_id) &&
				(space.socio === SOCIO_WORKER || space.socio === SOCIO_FARMER)
			) {
				worker_farmer++
			}
		}
		logi(`D${roll}`)
		logi(`-${worker_farmer} Communist controlled Worker and Farmer spaces`)
		if ((roll - worker_farmer) > 2) {
			log(`Success: ${roll - worker_farmer} >= 3`)
			log('+3 VP')
			game.vp += 3
			if (check_vp()) {
				return
			}
			vm_next()
		} else {
			log(`Fail: ${roll - worker_farmer} < 3`)
			permanently_remove(C_SHOCK_THERAPY)
			vm_return()
		}
	},
	pass() {
		log('Passed.')
		vm_return()
	},
}

states.vm_social_democratic_platform_adopted = {
	prompt() {
		if (game.revolutions.every(n => n === false)) {
			view.prompt = 'Social Democratic Platform Adopted: No countries to choose.'
			gen_action('pass')
		} else {
			view.prompt = 'Social Democratic Platform Adopted: Select a country where the Democrat holds Power.'
			if (game.revolutions[0]) {gen_action('poland')}
			if (game.revolutions[1]) {gen_action('hungary')}
			if (game.revolutions[2]) {gen_action('east_germany')}
			if (game.revolutions[3]) {gen_action('bulgaria')}
			if (game.revolutions[4]) {gen_action('czechoslovakia')}
			if (game.revolutions[5]) {gen_action('romania')}
		}
	},
	east_germany() {
		push_undo()
		game.vm_active_country = 'East_Germany'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	poland() {
		push_undo()
		game.vm_active_country = 'Poland'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = 'Czechoslovakia'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	hungary() {
		push_undo()
		game.vm_active_country = 'Hungary'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	romania() {
		push_undo()
		game.vm_active_country = 'Romania'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = 'Bulgaria'
		log(`Selected ${country_name(game.vm_active_country)}`)
		vm_next()
	},
	pass() {
		log('Passed.')
		vm_return()
	},
}

states.vm_systematization = {
	prompt() {
		view.prompt = 'Systematization: Eliminate a space in Romania.'
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		push_undo()
		vm_eliminate(space)
		game.valid_spaces = []
		game.systematization = space
		add_to_persistent_events(C_SYSTEMATIZATION)
		vm_next()
	},
}

states.vm_the_chinese_solution = {
	prompt() {
		view.prompt = 'The Chinese Solution: You may give up 3 VP to conduct Support Checks in a country where you hold power.'
		if (!game.revolutions[0]) {gen_action('poland')}
		if (!game.revolutions[1]) {gen_action('hungary')}
		if (!game.revolutions[2]) {gen_action('east_germany')}
		if (!game.revolutions[3]) {gen_action('bulgaria')}
		if (!game.revolutions[4]) {gen_action('czechoslovakia')}
		if (!game.revolutions[5]) {gen_action('romania')}
		gen_action('pass')
	},
	east_germany() {
		push_undo()
		game.vm_active_country = 'East_Germany'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	poland() {
		push_undo()
		game.vm_active_country = 'Poland'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	czechoslovakia() {
		push_undo()
		game.vm_active_country = 'Czechoslovakia'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	hungary() {
		push_undo()
		game.vm_active_country = 'Hungary'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	romania() {
		push_undo()
		game.vm_active_country = 'Romania'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	bulgaria() {
		push_undo()
		game.vm_active_country = 'Bulgaria'
		log(`Chose ${country_name(game.vm_active_country)}.`)
		log('+3 VP')
		game.vp += 3
		if (check_vp()) {
			return
		}
		vm_next()
	},
	pass() {
		push_undo()
		log(`Chose not to conduct Support Checks`)
		permanently_remove(C_THE_CHINESE_SOLUTION)
		vm_return()
	},
}

states.vm_the_tyrant_is_gone = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			view.prompt = 'The Tyrant is Gone: No space available.'
			gen_action('pass')
		} else {
			view.prompt = 'The Tyrant is Gone: Select a space in Romania for the Ceausescus to flee to.'
			for (let space_id of game.valid_spaces) {
				if (!space_id)
					continue
				gen_action_space(space_id)
			}
		}
	},
	space(space) {
		push_undo()
		log(`The Ceausescus flee to %${space}.`)
		game.the_tyrant_is_gone = space
		game.valid_spaces = []
		vm_next()
	},
	pass() {
		push_undo()
		vm_next()
	}
}

states.vm_the_wall_must_go = {
	prompt() {
		view.prompt = 'The Wall Must Go! Roll a die.'
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let attempt = game.the_wall_must_go['dem_wins'] + game.the_wall_must_go['com_wins']
		if (game.the_wall_must_go['dem_roll'] === 0 && game.the_wall_must_go['com_roll'] === 0) {
			log(`Round ${attempt+1}`)
		}
		let roll = roll_d6()
		logi(`${game.active}: D${roll}`)
		if (game.active === DEM) {
			let controlled_spaces = spaces.filter(space => space && space.country === 'East_Germany' && check_dem_control(space.space_id)).length
			if (controlled_spaces > 0) {
				logii(`+${controlled_spaces} from spaces`)
				logii(`Modified roll: ${roll + controlled_spaces}`)
				roll += controlled_spaces
			}
			game.the_wall_must_go['dem_roll'] = roll
		} else {
			let controlled_spaces = spaces.filter(space => space && space.country === 'East_Germany' && check_com_control(space.space_id)).length
			if (controlled_spaces > 0) {
				logii(`+${controlled_spaces} from spaces`)
				logii(`Modified roll: ${roll + controlled_spaces}`)
				roll += controlled_spaces
			}
			game.the_wall_must_go['com_roll'] = roll
		}
		if (game.the_wall_must_go['dem_roll'] > 0 && game.the_wall_must_go['com_roll'] > 0) {
			if (game.the_wall_must_go['dem_roll'] > game.the_wall_must_go['com_roll']) {
				logi('Democrat wins')
				game.the_wall_must_go['dem_wins']++
			} else if (game.the_wall_must_go['dem_roll'] === game.the_wall_must_go['com_roll']) {
				logi('Tie. Re-roll')
			} else {
				logi('Communist wins')
				game.the_wall_must_go['com_wins']++
			}
			logi(`Democrat: ${game.the_wall_must_go['dem_wins']}, Communist: ${game.the_wall_must_go['com_wins']}`)
		}
		if (game.the_wall_must_go['dem_wins'] === 2) {
			log('Democrat wins C' + C_THE_WALL_MUST_GO)
			finish_the_wall()
			return
		}
		if (game.the_wall_must_go['com_wins'] === 2) {
			log('Communist wins C' + C_THE_WALL_MUST_GO)
			finish_the_wall()
			return
		}
		if (game.the_wall_must_go['dem_roll'] === 0 || game.the_wall_must_go['com_roll'] === 0) {
			change_player()
		} else {
			game.the_wall_must_go['dem_roll'] = 0
			game.the_wall_must_go['com_roll'] = 0
		}
	},
}

states.vm_warsaw_pact_summit = {
	prompt() {
		view.prompt = 'Choose to play for Support Checks or place SPs.'
		gen_action('influence')
		gen_action('support_check')
	},
	influence() {
		push_undo()
		for (let i = 0; i < spaces.length; i++) {
			if (game.systematization && game.systematization === i) continue
			let space = spaces[i]
			if (game.demInfl[i] === 0) {
				game.valid_spaces.push(space.space_id)
			}
		}
		game.vm_available_ops = 4
		game.phase = 3
		vm_next()
	},
	support_check() {
		push_undo()
		for (let i = 0; i < spaces.length; i++) {
			let space = spaces[i]
			if (game.demInfl[i] > 0 && (space.socio === SOCIO_INTELLECTUAL || space.socio === SOCIO_STUDENT)) {
				game.valid_spaces.push(space.space_id)
			}
		}
		game.vm_available_ops = 2
		vm_next()
	},
}

states.vm_we_are_the_people_remove = {
	prompt() {
		if (game.demInfl[S_LUTHERAN_CHURCH] === 0 && game.vm_available_ops > 0) {
			view.prompt = '"We are the People!": No SPs to remove.'
			gen_action('done')
		} else if (game.vm_available_ops > 0) {
			view.prompt = '"We are the People!": Remove up to 4 SPs from the Lutheran Church.'
			gen_action('done')
			for (let space_id of game.valid_spaces) {
				gen_action_space(space_id)
			}
		} else {
			view.prompt = '"We are the People!": Remove SPs done.'
			gen_action('done')
		}
	},
	space(space) {
		remove_infl(space, 'vm_available_ops')
		if (game.vm_influence_added[S_LUTHERAN_CHURCH] === 4 ||
			game.valid_spaces.length === 0
		) {
			summary_flush()
			finish_we_are_the_people()
		}
	},
	done() {
		push_undo()
		summary_flush()
		if (!game.vm_influence_added[S_LUTHERAN_CHURCH]) {
			vm_next()
		} else {
			finish_we_are_the_people()
		}
	},
}
states.vm_we_are_the_people_add = {
	prompt() {
		view.prompt = `"We are the People!": You must place ${pluralize(game.vm_available_ops,'SP')} in Germany.`
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		vm_do_add_limited_infl(space, game.vm_max_infl)
		if (game.vm_available_ops === 0) {
			game.valid_spaces = []
			vm_next()
		}
	},
}

states.vm_workers_revolt = {
	prompt() {
		if (game.valid_spaces.length === 0) {
			view.prompt = 'Workers Revolt: No valid spaces.'
			gen_action('pass')
			return
		}
		view.prompt = 'Workers Revolt: Select a Worker Space in a country your opponent has power.'
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	pass() {
		push_undo()
		vm_next()
	},
	space(space) {
		push_undo()
		game.selected_space = space
		log(`Chose %${game.selected_space}.`)
		game.state = 'vm_workers_revolt_finish'
	},
}

states.vm_workers_revolt_finish = {
	prompt() {
		view.prompt = `Target: ${spaces[game.selected_space].name_unique}. Roll a die.`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		let roll = roll_d6()
		logi(`D${roll}`)
		let adj = count_adj(game.selected_space)
		if (game.active === DEM) {
			logi(`-${adj.com_adj} opponent controlled spaces`)
			roll -= adj.com_adj
		} else {
			logi(`-${adj.dem_adj} opponent controlled spaces`)
			roll -= adj.dem_adj
		}
		if (roll >= 4) {
			log(`Success: ${roll} >= 4`)
			vm_replace_all_infl(game.selected_space)
		} else {log(`Fail: ${roll} < 4`)}
		delete game.selected_space
		vm_next()
	},
}

// ==================== TIANANMEN SQUARE TRACK STATES =====================

states.vm_tst_3_prep = {
	inactive: 'claim Tiananmen Square award',
	prompt() {
		view.prompt = 'Tiananmen Square Award: Draw 3 cards.'
		gen_action('draw')
	},
	draw() {
		logi('Drew 3 cards.')
		if (game.active === DEM) {
			game.temp = game.democrat_hand.length
			draw_cards(
				game.strategy_deck,
				game.democrat_hand,
				game.communist_hand,
				game.democrat_hand.length + 3,
				game.communist_hand.length
			)
			game.valid_cards = [
				game.democrat_hand[game.temp],
				game.democrat_hand[game.temp + 1],
				game.democrat_hand[game.temp + 2],
			]
		} else {
			game.temp = game.communist_hand.length
			draw_cards(
				game.strategy_deck,
				game.democrat_hand,
				game.communist_hand,
				game.democrat_hand.length,
				game.communist_hand.length + 3
			)
			game.valid_cards = [
				game.communist_hand[game.temp],
				game.communist_hand[game.temp + 1],
				game.communist_hand[game.temp + 2],
			]
		}
		game.temp = 0
		game.state = 'vm_tst_3'
	},
}

states.vm_tst_3 = {
	inactive: 'claim Tiananmen Square award',
	prompt() {
		if (game.temp < 2) {
			view.prompt = `Discard 2 of the drawn cards.`
			for (let card of game.valid_cards) {
				gen_action_card(card)
			}
		} else {
			view.prompt = 'Discard cards: Done.'
			gen_action('done')
		}
	},
	card(card) {
		push_undo()
		discard(card)
		game.valid_cards.splice(game.valid_cards.indexOf(card), 1)
		game.temp ++
	},
	done() {
		game.valid_cards = []
		vm_next()
	}
}

states.vm_tst_4 = {
	inactive: 'claim Tiananmen Square award',
	prompt() {
		if (game.vm_available_ops === 0 || game.valid_spaces.length === 0) {
			view.prompt = 'Tiananmen Square Award: Remove SPs done.'
			gen_action('done')
			return
		}
		view.prompt = `Tiananmen Square Award: Remove ${pluralize(game.vm_available_ops,'SP')}.`
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		remove_infl(space, 'vm_available_ops')
		if (game.vm_available_ops === 0) {
			vm_next()
		}
	},
	done() {
		vm_next()
	},
}

states.vm_tst_6 = {
	inactive: 'make their free Support Check',
	prompt() {
		view.prompt = 'Tiananmen Square Award: A free 2 Ops Support Check.'
		for (let space_id of game.valid_spaces)
			gen_action_space(space_id)
		if (game.valid_spaces.length === 0) {
			view.prompt = 'Tiananmen Square Award: No space to Support Check. Pass.'
			gen_action('pass')
		}
	},
	space(space) {
		push_undo()
		if (game.active === DEM)
			log('Democrat free 2 Ops support check.')
		else
			log('Communist free 2 Ops support check.')
		game.selected_space = space
		if (
			game.active === DEM &&
			game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED) &&
			spaces[space].country === 'East_Germany'
		) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'vm_tst_6_sc'
	},
	pass() {
		game.valid_spaces = []
		vm_next()
	}
}

states.vm_tst_6_sc = {
	inactive: 'do Support Check',
	prompt() {
		view.prompt = `Support Check in ${spaces[game.selected_space].name_unique}: Roll a die`
		gen_action('roll')
	},
	roll() {
		clear_undo()
		do_sc(game.selected_space)
		game.vm_available_ops--
		game.valid_spaces = []
		game.state = 'vm_tst_6'
		vm_next()
		return
	},
}

states.vm_tst_8 = {
	inactive: 'use Tiananmen Square award',
	prompt() {
		if (game.vm_event_to_do && game.vm_infl_to_do) {
			view.prompt = 'Tiananmen Square Award: Play for both Ops and Event.'
			gen_action('event')
			gen_action('ops')
		}
		else if (!game.vm_event_to_do && game.vm_infl_to_do) {
			view.prompt = 'Tiananmen Square Award: Event resolved. Use Ops.'
			gen_action('ops')
		}
		else if (game.vm_event_to_do && !game.vm_infl_to_do) {
			view.prompt = 'Tiananmen Square Award: Operations resolved. Use Event.'
			gen_action('event')
		}
		else if (!game.vm_event_to_do && !game.vm_infl_to_do) {
			view.prompt = 'Tiananmen Square Award: Done.'
			gen_action('end_round')
		}
	},
	event() {
		push_undo()
		if (check_ligachev_event(game.played_card))
			return
		log_event(game.played_card)
		game.vm_event_to_do = false
		game.return_state = 'vm_tst_8'
		game.return = game.active
		if (switch_events.includes(game.played_card))
			change_player()
		game.vm_event = game.played_card
		goto_vm(game.vm_event)
	},
	ops() {
		push_undo()
		log_gap('Operations:')
		game.vm_infl_to_do = false
		game.return = game.active
		game.return_state = 'vm_tst_8'
		goto_vm(208)
	},
	end_round() {
		push_undo()
		game.tst_8 = true
		end_round()
	},
}

states.vm_tst_8_ops = {
	inactive: 'play card for Operations',
	prompt() {
		view.prompt = `Play ${quoted_card_name[game.played_card]}.`
		gen_action('influence')
		gen_action('support_check')
		if (
			(game.active === DEM && game.dem_tst_attempted_this_turn === 0) ||
			(game.active === COM && game.com_tst_attempted_this_turn === 0)
		) {
			gen_action('tst')
		}
	},
	influence() {
		push_undo()
		game.vm_available_ops = cards[game.played_card].ops
		valid_spaces_infl()
		if (game.persistent_events.includes(C_AUSTRIA_HUNGARY_BORDER_REOPENED)) {
			game.austria_hungary_border_reopened_tracker = true
		}
		game.state = 'vm_add_infl'
	},
	support_check() {
		push_undo()
		game.vm_available_ops = 2
		game.state = 'vm_support_check_prep'
	},
	tst() {
		push_undo()
		game.state = 'vm_tiananmen_square_attempt'
	},
}

// ========================= POWER STRUGGLE STATES ========================

states.vm_scare_tactics = {
	inactive: 'remove a Support Point',
	prompt() {
		if (game.valid_spaces.length === 0 && game.vm_available_ops > 0) {
			prompt_event(`No SPs to remove.`)
			gen_action('done')
			return
		}
		if (game.vm_available_ops === 0) {
			prompt_event(`Remove SPs done.`)
			gen_action('done')
			return
		}
		prompt_event(`Remove ${pluralize(game.vm_available_ops, 'opponent SP')}${event_prompt()}.`)
		for (let space_id of game.valid_spaces) {
			gen_action_space(space_id)
		}
	},
	space(space) {
		push_undo()
		remove_infl(space, 'vm_available_ops')
	},
	done() {
		summary_flush()
		log('Loses initiative.')
		log_gap(`Round ${game.ps_round}:`)
		vm_next()
	},
}

states.vm_support_surges_1 = {
	inactive: 'draw cards',
	prompt() {
		view.prompt = 'Support Surges: Draw a card.'
		gen_action('draw')
	},
	draw() {
		if (game.active === DEM) {
			draw_cards(
				game.power_struggle_deck,
				game.dem_pwr_hand,
				game.com_pwr_hand,
				game.dem_pwr_hand.length + 1,
				game.com_pwr_hand.length
			)
			game.temp = game.dem_pwr_hand[game.dem_pwr_hand.length - 1]
		} else {
			draw_cards(
				game.power_struggle_deck,
				game.dem_pwr_hand,
				game.com_pwr_hand,
				game.dem_pwr_hand.length,
				game.com_pwr_hand.length + 1
			)
			game.temp = game.com_pwr_hand[game.com_pwr_hand.length - 1]
		}
		if (game.power_struggle_deck.length === 0)
			game.state = 'vm_support_surges_no_cards'
		else
			game.state = 'vm_support_surges_2'
	},
}

states.vm_support_surges_2 = {
	inactive: 'draw cards',
	prompt() {
		if (wildcards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew ${power_cards[game.temp].name}. Draw a second card.`
		}
		else if (elite_leaders.includes(game.temp)) {
			view.prompt = `Support Surges: You drew an ${power_cards[game.temp].name}. Draw a second card.`
		}
		else if (numberless_cards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name}. Draw a second card.`
		} else {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name} ${power_cards[game.temp].value}. Draw a second card.`
		}
		gen_action('draw')
	},
	draw() {
		if (game.active === DEM) {
			draw_cards(
				game.power_struggle_deck,
				game.dem_pwr_hand,
				game.com_pwr_hand,
				game.dem_pwr_hand.length + 1,
				game.com_pwr_hand.length
			)
			game.temp = game.dem_pwr_hand[game.dem_pwr_hand.length - 1]
		} else {
			draw_cards(
				game.power_struggle_deck,
				game.dem_pwr_hand,
				game.com_pwr_hand,
				game.dem_pwr_hand.length,
				game.com_pwr_hand.length + 1
			)
			game.temp = game.com_pwr_hand[game.com_pwr_hand.length - 1]
		}
		game.state = 'vm_support_surges_3'
	},
}

states.vm_support_surges_3 = {
	inactive: 'draw cards',
	prompt() {
		if (wildcards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew ${power_cards[game.temp].name}. Done.`
		}
		else if (elite_leaders.includes(game.temp)) {
			view.prompt = `Support Surges: You drew an ${power_cards[game.temp].name}. Done.`
		}
		else if (numberless_cards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name}. Done.`
		} else {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name} ${power_cards[game.temp].value}. Done.`
		}
		gen_action('done')
	},
	done() {
		game.phase = 0
		delete game.temp
		log('Drew 2 cards.')
		log('Surrenders initiative.')
		log_gap(`Round ${game.ps_round}:`)
		vm_next()
	},
}

states.vm_support_surges_no_cards = {
	inactive: 'draw cards',
	prompt() {
		if (wildcards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew ${power_cards[game.temp].name}. No Power Cards remaining. Done.`
		}
		else if (elite_leaders.includes(game.temp)) {
			view.prompt = `Support Surges: You drew an ${power_cards[game.temp].name}. No Power Cards remaining. Done.`
		}
		else if (numberless_cards.includes(game.temp)) {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name}. No Power Cards remaining. Done.`
		} else {
			view.prompt = `Support Surges: You drew a ${power_cards[game.temp].name} ${power_cards[game.temp].value}. No Power Cards remaining. Done.`
		}
		gen_action('done')
	},
	done() {
		game.phase = 0
		delete game.temp
		log('Drew 1 card.')
		log('Deck is empty.')
		log('Surrenders initiative.')
		log_gap(`Round ${game.ps_round}:`)
		vm_next()
	},
}

states.vm_support_falters = {
	inactive: 'discard cards',
	prompt() {
		if (
			(game.active === DEM && game.dem_pwr_hand.length === 0) ||
			(game.active === COM && game.com_pwr_hand.length === 0)
		) {
			view.prompt = 'Support Falters: No remaining cards to discard.'
			gen_action('pass')
		} else if (game.vm_available_ops > 0) {
			view.prompt = 'Support Falters: Discard a card.'
			gen_action('discard')
		} else {
			view.prompt = 'Support Falters: Done.'
			gen_action('done')
		}
	},
	discard() {
		if (game.active === DEM) {
			discard_card(game.dem_pwr_hand)
		} else {
			discard_card(game.com_pwr_hand)
		}
		game.vm_available_ops --
	},
	pass() {
		log('Takes initiative.')
		log_gap(`Round ${game.ps_round}:`)
		game.return = game.active
		vm_next()
	},
	done() {
		log('Takes initiative.')
		log_gap(`Round ${game.ps_round}:`)
		game.return = game.active
		vm_next()
	}
}

/* =================== EVENTS ================================ */

// #region GENERATED EVENT CODE
const CODE = []

CODE[1] = [ // Legacy of Martial Law*
	[ vm_permanently_remove ],
	[ vm_valid_spaces_country_opp, 'Poland' ],
	[ vm_prompt, 'replace 1 Democratic SP in Poland with a Communist SP' ],
	[ vm_legacy_of_martial_law ],
	[ vm_valid_spaces_country_sc, 'Poland' ],
	[ vm_prompt, 'make a Support Check in Poland' ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[2] = [ // Solidarity Legalised*
	[ vm_if, ()=>!is_auto_resolve(C_SOLIDARITY_LEGALIZED) ],
	[ vm_solidarity_legalised_spaces ],
	[ vm_prompt, 'to every uncontrolled Worker and Farmer space in Poland' ],
	[ vm_add_limited_infl, 9, 1 ],
	[ vm_endif ],
	[ vm_solidarity_legalised ],
	[ vm_return ],
]

CODE[3] = [ // Walesa
	[ vm_permanently_remove ],
	[ vm_valid_spaces_country, 'Poland' ],
	[ vm_prompt, 'any space(s) in Poland' ],
	[ vm_add_infl_free, 4 ],
	[ vm_valid_spaces_country_sc, 'Poland' ],
	[ vm_prompt, 'make Support Checks in Poland' ],
	[ vm_support_check, 2 ],
	[ vm_return ],
]

CODE[4] = [ // Michnik
	[ vm_permanently_remove ],
	[ vm_valid_spaces, 'Polish Writers' ],
	[ vm_prompt, 'the Polish Intellectuals space' ],
	[ vm_add_x_infl, 3 ],
	[ vm_return ],
]

CODE[5] = [ // General strike
	[ vm_general_strike ],
	[ vm_return ],
]

CODE[6] = [ // Brought in for Questioning
	[ vm_if, ()=>!is_auto_resolve(C_BROUGHT_IN_FOR_QUESTIONING) ],
	[ vm_brought_in_for_questioning ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[7] = [ // State Run Media*
	[ vm_permanently_remove ],
	[ vm_valid_spaces_opponent ],
	[ vm_remove_limited_opp_infl, 4, 2 ],
	[ vm_return ],
]

CODE[8] = [ // Prudence
	[ vm_prudence ],
	[ vm_return ],
]

CODE[9] = [ // The Wall*
	[ vm_the_wall ],
	[ vm_return ],
]

CODE[10] = [ // Cult of Personality
	[ vm_permanently_remove ],
	[ vm_if, ()=>!game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) ],
	[ vm_valid_spaces_country_socio_2, 'Romania', 3, 4 ],
	[ vm_prompt, 'Worker or Farmer spaces in Romania, no more than 2 per space' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_else ],
	[ vm_tyrant_block ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[11] = [ // Dissident arrested
	[ vm_if, ()=>!is_auto_resolve(C_DISSIDENT_ARRESTED) ],
	[ vm_valid_spaces_opponent_socio, 5 ],
	[ vm_prompt, 'any Intellectuals space' ],
	[ vm_remove_x_opp_infl, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[12] = [ // Apparatchicks
	[ vm_permanently_remove ],
	[ vm_valid_spaces_socio, 2 ],
	[ vm_prompt, ' to any Bureaucratic space(s)' ],
	[ vm_add_infl_free, 3 ],
	[ vm_return ],
]

CODE[13] = [ // Stasi
	[ vm_stasi ],
	[ vm_return ],
]

CODE[14] = [ // Gorbachev Charms the West
	[ vm_valid_spaces_opponent ],
	[ vm_remove_opp_infl, 2 ],
	[ vm_valid_spaces_sc ],
	[ vm_prompt, 'select a space for the Support Check.' ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[15] = [ // Honecker
	[ vm_if, ()=>!is_auto_resolve(C_HONECKER) ],
	[ vm_honecker ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[16] = [ // Nomenklatura*
	[ vm_permanently_remove ],
	[ vm_nomenklatura ],
	[ vm_return ],
]

CODE[17] = [ // Roundtable talks
	[ vm_roundtable_talks ],
	[ vm_return ],
]

CODE[18] = [ // Poszgay Defends the Revolution
	[ vm_permanently_remove ],
	[ vm_poszgay ],
	[ vm_prompt, 'to 4 spaces in Hungary not under Democratic control' ],
	[ vm_add_limited_infl, 4, 1 ],
	[ vm_return ],
]

CODE[19] = [ // Papal vist
	[ vm_permanently_remove ],
	[ vm_valid_spaces, 'Catholic Church, Poland', 'Catholic Church, Czechoslovakia', 'Catholic Church, Hungary' ],
	[ vm_prompt, 'any Catholic Church space' ],
	[ vm_add_x_infl, 3 ],
	[ vm_return ],
]

CODE[20] = [ // Deutsche Marks*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_DEUTSCHE_MARKS) ],
	[ vm_deutsche_marks ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[21] = [ // Common European Home
	[ vm_common_european_home ],
	[ vm_return ],
]

CODE[22] = [ // Power Struggle - Poland
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[23] = [ // Power Struggle - Hungary
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[24] = [ // St Nicolas Church
	[ vm_if, ()=>!check_dem_control(S_LUTHERAN_CHURCH) ],
	[ vm_valid_spaces, 'Lutheran Church' ],
	[ vm_prompt, 'the Lutheran Church' ],
	[ vm_take_control_prep, 1 ],
	[ vm_endif ],
	[ vm_st_nicholas_church ],
	[ vm_return ],
]

CODE[25] = [ // Perestroika
	[ vm_perestroika ],
	[ vm_return ],
]

CODE[26] = [ // Helsinki Final Act*
	[ vm_helsinki_final_act ],
	[ vm_return ],
]

CODE[27] = [ // Consumerism
	[ vm_valid_spaces_opponent_socio, 4 ],
	[ vm_prompt, ' from a Worker space' ],
	[ vm_remove_opp_infl, 1 ],
	[ vm_valid_spaces_opponent_socio, 4 ],
	[ vm_active_country ],
	[ vm_prompt, ()=>`make a Support Check in a Worker space in ${country_name(game.vm_active_country)}.` ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[28] = [ // Factory Party Cells
	[ vm_valid_spaces_opponent_socio, 4 ],
	[ vm_prompt, ' from Worker spaces' ],
	[ vm_remove_limited_opp_infl, 3, 2 ],
	[ vm_return ],
]

CODE[29] = [ // Jan Palach Week*
	[ vm_permanently_remove ],
	[ vm_valid_spaces, 'Charles University' ],
	[ vm_prompt, 'the Charles University space' ],
	[ vm_add_x_infl, 6 ],
	[ vm_return ],
]

CODE[30] = [ // Tear Gas
	[ vm_tear_gas ],
	[ vm_return ],
]

CODE[31] = [ // Intelligentsia
	[ vm_valid_spaces_socio, 5 ],
	[ vm_prompt, 'Intellectual spaces, no more than 2 per space' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_return ],
]

CODE[32] = [ // Peasant Parties*
	[ vm_permanently_remove ],
	[ vm_valid_spaces_socio, 3 ],
	[ vm_prompt, 'Farmer spaces, no more than 2 per space' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_return ],
]

CODE[33] = [ // Sajudis*
	[ vm_sajudis ],
	[ vm_if, ()=>!is_auto_resolve(C_SAJUDIS) ],
	[ vm_sajudis_check ],
	[ vm_prompt, 'any Minorities space' ],
	[ vm_take_control_prep, 1 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[34] = [ // Fidesz*
	[ vm_permanently_remove ],
	[ vm_valid_spaces, 'Eotvos Lorand University' ],
	[ vm_prompt, 'the Hungary Student space' ],
	[ vm_add_x_infl, 5 ],
	[ vm_return ],
]

CODE[35] = [ // Heal our Bleeding Wounds*
	[ vm_permanently_remove ],
	[ vm_heal_our_bleeding_wounds ],
	[ vm_return ],
]

CODE[36] = [ // Dash for the West*
	[ vm_permanently_remove ],
	[ vm_prompt, 'Dash for the West: Select any Democratic Event with an asterix(*) from the discard pile. Event occurs immediately' ],
	[ vm_dash_for_the_west ],
	[ vm_return ],
]

CODE[37] = [ // Nagy Reburied*
	[ vm_permanently_remove ],
	[ vm_nagy_reburied ],
	[ vm_prompt, 'the Hungary Elite space' ],
	[ vm_remove_all_infl, 1 ],
	[ vm_valid_spaces_country, 'Hungary' ],
	[ vm_prompt, 'Hungary, no more than 2 per space' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_return ],
]

CODE[38] = [ // July Concept
	[ vm_permanently_remove ],
	[ vm_valid_spaces_country, 'Bulgaria' ],
	[ vm_prompt, 'Bulgaria' ],
	[ vm_add_infl_free, 3 ],
	[ vm_return ],
]

CODE[39] = [ // Eco-Glasnost*
	[ vm_valid_spaces, 'Ruse' ],
	[ vm_prompt, 'Ruse' ],
	[ vm_add_x_infl, 4 ],
	[ vm_eco_glasnost ],
	[ vm_return ],
]

CODE[40] = [ // Hungarian Democratic Forum
	[ vm_permanently_remove ],
	[ vm_valid_spaces_country, 'Hungary' ],
	[ vm_prompt, 'Hungary' ],
	[ vm_add_infl_free, 3 ],
	[ vm_valid_spaces_country_sc, 'Hungary' ],
	[ vm_prompt, 'make a Support Check in Hungary' ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[41] = [ // Ceausescu*
	[ vm_permanently_remove ],
	[ vm_if, ()=>game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) ],
	[ vm_tyrant_block ],
	[ vm_return ],
	[ vm_else ],
	[ vm_if, ()=>game.persistent_events.includes(C_CEAUSESCU) ],
	[ vm_prompt, 'you must remove 1 SP from Bucureşti' ],
	[ vm_ceausescu ],
	[ vm_return ],
	[ vm_else ],
	[ vm_if, ()=>!is_auto_resolve(C_CEAUSESCU) ],
	[ vm_ceausescu_prep ],
	[ vm_valid_spaces_country_opp, 'Romania' ],
	[ vm_prompt, ' from Romania' ],
	[ vm_remove_opp_infl, 3 ],
	[ vm_valid_spaces_country_sc, 'Romania' ],
	[ vm_prompt, 'make a Support Check in Romania' ],
	[ vm_1_support_check ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[42] = [ // Power Struggle - East Germany
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[43] = [ // Power Struggle - Bulgaria
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[44] = [ // Inflationary Currency
	[ vm_permanently_remove ],
	[ vm_inflationary_currency ],
	[ vm_valid_spaces_country_opp ],
	[ vm_prompt, ()=>` from ${country_name(game.vm_active_country)}` ],
	[ vm_remove_opp_infl, 2 ],
	[ vm_inflationary_currency_discard ],
	[ vm_if, ()=>!discarded_card() ],
	[ vm_valid_spaces_country_sc ],
	[ vm_prompt, ()=>`make a Support Check in ${country_name(game.vm_active_country)}` ],
	[ vm_1_support_check ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[45] = [ // Soviet Troop Withdrawals*
	[ vm_permanently_remove ],
	[ vm_valid_spaces_region_opp, 'Eastern Europe' ],
	[ vm_prompt, ' from Eastern Europe' ],
	[ vm_remove_limited_opp_infl, 5, 2 ],
	[ vm_return ],
]

CODE[46] = [ // Goodbye Lenin!*
	[ vm_permanently_remove ],
	[ vm_goodbye_lenin ],
	[ vm_return ],
]

CODE[47] = [ // Bulgarian Turks Expelled*
	[ vm_permanently_remove ],
	[ vm_bulgarian_turks_expelled ],
	[ vm_if, ()=>!is_auto_resolve(C_BULGARIAN_TURKS_EXPELLED) ],
	[ vm_valid_spaces, 'Razgrad' ],
	[ vm_prompt, 'Razgrad' ],
	[ vm_remove_all_infl, 1 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[48] = [ // We are the People!*
	[ vm_if, ()=>!is_auto_resolve(C_WE_ARE_THE_PEOPLE) ],
	[ vm_we_are_the_people ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[49] = [ // Foreign Currency Debt Burden*
	[ vm_foreign_currency_debt_burden ],
	[ vm_log, ()=>`Communist cannot make Support Checks in ${country_name(game.foreign_currency_debt_burden)} for the rest of the turn` ],
	[ vm_return ],
]

CODE[50] = [ // The Sinatra Doctrine*
	[ vm_the_sinatra_doctrine ],
	[ vm_return ],
]

CODE[51] = [ // 40th Anniversary Celebration*
	[ vm_permanently_remove ],
	[ vm_40th_anniversary_celebration ],
	[ vm_valid_spaces_country, 'East_Germany' ],
	[ vm_prompt, 'East Germany' ],
	[ vm_add_infl_free ],
	[ vm_40th_anniversary_celebration_vp ],
	[ vm_return ],
]

CODE[52] = [ // Normalization
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_NORMALIZATION) ],
	[ vm_normalization ],
	[ vm_prompt, 'the Czechoslovakia Elite and Bureaucrat Spaces' ],
	[ vm_remove_all_infl, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[53] = [ // Li Peng*
	[ vm_li_peng ],
	[ vm_return ],
]

CODE[54] = [ // The Crowd Turns Against Ceausescu*
	[ vm_the_crowd_turns_against_ceausescu ],
	[ vm_return ],
]

CODE[55] = [ // Power Struggle - Czechoslovakia
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[56] = [ // Foreign Television
	[ vm_permanently_remove ],
	[ vm_foreign_television ],
	[ vm_remove_limited_opp_infl, 4, 2 ],
	[ vm_return ],
]

CODE[57] = [ // Central Committee Reshuffle*
	[ vm_permanently_remove ],
	[ vm_central_committee_reshuffle ],
	[ vm_prompt, ()=>`${country_name(game.vm_active_country)}` ],
	[ vm_add_infl_free, 3 ],
	[ vm_return ],
]

CODE[58] = [ // Austria-Hungary Border Reopened*
	[ vm_austria_hungary_border_reopened ],
	[ vm_return ],
]

CODE[59] = [ // Grenztruppen*
	[ vm_grenztruppen ],
	[ vm_return ],
]

CODE[60] = [ // Toxic Waste*
	[ vm_permanently_remove ],
	[ vm_valid_spaces_socio, 4 ],
	[ vm_prompt, 'any Worker space(s)' ],
	[ vm_add_infl_free, 3 ],
	[ vm_return ],
]

CODE[61] = [ // The Monday Demonstrations*
	[ vm_permanently_remove ],
	[ vm_the_monday_demonstrations ],
	[ vm_prompt, 'the Lutheran Church Space and Leipzig' ],
	[ vm_take_control_prep, 2 ],
	[ vm_valid_spaces_country_sc, 'East_Germany' ],
	[ vm_prompt, 'make 5 Support Checks in East Germany' ],
	[ vm_support_check, 5 ],
	[ vm_return ],
]

CODE[62] = [ // Yakovlev Counsels Gorbachev*
	[ vm_yakovlev_counsels_gorbachev ],
	[ vm_return ],
]

CODE[63] = [ // Genscher*
	[ vm_genscher ],
	[ vm_return ],
]

CODE[64] = [ // Legacy of 1968*
	[ vm_permanently_remove ],
	[ vm_legacy_of_1968 ],
	[ vm_prompt, 'all spaces in Czechoslovakia not controlled by the Communist Player' ],
	[ vm_add_limited_infl, 11, 1 ],
	[ vm_return ],
]

CODE[65] = [ // Presidential Visit*
	[ vm_presidential_visit ],
	[ vm_return ],
]

CODE[66] = [ // New Forum
	[ vm_permanently_remove ],
	[ vm_valid_spaces_country, 'East_Germany' ],
	[ vm_prompt, '3 spaces in East Germany' ],
	[ vm_add_limited_infl, 3, 1 ],
	[ vm_return ],
]

CODE[67] = [ // Reformer Rehabilitated*
	[ vm_prompt, 'Reformer Rehabilitated: Choose any non-scoring card in the discard pile. Event takes place immediately' ],
	[ vm_reformer_rehabilitated ],
	[ vm_return ],
]

CODE[68] = [ // Klaus and Komarek*
	[ vm_permanently_remove ],
	[ vm_klaus_and_komarek ],
	[ vm_prompt, 'Praha' ],
	[ vm_remove_x_opp_infl, 2 ],
	[ vm_valid_spaces, 'Praha' ],
	[ vm_add_x_infl, 2 ],
	[ vm_return ],
]

CODE[69] = [ // Systematization*
	[ vm_if, ()=>!game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) ],
	[ vm_valid_spaces_country, 'Romania' ],
	[ vm_systematization ],
	[ vm_else ],
	[ vm_tyrant_block ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[70] = [ // Securitate*
	[ vm_if, ()=>!game.persistent_events.includes(C_ARMY_BACKS_REVOLUTION) ],
	[ vm_securitate ],
	[ vm_else ],
	[ vm_army_block ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[71] = [ // Kiss of Death*
	[ vm_permanently_remove ],
	[ vm_if, ()=>is_auto_resolve(C_KISS_OF_DEATH) ],
	[ vm_log, 'Communist has no cards to discard.' ],
	[ vm_else ],
	[ vm_kiss_of_death ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[72] = [ // Peasant Parties Revolt
	[ vm_peasant_parties_revolt ],
	[ vm_return ],
]

CODE[73] = [ // Laszlo Tokes*
	[ vm_laszlo_tokes_prep ],
	[ vm_valid_spaces, 'Timisoara', 'Harghita/Covasna' ],
	[ vm_prompt, 'in Timişoara and Harghita/Covasna' ],
	[ vm_add_limited_infl, 2, 1 ],
	[ vm_laszlo_tokes ],
	[ vm_if, ()=>game.phase === 3 ],
	[ vm_prompt, ' in Romania' ],
	[ vm_add_infl ],
	[ vm_else ],
	[ vm_prompt, 'make 2 Support Checks in Romania' ],
	[ vm_support_check, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[74] = [ // FRG Embassies
	[ vm_frg_embassies ],
	[ vm_return ],
]

CODE[75] = [ // Exit Visas*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_EXIT_VISAS) ],
	[ vm_exit_visas ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[76] = [ // Warsaw Pact Summit
	[ vm_permanently_remove ],
	[ vm_warsaw_pact_summit ],
	[ vm_if, ()=>game.phase === 3 ],
	[ vm_prompt, ' spaces with no Democratic SPs' ],
	[ vm_add_infl_free, 4 ],
	[ vm_else ],
	[ vm_prompt, 'Select a Student or Intellectual space' ],
	[ vm_valid_spaces_socio_2_sc, SOCIO_STUDENT, SOCIO_INTELLECTUAL ],
	[ vm_support_check_modified, 2, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[77] = [ // Samizdat
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_SAMIZDAT) ],
	[ vm_samizdat ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[78] = [ // Workers Revolt
	[ vm_workers_revolt ],
	[ vm_return ],
]

CODE[79] = [ // The Third Way*
	[ vm_permanently_remove ],
	[ vm_the_third_way ],
	[ vm_valid_spaces, 'German Writers' ],
	[ vm_prompt, 'the East German Writers space' ],
	[ vm_add_x_infl, 3 ],
	[ vm_return ],
]

CODE[80] = [ // Nepotism*
	[ vm_permanently_remove ],
	[ vm_nepotism ],
	[ vm_valid_spaces_region_socio, 'Balkans', 4 ],
	[ vm_prompt, 'Worker spaces in the Balkans' ],
	[ vm_add_infl_free ],
	[ vm_return ],
]

CODE[81] = [ // The Baltic Way*
	[ vm_the_baltic_way_prep ],
	[ vm_if, ()=>!is_auto_resolve(C_THE_BALTIC_WAY) ],
	[ vm_the_baltic_way ],
	[ vm_prompt, 'any Minorities space' ],
	[ vm_take_control_prep, 1 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[82] = [ // Spitzel*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_SPITZEL) ],
	[ vm_valid_spaces_country_opp, 'East_Germany' ],
	[ vm_prompt, ' from East Germany' ],
	[ vm_remove_opp_infl, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[83] = [ // Modrow*
	[ vm_modrow ],
	[ vm_valid_spaces_country, 'East_Germany' ],
	[ vm_prompt, 'East Germany, no more than 2 per space' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_return ],
]

CODE[84] = [ // Breakaway Baltic Republics*
	[ vm_breakaway_baltic_republics ],
	[ vm_prompt, 'any Minorities space' ],
	[ vm_take_control_prep, 1 ],
	[ vm_valid_spaces_sc ],
	[ vm_prompt, 'select a space for the Support Check' ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[85] = [ // Tank Column/Tank Man*
	[ vm_permanently_remove ],
	[ vm_tank_column ],
	[ vm_return ],
]

CODE[86] = [ // The Wall Must Go!*
	[ vm_the_wall_must_go ],
	[ vm_remove_infl, 3 ],
	[ vm_return ],
]

CODE[87] = [ // Kohl Proposes Reunification*
	[ vm_permanently_remove ],
	[ vm_kohl_proposes_reunification_prep ],
	[ vm_if, ()=>!is_auto_resolve(C_KOHL_PROPOSES_REUNIFICATION) ],
	[ vm_kohl_proposes_reunification ],
	[ vm_else ],
	[ vm_log, ()=>`C${C_THE_WALL_MUST_GO} has not been successfully played for the event.` ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[88] = [ // Adamec*
	[ vm_permanently_remove ],
	[ vm_adamec ],
	[ vm_valid_spaces_country, 'Czechoslovakia' ],
	[ vm_prompt, 'Czechoslovakia' ],
	[ vm_add_limited_infl, 4, 2 ],
	[ vm_return ],
]

CODE[89] = [ // Domino Theory*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_DOMINO_THEORY) ],
	[ vm_prompt, 'Domino Theory: Choose a Power Struggle card to play from the discard pile' ],
	[ vm_domino_theory ],
	[ vm_else ],
	[ vm_domino_theory_pass ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[90] = [ // Civic Forum*
	[ vm_permanently_remove ],
	[ vm_civic_forum_prep ],
	[ vm_valid_spaces_country, 'Czechoslovakia' ],
	[ vm_prompt, 'Czechoslovakia' ],
	[ vm_add_infl_free, 4 ],
	[ vm_civic_forum ],
	[ vm_valid_spaces_country_sc, 'Czechoslovakia' ],
	[ vm_prompt, 'Select a space in Czechoslovakia' ],
	[ vm_support_check, 2 ],
	[ vm_return ],
]

CODE[91] = [ // My First Banana*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_MY_FIRST_BANANA) ],
	[ vm_valid_spaces_country_opp, 'East_Germany' ],
	[ vm_prompt, ' from East Germany' ],
	[ vm_remove_opp_infl, 2 ],
	[ vm_valid_spaces_country_sc, 'East_Germany' ],
	[ vm_prompt, 'select a space in East Germany' ],
	[ vm_support_check, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[92] = [ // Betrayal
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_BETRAYAL) ],
	[ vm_prompt, 'choose any Orthodox Church space. Replace all Democratic SPs with Communist SPs' ],
	[ vm_betrayal ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[93] = [ // Shock Therapy*
	[ vm_permanently_remove ],
	[ vm_shock_therapy ],
	[ vm_valid_spaces_country ],
	[ vm_prompt, ()=>` ${country_name(game.vm_active_country)}` ],
	[ vm_add_infl_free, 3 ],
	[ vm_return ],
]

CODE[94] = [ // Union of Democratic Forces*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_UNION_OF_DEMOCRATIC_FORCES) ],
	[ vm_valid_spaces_country_opp, 'Bulgaria' ],
	[ vm_prompt, ' from Bulgaria' ],
	[ vm_remove_limited_opp_infl, 4, 2 ],
	[ vm_valid_spaces_country_sc, 'Bulgaria' ],
	[ vm_prompt, 'Make 2 Support Checks in Bulgaria' ],
	[ vm_support_check, 2 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[95] = [ // Power Struggle - Romania
	[ vm_power_struggle ],
	[ vm_return ],
]

CODE[96] = [ // The Chinese Solution*
	[ vm_permanently_remove ],
	[ vm_the_chinese_solution ],
	[ vm_valid_spaces_country_sc ],
	[ vm_prompt, ()=>`make 5 Support Checks in ${country_name(game.vm_active_country)}` ],
	[ vm_support_check_modified, 5, 3 ],
	[ vm_return ],
]

CODE[97] = [ // The Tyrant is Gone*
	[ vm_if, ()=>game.persistent_events.includes(THE_CROWD_TURNS_AGAINST_CEAUSESCU_OCCURRED) ],
	[ vm_cluj_check ],
	[ vm_prompt, 'the Romanian Elite Space' ],
	[ vm_remove_x_opp_infl, 4 ],
	[ vm_the_tyrant_is_gone ],
	[ vm_else ],
	[ vm_the_tyrant_is_gone_prep ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[98] = [ // Politburo Intrigue*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_POLITBURO_INTRIGUE) ],
	[ vm_valid_spaces_country_opp, 'Bulgaria' ],
	[ vm_prompt, ' from Bulgaria' ],
	[ vm_remove_limited_opp_infl, 3, 2 ],
	[ vm_valid_spaces_country_sc, 'Bulgaria' ],
	[ vm_prompt, 'make a Support Check in Bulgaria' ],
	[ vm_1_support_check ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[99] = [ // Ligachev*
	[ vm_ligachev ],
	[ vm_return ],
]

CODE[100] = [ // Stand Fast*
	[ vm_stand_fast ],
	[ vm_return ],
]

CODE[101] = [ // Elena*
	[ vm_if, ()=>!game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) ],
	[ vm_valid_spaces, 'Cluj-Napoca' ],
	[ vm_prompt, 'the Romania Elite Space' ],
	[ vm_add_x_infl, 2 ],
	[ vm_elena ],
	[ vm_else ],
	[ vm_tyrant_block ],
	[ vm_permanently_remove ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[102] = [ // National Salvation Front*
	[ vm_national_salvation_front ],
	[ vm_return ],
]

CODE[103] = [ // Government Resigns*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!is_auto_resolve(C_GOVERNMENT_RESIGNS) ],
	[ vm_government_resigns ],
	[ vm_prompt, 'any uncontrolled Elite space' ],
	[ vm_remove_all_infl, 1 ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[104] = [ // New Year's Eve Party*
	[ vm_new_years_eve_party ],
	[ vm_return ],
]

CODE[105] = [ // Public Against Violence*
	[ vm_permanently_remove ],
	[ vm_valid_spaces, 'Kosice' ],
	[ vm_prompt, 'Košice' ],
	[ vm_add_x_infl, 2 ],
	[ vm_valid_spaces, 'Presov' ],
	[ vm_prompt, 'Prešov' ],
	[ vm_add_x_infl, 2 ],
	[ vm_public_against_violence ],
	[ vm_prompt, 'Make a Support Check in Bratislava' ],
	[ vm_support_check_modified, 1, 2 ],
	[ vm_return ],
]

CODE[106] = [ // Social Democratic Platform Adopted*
	[ vm_permanently_remove ],
	[ vm_social_democratic_platform_adopted ],
	[ vm_valid_spaces_country ],
	[ vm_prompt, ()=>`${country_name(game.vm_active_country)}` ],
	[ vm_add_infl_free, 2 ],
	[ vm_valid_spaces_country_sc ],
	[ vm_prompt, ()=>`make a Support Check in ${country_name(game.vm_active_country)}` ],
	[ vm_1_support_check ],
	[ vm_return ],
]

CODE[107] = [ // Massacre in Timisoara*
	[ vm_permanently_remove ],
	[ vm_if, ()=>!game.persistent_events.includes(THE_TYRANT_IS_GONE_OCCURRED) ],
	[ vm_massacre_in_timisoara ],
	[ vm_valid_spaces_country_sc, 'Romania' ],
	[ vm_prompt, 'Make Support Checks in Romania' ],
	[ vm_support_check_modified, 2, 2 ],
	[ vm_else ],
	[ vm_tyrant_block ],
	[ vm_endif ],
	[ vm_return ],
]

CODE[108] = [ // Army Backs Revolution*
	[ vm_army_backs_revolution ],
	[ vm_return ],
]

CODE[109] = [ // Kremlin Coup*
	[ vm_permanently_remove ],
	[ vm_kremlin_coup ],
	[ vm_return ],
]

CODE[110] = [ // Malta Summit*
	[ vm_permanently_remove ],
	[ vm_malta_summit ],
	[ vm_prompt, ' from Elite spaces' ],
	[ vm_remove_opp_infl, 5 ],
	[ vm_return ],
]

CODE[203] = [ // Tiananmen Square space 3 award
	[ vm_tst_3 ],
	[ vm_return ],
]

CODE[204] = [ // Tiananmen Square space 4 award
	[ vm_valid_spaces_opponent ],
	[ vm_tst_4 ],
	[ vm_return ],
]

CODE[206] = [ // Tiananmen Square space 6
	[ vm_valid_spaces_sc ],
	[ vm_tst_6 ],
	[ vm_return ],
]

CODE[208] = [ // Tiananmen Square space 8 event
	[ vm_tst_8 ],
	[ vm_return ],
]

CODE[349] = [ // Support Falters
	[ vm_support_falters ],
	[ vm_return ],
]

CODE[350] = [ // Support Surges
	[ vm_support_surges ],
	[ vm_return ],
]

CODE[351] = [ // Scare Tactics
	[ vm_scare_tactics ],
	[ vm_valid_spaces_country_opp ],
	[ vm_prompt, ()=>` from ${country_name(game.vm_active_country)}` ],
	[ vm_remove_opp_infl, 1 ],
	[ vm_return ],
]
// #endregion
