"use strict"

// vim:set foldmethod=marker:

/* global view, roles, send_action, action_button, scroll_into_view */
/* global spaces, cards, power_cards */

// BEGIN CONST {{{

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

const EXTRA_PRUDENCE = 800

// END CONST }}}

const scoring_cards = [22, 23, 42, 43, 55, 95]

// BEGIN LAYOUT {{{
var LAYOUT = {
	"Babes-Bolyai University": [958,1529,127,75],
	"Berlin": [329,148,127,75],
	"Bialystok": [1202,436,127,76],
	"Brasov": [1339,1556,127,75],
	"Bratislava": [539,1013,127,76],
	"Brno": [521,904,127,76],
	"Bucuresti": [1186,1837,127,76],
	"Budapest": [809,1249,127,76],
	"Bulgarian Writers": [838,2192,127,76],
	"Burgas": [1289,2152,127,76],
	"Bydgoszcz": [872,388,127,76],
	"Catholic Church, Czechoslovakia": [692,1010,127,75],
	"Catholic Church, Hungary": [409,1126,127,76],
	"Catholic Church, Poland": [802,558,127,75],
	"Ceske Budejovice": [260,765,127,77],
	"Charles University": [491,677,128,76],
	"Cluj-Napoca": [970,1429,127,76],
	"Constanta": [1443,1925,127,76],
	"Craiova": [977,1793,127,76],
	"Czech Writers": [573,773,127,76],
	"Debrecen": [1000,1192,127,76],
	"Dresden": [343,479,127,76],
	"Eotvos Lorand University": [658,1314,127,76],
	"Erfurt": [38,455,127,76],
	"Galati": [1409,1778,127,76],
	"Gdansk": [896,277,127,76],
	"German Writers": [81,239,127,76],
	"Gyor": [560,1129,127,76],
	"Halle": [231,357,127,75],
	"Harghita/Covasna": [1186,1560,127,75],
	"Hungarian Writers": [452,1322,127,76],
	"Iasi": [1369,1395,127,76],
	"Jagiellonian University": [870,867,127,76],
	"Karl-Marx-Stadt": [184,492,127,75],
	"Katowice": [733,723,127,76],
	"Kosice": [995,1037,127,76],
	"Krakow": [911,761,127,76],
	"Leipzig": [387,379,127,76],
	"Lodz": [959,620,127,76],
	"Lublin": [1124,754,127,76],
	"Lutheran Church": [391,271,127,76],
	"Magdeburg": [79,352,127,75],
	"Miskolc": [851,1146,127,76],
	"Orthodox Church, Bulgaria": [1130,1956,127,76],
	"Orthodox Church, Romania": [1094,1700,127,76],
	"Ostrava": [673,868,127,75],
	"Pecs": [626,1406,127,75],
	"Pleven": [979,1948,127,76],
	"Ploiesti": [1356,1671,127,76],
	"Plovdiv": [987,2209,127,75],
	"Plzen": [211,615,127,76],
	"Polish Writers": [1051,883,127,75],
	"Poznan": [671,452,127,76],
	"Praha": [412,782,127,75],
	"Presov": [844,1010,127,75],
	"Razgrad": [1219,2057,127,76],
	"Romanian Writers": [947,1625,127,75],
	"Rostock": [299,53,127,76],
	"Ruse": [1277,1956,127,76],
	"Schwerin": [148,86,127,76],
	"Sliven": [1144,2251,127,75],
	"Sofia": [983,2098,127,76],
	"Sofia University": [828,2095,127,76],
	"Stara Zagora": [1133,2153,127,75],
	"Szczecin": [574,263,127,75],
	"Szeged": [812,1364,127,76],
	"Szekesfehervar": [571,1223,127,75],
	"Szombathely": [410,1224,127,76],
	"Targu Mures": [1169,1443,127,76],
	"Tatabanya": [706,1126,127,75],
	"Timisoara": [767,1531,127,76],
	"Varna": [1387,2051,127,76],
	"Walter Ulbricht Academy": [234,240,127,76],
	"Warszawa": [1032,490,127,75],
	"Wroclaw": [595,565,127,75],
	"action_1": [708,143,48,44],
	"action_8": [1080,143,47,43],
	"box_bulgaria": [935,2101,15,100],
	"box_czechoslovakia": [473,736,15,100],
	"box_east_germany": [578,262,15,100],
	"box_hungary": [1054,1421,15,100],
	"box_poland": [1202,400,15,100],
	"box_romania": [1307,1450,15,100],
	"country_bulgaria": [915,1999,46,41],
	"country_czechoslovakia": [463,624,44,39],
	"country_east_germany": [560,160,43,37],
	"country_hungary": [1034,1319,44,39],
	"country_poland": [1188,292,44,39],
	"country_romania": [1287,1349,44,39],
	"event_solidarity_legalized": [779,270,44,43],
	"event_the_wall": [222,179,40,41],
	"tst_com_1": [53,2257,47,47],
	"tst_com_7": [469,2257,47,47],
	"tst_com_8": [556,2257,47,47],
	"tst_dem_1": [53,2128,47,47],
	"tst_dem_7": [469,2128,47,47],
	"tst_dem_8": [556,2128,47,47],
	"turn_1": [655,81,47,48],
	"turn_10": [1133,80,48,48],
	"ussr_1": [1381,1080,48,48],
	"ussr_2": [1381,1134,48,48],
	"ussr_3": [1381,1188,48,48],
	"ussr_4": [1381,1243,48,48],
	"ussr_5": [1381,1297,48,48],
	"vp_0": [843,2425,55,51],
	"vp_1": [883,2395,55,50],
	"vp_19": [1440,2395,55,50],
	"vp_2": [913,2455,56,51],
	"vp_20": [1471,2455,55,51],
	"vp_neg_1": [803,2455,56,51],
	"vp_neg_19": [246,2456,55,50],
	"vp_neg_2": [772,2395,56,51],
	"vp_neg_20": [215,2395,55,51],
}
// END LAYOUT }}}

