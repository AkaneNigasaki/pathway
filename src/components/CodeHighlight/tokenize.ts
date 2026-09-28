/**
 * Coloration syntaxique légère façon VS Code (thème Dark+), sans dépendance.
 * Un petit scanner par famille de langage produit des tokens typés,
 * rendus ensuite par <CodeHighlight /> avec les couleurs du thème Dark+.
 */

export type TokenType =
  | "plain"
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "type"
  | "variable"
  | "tag"
  | "attr"
  | "selector"
  | "property"
  | "flag";

export interface Token {
  text: string;
  type: TokenType;
}

type Mode = "generic" | "bash" | "css" | "html" | "yaml" | "dockerfile" | "none";

interface LangConfig {
  mode: Mode;
  lineComment: string[];
  blockComment?: [string, string];
  quotes: string[];
  keywords: string[];
  caseInsensitive?: boolean;
  types?: string[];
}

/* ── Mots-clés réels par langage ─────────────────────────────────────────── */

const JS_KW = [
  "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "export", "extends", "finally",
  "for", "function", "if", "import", "in", "instanceof", "new",
  "return", "super", "switch", "this", "throw", "try", "typeof",
  "var", "void", "while", "with", "yield", "let", "static", "get",
  "set", "of", "from", "as", "async", "await",
];
const TS_KW = [
  ...JS_KW,
  "interface", "type", "enum", "implements", "readonly", "abstract",
  "declare", "namespace", "override",
];
const PY_KW = [
  "False", "None", "True", "and", "as", "assert", "async", "await",
  "break", "class", "continue", "def", "del", "elif", "else", "except",
  "finally", "for", "from", "global", "if", "import", "in", "is",
  "lambda", "nonlocal", "not", "or", "pass", "raise", "return",
  "try", "while", "with", "yield", "match", "case",
];
const RUST_KW = [
  "as", "break", "const", "continue", "crate", "else", "enum",
  "extern", "false", "fn", "for", "if", "impl", "in", "let", "loop",
  "match", "mod", "move", "mut", "pub", "ref", "return", "self",
  "Self", "static", "struct", "super", "trait", "true", "type",
  "unsafe", "use", "where", "while", "async", "await", "dyn",
];
const GO_KW = [
  "break", "case", "chan", "const", "continue", "default", "defer",
  "else", "fallthrough", "for", "func", "go", "goto", "if", "import",
  "interface", "map", "package", "range", "return", "select",
  "struct", "switch", "type", "var",
];
const JAVA_KW = [
  "abstract", "assert", "boolean", "break", "byte", "case", "catch",
  "char", "class", "const", "continue", "default", "do", "double",
  "else", "enum", "extends", "final", "finally", "float", "for",
  "if", "implements", "import", "instanceof", "int", "interface",
  "long", "native", "new", "package", "private", "protected",
  "public", "return", "short", "static", "strictfp", "super",
  "switch", "synchronized", "this", "throw", "throws", "transient",
  "try", "void", "volatile", "while", "var", "record", "sealed",
];
const CSHARP_KW = [
  "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
  "char", "checked", "class", "const", "continue", "decimal",
  "default", "do", "double", "else", "enum", "event", "explicit",
  "extern", "false", "finally", "fixed", "float", "for", "foreach",
  "goto", "if", "implicit", "in", "int", "interface", "internal",
  "is", "lock", "long", "namespace", "new", "null", "object",
  "operator", "out", "override", "params", "private", "protected",
  "public", "readonly", "ref", "return", "sbyte", "sealed", "short",
  "sizeof", "stackalloc", "static", "string", "struct", "switch",
  "this", "throw", "true", "try", "typeof", "uint", "ulong",
  "unchecked", "unsafe", "ushort", "using", "virtual", "void",
  "volatile", "while", "var", "record", "init", "required",
];
const CPP_KW = [
  "alignas", "alignof", "and", "and_eq", "asm", "auto", "bitand",
  "bitor", "bool", "break", "case", "catch", "char", "char8_t",
  "char16_t", "char32_t", "class", "compl", "concept", "const",
  "consteval", "constexpr", "constinit", "continue", "co_await",
  "co_return", "co_yield", "decltype", "default", "delete", "do",
  "double", "dynamic_cast", "else", "enum", "explicit", "export",
  "extern", "false", "float", "for", "friend", "goto", "if",
  "inline", "int", "long", "mutable", "namespace", "new", "noexcept",
  "not", "not_eq", "nullptr", "operator", "or", "or_eq", "private",
  "protected", "public", "register", "reinterpret_cast", "requires",
  "return", "short", "signed", "sizeof", "static", "static_assert",
  "static_cast", "struct", "switch", "template", "this",
  "thread_local", "throw", "true", "try", "typedef", "typeid",
  "typename", "union", "unsigned", "using", "virtual", "void",
  "volatile", "wchar_t", "while",
];
const SQL_KW = [
  "select", "from", "where", "join", "on", "group", "by", "order",
  "having", "limit", "offset", "insert", "into", "values", "update",
  "set", "delete", "create", "table", "alter", "add", "drop",
  "index", "view", "database", "as", "and", "or", "not", "null",
  "distinct", "count", "avg", "sum", "min", "max", "inner", "left",
  "right", "outer", "full", "cross", "union", "all", "case",
  "when", "then", "else", "end", "like", "in", "between", "is",
  "exists", "primary", "key", "foreign", "references", "unique",
  "constraint", "default", "check",
];
const BASH_KW = [
  "if", "then", "else", "elif", "fi", "for", "in", "do", "done",
  "while", "until", "case", "esac", "function", "export", "local",
  "return", "select", "time", "coproc",
];
const DOCKER_KW = [
  "FROM", "RUN", "CMD", "LABEL", "EXPOSE", "ENV", "ADD", "COPY",
  "ENTRYPOINT", "VOLUME", "USER", "WORKDIR", "ARG", "ONBUILD",
  "STOPSIGNAL", "HEALTHCHECK", "SHELL",
];
const YAML_KW = ["true", "false", "null", "yes", "no", "on", "off"];
const JSON_KW = ["true", "false", "null"];

