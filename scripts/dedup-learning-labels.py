#!/usr/bin/env python3
"""
Supprime les labels génériques répétitifs des Learning Pages et les
convertit en prose naturelle :
  - label "En une phrase" / "Pourquoi" / "Pourquoi ça existe" -> bloc texte
    (l'explication claire, sans label)
  - label "Quand l'utiliser" -> bloc texte (l'utilisation, sans label)
  - titre "X en une phrase, par angle" -> "X : l'essentiel"
  - titre "X, point par point" -> "X : les points clés"

Seuls les labels EXACTS sont touchés ; les labels spécifiques
("Pourquoi c'est dangereux", "`Set` — en une phrase", ...) sont conservés.

Usage : python3 scripts/dedup-learning-labels.py [--apply]
"""
import re
import sys
import glob

APPLY = "--apply" in sys.argv

TARGET_LABELS = ("En une phrase", "Pourquoi", "Pourquoi ça existe", "Quand l'utiliser")

# Objet champ : { label: "X", value: "..." } — value = chaîne "..." multiligne
FIELD_RE = re.compile(
    r'\{\s*label:\s*"'
    r"(En une phrase|Pourquoi|Pourquoi ça existe|Quand l'utiliser)"
    r'",\s*value:\s*("(?:[^"\\]|\\[\s\S])*?")\s*,?\s*\},?',
    re.DOTALL,
)

# Bloc fields complet : { kind: "fields", [title: "...",] fields: [ ... ] },
BLOCK_RE = re.compile(
    r'(?P<indent>^[ \t]*)\{\n'
    r'[ \t]*kind:\s*"fields",\n'
    r'(?:[ \t]*title:\s*"(?P<title>[^"\n]*)",\n)?'
    r'[ \t]*fields:\s*\[(?P<body>[\s\S]*?)\n'
    r'[ \t]*\],\n'
    r'(?P=indent)\},?',
    re.MULTILINE,
)

TITLE_RE_1 = re.compile(r'title:\s*"([^"\n]*)"')

total_titles = 0
total_fields = 0
total_blocks_dropped = 0


def rewrite_title(m: re.Match) -> str:
    global total_titles
    t = m.group(1)
    new = t
    if "en une phrase, par angle" in new:
        new = new.replace(" en une phrase, par angle", " : l'essentiel")
    if ", point par point" in new:
        new = new.replace(", point par point", " : les points clés")
    if new != t:
        total_titles += 1
        return m.group(0).replace(t, new, 1)
    return m.group(0)


def text_block(indent: str, value_literal: str) -> str:
    return (
        f"{indent}{{\n"
        f"{indent}  kind: \"text\",\n"
        f"{indent}  text: {value_literal},\n"
        f"{indent}}},"
    )


def process_file(path: str) -> None:
    global total_fields, total_blocks_dropped
    src = open(path, encoding="utf-8").read()
    orig = src

    # 1) Titres
    src = TITLE_RE_1.sub(rewrite_title, src)

    # 2) Blocs fields : extraire les champs génériques en blocs texte.
    out = []
    last = 0
    for bm in BLOCK_RE.finditer(src):
        indent = bm.group("indent")
        body = bm.group("body")
        fields = list(FIELD_RE.finditer(body))
        if not fields:
            continue
        total_fields += len(fields)

        # Blocs texte dans l'ordre d'apparition des champs.
        texts = []
        for fm in fields:
            texts.append(text_block(indent, fm.group(2)))

        # Corps restant sans les champs extraits (spans relatifs au body).
        remaining = body
        for fm in reversed(fields):
            s, e = fm.span()
            remaining = remaining[:s] + remaining[e:]

        has_remaining = 'label:' in remaining

        out.append(src[last:bm.start()])
        out.extend(t + "\n" for t in texts)
        if has_remaining:
            # Reconstruit le bloc fields sans les champs extraits.
            head = src[bm.start():bm.start("body")]
            tail = src[bm.end("body"):bm.end()]
            # Nettoie les lignes vides résiduelles dans le corps.
            clean = re.sub(r'\n[ \t]*\n([ \t]*\n)?', '\n', remaining).strip('\n')
            out.append(f"{head}{clean}\n{tail}")
        else:
            total_blocks_dropped += 1
        last = bm.end()

    out.append(src[last:])
    src = "".join(out)

    if src != orig and APPLY:
        open(path, "w", encoding="utf-8").write(src)


def main() -> None:
    files = sorted(glob.glob("src/data/guides/learning-*.ts"))
    for f in files:
        process_file(f)
    print(
        f"{total_titles} titres réécrits, {total_fields} champs -> texte, "
        f"{total_blocks_dropped} blocs fields vidés"
        + (" (écrits)" if APPLY else " (dry-run)")
    )


if __name__ == "__main__":
    main()