let action_register = []

function register_action(target, action, id) {
	target.my_action = action
	target.my_id = id
	target.onmousedown = on_click_action
	action_register.push(target)
}

function is_action(action, arg) {
	return !!(view.actions && view.actions[action] && view.actions[action].includes(arg))
}

function on_click_action(evt) {
	if (evt.button === 0)
		send_action(evt.target.my_action, evt.target.my_id)
}

const last_space = 74
const last_card = 110
const last_power_card = 52

const board_events = [
	C_SOLIDARITY_LEGALIZED,
	C_THE_WALL,
	C_SYSTEMATIZATION,
	C_THE_TYRANT_IS_GONE
]

const box_events = [
	C_HONECKER,
	C_ST_NICHOLAS_CHURCH,
	C_HELSINKI_FINAL_ACT,
	C_ECO_GLASNOST,
	C_WE_ARE_THE_PEOPLE,
	C_FOREIGN_CURRENCY_DEBT_BURDEN,
	C_LI_PENG,
	C_AUSTRIA_HUNGARY_BORDER_REOPENED,
	C_GRENZTRUPPEN,
	C_PRESIDENTIAL_VISIT,
	C_SECURITATE,
	C_LASZLO_TOKES,
	C_STAND_FAST,
	C_ELENA,
	C_NEW_YEARS_EVE_PARTY,
]

const ui = {
	favicon: document.getElementById("favicon"),
	turn_info: document.getElementById("turn_info"),

	turn: document.getElementById("marker_turn"),
	round: document.getElementById("marker_action_round"),
	stability: document.getElementById("marker_stability_track"),
	dem_tst: document.getElementById("marker_dem_tst"),
	com_tst: document.getElementById("marker_com_tst"),
	vp: document.getElementById("marker_vp"),

	event_reminder_list: document.getElementById("event_reminder_list"),

	played_card: document.getElementById("played_card"),
	hand: document.getElementById("hand"),
	power_hand: document.getElementById("power_hand"),
	power_discard: document.getElementById("power_discard"),
	opp_hand: document.getElementById("opp_hand"),
	securitate: document.getElementById("securitate"),
	discard: document.getElementById("discard"),
	removed: document.getElementById("removed"),
	persistent: document.getElementById("persistent"),

	ceausescu_hand: document.getElementById("ceausescu_hand"),
	samizdat_card: document.getElementById("samizdat_card"),
}

