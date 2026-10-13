const BLOCK = /^(for|while|if|elif|else|def|class|with|try|except|finally)\b/;
const SIMPLE = /^(return|yield|break|continue|pass|del|assert|raise|nonlocal|global|@)/;

const count = (re: RegExp, s: string) => (s.match(re) ?? []).length;

/**
 * Operators applied at the top level of a line: arithmetic, bitwise and set operators,
 * comparisons, and `in` tests. Anything inside the brackets of a call or an index
 * belongs to that call or index and is not counted again.
 */
function operators(line: string): number {
  let t = line.replace(/->/g, "  ");
  for (let prev = ""; prev !== t; ) {
    prev = t;
    t = t
      .replace(/(?<=[\w)\]@])\[[^\[\]]*\]/g, "@")
      // A bracketed group keeps its contents; a call's arguments are dropped.
      .replace(/(?<![\w@])\(([^()]*)\)/g, "\u27e8$1\u27e9")
      .replace(/(?<=[\w@])\([^()]*\)/g, "@");
  }
  // A sign after a keyword is not a binary operator.
  const binary = t.replace(/\b(return|yield|in|and|or|not|if|else|elif|while|is|assert|del|for)\b/g, "$1 (");
  return (
    count(/(?<=[\w@\u27e9)\]])\s*(\*\*|\/\/|<<|>>|[-+*\/%&|^])(?![=*\/<>])/g, binary) +
    count(/==|!=|<=|>=|(?<![<>=])[<>](?![<>=])|\bis\b/g, t) +
    count(/\bin\b/g, t) -
    count(/\bfor\b/g, t)
  );
}

/**
 * Rough count of the ideas stacked in an answer, following the table in CARD_RULES.md.
 * Used by the card tests and scripts/audit.mjs; a card it gets wrong is listed in
 * COUNTED_BY_HAND in src/cards/thinking.ts.
 */
export function countIdeas(solution: string): number {
  let ideas = 0;
  const lines = solution
    // Plain strings are emptied; an f-string counts like a call.
    .replace(/(\bf)?(["'])(?:\.|(?!\2).)*\2/g, (_, f) => (f ? "F()" : '""'))
    .split(/\n|;/)
    .map((l) => l.trim())
    .filter((l) => l && !/^(from|import) /.test(l));

  lines.forEach((line, i) => {
    // range(len(x)) is typed as one unit.
    const s = line.replace(/\brange\(len\(/g, "range((");
    let n = count(/\w\(/g, s) - count(/^(def|class) \w+\(/g, s);
    n += count(/[(,]\s*[A-Za-z_]\w*=(?![=\s])/g, s);
    // key=attrgetter("x") is the keyword argument's value, not a second idea.
    n -= count(/[(,]\s*[A-Za-z_]\w*=[A-Za-z_][\w.]*\(/g, s);
    n += count(/(?<!=\s*)\blambda\b/g, s);
    n += count(/\blambda[^:]*:\s*\(/g, s);
    n += count(/(^|[(,=]|(?<![\w)\]])\[|\breturn|\bin|\blambda[^:]*:)\s*-\s*[A-Za-z_(]/g, s);
    n += count(/(?<!^)\bfor\b/g, s) + count(/(?<!^(el)?)\bif\b/g, s);
    n += count(/\b(and|or)\b/g, s) + count(/:=/g, s);
    // A run of [..] after a name is one idea when any part is a slice, negative or computed.
    // Reaching into the item inside a lambda (p[1], w[-1]) is free.
    const outsideLambda = s.replace(/\blambda\b.*/, "");
    for (const chain of outsideLambda.match(/(?<=[\w)\]])(\[[^\[\]]*\])+/g) ?? []) {
      if (/:|\[\s*-|[-+*/%]/.test(chain)) n++;
    }
    n += operators(outsideLambda);
    // Storing under a key or index is an idea of its own when the value is more than a plain name.
    if (n > 0 && /^[\w.]+(\[[^=]*\])+\s*=(?!=)/.test(s)) n++;
    // The key: value form of a dict comprehension, on top of its for clause.
    if (/\{[^{}:]+:[^{}]+\bfor\b/.test(s)) n++;
    // A header or keyword line is an idea of its own; every statement is at least one.
    if (BLOCK.test(line) || (i === 0 && SIMPLE.test(line))) n++;
    ideas += Math.max(n, 1);
  });
  return ideas;
}
