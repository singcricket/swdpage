#!/bin/bash
# Phase 0 — build web-optimized asset set into public/images/
set -u
ROOT=/Users/howoo/Desktop/sinwondang
SRC_F=$ROOT/public/assets/images/facilities
SRC_E=$ROOT/public/assets/images/equipments
SRC_V=$ROOT/public/assets/images/vets
SRC_L=$ROOT/public/assets/logos
OUT=$ROOT/public/images

rm -rf $OUT
mkdir -p $OUT/facility $OUT/equipment $OUT/team $OUT/brand

# ---- facilities: index -> filename lookup (sorted order used during review) ----
FILES=($(ls $SRC_F/*.jpg | sort))
pick() {  # pick <category> <index...>   (1-based index into FILES)
  local cat=$1; shift
  local n=0
  for idx in "$@"; do
    n=$((n+1))
    local src="${FILES[$((idx-1))]}"
    local dst=$(printf "%s/facility/%s-%02d.jpg" "$OUT" "$cat" "$n")
    sips -Z 2000 -s format jpeg -s formatOptions 78 "$src" --out "$dst" >/dev/null 2>&1
  done
  echo "  $cat: $n"
}

echo "facilities:"
pick exterior            46
pick entrance            116 117 118
pick entrance-info       119
pick motto-wall          115
pick lobby               47 48 50 52 55 57 59 60
pick reception           7 10 61 65 67 69 70 109 110
pick waiting             4 5 17 19 20 72 77 79 80 85 87 89 97 99 101
pick waiting-detail      16 81
pick cat-waiting         39 40 41 43 44 45
pick exam-room           35 36 37 38 187
pick consult-room        180 181
pick treatment-room      21 22 191 192 193 198
pick dental-room         23 25 26
pick surgery-room        27 29 30
pick xray-room           31 188
pick ultrasound-room     33 34
pick corridor            194
pick lab-room            195 196
pick pharmacy            197
pick ward                189 190
pick amenity             112 113 114
pick certificates        182
pick hotel-lobby         122 126 136 139 141 147 149 152
pick grooming            120 153 154 155
pick cat-hotel           156 158 159 161 164 166 168
pick dog-hotel           169 170 171
pick playground          172 174 176 184 185 186
pick staff-room          183

# ---- equipment: ASCII slugs, normalize container format ----
eq() { # eq <src> <dst> <fmt>
  sips -Z 1200 -s format "$3" "$SRC_E/$1" --out "$OUT/equipment/$2" >/dev/null 2>&1 || echo "  FAIL $1"
}
echo "equipment:"
eq "ire-200hf.jpg"                                  "xray-ire-200hf.jpg"              jpeg
eq "ACUSON-Maple_4.3.webp"                          "ultrasound-acuson-maple.jpg"     jpeg
eq "내시경_pentax_epm3300.jpg"                        "endoscope-pentax-epm.jpg"        jpeg
eq "mindray auto ventil 호흡마취기_장비사진.png"           "anesthesia-mindray-veta5.jpg"    jpeg
eq "환축모니터링_Mindray uMEC12 Vet.jpg"                 "monitor-mindray-umec12.jpg"      jpeg
eq "ligasure.jpg"                                   "ligasure-ls10.jpg"               jpeg
eq "covidien_valleylab_ls10_A.avif"                 "ligasure-valleylab-ls10.jpg"     jpeg
eq "zerone_zeus_장비사진.png"                          "electrosurgery-zerone-zeus.png"  png
eq "remex_치과방사선.webp"                              "dental-xray-remex.png"           png
eq "hanilinus_dolce_덴탈머신.jpg"                      "dental-unit-hanilinus-dolce.jpg" jpeg
eq "DTE_lux_치과광중합기.webp"                           "dental-curing-dte-lux.jpg"       jpeg
eq "IDEXX Catalyst One.jpg"                         "lab-idexx-catalyst-one.jpg"      jpeg
eq "Fuji NX600i.png"                                "lab-fuji-nx600i.png"             png
eq "Procyte ONE.jpg"                                "lab-procyte-one.jpg"             jpeg
eq "IDEXX VetStat.jpg"                              "lab-idexx-vetstat.jpg"           jpeg
eq "BIOLINE Vcheck V200.jpg"                        "lab-bionote-vcheck-v200.jpg"     jpeg
eq "CMS_SMART_ENT-Scope_검이경.png"                    "otoscope-cms-smart-ent.png"      png
echo "  $(ls $OUT/equipment | wc -l | tr -d ' ') files"

# ---- team: crop the portrait out of each pre-composed banner ----
# The source files are finished banners with the vet's name/credentials baked
# into the pixels. We keep only the person and re-typeset the copy in HTML, so
# each crop box is hand-tuned to exclude the burnt-in text.
#   crop <sourceNo> <height> <width> <leftOffset> <outName>
crop() {
  local tmp="/tmp/_vetcrop-$1.png"
  sips -c "$2" "$3" --cropOffset 0 "$4" "$SRC_V/$1.png" --out "$tmp" >/dev/null 2>&1
  sips -Z 900 -s format jpeg -s formatOptions 85 "$tmp" --out "$OUT/team/$5" >/dev/null 2>&1
  rm -f "$tmp"
}
crop 1 891 600 660 choi-yunho.jpg     # 최윤호 — 인물 우측
crop 2 891 520 730 kim-bangchang.jpg  # 김방창 — 인물 우측
crop 3 891 450 805 lee-nayoung.jpg    # 이나영 — 인물 우측
crop 4 891 515  25 kim-mincheol.jpg   # 김민철 — 인물 좌측
echo "team: $(ls $OUT/team | wc -l | tr -d ' ') files"

# ---- brand ----
cp "$SRC_L/logo1-crop.png" "$OUT/brand/symbol.png"
cp "$SRC_L/logo2.png"      "$OUT/brand/logo-horizontal.png"
cp "$SRC_L/logo4.png"      "$OUT/brand/logo-stacked.png"
cp "$SRC_L/moto.png"       "$OUT/brand/motto-card.png"
sips -Z 1800 "$SRC_L/front.png"     --out "$OUT/brand/building-night.jpg" -s format jpeg -s formatOptions 82 >/dev/null 2>&1
sips -Z 1800 "$SRC_L/signboard.png" --out "$OUT/brand/signboard.jpg"      -s format jpeg -s formatOptions 82 >/dev/null 2>&1
echo "brand: $(ls $OUT/brand | wc -l | tr -d ' ') files"

echo "---"
echo "total: $(find $OUT -type f | wc -l | tr -d ' ') files, $(du -sh $OUT | cut -f1)"