function create_country(id, name) {
	let [ x, y, w, h ] = LAYOUT[name]
	let xc = Math.round(x + w / 2)
	let yc = Math.round(y + h / 2)

	let e = document.createElement("div")
	e.className = "marker demInfl"
	e.style.left = xc - 25 + "px"
	e.style.top = yc - 25 + "px"
	ui.countries[id] = e
	document.getElementById("markers").appendChild(e)
}

const INF_DX = 33
const INF_DY = 10

function create_ui() {
	ui.layout_xy = []
	ui.spaces = []
	ui.dem_inf = []
	ui.com_inf = []
	ui.dem_inf2 = []
	ui.com_inf2 = []
	ui.dem_inf3 = []
	ui.com_inf3 = []

	for (let s = 0; s <= last_space; ++s) {
		let info = spaces[s]
		let [ x, y, w, h ] = LAYOUT[info.ascii_name]
		let xc = Math.round(x + w / 2)
		let yc = Math.round(y + h / 2)
		x -= 6
		y -= 6
		w += 12
		h += 12

		ui.layout_xy[s] = [ xc, yc ]

		let space_e = document.createElement("div")
		register_action(space_e, "space", s)
		space_e.className = "space " + info.country
		space_e.style.left = x + "px"
		space_e.style.top = y + "px"
		space_e.style.width = w + "px"
		space_e.style.height = h + "px"
		ui.spaces[s] = space_e

		let com_e = document.createElement("div")
		com_e.className = "marker comInfl hide"
		com_e.style.left = xc + 32 - 25 + "px"
		com_e.style.top = yc + 12 - 25 + "px"
		ui.com_inf[s] = com_e

		let com_e2 = document.createElement("div")
		com_e2.className = "marker comInfl hide"
		com_e2.style.left = xc + 32 - 25 + INF_DX + "px"
		com_e2.style.top = yc + 12 - 25 + INF_DY + "px"
		ui.com_inf2[s] = com_e2

		let com_e3 = document.createElement("div")
		com_e3.className = "marker comInfl hide"
		com_e3.style.left = xc + 32 - 25 + 5 + INF_DX + "px"
		com_e3.style.top = yc + 12 - 25 + 5 + INF_DY + "px"
		ui.com_inf3[s] = com_e3

		let dem_e = document.createElement("div")
		dem_e.className = "marker demInfl hide"
		dem_e.style.left = xc - 32 - 25 + "px"
		dem_e.style.top = yc + 12 - 25 + "px"
		ui.dem_inf[s] = dem_e

		let dem_e2 = document.createElement("div")
		dem_e2.className = "marker demInfl hide"
		dem_e2.style.left = xc - 32 - 25 - INF_DX + "px"
		dem_e2.style.top = yc + 12 - 25 + INF_DY + "px"
		ui.dem_inf2[s] = dem_e2

		let dem_e3 = document.createElement("div")
		dem_e3.className = "marker demInfl hide"
		dem_e3.style.left = xc - 32 - 25 - 5 - INF_DX + "px"
		dem_e3.style.top = yc + 12 - 25 + 5 + INF_DY + "px"
		ui.dem_inf3[s] = dem_e3

		document.getElementById("spaces").append(space_e)
		document.getElementById("markers").appendChild(com_e)
		document.getElementById("markers").appendChild(com_e2)
		document.getElementById("markers").appendChild(com_e3)
		document.getElementById("markers").appendChild(dem_e)
		document.getElementById("markers").appendChild(dem_e2)
		document.getElementById("markers").appendChild(dem_e3)
	}

	ui.cards = []
	for (let c = 1; c <= last_card; ++c) {
		const card_e = document.createElement("div")
		register_action(card_e, "card", c)
		card_e.className = "card event_" + c
		ui.cards[c] = card_e
	}

	ui.power_cards = []
	for (let c = 1; c <= last_power_card + 1; ++c) {
		const power_card_e = document.createElement("div")
		register_action(power_card_e, "power_card", c)
		power_card_e.className = "card power_card power_" + c
		ui.power_cards[c] = power_card_e
	}
	ui.events = []
	for (let id of box_events) {
		ui.events[id] = document.createElement("div")
		ui.events[id].id = "event_" + id
		ui.events[id].className = "marker event aside"
	}
	for (let id of board_events) {
		ui.events[id] = document.createElement("div")
		ui.events[id].id = "event_" + id
		ui.events[id].className = "marker event"
		document.getElementById("markers").appendChild(ui.events[id])
	}

	ui.countries = []
	ui.score_box = []
	create_country(0, "country_poland")
	create_country(1, "country_hungary")
	create_country(2, "country_east_germany")
	create_country(3, "country_bulgaria")
	create_country(4, "country_czechoslovakia")
	create_country(5, "country_romania")
}