const JS_TYPES = [
  "string", "number", "boolean", "void", "null", "undefined", "any",
  "unknown", "never", "object", "Array", "Promise", "Map", "Set",
  "Date", "RegExp", "Error", "JSON", "Math", "Object", "Function",
  "Symbol", "Record", "Partial", "Readonly", "Pick", "Omit",
];
const PY_TYPES = ["int", "float", "str", "bool", "list", "dict", "tuple", "set", "None"];
const RUST_TYPES = [
  "String", "str", "i8", "i16", "i32", "i64", "i128", "isize",
  "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64",
  "bool", "char", "Vec", "Option", "Result", "Box", "Self",
];
const GO_TYPES = [
  "string", "int", "int8", "int16", "int32", "int64",
  "uint", "uint8", "uint16", "uint32", "uint64",
  "float32", "float64", "bool", "byte", "rune", "error", "nil",
  "any", "comparable",
];
const JAVA_TYPES = [
  "String", "Integer", "Boolean", "Long", "Double", "Float",
  "Character", "Byte", "Short", "List", "ArrayList", "Map",
  "HashMap", "Set", "HashSet", "Optional", "Stream", "System",
  "Object", "Class", "Exception", "RuntimeException", "StringBuilder",
];
const CSHARP_TYPES = [
  "string", "int", "bool", "double", "float", "decimal", "long",
  "short", "byte", "char", "object", "dynamic", "List", "Dictionary",
  "IEnumerable", "IList", "Task", "Console", "String", "StringBuilder",
  "Exception", "DateTime", "Guid",
];
const CPP_TYPES = [
  "string", "vector", "map", "set", "unordered_map", "int", "long",
  "short", "char", "bool", "float", "double", "void", "size_t",
  "auto", "std", "unique_ptr", "shared_ptr", "optional",
];

