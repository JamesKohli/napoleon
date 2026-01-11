"use strict"

// Napoleon's Triumph Map Data
// Based on the official map with ~170 locales

// Map dimensions (from 150 DPI PDF conversion)
const MAP_WIDTH = 5100
const MAP_HEIGHT = 6600

// === LOCALE DATA ===
// Each locale has:
//   id: number (matches map)
//   name: string or null
//   x, y: center position in pixels
//   capacity: number of units allowed
//   hill: boolean
//   objective: null | "blue" | "red" | "green" | "black"
//   setup: null | { side: "french"|"allied", commander: string }
//   reinforcement: null | "french" | "allied"
//   approaches: { adjacent_locale_id: { wide: boolean, penalties: {...} } }

// Approach penalties:
//   infantry: -1 to infantry attacks into this locale
//   cavalry: -1 to cavalry attacks into this locale
//   artillery: -1 to artillery attacks into this locale
//   obstructed: cavalry cannot lead attack/defense/counterattack
//   impassable: cannot cross

const LOCALES = {
	// === NORTHWEST SECTOR (French left flank) ===
	1: {
		name: "Bosenitz",
		x: 170, y: 700,
		capacity: 4,
		hill: false,
		objective: null,
		setup: { side: "french", commander: "lannes" },
		reinforcement: null,
		approaches: {
			2: { wide: true, penalties: {} },
			3: { wide: false, penalties: { impassable: true } }
		}
	},
	2: {
		name: null,
		x: 340, y: 700,
		capacity: 4,
		hill: false,
		approaches: {
			1: { wide: true, penalties: {} },
			3: { wide: true, penalties: {} },
			6: { wide: true, penalties: {} }
		}
	},
	3: {
		name: "Santon",
		x: 450, y: 580,
		capacity: 4,
		hill: true,
		objective: null,
		setup: null,
		reinforcement: null,
		approaches: {
			1: { wide: false, penalties: { impassable: true } },
			2: { wide: true, penalties: {} },
			4: { wide: false, penalties: { infantry: true, artillery: true, obstructed: true } },
			5: { wide: false, penalties: { cavalry: true } },
			6: { wide: false, penalties: { impassable: true } }
		}
	},
	4: {
		name: null,
		x: 560, y: 480,
		capacity: 4,
		hill: false,
		approaches: {
			3: { wide: false, penalties: {} },
			5: { wide: true, penalties: {} },
			7: { wide: true, penalties: {} }
		}
	},
	5: {
		name: null,
		x: 560, y: 620,
		capacity: 4,
		hill: false,
		approaches: {
			3: { wide: false, penalties: {} },
			4: { wide: true, penalties: {} },
			6: { wide: true, penalties: {} },
			7: { wide: true, penalties: {} }
		}
	},
	6: {
		name: null,
		x: 450, y: 750,
		capacity: 4,
		hill: false,
		approaches: {
			2: { wide: true, penalties: {} },
			3: { wide: false, penalties: { impassable: true } },
			5: { wide: true, penalties: {} },
			7: { wide: true, penalties: {} }
		}
	},
	7: {
		name: null,
		x: 620, y: 750,
		capacity: 4,
		hill: false,
		approaches: {
			4: { wide: true, penalties: {} },
			5: { wide: true, penalties: {} },
			6: { wide: true, penalties: {} },
			26: { wide: true, penalties: {} }
		}
	},

	// === Row near Siwitz ===
	8: {
		name: null,
		x: 170, y: 380,
		capacity: 4,
		hill: false,
		approaches: {
			9: { wide: true, penalties: {} }
		}
	},
	9: {
		name: null,
		x: 250, y: 250,
		capacity: 4,
		hill: false,
		approaches: {
			8: { wide: true, penalties: {} },
			10: { wide: true, penalties: {} },
			28: { wide: true, penalties: {} }
		}
	},
	10: {
		name: null,
		x: 350, y: 200,
		capacity: 4,
		hill: false,
		approaches: {
			9: { wide: true, penalties: {} },
			11: { wide: true, penalties: {} },
			17: { wide: true, penalties: {} }
		}
	},
	11: {
		name: null,
		x: 450, y: 150,
		capacity: 4,
		hill: false,
		approaches: {
			10: { wide: true, penalties: {} },
			12: { wide: true, penalties: {} },
			16: { wide: true, penalties: {} }
		}
	},
	12: {
		name: null,
		x: 550, y: 230,
		capacity: 4,
		hill: false,
		approaches: {
			11: { wide: true, penalties: {} },
			13: { wide: true, penalties: {} },
			16: { wide: true, penalties: {} }
		}
	},
	13: {
		name: null,
		x: 650, y: 300,
		capacity: 4,
		hill: false,
		approaches: {
			12: { wide: true, penalties: {} },
			14: { wide: true, penalties: {} },
			15: { wide: true, penalties: {} }
		}
	},
	14: {
		name: null,
		x: 750, y: 350,
		capacity: 4,
		hill: false,
		approaches: {
			13: { wide: true, penalties: {} },
			15: { wide: true, penalties: {} },
			44: { wide: true, penalties: {} },
			45: { wide: true, penalties: {} }
		}
	},
	15: {
		name: null,
		x: 700, y: 430,
		capacity: 4,
		hill: false,
		approaches: {
			13: { wide: true, penalties: {} },
			14: { wide: true, penalties: {} },
			44: { wide: true, penalties: {} }
		}
	},
	16: {
		name: null,
		x: 550, y: 350,
		capacity: 4,
		hill: false,
		approaches: {
			11: { wide: true, penalties: {} },
			12: { wide: true, penalties: {} },
			17: { wide: true, penalties: {} }
		}
	},
	17: {
		name: "Bosenitz N",
		x: 400, y: 350,
		capacity: 4,
		hill: false,
		approaches: {
			10: { wide: true, penalties: {} },
			16: { wide: true, penalties: {} },
			18: { wide: true, penalties: {} }
		}
	},

	// === Northern road locales ===
	18: {
		name: "Krug",
		x: 1050, y: 400,
		capacity: 6,
		hill: false,
		objective: "blue",
		approaches: {
			17: { wide: true, penalties: {} },
			19: { wide: true, penalties: {} },
			20: { wide: true, penalties: {} },
			21: { wide: true, penalties: {} },
			22: { wide: true, penalties: {} }
		}
	},
	19: {
		name: null,
		x: 1250, y: 300,
		capacity: 4,
		hill: false,
		approaches: {
			18: { wide: true, penalties: {} },
			20: { wide: true, penalties: {} }
		}
	},
	20: {
		name: null,
		x: 1400, y: 350,
		capacity: 4,
		hill: false,
		approaches: {
			18: { wide: true, penalties: {} },
			19: { wide: true, penalties: {} },
			21: { wide: true, penalties: {} }
		}
	},
	21: {
		name: "Holubitz",
		x: 1550, y: 250,
		capacity: 4,
		hill: false,
		approaches: {
			18: { wide: true, penalties: {} },
			20: { wide: true, penalties: {} },
			22: { wide: true, penalties: {} }
		}
	},
	22: {
		name: null,
		x: 1700, y: 200,
		capacity: 4,
		hill: false,
		approaches: {
			18: { wide: true, penalties: {} },
			21: { wide: true, penalties: {} },
			36: { wide: true, penalties: {} },
			60: { wide: true, penalties: {} }
		}
	},

	// === Setup locales - French ===
	24: {
		name: null,
		x: 230, y: 850,
		capacity: 6,
		hill: false,
		setup: { side: "french", commander: "murat" },
		approaches: {
			37: { wide: true, penalties: {} },
			38: { wide: true, penalties: {} }
		}
	},
	25: {
		name: "Schlapanitz",
		x: 680, y: 1100,
		capacity: 9,
		hill: false,
		approaches: {
			39: { wide: true, penalties: {} },
			40: { wide: true, penalties: {} },
			41: { wide: true, penalties: {} }
		}
	},

	// === Central Area - Pratzen Heights ===
	26: {
		name: null,
		x: 750, y: 850,
		capacity: 4,
		hill: false,
		approaches: {
			7: { wide: true, penalties: {} },
			29: { wide: true, penalties: {} }
		}
	},
	27: {
		name: null,
		x: 170, y: 200,
		capacity: 4,
		hill: false,
		reinforcement: "french",
		approaches: {
			28: { wide: true, penalties: {} }
		}
	},
	28: {
		name: null,
		x: 250, y: 150,
		capacity: 4,
		hill: false,
		approaches: {
			9: { wide: true, penalties: {} },
			27: { wide: true, penalties: {} }
		}
	},
	29: {
		name: "Jirecek",
		x: 950, y: 900,
		capacity: 9,
		hill: false,
		approaches: {
			26: { wide: true, penalties: {} },
			40: { wide: true, penalties: {} },
			41: { wide: true, penalties: {} },
			42: { wide: true, penalties: {} },
			43: { wide: true, penalties: {} }
		}
	},

	// === Northern right sector ===
	30: {
		name: "Tvarožná",
		x: 1100, y: 550,
		capacity: 4,
		hill: false,
		approaches: {
			31: { wide: true, penalties: {} },
			45: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} }
		}
	},
	31: {
		name: null,
		x: 1150, y: 450,
		capacity: 4,
		hill: false,
		approaches: {
			30: { wide: true, penalties: {} },
			32: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} }
		}
	},
	32: {
		name: null,
		x: 1250, y: 400,
		capacity: 4,
		hill: false,
		approaches: {
			31: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} }
		}
	},
	33: {
		name: "Raussnitz",
		x: 1450, y: 500,
		capacity: 9,
		hill: false,
		approaches: {
			34: { wide: true, penalties: {} },
			35: { wide: true, penalties: {} },
			47: { wide: true, penalties: {} },
			48: { wide: true, penalties: {} }
		}
	},
	34: {
		name: null,
		x: 1550, y: 400,
		capacity: 4,
		hill: false,
		approaches: {
			33: { wide: true, penalties: {} },
			35: { wide: true, penalties: {} }
		}
	},
	35: {
		name: null,
		x: 1700, y: 350,
		capacity: 4,
		hill: false,
		approaches: {
			33: { wide: true, penalties: {} },
			34: { wide: true, penalties: {} },
			36: { wide: true, penalties: {} }
		}
	},
	36: {
		name: "Kowalowitz",
		x: 1850, y: 300,
		capacity: 4,
		hill: false,
		approaches: {
			22: { wide: true, penalties: {} },
			35: { wide: true, penalties: {} },
			50: { wide: true, penalties: {} }
		}
	},

	// === French setup locales ===
	37: {
		name: null,
		x: 200, y: 950,
		capacity: 4,
		hill: false,
		setup: { side: "french", commander: "legrand" },
		approaches: {
			24: { wide: true, penalties: {} },
			38: { wide: true, penalties: {} },
			51: { wide: true, penalties: {} }
		}
	},
	38: {
		name: "Kobelnitz",
		x: 380, y: 1050,
		capacity: 6,
		hill: false,
		approaches: {
			24: { wide: true, penalties: {} },
			37: { wide: true, penalties: {} },
			39: { wide: true, penalties: {} },
			52: { wide: true, penalties: {} }
		}
	},
	39: {
		name: "Puntowitz",
		x: 520, y: 1150,
		capacity: 9,
		hill: false,
		setup: { side: "french", commander: "soult" },
		approaches: {
			25: { wide: true, penalties: {} },
			38: { wide: true, penalties: {} },
			40: { wide: true, penalties: {} },
			53: { wide: true, penalties: {} }
		}
	},
	40: {
		name: null,
		x: 650, y: 1200,
		capacity: 4,
		hill: false,
		approaches: {
			25: { wide: true, penalties: {} },
			29: { wide: true, penalties: {} },
			39: { wide: true, penalties: {} },
			41: { wide: true, penalties: {} }
		}
	},
	41: {
		name: null,
		x: 800, y: 1050,
		capacity: 4,
		hill: false,
		approaches: {
			25: { wide: true, penalties: {} },
			29: { wide: true, penalties: {} },
			40: { wide: true, penalties: {} },
			42: { wide: true, penalties: {} },
			54: { wide: true, penalties: {} }
		}
	},
	42: {
		name: "Pratze",
		x: 950, y: 1000,
		capacity: 9,
		hill: true,
		objective: "red",
		approaches: {
			29: { wide: true, penalties: {} },
			41: { wide: true, penalties: {} },
			43: { wide: true, penalties: { infantry: true } },
			54: { wide: true, penalties: {} },
			55: { wide: true, penalties: {} }
		}
	},
	43: {
		name: "Pratzeberg",
		x: 1100, y: 950,
		capacity: 9,
		hill: true,
		objective: "red",
		approaches: {
			29: { wide: true, penalties: {} },
			42: { wide: true, penalties: { infantry: true } },
			55: { wide: true, penalties: {} },
			56: { wide: true, penalties: {} }
		}
	},
	44: {
		name: "Kruh",
		x: 850, y: 500,
		capacity: 4,
		hill: false,
		approaches: {
			14: { wide: true, penalties: {} },
			15: { wide: true, penalties: {} },
			45: { wide: true, penalties: {} }
		}
	},
	45: {
		name: null,
		x: 950, y: 550,
		capacity: 4,
		hill: false,
		approaches: {
			14: { wide: true, penalties: {} },
			30: { wide: true, penalties: {} },
			44: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} }
		}
	},
	46: {
		name: "Blasowitz",
		x: 1150, y: 650,
		capacity: 6,
		hill: false,
		approaches: {
			30: { wide: true, penalties: {} },
			31: { wide: true, penalties: {} },
			32: { wide: true, penalties: {} },
			45: { wide: true, penalties: {} },
			47: { wide: true, penalties: {} },
			56: { wide: true, penalties: {} }
		}
	},
	47: {
		name: null,
		x: 1300, y: 650,
		capacity: 4,
		hill: false,
		approaches: {
			33: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} },
			48: { wide: true, penalties: {} },
			57: { wide: true, penalties: {} }
		}
	},
	48: {
		name: null,
		x: 1450, y: 650,
		capacity: 4,
		hill: false,
		approaches: {
			33: { wide: true, penalties: {} },
			47: { wide: true, penalties: {} },
			49: { wide: true, penalties: {} },
			57: { wide: true, penalties: {} }
		}
	},
	49: {
		name: "Krug (East)",
		x: 1650, y: 550,
		capacity: 4,
		hill: false,
		approaches: {
			48: { wide: true, penalties: {} },
			50: { wide: true, penalties: {} },
			58: { wide: true, penalties: {} }
		}
	},
	50: {
		name: null,
		x: 1900, y: 450,
		capacity: 4,
		hill: false,
		reinforcement: "allied",
		approaches: {
			36: { wide: true, penalties: {} },
			49: { wide: true, penalties: {} },
			59: { wide: true, penalties: {} }
		}
	},

	// === Southern sector ===
	51: {
		name: null,
		x: 170, y: 1150,
		capacity: 4,
		hill: false,
		approaches: {
			37: { wide: true, penalties: {} },
			52: { wide: true, penalties: {} },
			61: { wide: true, penalties: {} }
		}
	},
	52: {
		name: null,
		x: 320, y: 1200,
		capacity: 4,
		hill: false,
		approaches: {
			38: { wide: true, penalties: {} },
			51: { wide: true, penalties: {} },
			53: { wide: true, penalties: {} },
			62: { wide: true, penalties: {} }
		}
	},
	53: {
		name: null,
		x: 480, y: 1300,
		capacity: 4,
		hill: false,
		approaches: {
			39: { wide: true, penalties: {} },
			52: { wide: true, penalties: {} },
			63: { wide: true, penalties: {} }
		}
	},
	54: {
		name: null,
		x: 800, y: 1200,
		capacity: 4,
		hill: false,
		approaches: {
			41: { wide: true, penalties: {} },
			42: { wide: true, penalties: {} },
			55: { wide: true, penalties: {} },
			64: { wide: true, penalties: {} }
		}
	},
	55: {
		name: "Staré Vinohrady",
		x: 1000, y: 1150,
		capacity: 6,
		hill: true,
		objective: "black",
		approaches: {
			42: { wide: true, penalties: {} },
			43: { wide: true, penalties: {} },
			54: { wide: true, penalties: {} },
			56: { wide: true, penalties: {} },
			65: { wide: true, penalties: {} },
			66: { wide: true, penalties: {} }
		}
	},
	56: {
		name: "Stare Vinohrady E",
		x: 1150, y: 1050,
		capacity: 6,
		hill: false,
		approaches: {
			43: { wide: true, penalties: {} },
			46: { wide: true, penalties: {} },
			55: { wide: true, penalties: {} },
			57: { wide: true, penalties: {} },
			66: { wide: true, penalties: {} },
			67: { wide: true, penalties: {} }
		}
	},
	57: {
		name: "Posoritz",
		x: 1350, y: 1000,
		capacity: 4,
		hill: true,
		approaches: {
			47: { wide: true, penalties: {} },
			48: { wide: true, penalties: {} },
			56: { wide: true, penalties: {} },
			58: { wide: true, penalties: {} },
			67: { wide: true, penalties: {} },
			68: { wide: true, penalties: {} }
		}
	},
	58: {
		name: "Hostieradek",
		x: 1600, y: 900,
		capacity: 9,
		hill: false,
		objective: "green",
		approaches: {
			49: { wide: true, penalties: {} },
			57: { wide: true, penalties: {} },
			59: { wide: true, penalties: {} },
			68: { wide: true, penalties: {} },
			78: { wide: true, penalties: {} }
		}
	},
	59: {
		name: null,
		x: 1850, y: 700,
		capacity: 4,
		hill: false,
		reinforcement: "allied",
		approaches: {
			50: { wide: true, penalties: {} },
			58: { wide: true, penalties: {} },
			60: { wide: true, penalties: {} }
		}
	},
	60: {
		name: null,
		x: 1950, y: 500,
		capacity: 4,
		hill: false,
		reinforcement: "allied",
		approaches: {
			22: { wide: true, penalties: {} },
			59: { wide: true, penalties: {} }
		}
	},

	// === South mid sector ===
	61: {
		name: null,
		x: 170, y: 1350,
		capacity: 4,
		hill: false,
		approaches: {
			51: { wide: true, penalties: {} },
			62: { wide: true, penalties: {} },
			69: { wide: true, penalties: {} }
		}
	},
	62: {
		name: null,
		x: 320, y: 1400,
		capacity: 4,
		hill: false,
		approaches: {
			52: { wide: true, penalties: {} },
			61: { wide: true, penalties: {} },
			63: { wide: true, penalties: {} },
			70: { wide: true, penalties: {} }
		}
	},
	63: {
		name: "Kriechanowitz",
		x: 480, y: 1500,
		capacity: 9,
		hill: false,
		approaches: {
			53: { wide: true, penalties: {} },
			62: { wide: true, penalties: {} },
			64: { wide: true, penalties: {} },
			71: { wide: true, penalties: {} },
			72: { wide: true, penalties: {} }
		}
	},
	64: {
		name: null,
		x: 650, y: 1450,
		capacity: 4,
		hill: false,
		approaches: {
			54: { wide: true, penalties: {} },
			63: { wide: true, penalties: {} },
			65: { wide: true, penalties: {} },
			73: { wide: true, penalties: {} }
		}
	},
	65: {
		name: null,
		x: 850, y: 1350,
		capacity: 4,
		hill: false,
		approaches: {
			55: { wide: true, penalties: {} },
			64: { wide: true, penalties: {} },
			66: { wide: true, penalties: {} },
			74: { wide: true, penalties: {} }
		}
	},
	66: {
		name: "Zbischow",
		x: 1050, y: 1300,
		capacity: 6,
		hill: false,
		approaches: {
			55: { wide: true, penalties: {} },
			56: { wide: true, penalties: {} },
			65: { wide: true, penalties: {} },
			67: { wide: true, penalties: {} },
			75: { wide: true, penalties: {} },
			76: { wide: true, penalties: {} }
		}
	},
	67: {
		name: "Sokolnitz Hill",
		x: 1250, y: 1250,
		capacity: 6,
		hill: true,
		approaches: {
			56: { wide: true, penalties: {} },
			57: { wide: true, penalties: {} },
			66: { wide: true, penalties: {} },
			68: { wide: true, penalties: {} },
			76: { wide: true, penalties: {} },
			77: { wide: true, penalties: {} }
		}
	},
	68: {
		name: null,
		x: 1450, y: 1150,
		capacity: 4,
		hill: false,
		approaches: {
			57: { wide: true, penalties: {} },
			58: { wide: true, penalties: {} },
			67: { wide: true, penalties: {} },
			77: { wide: true, penalties: {} },
			78: { wide: true, penalties: {} }
		}
	},

	// === South left flank ===
	69: {
		name: "St. Anton",
		x: 170, y: 1550,
		capacity: 4,
		hill: false,
		approaches: {
			61: { wide: true, penalties: {} },
			70: { wide: true, penalties: {} },
			79: { wide: true, penalties: {} }
		}
	},
	70: {
		name: null,
		x: 250, y: 1650,
		capacity: 4,
		hill: false,
		approaches: {
			62: { wide: true, penalties: {} },
			69: { wide: true, penalties: {} },
			71: { wide: true, penalties: {} },
			80: { wide: true, penalties: {} }
		}
	},
	71: {
		name: "Girschikowitz",
		x: 380, y: 1700,
		capacity: 6,
		hill: false,
		approaches: {
			63: { wide: true, penalties: {} },
			70: { wide: true, penalties: {} },
			72: { wide: true, penalties: {} },
			81: { wide: true, penalties: {} },
			82: { wide: true, penalties: {} }
		}
	},
	72: {
		name: null,
		x: 520, y: 1650,
		capacity: 4,
		hill: false,
		approaches: {
			63: { wide: true, penalties: {} },
			71: { wide: true, penalties: {} },
			73: { wide: true, penalties: {} },
			83: { wide: true, penalties: {} }
		}
	},
	73: {
		name: null,
		x: 650, y: 1600,
		capacity: 4,
		hill: false,
		approaches: {
			64: { wide: true, penalties: {} },
			72: { wide: true, penalties: {} },
			74: { wide: true, penalties: {} },
			83: { wide: true, penalties: {} }
		}
	},
	74: {
		name: "Birnbaum",
		x: 800, y: 1500,
		capacity: 6,
		hill: false,
		approaches: {
			65: { wide: true, penalties: {} },
			73: { wide: true, penalties: {} },
			75: { wide: true, penalties: {} },
			84: { wide: true, penalties: {} },
			85: { wide: true, penalties: {} }
		}
	},
	75: {
		name: null,
		x: 950, y: 1450,
		capacity: 4,
		hill: false,
		approaches: {
			66: { wide: true, penalties: {} },
			74: { wide: true, penalties: {} },
			76: { wide: true, penalties: {} },
			86: { wide: true, penalties: {} }
		}
	},
	76: {
		name: null,
		x: 1100, y: 1400,
		capacity: 4,
		hill: false,
		approaches: {
			66: { wide: true, penalties: {} },
			67: { wide: true, penalties: {} },
			75: { wide: true, penalties: {} },
			77: { wide: true, penalties: {} },
			86: { wide: true, penalties: {} },
			87: { wide: true, penalties: {} }
		}
	},
	77: {
		name: "Sokolnitz",
		x: 1300, y: 1400,
		capacity: 9,
		hill: false,
		approaches: {
			67: { wide: true, penalties: {} },
			68: { wide: true, penalties: {} },
			76: { wide: true, penalties: {} },
			78: { wide: true, penalties: {} },
			87: { wide: true, penalties: {} },
			98: { wide: true, penalties: {} }
		}
	},
	78: {
		name: "Ujezd (North)",
		x: 1500, y: 1250,
		capacity: 6,
		hill: false,
		approaches: {
			58: { wide: true, penalties: {} },
			68: { wide: true, penalties: {} },
			77: { wide: true, penalties: {} },
			98: { wide: true, penalties: {} },
			99: { wide: true, penalties: {} }
		}
	},

	// === Southwest - French reinforcement area ===
	79: {
		name: null,
		x: 100, y: 1750,
		capacity: 4,
		hill: false,
		approaches: {
			69: { wide: true, penalties: {} },
			80: { wide: true, penalties: {} },
			89: { wide: true, penalties: {} }
		}
	},
	80: {
		name: "Mönitz",
		x: 200, y: 1850,
		capacity: 4,
		hill: false,
		approaches: {
			70: { wide: true, penalties: {} },
			79: { wide: true, penalties: {} },
			81: { wide: true, penalties: {} },
			90: { wide: true, penalties: {} }
		}
	},
	81: {
		name: null,
		x: 330, y: 1900,
		capacity: 4,
		hill: false,
		approaches: {
			71: { wide: true, penalties: {} },
			80: { wide: true, penalties: {} },
			82: { wide: true, penalties: {} },
			91: { wide: true, penalties: {} }
		}
	},
	82: {
		name: "Stein",
		x: 450, y: 1850,
		capacity: 4,
		hill: false,
		approaches: {
			71: { wide: true, penalties: {} },
			81: { wide: true, penalties: {} },
			83: { wide: true, penalties: {} },
			92: { wide: true, penalties: {} },
			93: { wide: true, penalties: {} }
		}
	},
	83: {
		name: null,
		x: 580, y: 1750,
		capacity: 4,
		hill: false,
		approaches: {
			72: { wide: true, penalties: {} },
			73: { wide: true, penalties: {} },
			82: { wide: true, penalties: {} },
			84: { wide: true, penalties: {} },
			94: { wide: true, penalties: {} }
		}
	},
	84: {
		name: "Vinitz",
		x: 720, y: 1700,
		capacity: 4,
		hill: false,
		approaches: {
			74: { wide: true, penalties: {} },
			83: { wide: true, penalties: {} },
			85: { wide: true, penalties: {} },
			95: { wide: true, penalties: {} }
		}
	},
	85: {
		name: null,
		x: 850, y: 1600,
		capacity: 4,
		hill: false,
		approaches: {
			74: { wide: true, penalties: {} },
			84: { wide: true, penalties: {} },
			86: { wide: true, penalties: {} },
			96: { wide: true, penalties: {} },
			97: { wide: true, penalties: {} }
		}
	},
	86: {
		name: null,
		x: 1000, y: 1550,
		capacity: 4,
		hill: false,
		approaches: {
			75: { wide: true, penalties: {} },
			76: { wide: true, penalties: {} },
			85: { wide: true, penalties: {} },
			87: { wide: true, penalties: {} },
			97: { wide: true, penalties: {} }
		}
	},
	87: {
		name: "Sokolnitz Pheasantry",
		x: 1200, y: 1550,
		capacity: 6,
		hill: false,
		approaches: {
			76: { wide: true, penalties: {} },
			77: { wide: true, penalties: {} },
			86: { wide: true, penalties: {} },
			98: { wide: true, penalties: {} },
			113: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} }
		}
	},

	// === Southern frozen lake area ===
	88: {
		name: null,
		x: 1950, y: 950,
		capacity: 4,
		hill: false,
		objective: "green",
		setup: { side: "allied", commander: "bagration" },
		approaches: {
			99: { wide: true, penalties: {} }
		}
	},
	89: {
		name: null,
		x: 100, y: 1900,
		capacity: 4,
		hill: false,
		approaches: {
			79: { wide: true, penalties: {} },
			90: { wide: true, penalties: {} },
			100: { wide: true, penalties: {} }
		}
	},
	90: {
		name: "Wischau",
		x: 170, y: 2000,
		capacity: 4,
		hill: false,
		approaches: {
			80: { wide: true, penalties: {} },
			89: { wide: true, penalties: {} },
			91: { wide: true, penalties: {} },
			101: { wide: true, penalties: {} }
		}
	},
	91: {
		name: null,
		x: 300, y: 2100,
		capacity: 4,
		hill: false,
		approaches: {
			81: { wide: true, penalties: {} },
			90: { wide: true, penalties: {} },
			92: { wide: true, penalties: {} },
			102: { wide: true, penalties: {} },
			103: { wide: true, penalties: {} }
		}
	},
	92: {
		name: null,
		x: 420, y: 2000,
		capacity: 4,
		hill: false,
		approaches: {
			82: { wide: true, penalties: {} },
			91: { wide: true, penalties: {} },
			93: { wide: true, penalties: {} },
			103: { wide: true, penalties: {} }
		}
	},
	93: {
		name: null,
		x: 500, y: 1950,
		capacity: 4,
		hill: false,
		approaches: {
			82: { wide: true, penalties: {} },
			92: { wide: true, penalties: {} },
			94: { wide: true, penalties: {} },
			104: { wide: true, penalties: {} }
		}
	},
	94: {
		name: "Pratze (S)",
		x: 620, y: 1900,
		capacity: 6,
		hill: false,
		approaches: {
			83: { wide: true, penalties: {} },
			93: { wide: true, penalties: {} },
			95: { wide: true, penalties: {} },
			104: { wide: true, penalties: {} },
			105: { wide: true, penalties: {} }
		}
	},
	95: {
		name: null,
		x: 750, y: 1850,
		capacity: 4,
		hill: false,
		approaches: {
			84: { wide: true, penalties: {} },
			94: { wide: true, penalties: {} },
			96: { wide: true, penalties: {} },
			106: { wide: true, penalties: {} }
		}
	},
	96: {
		name: "Kobelnitz (S)",
		x: 900, y: 1800,
		capacity: 6,
		hill: false,
		objective: "black",
		approaches: {
			85: { wide: true, penalties: {} },
			95: { wide: true, penalties: {} },
			97: { wide: true, penalties: {} },
			107: { wide: true, penalties: {} },
			108: { wide: true, penalties: {} }
		}
	},
	97: {
		name: null,
		x: 1000, y: 1700,
		capacity: 4,
		hill: false,
		approaches: {
			85: { wide: true, penalties: {} },
			86: { wide: true, penalties: {} },
			96: { wide: true, penalties: {} },
			108: { wide: true, penalties: {} },
			113: { wide: true, penalties: {} }
		}
	},
	98: {
		name: null,
		x: 1350, y: 1500,
		capacity: 4,
		hill: false,
		approaches: {
			77: { wide: true, penalties: {} },
			78: { wide: true, penalties: {} },
			87: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} },
			115: { wide: true, penalties: {} }
		}
	},
	99: {
		name: "Aujezd",
		x: 1700, y: 1400,
		capacity: 9,
		hill: false,
		objective: "green",
		setup: { side: "allied", commander: "kienmayer" },
		approaches: {
			78: { wide: true, penalties: {} },
			88: { wide: true, penalties: {} },
			115: { wide: true, penalties: {} },
			128: { wide: true, penalties: {} }
		}
	},
	100: {
		name: null,
		x: 80, y: 2100,
		capacity: 4,
		hill: false,
		reinforcement: "french",
		approaches: {
			89: { wide: true, penalties: {} },
			101: { wide: true, penalties: {} },
			116: { wide: true, penalties: {} }
		}
	},
	101: {
		name: null,
		x: 170, y: 2200,
		capacity: 4,
		hill: false,
		approaches: {
			90: { wide: true, penalties: {} },
			100: { wide: true, penalties: {} },
			102: { wide: true, penalties: {} },
			117: { wide: true, penalties: {} }
		}
	},
	102: {
		name: "Höhe 288",
		x: 280, y: 2300,
		capacity: 4,
		hill: true,
		approaches: {
			91: { wide: true, penalties: {} },
			101: { wide: true, penalties: {} },
			103: { wide: true, penalties: {} },
			118: { wide: true, penalties: {} }
		}
	},
	103: {
		name: null,
		x: 380, y: 2200,
		capacity: 4,
		hill: false,
		approaches: {
			91: { wide: true, penalties: {} },
			92: { wide: true, penalties: {} },
			102: { wide: true, penalties: {} },
			104: { wide: true, penalties: {} },
			118: { wide: true, penalties: {} },
			119: { wide: true, penalties: {} }
		}
	},
	104: {
		name: "Reissing",
		x: 530, y: 2100,
		capacity: 6,
		hill: false,
		approaches: {
			93: { wide: true, penalties: {} },
			94: { wide: true, penalties: {} },
			103: { wide: true, penalties: {} },
			105: { wide: true, penalties: {} },
			119: { wide: true, penalties: {} },
			120: { wide: true, penalties: {} }
		}
	},
	105: {
		name: null,
		x: 680, y: 2000,
		capacity: 4,
		hill: false,
		approaches: {
			94: { wide: true, penalties: {} },
			104: { wide: true, penalties: {} },
			106: { wide: true, penalties: {} },
			121: { wide: true, penalties: {} }
		}
	},
	106: {
		name: null,
		x: 830, y: 1950,
		capacity: 4,
		hill: false,
		approaches: {
			95: { wide: true, penalties: {} },
			105: { wide: true, penalties: {} },
			107: { wide: true, penalties: {} },
			121: { wide: true, penalties: {} },
			122: { wide: true, penalties: {} }
		}
	},
	107: {
		name: null,
		x: 950, y: 1900,
		capacity: 4,
		hill: false,
		approaches: {
			96: { wide: true, penalties: {} },
			106: { wide: true, penalties: {} },
			108: { wide: true, penalties: {} },
			122: { wide: true, penalties: {} },
			123: { wide: true, penalties: {} }
		}
	},
	108: {
		name: "Telnitz",
		x: 1050, y: 1850,
		capacity: 6,
		hill: false,
		approaches: {
			96: { wide: true, penalties: {} },
			97: { wide: true, penalties: {} },
			107: { wide: true, penalties: {} },
			109: { wide: true, penalties: {} },
			123: { wide: true, penalties: {} },
			124: { wide: true, penalties: {} }
		}
	},
	109: {
		name: null,
		x: 1150, y: 1800,
		capacity: 4,
		hill: false,
		approaches: {
			108: { wide: true, penalties: {} },
			110: { wide: true, penalties: {} },
			124: { wide: true, penalties: {} },
			125: { wide: true, penalties: {} }
		}
	},
	110: {
		name: "Satschan",
		x: 1250, y: 1750,
		capacity: 6,
		hill: false,
		approaches: {
			109: { wide: true, penalties: {} },
			111: { wide: true, penalties: {} },
			125: { wide: true, penalties: {} },
			152: { wide: true, penalties: {} }
		}
	},
	111: {
		name: null,
		x: 1350, y: 1650,
		capacity: 4,
		hill: false,
		approaches: {
			110: { wide: true, penalties: {} },
			112: { wide: true, penalties: {} },
			126: { wide: true, penalties: {} }
		}
	},
	112: {
		name: null,
		x: 1400, y: 1550,
		capacity: 4,
		hill: false,
		approaches: {
			111: { wide: true, penalties: {} },
			113: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} }
		}
	},
	113: {
		name: null,
		x: 1150, y: 1650,
		capacity: 4,
		hill: false,
		approaches: {
			87: { wide: true, penalties: {} },
			97: { wide: true, penalties: {} },
			112: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} }
		}
	},
	114: {
		name: null,
		x: 1300, y: 1600,
		capacity: 4,
		hill: false,
		approaches: {
			87: { wide: true, penalties: {} },
			98: { wide: true, penalties: {} },
			112: { wide: true, penalties: {} },
			113: { wide: true, penalties: {} },
			115: { wide: true, penalties: {} },
			126: { wide: true, penalties: {} },
			127: { wide: true, penalties: {} }
		}
	},
	115: {
		name: null,
		x: 1500, y: 1500,
		capacity: 4,
		hill: false,
		approaches: {
			98: { wide: true, penalties: {} },
			99: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} },
			127: { wide: true, penalties: {} },
			128: { wide: true, penalties: {} }
		}
	},

	// === Far south ===
	116: {
		name: null,
		x: 80, y: 2300,
		capacity: 4,
		hill: false,
		reinforcement: "french",
		approaches: {
			100: { wide: true, penalties: {} },
			117: { wide: true, penalties: {} },
			130: { wide: true, penalties: {} }
		}
	},
	117: {
		name: null,
		x: 170, y: 2400,
		capacity: 4,
		hill: false,
		approaches: {
			101: { wide: true, penalties: {} },
			116: { wide: true, penalties: {} },
			118: { wide: true, penalties: {} },
			131: { wide: true, penalties: {} },
			132: { wide: true, penalties: {} }
		}
	},
	118: {
		name: null,
		x: 300, y: 2450,
		capacity: 4,
		hill: false,
		approaches: {
			102: { wide: true, penalties: {} },
			103: { wide: true, penalties: {} },
			117: { wide: true, penalties: {} },
			119: { wide: true, penalties: {} },
			132: { wide: true, penalties: {} },
			133: { wide: true, penalties: {} }
		}
	},
	119: {
		name: "Jirschikowitz",
		x: 450, y: 2400,
		capacity: 6,
		hill: false,
		approaches: {
			103: { wide: true, penalties: {} },
			104: { wide: true, penalties: {} },
			118: { wide: true, penalties: {} },
			120: { wide: true, penalties: {} },
			133: { wide: true, penalties: {} },
			134: { wide: true, penalties: {} }
		}
	},
	120: {
		name: null,
		x: 600, y: 2300,
		capacity: 4,
		hill: false,
		approaches: {
			104: { wide: true, penalties: {} },
			119: { wide: true, penalties: {} },
			121: { wide: true, penalties: {} },
			135: { wide: true, penalties: {} },
			136: { wide: true, penalties: {} }
		}
	},
	121: {
		name: null,
		x: 750, y: 2150,
		capacity: 4,
		hill: false,
		approaches: {
			105: { wide: true, penalties: {} },
			106: { wide: true, penalties: {} },
			120: { wide: true, penalties: {} },
			122: { wide: true, penalties: {} },
			136: { wide: true, penalties: {} },
			137: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} }
		}
	},
	122: {
		name: null,
		x: 900, y: 2050,
		capacity: 4,
		hill: false,
		approaches: {
			106: { wide: true, penalties: {} },
			107: { wide: true, penalties: {} },
			121: { wide: true, penalties: {} },
			123: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} }
		}
	},
	123: {
		name: null,
		x: 1000, y: 2000,
		capacity: 4,
		hill: false,
		approaches: {
			107: { wide: true, penalties: {} },
			108: { wide: true, penalties: {} },
			122: { wide: true, penalties: {} },
			124: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} },
			144: { wide: true, penalties: {} }
		}
	},
	124: {
		name: "Ottnitz",
		x: 1100, y: 1950,
		capacity: 6,
		hill: false,
		approaches: {
			108: { wide: true, penalties: {} },
			109: { wide: true, penalties: {} },
			123: { wide: true, penalties: {} },
			125: { wide: true, penalties: {} },
			144: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} }
		}
	},
	125: {
		name: null,
		x: 1200, y: 1900,
		capacity: 4,
		hill: false,
		approaches: {
			109: { wide: true, penalties: {} },
			110: { wide: true, penalties: {} },
			124: { wide: true, penalties: {} },
			152: { wide: true, penalties: {} }
		}
	},
	126: {
		name: null,
		x: 1380, y: 1700,
		capacity: 4,
		hill: false,
		approaches: {
			111: { wide: true, penalties: {} },
			114: { wide: true, penalties: {} },
			127: { wide: true, penalties: {} }
		}
	},
	127: {
		name: "Kruchwitz",
		x: 1500, y: 1650,
		capacity: 6,
		hill: false,
		approaches: {
			114: { wide: true, penalties: {} },
			115: { wide: true, penalties: {} },
			126: { wide: true, penalties: {} },
			128: { wide: true, penalties: {} },
			163: { wide: true, penalties: {} }
		}
	},
	128: {
		name: null,
		x: 1650, y: 1500,
		capacity: 4,
		hill: false,
		objective: "green",
		approaches: {
			99: { wide: true, penalties: {} },
			115: { wide: true, penalties: {} },
			127: { wide: true, penalties: {} },
			129: { wide: true, penalties: {} },
			164: { wide: true, penalties: {} }
		}
	},
	129: {
		name: null,
		x: 1800, y: 1350,
		capacity: 4,
		hill: false,
		approaches: {
			128: { wide: true, penalties: {} },
			164: { wide: true, penalties: {} }
		}
	},
	130: {
		name: "Ottmuz",
		x: 80, y: 2500,
		capacity: 4,
		hill: false,
		approaches: {
			116: { wide: true, penalties: {} },
			131: { wide: true, penalties: {} },
			139: { wide: true, penalties: {} }
		}
	},
	131: {
		name: null,
		x: 150, y: 2600,
		capacity: 4,
		hill: false,
		approaches: {
			117: { wide: true, penalties: {} },
			130: { wide: true, penalties: {} },
			132: { wide: true, penalties: {} },
			140: { wide: true, penalties: {} }
		}
	},
	132: {
		name: null,
		x: 250, y: 2600,
		capacity: 4,
		hill: false,
		approaches: {
			117: { wide: true, penalties: {} },
			118: { wide: true, penalties: {} },
			131: { wide: true, penalties: {} },
			133: { wide: true, penalties: {} },
			140: { wide: true, penalties: {} },
			141: { wide: true, penalties: {} }
		}
	},
	133: {
		name: null,
		x: 370, y: 2600,
		capacity: 4,
		hill: false,
		approaches: {
			118: { wide: true, penalties: {} },
			119: { wide: true, penalties: {} },
			132: { wide: true, penalties: {} },
			134: { wide: true, penalties: {} },
			141: { wide: true, penalties: {} },
			142: { wide: true, penalties: {} }
		}
	},
	134: {
		name: "Jirschan",
		x: 500, y: 2550,
		capacity: 6,
		hill: false,
		approaches: {
			119: { wide: true, penalties: {} },
			133: { wide: true, penalties: {} },
			135: { wide: true, penalties: {} },
			142: { wide: true, penalties: {} },
			143: { wide: true, penalties: {} }
		}
	},
	135: {
		name: null,
		x: 620, y: 2500,
		capacity: 4,
		hill: false,
		approaches: {
			120: { wide: true, penalties: {} },
			134: { wide: true, penalties: {} },
			136: { wide: true, penalties: {} },
			143: { wide: true, penalties: {} },
			150: { wide: true, penalties: {} }
		}
	},
	136: {
		name: null,
		x: 720, y: 2400,
		capacity: 4,
		hill: false,
		approaches: {
			120: { wide: true, penalties: {} },
			121: { wide: true, penalties: {} },
			135: { wide: true, penalties: {} },
			137: { wide: true, penalties: {} },
			150: { wide: true, penalties: {} }
		}
	},
	137: {
		name: null,
		x: 830, y: 2300,
		capacity: 4,
		hill: false,
		approaches: {
			121: { wide: true, penalties: {} },
			136: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} },
			150: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} }
		}
	},
	138: {
		name: "Hostitschradek",
		x: 950, y: 2200,
		capacity: 6,
		hill: false,
		approaches: {
			121: { wide: true, penalties: {} },
			122: { wide: true, penalties: {} },
			123: { wide: true, penalties: {} },
			137: { wide: true, penalties: {} },
			144: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} }
		}
	},

	// === Far southwest - Melnitz area ===
	139: {
		name: "Melnitz",
		x: 80, y: 2700,
		capacity: 4,
		hill: false,
		approaches: {
			130: { wide: true, penalties: {} },
			140: { wide: true, penalties: {} }
		}
	},
	140: {
		name: null,
		x: 180, y: 2800,
		capacity: 4,
		hill: false,
		approaches: {
			131: { wide: true, penalties: {} },
			132: { wide: true, penalties: {} },
			139: { wide: true, penalties: {} },
			141: { wide: true, penalties: {} },
			147: { wide: true, penalties: {} }
		}
	},
	141: {
		name: "Telnitz W",
		x: 320, y: 2800,
		capacity: 4,
		hill: false,
		approaches: {
			132: { wide: true, penalties: {} },
			133: { wide: true, penalties: {} },
			140: { wide: true, penalties: {} },
			142: { wide: true, penalties: {} },
			147: { wide: true, penalties: {} },
			148: { wide: true, penalties: {} }
		}
	},
	142: {
		name: null,
		x: 450, y: 2750,
		capacity: 4,
		hill: false,
		approaches: {
			133: { wide: true, penalties: {} },
			134: { wide: true, penalties: {} },
			141: { wide: true, penalties: {} },
			143: { wide: true, penalties: {} },
			148: { wide: true, penalties: {} },
			154: { wide: true, penalties: {} }
		}
	},
	143: {
		name: "Satschan Pond",
		x: 580, y: 2700,
		capacity: 6,
		hill: false,
		approaches: {
			134: { wide: true, penalties: {} },
			135: { wide: true, penalties: {} },
			142: { wide: true, penalties: {} },
			150: { wide: true, penalties: {} },
			154: { wide: true, penalties: {} }
		}
	},
	144: {
		name: null,
		x: 1050, y: 2100,
		capacity: 4,
		hill: false,
		approaches: {
			123: { wide: true, penalties: {} },
			124: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} }
		}
	},

	// === Bottom row - Satschan lake area ===
	147: {
		name: null,
		x: 250, y: 2950,
		capacity: 4,
		hill: false,
		approaches: {
			140: { wide: true, penalties: {} },
			141: { wide: true, penalties: {} },
			148: { wide: true, penalties: {} },
			149: { wide: true, penalties: {} }
		}
	},
	148: {
		name: "Satschan W",
		x: 400, y: 2950,
		capacity: 4,
		hill: false,
		approaches: {
			141: { wide: true, penalties: {} },
			142: { wide: true, penalties: {} },
			147: { wide: true, penalties: {} },
			149: { wide: true, penalties: {} },
			154: { wide: true, penalties: {} }
		}
	},
	149: {
		name: null,
		x: 500, y: 3050,
		capacity: 4,
		hill: false,
		approaches: {
			147: { wide: true, penalties: {} },
			148: { wide: true, penalties: {} },
			153: { wide: true, penalties: {} }
		}
	},
	150: {
		name: "Mönitz Pond",
		x: 750, y: 2600,
		capacity: 6,
		hill: false,
		approaches: {
			135: { wide: true, penalties: {} },
			136: { wide: true, penalties: {} },
			137: { wide: true, penalties: {} },
			143: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} },
			157: { wide: true, penalties: {} }
		}
	},
	151: {
		name: "Kl. Hostitschradek",
		x: 950, y: 2400,
		capacity: 6,
		hill: false,
		approaches: {
			124: { wide: true, penalties: {} },
			137: { wide: true, penalties: {} },
			138: { wide: true, penalties: {} },
			144: { wide: true, penalties: {} },
			150: { wide: true, penalties: {} },
			152: { wide: true, penalties: {} },
			157: { wide: true, penalties: {} },
			158: { wide: true, penalties: {} }
		}
	},
	152: {
		name: "Littawa",
		x: 1200, y: 2100,
		capacity: 6,
		hill: false,
		approaches: {
			110: { wide: true, penalties: {} },
			125: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} },
			158: { wide: true, penalties: {} },
			159: { wide: true, penalties: {} },
			160: { wide: true, penalties: {} }
		}
	},
	153: {
		name: "Menitz",
		x: 550, y: 3150,
		capacity: 4,
		hill: false,
		approaches: {
			149: { wide: true, penalties: {} },
			154: { wide: true, penalties: {} },
			155: { wide: true, penalties: {} }
		}
	},
	154: {
		name: null,
		x: 600, y: 2900,
		capacity: 4,
		hill: false,
		approaches: {
			142: { wide: true, penalties: {} },
			143: { wide: true, penalties: {} },
			148: { wide: true, penalties: {} },
			153: { wide: true, penalties: {} },
			155: { wide: true, penalties: {} },
			156: { wide: true, penalties: {} }
		}
	},
	155: {
		name: null,
		x: 700, y: 3050,
		capacity: 4,
		hill: false,
		approaches: {
			153: { wide: true, penalties: {} },
			154: { wide: true, penalties: {} },
			156: { wide: true, penalties: {} },
			165: { wide: true, penalties: {} }
		}
	},
	156: {
		name: null,
		x: 800, y: 2850,
		capacity: 4,
		hill: false,
		approaches: {
			154: { wide: true, penalties: {} },
			155: { wide: true, penalties: {} },
			157: { wide: true, penalties: {} },
			166: { wide: true, penalties: {} }
		}
	},
	157: {
		name: "Monitz",
		x: 900, y: 2700,
		capacity: 6,
		hill: false,
		approaches: {
			150: { wide: true, penalties: {} },
			151: { wide: true, penalties: {} },
			156: { wide: true, penalties: {} },
			158: { wide: true, penalties: {} },
			166: { wide: true, penalties: {} },
			167: { wide: true, penalties: {} }
		}
	},
	158: {
		name: null,
		x: 1050, y: 2550,
		capacity: 4,
		hill: false,
		approaches: {
			151: { wide: true, penalties: {} },
			152: { wide: true, penalties: {} },
			157: { wide: true, penalties: {} },
			159: { wide: true, penalties: {} },
			167: { wide: true, penalties: {} },
			168: { wide: true, penalties: {} }
		}
	},
	159: {
		name: null,
		x: 1200, y: 2350,
		capacity: 4,
		hill: false,
		approaches: {
			152: { wide: true, penalties: {} },
			158: { wide: true, penalties: {} },
			160: { wide: true, penalties: {} },
			168: { wide: true, penalties: {} },
			169: { wide: true, penalties: {} }
		}
	},
	160: {
		name: null,
		x: 1350, y: 2200,
		capacity: 4,
		hill: false,
		approaches: {
			152: { wide: true, penalties: {} },
			159: { wide: true, penalties: {} },
			161: { wide: true, penalties: {} },
			169: { wide: true, penalties: {} },
			170: { wide: true, penalties: {} }
		}
	},
	161: {
		name: "Scharoschitz",
		x: 1500, y: 2050,
		capacity: 6,
		hill: false,
		approaches: {
			160: { wide: true, penalties: {} },
			162: { wide: true, penalties: {} },
			163: { wide: true, penalties: {} },
			170: { wide: true, penalties: {} }
		}
	},
	162: {
		name: null,
		x: 1600, y: 1900,
		capacity: 4,
		hill: false,
		approaches: {
			161: { wide: true, penalties: {} },
			163: { wide: true, penalties: {} },
			164: { wide: true, penalties: {} }
		}
	},
	163: {
		name: null,
		x: 1550, y: 1800,
		capacity: 4,
		hill: false,
		approaches: {
			127: { wide: true, penalties: {} },
			161: { wide: true, penalties: {} },
			162: { wide: true, penalties: {} },
			164: { wide: true, penalties: {} }
		}
	},
	164: {
		name: null,
		x: 1700, y: 1700,
		capacity: 4,
		hill: false,
		approaches: {
			128: { wide: true, penalties: {} },
			129: { wide: true, penalties: {} },
			162: { wide: true, penalties: {} },
			163: { wide: true, penalties: {} }
		}
	},
	165: {
		name: null,
		x: 800, y: 3200,
		capacity: 4,
		hill: false,
		approaches: {
			155: { wide: true, penalties: {} },
			166: { wide: true, penalties: {} }
		}
	},
	166: {
		name: null,
		x: 900, y: 3000,
		capacity: 4,
		hill: false,
		approaches: {
			156: { wide: true, penalties: {} },
			157: { wide: true, penalties: {} },
			165: { wide: true, penalties: {} },
			167: { wide: true, penalties: {} }
		}
	},
	167: {
		name: null,
		x: 1050, y: 2850,
		capacity: 4,
		hill: false,
		approaches: {
			157: { wide: true, penalties: {} },
			158: { wide: true, penalties: {} },
			166: { wide: true, penalties: {} },
			168: { wide: true, penalties: {} }
		}
	},
	168: {
		name: null,
		x: 1200, y: 2650,
		capacity: 4,
		hill: false,
		approaches: {
			158: { wide: true, penalties: {} },
			159: { wide: true, penalties: {} },
			167: { wide: true, penalties: {} },
			169: { wide: true, penalties: {} }
		}
	},
	169: {
		name: null,
		x: 1350, y: 2500,
		capacity: 4,
		hill: false,
		approaches: {
			159: { wide: true, penalties: {} },
			160: { wide: true, penalties: {} },
			168: { wide: true, penalties: {} },
			170: { wide: true, penalties: {} }
		}
	},
	170: {
		name: null,
		x: 1500, y: 2350,
		capacity: 4,
		hill: false,
		approaches: {
			160: { wide: true, penalties: {} },
			161: { wide: true, penalties: {} },
			169: { wide: true, penalties: {} }
		}
	}
}