function layout_turn_marker() {
	let x = 654 + 24 + (view.turn - 1) * 53
	let y = 80 + 24
	ui.turn.style.left = x - 25 + "px"
	ui.turn.style.top = y - 25 + "px"
}

function layout_round_marker() {
	let x = 709 + 24 + (view.round - 1) * 53
	let y = 141 + 24
	ui.round.style.left = x - 25 + "px"
	ui.round.style.top = y - 25 + "px"
	if (view.round_player === "Democrat")
		// TODO: bit flag?
		ui.round.className = "marker dem"
	else
		ui.round.className = "marker com"
}

function layout_stability_marker() {
	let x = 24 + 1381
	let y = 24 + 1081 + view.stability * 54
	ui.stability.style.left = x - 25 + "px"
	ui.stability.style.top = y - 25 + "px"
}

let TST_X = [ 53, 53, 53 + 69, 53 + 69 * 2, 53 + 69 * 3, 53 + 69 * 4, 53 + 69 * 5, 53 + 69 * 6, 556 ]
let TST_Y = [ 2128, 2257 ]

function layout_tst_marker(e, v, top) {
	let x = TST_X[v] + 24
	let y = TST_Y[top] + 24
	if (v === 0) {
		x -= 40
		y -= 10
	}
	e.style.left = x - 25 + "px"
	e.style.top = y - 25 + "px"
}

function layout_vp_marker() {
	let x, y

	if (view.vp > 21) {
		view.vp = 21
	}
	if (view.vp < -21) {
		view.vp = -21
	}
	if (view.vp === 0) {
		y = 2425 + 25
		x = 843 + 28
	} else if (view.vp === -21) {
		y = 2424 + 25
		x = 803 + 28 - 651
	} else if (view.vp === 21) {
		y = 2424 + 25
		x = 883 + 28 + 651
	} else if (view.vp < 0) {
		if (view.vp & 1) {
			y = 2456 + 25
			x = 803 + 28 - ((-view.vp - 1) / 2) * 62
		} else {
			y = 2395 + 25
			x = 772 + 28 - ((-view.vp - 2) / 2) * 62
		}
	} else if (view.vp > 0) {
		if (view.vp & 1) {
			y = 2396 + 25
			x = 883 + 28 + ((view.vp - 1) / 2) * 62
		} else {
			y = 2455 + 25
			x = 913 + 28 + ((view.vp - 2) / 2) * 62
		}
	}
	ui.vp.style.left = x - 25 + "px"
	ui.vp.style.top = y - 25 + "px"
}

function layout_country(id) {
	if (view.revolutions[id])
		ui.countries[id].className = "marker demInfl ctl v" + view.times_held[id]
	else if (view.times_held[id] > 0)
		ui.countries[id].className = "marker comInfl ctl v" + view.times_held[id]
	else
		ui.countries[id].className = "marker hide"
}

function layout_score_box(id) {
	let country = ui.score_box[id].id.replace(/^box_/,'')
	let status = check_presence(country)
	ui.score_box[id].className = 'box'
	if (status.dem_spaces > 0)
		ui.score_box[id].classList.add('d_pres')
	if (status.com_spaces >0)
		ui.score_box[id].classList.add('c_pres')
	if (status.dem_domination)
		ui.score_box[id].classList.add('d_dom')
	if (status.com_domination)
		ui.score_box[id].classList.add('c_dom')
	if (status.dem_control)
		ui.score_box[id].classList.add('d_ctrl')
	if (status.com_control)
		ui.score_box[id].classList.add('c_ctrl')
}

function layout_inf_markers(cn, one, two, three, v, ctl) {
	if (ctl)
		cn += " ctl"
	if (v > 16) {
		one.className = cn + " v" + 8
		two.className = cn + " v" + 8
		three.className = cn + " v" + (v - 16)
	} else if (v > 8) {
		one.className = cn + " v" + 8
		two.className = cn + " v" + (v - 8)
		three.className = "hide"
	} else if (v > 0) {
		one.className = cn + " v" + v
		two.className = "hide"
		three.className = "hide"
	} else {
		one.className = "hide"
		two.className = "hide"
		three.className = "hide"
	}
}