const CONFIGS: Record<string, LangConfig> = {
  js:         { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'", "`"], keywords: JS_KW, types: JS_TYPES },
  ts:         { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'", "`"], keywords: TS_KW, types: JS_TYPES },
  python:     { mode: "generic", lineComment: ["#"], quotes: ["\"", "'"], keywords: PY_KW, types: PY_TYPES },
  rust:       { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: RUST_KW, types: RUST_TYPES },
  go:         { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'", "`"], keywords: GO_KW, types: GO_TYPES },
  java:       { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: JAVA_KW, types: JAVA_TYPES },
  csharp:     { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: CSHARP_KW, types: CSHARP_TYPES },
  cpp:        { mode: "generic", lineComment: ["//"], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: CPP_KW, types: CPP_TYPES },
  cmake:      { mode: "generic", lineComment: ["#"], quotes: ["\""], keywords: [] },
  hcl:        { mode: "generic", lineComment: ["#", "//"], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: [], types: [] },
  json:       { mode: "generic", lineComment: [], quotes: ["\""], keywords: JSON_KW },
  sql:        { mode: "generic", lineComment: ["--"], blockComment: ["/*", "*/"], quotes: ["'", "\""], keywords: SQL_KW, caseInsensitive: true },
  bash:       { mode: "bash", lineComment: ["#"], quotes: ["\"", "'"], keywords: BASH_KW },
  css:        { mode: "css", lineComment: [], blockComment: ["/*", "*/"], quotes: ["\"", "'"], keywords: [] },
  html:       { mode: "html", lineComment: [], blockComment: ["<!--", "-->"], quotes: ["\"", "'"], keywords: [] },
  yaml:       { mode: "yaml", lineComment: ["#"], quotes: ["\"", "'"], keywords: YAML_KW, caseInsensitive: true },
  dockerfile: { mode: "dockerfile", lineComment: ["#"], quotes: ["\"", "'"], keywords: DOCKER_KW, caseInsensitive: true },
};

const ALIASES: Record<string, string> = {
  javascript: "js", jsx: "js",
  typescript: "ts", tsx: "ts",
  vue: "html", xml: "html",
  py: "python",
  rs: "rust",
  "c#": "csharp", cs: "csharp",
  "c++": "cpp", c: "cpp",
  sh: "bash", shell: "bash", console: "bash", terminal: "bash", zsh: "bash",
  scss: "css", sass: "css", less: "css",
  yml: "yaml", toml: "yaml",
  tf: "hcl",
  plaintext: "none", text: "none", txt: "none",
};

/** Normalise le nom de langage vers une clé de CONFIGS. */
export function normalizeLanguage(language: string): string {
  const key = language.trim().toLowerCase();
  return ALIASES[key] ?? key;
}

/* ── Utilitaires ─────────────────────────────────────────────────────────── */

const IDENT_START = /[A-Za-z_$]/;
const IDENT_PART = /[A-Za-z0-9_$]/;

class Emitter {
  tokens: Token[] = [];
  push(text: string, type: TokenType) {
    if (!text) return;
    const last = this.tokens[this.tokens.length - 1];
    if (last && last.type === type) last.text += text;
    else this.tokens.push({ text, type });
  }
}

/** Consomme une chaîne entre guillemets en gérant les échappements. */
function scanString(code: string, i: number, quote: string): number {
  let j = i + 1;
  const n = code.length;
  while (j < n) {
    if (code[j] === "\\") { j += 2; continue; }
    if (code[j] === quote) { j++; break; }
    if (code[j] === "\n" && quote !== "`") break; // chaîne non terminée : on s'arrête
    j++;
  }
  return j;
}

function scanLineComment(code: string, i: number): number {
  let j = code.indexOf("\n", i);
  if (j < 0) j = code.length;
  return j;
}

function scanBlockComment(code: string, i: number, open: string, close: string): number {
  let j = code.indexOf(close, i + open.length);
  j = j < 0 ? code.length : j + close.length;
  return j;
}

/* ── Mode générique (langages façon C, Python, SQL, JSON…) ───────────────── */

function scanGeneric(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const n = code.length;
  let i = 0;
  while (i < n) {
    let consumed = false;
    for (const lc of cfg.lineComment) {
      if (code.startsWith(lc, i)) {
        const j = scanLineComment(code, i);
        out.push(code.slice(i, j), "comment");
        i = j; consumed = true; break;
      }
    }
    if (consumed) continue;
    if (cfg.blockComment && code.startsWith(cfg.blockComment[0], i)) {
      const j = scanBlockComment(code, i, cfg.blockComment[0], cfg.blockComment[1]);
      out.push(code.slice(i, j), "comment");
      i = j; continue;
    }
    const ch = code[i];
    if (cfg.quotes.includes(ch)) {
      const j = scanString(code, i, ch);
      out.push(code.slice(i, j), "string");
      i = j; continue;
    }
    const next = code[i + 1] ?? "";
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(next))) {
      let j = i;
      if (code.startsWith("0x", i) || code.startsWith("0X", i) ||
          code.startsWith("0b", i) || code.startsWith("0o", i)) {
        j += 2;
        while (j < n && /[0-9a-fA-F_]/.test(code[j])) j++;
      } else {
        while (j < n && /[0-9._']/.test(code[j])) j++;
        while (j < n && /[a-zA-Z]/.test(code[j])) j++; // suffixes : 32u, 1.5f, 100L
      }
      out.push(code.slice(i, j), "number");
      i = j; continue;
    }
    if (IDENT_START.test(ch)) {
      let j = i + 1;
      while (j < n && IDENT_PART.test(code[j])) j++;
      const word = code.slice(i, j);
      let k = j;
      while (k < n && (code[k] === " " || code[k] === "\t")) k++;
      const cmp = cfg.caseInsensitive ? word.toLowerCase() : word;
      if (code[k] === "(") out.push(word, "function");
      else if (cfg.keywords.includes(cmp)) out.push(word, "keyword");
      else if ((cfg.types ?? []).includes(word) || /^[A-Z]/.test(word)) out.push(word, "type");
      else out.push(word, "plain");
      i = j; continue;
    }
    out.push(ch, "plain");
    i++;
  }
  return out.tokens;
}

/* ── Mode shell (commandes) ──────────────────────────────────────────────── */

function scanBash(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const lines = code.split("\n");
  lines.forEach((line, li) => {
    if (li > 0) out.push("\n", "plain");
    const n = line.length;
    let i = 0;
    // indentation
    while (i < n && (line[i] === " " || line[i] === "\t")) i++;
    out.push(line.slice(0, i), "plain");
    let first = true;
    while (i < n) {
      if (line.startsWith("#", i)) {
        out.push(line.slice(i), "comment");
        break;
      }
      const ch = line[i];
      if (ch === " " || ch === "\t") { out.push(ch, "plain"); i++; continue; }
      if (cfg.quotes.includes(ch)) {
        const j = scanString(line, i, ch);
        out.push(line.slice(i, j), "string");
        i = j; first = false; continue;
      }
      if (ch === "$" && /[A-Za-z_{]/.test(line[i + 1] ?? "")) {
        let j = i + 1;
        if (line[j] === "{") {
          const k = line.indexOf("}", j);
          j = k < 0 ? n : k + 1;
        } else {
          j++;
          while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
        }
        out.push(line.slice(i, j), "variable");
        i = j; first = false; continue;
      }
      if (/[0-9]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[0-9._]/.test(line[j])) j++;
        out.push(line.slice(i, j), "number");
        i = j; first = false; continue;
      }
      if (ch === "-" && /[A-Za-z]/.test(line[i + 1] ?? "")) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_-]/.test(line[j])) j++;
        out.push(line.slice(i, j), "flag");
        i = j; first = false; continue;
      }
      if (/[A-Za-z_./~]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[^\s"'$#|&;()<>]/.test(line[j])) j++;
        const word = line.slice(i, j);
        if (first) out.push(word, "function");
        else if (cfg.keywords.includes(word)) out.push(word, "keyword");
        else out.push(word, "plain");
        i = j; first = false; continue;
      }
      out.push(ch, "plain");
      i++; first = false;
    }
  });
  return out.tokens;
}

/* ── Mode CSS ────────────────────────────────────────────────────────────── */

function scanCss(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const n = code.length;
  let i = 0;
  let depth = 0;
  const scanIdent = (p: number): number => {
    let j = p + 1;
    while (j < n && /[A-Za-z0-9_$-]/.test(code[j])) j++;
    return j;
  };
  while (i < n) {
    if (cfg.blockComment && code.startsWith(cfg.blockComment[0], i)) {
      const j = scanBlockComment(code, i, cfg.blockComment[0], cfg.blockComment[1]);
      out.push(code.slice(i, j), "comment");
      i = j; continue;
    }
    const ch = code[i];
    if (cfg.quotes.includes(ch)) {
      const j = scanString(code, i, ch);
      out.push(code.slice(i, j), "string");
      i = j; continue;
    }
    if (ch === "@") {
      const j = scanIdent(i);
      out.push(code.slice(i, j), "keyword");
      i = j; continue;
    }
    if (ch === "{") { depth++; out.push(ch, "plain"); i++; continue; }
    if (ch === "}") { depth = Math.max(0, depth - 1); out.push(ch, "plain"); i++; continue; }
    if (depth === 0) {
      if (ch === "#" || ch === ".") {
        const j = scanIdent(i);
        out.push(code.slice(i, j), "selector");
        i = j; continue;
      }
      if (/[A-Za-z]/.test(ch)) {
        const j = scanIdent(i);
        out.push(code.slice(i, j), "selector");
        i = j; continue;
      }
      if (ch === ":" && /[A-Za-z]/.test(code[i + 1] ?? "")) {
        const j = scanIdent(i);
        out.push(code.slice(i, j), "selector");
        i = j; continue;
      }
      out.push(ch, "plain"); i++; continue;
    }
    // dans un bloc : propriétés et valeurs
    if (/[A-Za-z-]/.test(ch)) {
      const j = scanIdent(i);
      const word = code.slice(i, j);
      let k = j;
      while (k < n && code[k] === " ") k++;
      if (word === "!important" || code[k] === ":") out.push(word, "property");
      else out.push(word, "plain");
      i = j; continue;
    }
    if (ch === "!" ) {
      if (code.startsWith("!important", i)) { out.push("!important", "keyword"); i += 10; continue; }
      out.push(ch, "plain"); i++; continue;
    }
    if (ch === "#") {
      let j = i + 1;
      while (j < n && /[0-9a-fA-F]/.test(code[j])) j++;
      out.push(code.slice(i, j), j > i + 1 ? "number" : "plain");
      i = j; continue;
    }
    if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(code[i + 1] ?? ""))) {
      let j = i;
      while (j < n && /[0-9.]/.test(code[j])) j++;
      while (j < n && /[a-zA-Z%]/.test(code[j])) j++; // unités : px, rem, %
      out.push(code.slice(i, j), "number");
      i = j; continue;
    }
    out.push(ch, "plain"); i++;
  }
  return out.tokens;
}