// === ROAD DATA ===
// Main roads (red) - allows 3 locale movement
const MAIN_ROADS = [
	// North road: Brunn to Olmutz road
	[27, 28, 9, 10, 17, 18, 19, 20, 21, 22, 36, 50, 59, 60],
	// South road through Telnitz
	[100, 116, 130, 139],
]

// Local roads (brown) - allows 2 locale movement
const LOCAL_ROADS = [
	// Various local road segments
	[1, 2, 6, 7, 26],
	[3, 4, 5],
	[24, 37, 51, 61, 69, 79, 89, 100],
	[38, 52, 62, 70, 80, 90, 101],
	[39, 53, 63, 72, 82, 92, 103],
	[25, 40, 54, 64, 73, 83, 93, 104],
	[29, 41, 42, 55, 65, 74, 84, 94, 105],
	[43, 56, 66, 75, 85, 95, 106],
	[46, 47, 57, 67, 76, 86, 96, 107],
	[30, 45, 44, 14, 15],
	[33, 48, 58, 78, 99, 88],
	[77, 87, 98, 115, 128],
	[108, 109, 110, 125, 152],
	[124, 144, 138, 151, 150],
]

// === SETUP POSITIONS ===
// Starting locale for each commander
const SETUP_LOCALES = {
	// French commanders
	"lannes": 1,
	"murat": 24,
	"soult": 39,
	"legrand": 37,
	// Bernadotte and Davout are reinforcements

	// Allied commanders (2 December scenario)
	"bagration": 88,
	"constantine": 99,  // Actually starts further east
	"liechtenstein": 78,
	"kollowrat": 77,
	"miloradovich": 67,
	"przybyszewski": 87,
	"langeron": 66,
	"dokhturov": 76,
	"kienmayer": 99
}

// === EXPORTS ===
if (typeof exports !== 'undefined') {
	exports.LOCALES = LOCALES
	exports.MAIN_ROADS = MAIN_ROADS
	exports.LOCAL_ROADS = LOCAL_ROADS
	exports.SETUP_LOCALES = SETUP_LOCALES
	exports.MAP_WIDTH = MAP_WIDTH
	exports.MAP_HEIGHT = MAP_HEIGHT
}
