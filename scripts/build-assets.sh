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
# 약도 — 아래쪽 주소·층 안내 패널은 잘라낸다. 그 내용은 페이지에 HTML 로 있고,
# 이미지 속 글자는 스크린리더가 읽지 못한다. (원본 843x856 중 위 592px 만)
ffmpeg -y -loglevel error -i "$ROOT/public/assets/map/route-map.png" \
  -vf "crop=843:592:0:0" /tmp/_routemap.png 2>/dev/null
sips -Z 1000 /tmp/_routemap.png --out "$OUT/brand/route-map.png" >/dev/null 2>&1
rm -f /tmp/_routemap.png
echo "brand: $(ls $OUT/brand | wc -l | tr -d ' ') files"

# ---- 브라우저 아이콘 ----
# 파비콘은 심볼 마크(가로 약 3:1)를 정사각으로 여백만 채워 넣는다. 로고 전체
# 캔버스(logo1.png)를 쓰면 원본에 이미 들어 있는 여백까지 더해져 마크가 더
# 작아진다. app/icon.png 는 큰 앱 아이콘이라 여백이 있는 편이 나아서 그대로 둔다.
ICO_TMP=$(mktemp -d)
for s in 16 32 48 64; do
  ffmpeg -y -loglevel error -i "$OUT/brand/symbol.png" \
    -vf "scale=${s}:-1:flags=lanczos,pad=${s}:${s}:0:(oh-ih)/2:color=0x00000000,format=rgba" \
    -frames:v 1 "$ICO_TMP/$s.png"
done
python3 - "$ICO_TMP" "$ROOT/app/favicon.ico" <<'PY'
import struct, sys, pathlib
tmp, dest = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
sizes = [16, 32, 48, 64]
pngs = [(tmp / f"{s}.png").read_bytes() for s in sizes]
head = struct.pack("<HHH", 0, 1, len(sizes))
offset, entries, blobs = 6 + 16 * len(sizes), b"", b""
for s, data in zip(sizes, pngs):
    entries += struct.pack("<BBBBHHII", s, s, 0, 0, 1, 32, len(data), offset)
    offset += len(data)
    blobs += data
dest.write_bytes(head + entries + blobs)
print(f"favicon.ico: {dest.stat().st_size} bytes, {len(sizes)} sizes")
PY
rm -rf "$ICO_TMP"

# ---- AI 삽화 (기획안 IL-xx) ----
# 원본 public/assets/images/illustrations/illust-IL-xx.png → 가로 2000px 이하 PNG.
# 위에서 $OUT 을 통째로 지우므로, 원본이 여기 있어야 다시 만들어진다.
SRC_I=$ROOT/public/assets/images/illustrations
mkdir -p $OUT/illustrations
if [ -d "$SRC_I" ]; then
  for src in "$SRC_I"/illust-IL-*.png; do
    [ -e "$src" ] || continue
    sips -Z 2000 "$src" --out "$OUT/illustrations/$(basename "$src")" >/dev/null 2>&1 || echo "  FAIL $src"
  done
fi
echo "illustrations: $(ls $OUT/illustrations | wc -l | tr -d ' ') files"

echo "---"
echo "total: $(find $OUT -type f | wc -l | tr -d ' ') files, $(du -sh $OUT | cut -f1)"