/* ── Mode HTML / XML ─────────────────────────────────────────────────────── */

function scanHtml(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const n = code.length;
  let i = 0;
  while (i < n) {
    if (cfg.blockComment && code.startsWith(cfg.blockComment[0], i)) {
      const j = scanBlockComment(code, i, cfg.blockComment[0], cfg.blockComment[1]);
      out.push(code.slice(i, j), "comment");
      i = j; continue;
    }
    const ch = code[i];
    if (ch === "<") {
      out.push("<", "plain"); i++;
      if (code[i] === "/") { out.push("/", "plain"); i++; }
      if (/[A-Za-z]/.test(code[i] ?? "")) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9-_:]/.test(code[j])) j++;
        out.push(code.slice(i, j), "tag");
        i = j;
      }
      // attributs jusqu'à >
      while (i < n && code[i] !== ">") {
        const c = code[i];
        if (c === "/" ) { out.push("/", "plain"); i++; continue; }
        if (/\s/.test(c)) { out.push(c, "plain"); i++; continue; }
        if (cfg.quotes.includes(c)) {
          const j = scanString(code, i, c);
          out.push(code.slice(i, j), "string");
          i = j; continue;
        }
        if (/[A-Za-z_:]/.test(c)) {
          let j = i + 1;
          while (j < n && /[A-Za-z0-9_:\-.]/.test(code[j])) j++;
          const word = code.slice(i, j);
          let k = j;
          while (k < n && code[k] === " ") k++;
          out.push(word, code[k] === "=" ? "attr" : "plain");
          i = j; continue;
        }
        out.push(c, "plain"); i++;
      }
      if (code[i] === ">") { out.push(">", "plain"); i++; }
      continue;
    }
    if (cfg.quotes.includes(ch)) {
      const j = scanString(code, i, ch);
      out.push(code.slice(i, j), "string");
      i = j; continue;
    }
    out.push(ch, "plain"); i++;
  }
  return out.tokens;
}