function check_presence(country) {
	let dem_spaces = 0
	let com_spaces = 0
	let dem_battlegrounds = 0
	let com_battlegrounds = 0
	for (let i = 0; i < spaces.length; i++) {
		let space = spaces[i]
		if (space.country.toLowerCase() === country) {
			if (check_dem_control(i)) {
				dem_spaces++
				if (space.battleground === 1)
					dem_battlegrounds++
			}
			if (check_com_control(i)) {
				com_spaces++
				if (space.battleground === 1)
					com_battlegrounds++
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
		dem_domination: dem_domination,
		com_domination: com_domination,
		dem_control: dem_control,
		com_control: com_control,
	}
}

function battlegrounds(country) {
	let battlegrounds = 0
	if (country === 'hungary') {
		battlegrounds = 4
	} else if (country === 'bulgaria') {
		battlegrounds = 5
	} else {
		battlegrounds = 6
	}
	return battlegrounds
}

function check_dem_control(space_id) {
	if ((view.demInfl[space_id] - view.comInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else {
		return false
	}
}

function check_com_control(space_id) {
	if ((view.comInfl[space_id] - view.demInfl[space_id]) >= spaces[space_id].stability) {
		return true
	} else {
		return false
	}
}


function on_update() {
	if (!ui.spaces)
		create_ui()

	// UPDATE PLAYER INFO
	if (view.is_pwr_struggle) {
		roles.Democrat.stat.textContent = `${pluralize(view.democrat_power_hand, 'Power card')}`
		roles.Communist.stat.textContent = `${pluralize(view.communist_power_hand, 'Power card')}`
		ui.turn_info.innerText = `Power Struggle deck: ${pluralize(view.power_struggle_deck, 'card')}`
	} else {
		roles.Democrat.stat.textContent = `${pluralize(view.democrat_hand,'card')}`
		roles.Communist.stat.innerText = `${pluralize(view.communist_hand, 'card')}`
		ui.turn_info.innerText = `Strategy deck: ${pluralize(view.strategy_deck, 'card')}`
	}

	

	// UPDATE TRACK MARKERS
	layout_turn_marker()
	layout_round_marker()
	layout_stability_marker()
	layout_vp_marker()
	layout_tst_marker(ui.dem_tst, view.dem_tst, 0)
	layout_tst_marker(ui.com_tst, view.com_tst, 1)

	// UPDATE EVENT MARKERS ON THE BOARD
	if (view.persistent_events.includes(C_SOLIDARITY_LEGALIZED))
		ui.events[C_SOLIDARITY_LEGALIZED].style.display = "block"
	else
		ui.events[C_SOLIDARITY_LEGALIZED].style.display = "none"

	if (view.persistent_events.includes(C_THE_WALL))
		ui.events[C_THE_WALL].style.display = "block"
	else
		ui.events[C_THE_WALL].style.display = "none"

	if (view.persistent_events.includes(C_SYSTEMATIZATION)) {
		ui.events[C_SYSTEMATIZATION].style.display = "block"
		ui.events[C_SYSTEMATIZATION].style.left = ui.layout_xy[view.systematization][0] - 25 + "px"
		ui.events[C_SYSTEMATIZATION].style.top = ui.layout_xy[view.systematization][1] - 25 + "px"
	} else {
		ui.events[C_SYSTEMATIZATION].style.display = "none"
	}

	if (view.the_tyrant_is_gone) {
		ui.events[C_THE_TYRANT_IS_GONE].style.display = "block"
		ui.events[C_THE_TYRANT_IS_GONE].style.left = ui.layout_xy[view.the_tyrant_is_gone][0] - 25 + "px"
		ui.events[C_THE_TYRANT_IS_GONE].style.top = ui.layout_xy[view.the_tyrant_is_gone][1] - 50 + "px"
	} else {
		ui.events[C_THE_TYRANT_IS_GONE].style.display = "none"
	}

	// EVENT REMINDER LIST
	ui.event_reminder_list.replaceChildren()
	for (let id of box_events)
		if (view.persistent_events.includes(id))
			ui.event_reminder_list.appendChild(ui.events[id])

	// UPDATE INFLUENCE VALUES
	for (let s = 0; s <= last_space; ++s) {
		const demInfl = view.demInfl[s]
		const comInfl = view.comInfl[s]
		layout_inf_markers(
			"marker demInfl",
			ui.dem_inf[s],
			ui.dem_inf2[s],
			ui.dem_inf3[s],
			demInfl,
			demInfl - comInfl >= spaces[s].stability
		)
		layout_inf_markers(
			"marker comInfl",
			ui.com_inf[s],
			ui.com_inf2[s],
			ui.com_inf3[s],
			comInfl,
			comInfl - demInfl >= spaces[s].stability
		)
	}

	// UPDATE COUNTRY MARKERS
	for (let i = 0; i < 6; ++i) {
		layout_country(i)
	}

	// UPDATE CARD DISPLAYS
	ui.samizdat_card.replaceChildren()
	if (view.samizdat > 0)
		ui.samizdat_card.appendChild(ui.cards[view.samizdat])

	ui.hand.replaceChildren()
	for (let c of view.hand)
		ui.hand.appendChild(ui.cards[c])

	ui.power_hand.replaceChildren()
	if (view.is_pwr_struggle) {
		ui.power_hand.appendChild(ui.power_cards[53])
		if (view.power_hand && view.power_hand.length > 0)
			for (let c of view.power_hand)
				ui.power_hand.appendChild(ui.power_cards[c])			
	}

	ui.power_discard.replaceChildren()
	if (view.power_struggle_discard)
		for (let c of view.power_struggle_discard)
			ui.power_discard.appendChild(ui.power_cards[c])

	ui.opp_hand.replaceChildren()
	if (view.opp_hand)
		for (let c of view.opp_hand)
			ui.opp_hand.appendChild(ui.cards[c])

	ui.securitate.replaceChildren()
	if (view.opp_power_hand)
		for (let c of view.opp_power_hand)
			ui.securitate.appendChild(ui.power_cards[c])

	ui.ceausescu_hand.replaceChildren()
	if (view.ceausescu_cards)
		for (let c of view.ceausescu_cards)
			ui.ceausescu_hand.appendChild(ui.power_cards[c])

	ui.discard.replaceChildren()
	for (let c of view.strategy_discard)
		ui.discard.appendChild(ui.cards[c])
	if (view.discard)
		document.getElementById("discard_panel").classList.remove("hide")
	else
		document.getElementById("discard_panel").classList.toggle("hide", discard_toggle)

	ui.removed.replaceChildren()
	for (let c of view.strategy_removed)
		ui.removed.appendChild(ui.cards[c])

	ui.persistent.replaceChildren()
	for (let c of view.persistent_events) {
		if (c < 111)
			ui.persistent.appendChild(ui.cards[c])
		if (c === EXTRA_PRUDENCE) {
			const card_e = document.createElement("div")
			card_e.className = "card event_" + c
			ui.persistent.appendChild(card_e)
		}
	}

	ui.played_card.replaceChildren()
	if (!view.scoring_card) {
		if (view.played_card > 0)
			ui.played_card.appendChild(ui.cards[view.played_card])
		if (view.vm_event > 0 && view.vm_event < 111)
			ui.played_card.appendChild(ui.cards[view.vm_event])
	} else {
		ui.played_card.appendChild(ui.cards[view.scoring_card])
		if (view.power_card_1 > 0)
			ui.played_card.appendChild(ui.power_cards[view.power_card_1])
		if (view.power_card_2 > 0)
			ui.played_card.appendChild(ui.power_cards[view.power_card_2])
	}

	for (let e of action_register)
		e.classList.toggle("action", is_action(e.my_action, e.my_id))

	for (let s = 0; s <= last_space; ++s) {
		ui.spaces[s].classList.toggle("selected", view.selected_space === s)
		ui.spaces[s].classList.toggle("systematization", view.systematization === s)
	}

	action_button("claim", "Claim Award")
	action_button("east_germany", "East Germany")
	action_button("poland", "Poland")
	action_button("czechoslovakia", "Czechoslovakia")
	action_button("hungary", "Hungary")
	action_button("romania", "Romania")
	action_button("bulgaria", "Bulgaria")
	action_button("yes", "Yes")
	action_button("no", "No")
	action_button("start", "Start")
	action_button("check", "Check held cards")
	action_button("tst_7", "Cancel opponent's Event")
	action_button("tst_8", "Event and operations")
	action_button("end", "End Game")
	action_button("continue", "Continue playing")
	action_button("extra", "Take action round")
	action_button("pass", "Pass")
	action_button("remove", "Remove")
	action_button("add", "Place")
	action_button("ops", "Operations")
	action_button("discard", "Discard")
	action_button("strike", "Strike")
	action_button("march", "March")
	action_button("rally", "Rally in the Square")
	action_button("petition", "Petition")
	action_button("bonus", "Calculate VP Bonus")
	action_button("scoring", "Score Country")
	action_button("surrender", "Surrender Power")
	action_button("retain", "Retain Power")
	action_button("take", "Take Power")
	action_button("concede", "Concede")
	action_button("struggle", "Begin Power Struggle")
	action_button("raise", "Raise the Stakes")
	action_button("draw", "Draw")
	action_button("scoring", "Scoring")
	action_button("event", "Event")
	action_button("opp_event", "Opponent's Event")
	action_button("influence", "Support Points")
	action_button("support_check", "Support Checks")
	action_button("tst", "Tiananmen Attempt")
	action_button("roll", "Roll")
	action_button("done", "Done")
	action_button("end_round", "End Round")
	action_button("undo", "Undo")
}

// =========================== LOG FUNCTIONS ==============================================

let log_event = 0
let event_n = 0
let event_side = null

function sub_card_name(_match, p1) {
	let x = p1 | 0
	if (scoring_cards.includes(x))
		return `<span class="scoring_card_name" onmouseenter="on_focus_card_tip(${x})" onmouseleave="on_blur_card_tip()">${cards[x].name.replace("*", "")}</span>`
	else
		return `<span class="card_name" onmouseenter="on_focus_card_tip(${x})" onmouseleave="on_blur_card_tip()">${cards[x].name.replace("*", "")}</span>`
}

function sub_power_card_name(_match, p1) {
	let x = p1 | 0
	return `<span class="card_name" onmouseenter="on_focus_power_card_tip(${x})" onmouseleave="on_blur_power_card_tip()">${power_cards[x].name}</span>`
}

function sub_power_card_value(_match, p1) {
	let x = p1 | 0
	return `<span class="card_name">${x}</span>`
}

function sub_space_name(_match, p1) {
	let id = p1 | 0
	let name = spaces[id].name_unique
	return `<span class="space_tip" onmouseenter="on_focus_space_tip(${id})" onmouseleave="on_blur_space_tip(${id})" onclick="on_click_space_tip(${id})">${name}</span>`
}

function sub_die(match) {
	return die[match] || match
}

function sub_minus(match) {
	return "\u2012" + match.substring(1)
}

function sub_icon(match) {
	return ICONS[match] || match
}

const ICONS = {
	'->': '\u2192',
	'.dT5': '<span class="number d_tst">5</span>',
	'.dT6': '<span class="number d_tst">6</span>',
	'.dT7': '<span class="number d_tst">7</span>',
	'.dT8': '<span class="number d_tst">8</span>',
	'.dT9': '<span class="number d_tst">9</span>',
	'.dT10': '<span class="number d_tst">10</span>',
	'.cT5': '<span class="number c_tst">5</span>',
	'.cT6': '<span class="number c_tst">6</span>',
	'.cT7': '<span class="number c_tst">7</span>',
	'.cT8': '<span class="number c_tst">8</span>'
}

const die = {
	D1: '<span class="die white d1"></span>',
	D2: '<span class="die white d2"></span>',
	D3: '<span class="die white d3"></span>',
	D4: '<span class="die white d4"></span>',
	D5: '<span class="die white d5"></span>',
	D6: '<span class="die white d6"></span>',
}

function on_log(text, ix) {
	let p = document.createElement("div")
	let event_string = text.match(/^C(\d+)/)
	if (event_string)
		event_n = parseInt(event_string[1])

	if (text.match(/^>>/)) {
		text = text.substring(2)
		p.className = "ii"
	}
	if (text.match(/^>/)) {
		text = text.substring(1)
		p.className = "i"
	}

	text = text.replace(/_/g, " ")
	text = text.replace(/C(\d+)/g, sub_card_name)
	text = text.replace(/P(\d+)/g, sub_power_card_name)
	text = text.replace(/V(\d+)/g, sub_power_card_value)
	text = text.replace(/%(\d+)/g, sub_space_name)
	text = text.replace(/D[1-6]/g, sub_die)
	text = text.replace(/-\d/g, sub_minus)
	text = text.replace(/->/g, sub_icon)
	text = text.replace(/\.cT(\d+)/g, sub_icon)
	text = text.replace(/\.dT(\d+)/g, sub_icon)

	if (text.match(/^\.h1/)) {
		text = text.substring(4)
		p.className = "h1"
		log_event = 0
	} else if (text.match(/^\.h2/)) {
		text = text.substring(4)
		p.className = "h2"
		log_event = 0
	} else if (text.match(/^\.O\.d/)) {
		text = "operations"
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.V\.d/)) {
		text = "event"
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.T\.d/)) {
		text = "event and operations"
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.S\.d/)) {
		text = text.replace(".S.d", "")
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.P\.d/)) {
		text = "passed"
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.O\.c/)) {
		text = "operations"
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/^\.V\.c/)) {
		text = "event"
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/^\.T\.c/)) {
		text = "event and operations"
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/^\.S\.c/)) {
		text = text.replace(".S.c", "")
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/^\.P\.c/)) {
		text = "passed"
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/\.c/)) {
		text = text.replace(".c", "")
		p.className = "h2 com"
		log_event = 0
	} else if (text.match(/\.d/)) {
		text = text.replace(".d", "")
		p.className = "h2 dem"
		log_event = 0
	} else if (text.match(/^\.h3/)) {
		text = text.substring(4)
		p.className = "h3"
		log_event = 0
	} else if (text.match(/^\.h4/)) {
		text = text.substring(4)
		p.className = "h4"
		log_event = 0
	} else if (text.match(/^\.h5/)) {
		text = text.substring(4)
		p.className = "h5"
		log_event = 0
	} 

	// Group events
	// Reset group box counters (when log is rewound)
	if (ix <= log_event) log_event = 0

	if (!scoring_cards.includes(event_n)) {
		if (text.match(/^.E:/)) {
			p.classList.add("header")
			log_event = ix
			text = text.replace(".E:", "")
		}
		if (text.match(/\.D$/)) {
			event_side = "dem"
			text = text.replace(".D", "")
		} else if (text.match(/\.C$/)) {
			event_side = "com"
			text = text.replace(".C", "")
		} else if (text.match(/\.N$/)) {
			event_side = "both"
			text = text.replace(".N", "")
		}
		if (log_event && text === "") {
			log_event = 0
			event_side = null
		}
		if (log_event)
			p.classList.add("group", "event", event_side)
	}
	p.innerHTML = text
	return p
}

