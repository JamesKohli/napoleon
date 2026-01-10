default: rules.js play.js

rules.js: events.txt data.js
	node tools/gencode.js > /tmp/events.inc
	node tools/genconst.js > /tmp/const.inc
	sed -i \
		-e '/BEGIN CONST/,/END CONST/{//!d}' \
		-e '/BEGIN CONST/r /tmp/const.inc' \
		-e '/BEGIN EVENTS/,/END EVENTS/{//!d}' \
		-e '/BEGIN EVENTS/r /tmp/events.inc' \
		rules.js

play.js: tools/layout.svg data.js
	node tools/genlayout.js > /tmp/layout.inc
	node tools/genconst.js > /tmp/const.inc
	sed -i \
		-e '/BEGIN CONST/,/END CONST/{//!d}' \
		-e '/BEGIN CONST/r /tmp/const.inc' \
		-e '/BEGIN LAYOUT/,/END LAYOUT/{//!d}' \
		-e '/BEGIN LAYOUT/r /tmp/layout.inc' \
		play.js