/* ── Mode YAML ───────────────────────────────────────────────────────────── */

function scanYaml(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const lines = code.split("\n");
  lines.forEach((line, li) => {
    if (li > 0) out.push("\n", "plain");
    const n = line.length;
    let i = 0;
    while (i < n && (line[i] === " " || line[i] === "\t")) i++;
    const indent = line.slice(0, i);
    out.push(indent, "plain");
    if (line.startsWith("- ", i)) { out.push("- ", "plain"); i += 2; }
    // clé: ident suivi de :
    const keyMatch = /^[A-Za-z0-9_.\-/]+(?=\s*:)/.exec(line.slice(i));
    if (keyMatch) {
      out.push(keyMatch[0], "attr");
      i += keyMatch[0].length;
    }
    while (i < n) {
      const ch = line[i];
      if (line.startsWith("#", i)) { out.push(line.slice(i), "comment"); break; }
      if (cfg.quotes.includes(ch)) {
        const j = scanString(line, i, ch);
        out.push(line.slice(i, j), "string");
        i = j; continue;
      }
      if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(line[i + 1] ?? ""))) {
        let j = i + 1;
        while (j < n && /[0-9._]/.test(line[j])) j++;
        out.push(line.slice(i, j), "number");
        i = j; continue;
      }
      if (/[A-Za-z]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[A-Za-z]/.test(line[j])) j++;
        const word = line.slice(i, j);
        out.push(word, cfg.keywords.includes(word.toLowerCase()) ? "keyword" : "plain");
        i = j; continue;
      }
      out.push(ch, "plain"); i++;
    }
  });
  return out.tokens;
}

