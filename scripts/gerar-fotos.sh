#!/bin/bash
# Gera miniaturas (480px) e versões grandes (2400px) a partir de src/assets/fotosevento (e parte2/)
# e o manifesto src/fotos-manifest.json. Rode: npm run fotos
cd "$(dirname "$0")/.." || exit 1
SRC=src/assets/fotosevento
OUT=public/fotos
mkdir -p $OUT/thumbs $OUT/full
names=()
for f in "$SRC"/*.[jJ][pP][gG] "$SRC"/*.[jJ][pP][eE][gG] "$SRC"/parte2/*.[jJ][pP][gG]; do
  [ -f "$f" ] || continue
  b=$(basename "$f"); n="${b%.*}.jpg"
  [ -f "$OUT/thumbs/$n" ] || sips -Z 480 -s format jpeg -s formatOptions 70 "$f" --out "$OUT/thumbs/$n" >/dev/null
  [ -f "$OUT/full/$n" ] || sips -Z 2400 -s format jpeg -s formatOptions 82 "$f" --out "$OUT/full/$n" >/dev/null
  names+=("$n")
done
printf '%s\n' "${names[@]}" | sort | awk 'BEGIN{printf "["} {printf "%s\"%s\"", (NR>1?",":""), $0} END{print "]"}' > src/fotos-manifest.json
echo "${#names[@]} fotos processadas"
