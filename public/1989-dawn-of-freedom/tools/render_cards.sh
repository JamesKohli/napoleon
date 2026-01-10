#!/bin/bash
#
# Script to render original HIRES assets to PNG and convert to proper size and resolution.

mkdir -p HIRES/tmp800 cards100 cards200 cards75 cards150

function do_powercard {
	echo PROCESSING $2
	OUT=HIRES/tmp800/$2
	if [ ! -f $OUT ]
	then
		gs -sDEVICE=png16m -r800 -o "$OUT" "$1"
	fi
	convert -fill '#fffde9' -draw 'rectangle 1550,0 2000,300' -colorspace RGB -resize 12.5% -colorspace sRGB HIRES/tmp800/$2 cards100/$2
	convert -fill '#fffde9' -draw 'rectangle 1550,0 2000,300' -colorspace RGB -resize 25% -colorspace sRGB HIRES/tmp800/$2 cards200/$2
	convert -fill '#fffde9' -draw 'rectangle 1550,0 2000,300' -colorspace RGB -resize 188x263 -colorspace sRGB HIRES/tmp800/$2 cards75/$2
	convert -fill '#fffde9' -draw 'rectangle 1550,0 2000,300' -colorspace RGB -resize 376x526 -colorspace sRGB HIRES/tmp800/$2 cards150/$2
}

function do_card {
	echo PROCESSING $2
	OUT=HIRES/tmp800/$2
	if [ ! -f $OUT ]
	then
		gs -sDEVICE=png16m -r800 -o "$OUT" "$1"
	fi
	convert -colorspace RGB -resize 12.5% -colorspace sRGB HIRES/tmp800/$2 cards100/$2
	convert -colorspace RGB -resize 25% -colorspace sRGB HIRES/tmp800/$2 cards200/$2
	# convert -colorspace RGB -resize 188x263 -colorspace sRGB HIRES/tmp800/$2 cards75/$2
	# convert -colorspace RGB -resize 376x526 -colorspace sRGB HIRES/tmp800/$2 cards150/$2
}

function xpowercard {
	IX=$2
	do_powercard "$1" power_$IX.png
	IX=$(expr $IX + $2)
}

function powercard {
	do_powercard "$1" power_$IX.png
	IX=$(expr $IX + 1)
}

function eventcard {
	do_card "$1" event_$IX.png
	IX=$(expr $IX + 1)
}

xpowercard "HIRES/1989 PowerCards - FINAL/1989power-01.ai" 1_6
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-07.ai" 7_8
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-09.ai" 9_10
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-11.ai" 11_14
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-14.ai" 15_18
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-20.ai" 19_20
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-21.ai" 21_22
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-23.ai" 23_26
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-27.ai" 27_30
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-31.ai" 31_33
xpowercard "HIRES/1989 PowerCards - FINAL/1989power-34.ai" 34_36
IX=37
powercard "HIRES/1989 PowerCards - FINAL/1989power-37.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-38.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-39.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-40.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-41.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-42.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-43.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-44.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-45.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-46.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-47.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-48.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-49.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-50.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-51.ai"
powercard "HIRES/1989 PowerCards - FINAL/1989power-52.ai"
IX=back
do_card "HIRES/1989 PowerCards - FINAL/1989power-BACK 1-52.ai" power_back.png

IX=1
eventcard "HIRES/1989 Event Cards FINAL/1989event-01.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-02.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-03.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-04.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-05.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-06.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-07.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-08.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-09.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-10.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-11.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-12.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-13.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-14.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-15.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-16.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-17.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-18.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-19.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-20.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-21.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-22.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-23.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-24.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-25.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-26.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-27.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-28.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-29.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-30.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-31.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-32.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-33.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-34.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-35.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-36.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-37.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-38.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-39.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-40.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-41.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-42.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-43.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-44.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-45.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-46.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-47.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-48.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-49.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-50.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-51.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-52.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-53.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-54.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-55.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-56.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-57.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-58.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-59.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-60.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-61.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-62.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-63.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-64.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-65.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-66.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-67.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-68.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-69.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-70.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-71.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-72.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-73.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-74.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-75.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-76.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-77.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-78.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-79.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-80.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-81.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-82.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-83.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-84.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-85.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-86.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-87.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-88.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-89.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-90.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-91.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-92.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-93.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-94.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-95.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-96.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-97.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-98.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-99.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-100.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-101.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-102.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-103.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-104.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-105.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-106.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-107.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-108.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-109.ai"
eventcard "HIRES/1989 Event Cards FINAL/1989event-110.ai"
IX=back
eventcard "HIRES/1989 Event Cards FINAL/1989 Eventback 1-110.ai"

wait $(jobs -p)