/* ── Mode Dockerfile ─────────────────────────────────────────────────────── */

function scanDockerfile(code: string, cfg: LangConfig): Token[] {
  const out = new Emitter();
  const lines = code.split("\n");
  lines.forEach((line, li) => {
    if (li > 0) out.push("\n", "plain");
    const n = line.length;
    let i = 0;
    while (i < n && (line[i] === " " || line[i] === "\t")) i++;
    out.push(line.slice(0, i), "plain");
    const instr = /^[A-Z]+/.exec(line.slice(i));
    if (instr && cfg.keywords.includes(instr[0].toUpperCase())) {
      out.push(instr[0], "keyword");
      i += instr[0].length;
    }
    while (i < n) {
      const ch = line[i];
      if (line.startsWith("#", i)) { out.push(line.slice(i), "comment"); break; }
      if (ch === " " || ch === "\t") { out.push(ch, "plain"); i++; continue; }
      if (cfg.quotes.includes(ch)) {
        const j = scanString(line, i, ch);
        out.push(line.slice(i, j), "string");
        i = j; continue;
      }
      if (ch === "$") {
        let j = i + 1;
        if (line[j] === "{") {
          const k = line.indexOf("}", j);
          j = k < 0 ? n : k + 1;
        } else {
          j++;
          while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
        }
        out.push(line.slice(i, j), "variable");
        i = j; continue;
      }
      if (ch === "-" && /[A-Za-z]/.test(line[i + 1] ?? "")) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_-]/.test(line[j])) j++;
        out.push(line.slice(i, j), "flag");
        i = j; continue;
      }
      if (/[0-9]/.test(ch)) {
        let j = i + 1;
        while (j < n && /[0-9._]/.test(line[j])) j++;
        out.push(line.slice(i, j), "number");
        i = j; continue;
      }
      out.push(ch, "plain"); i++;
    }
  });
  return out.tokens;
}

/* ── Point d'entrée ──────────────────────────────────────────────────────── */

/** Découpe le code source en tokens typés selon le langage. */
export function highlight(code: string, language: string): Token[] {
  const key = normalizeLanguage(language);
  const cfg = CONFIGS[key];
  if (!cfg) {
    // langage inconnu : générique façon C
    return scanGeneric(code, {
      mode: "generic",
      lineComment: ["//"],
      blockComment: ["/*", "*/"],
      quotes: ["\"", "'"],
      keywords: [],
    });
  }
  switch (cfg.mode) {
    case "bash": return scanBash(code, cfg);
    case "css": return scanCss(code, cfg);
    case "html": return scanHtml(code, cfg);
    case "yaml": return scanYaml(code, cfg);
    case "dockerfile": return scanDockerfile(code, cfg);
    case "none": return [{ text: code, type: "plain" }];
    default: return scanGeneric(code, cfg);
  }
}