const pluralize = (count, noun, suffix = 's') => {
	if (Math.abs(count) === 1) {
		return `${count} ${noun}`
	} else {
		return `${count} ${noun}${suffix}`
	}
}

// =========================== VISUAL FUNCTIONS ==========================================#

function on_focus_card_tip(card_number) {
	document.getElementById("tooltip").className = "card event_" + card_number
}

function on_blur_card_tip() {
	document.getElementById("tooltip").classList = "card hide"
}

function on_focus_power_card_tip(card_number) {
	document.getElementById("tooltip").className = "card power_card power_" + card_number
}

function on_blur_power_card_tip() {
	document.getElementById("tooltip").classList = "card power_card hide"
}

function on_focus_space_tip(id) {
	ui.spaces[id].classList.add("tip")
}

function on_blur_space_tip(id) {
	ui.spaces[id].classList.remove("tip")
}

function on_click_space_tip(id) {
	scroll_into_view(ui.spaces[id])
}

let discard_toggle = document.getElementById("discard_panel").classList.contains("hide")
function toggle_discard() {
	discard_toggle = !discard_toggle
	document.getElementById("discard_panel").classList.toggle("hide", discard_toggle)
}

function toggle_removed() {
	document.getElementById("removed_panel").classList.toggle("hide")
}

function toggle_pieces() {
	document.getElementById("markers").classList.toggle("hide")
}
