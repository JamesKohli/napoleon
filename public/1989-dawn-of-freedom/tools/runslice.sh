mkdir -p tmp/counter800
rm -f HIRES/counter800/*
IN=HIRES/1989-1B-NF.ppm OUT=HIRES/counter800/sheet1_b bash tools/slice_back.sh
IN=HIRES/1989-1F-NF.ppm OUT=HIRES/counter800/sheet1_a bash tools/slice_front.sh
IN=HIRES/1989-2B-NF.ppm OUT=HIRES/counter800/sheet2_b bash tools/slice_back.sh
IN=HIRES/1989-2F-NF.ppm OUT=HIRES/counter800/sheet2_a bash tools/slice_front.sh
