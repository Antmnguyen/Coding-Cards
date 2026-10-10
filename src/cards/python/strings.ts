import { skill, topic, v } from "../topic";

export const strings = topic("python", "strings", [
  // ---- basics ----

  skill("str-index", 1, { explain: "A string is indexed like a list; each item is a one-character string." }, [
    v("first", "`s` is a string. Get its first character.", 's = "cat"', 'gives "c"', "s[0]", '_ == "c"'),
    v("last", "`s` is a string. Get its last character.", 's = "cat"', 'gives "t"', "s[-1]", '_ == "t"'),
    v("at-i", "`s` is a string and `i` is an index. Get the character at that index.", 's = "cat"\ni = 1', 'gives "a"', "s[i]", '_ == "a"'),
    v("word-initial", "`words` is a list of strings and `i` is an index. Get the first character of the word at that index.", 'words = ["hi", "yo"]\ni = 1', 'gives "y"', "words[i][0]", '_ == "y"', {
      explain: "Index the list first, then the string.",
    }),
  ]),

  skill("str-len", 1, { explain: "len() is a function; there is no .length." }, [
    v("length", "`s` is a string. Get how many characters it has.", 's = "hello"', "gives 5", "len(s)", "_ == 5"),
    v("is-empty", "`s` is a string. Write an expression that is True when it is empty.", 's = ""', "gives True", "not s", "_ is True", {
      accepted: ['s == ""', "len(s) == 0"],
      explain: "An empty string is falsy.",
    }),
    v("longer", "`a` and `b` are strings. Write an expression that is True when `a` is longer than `b`.", 'a = "abc"\nb = "ab"', "gives True", "len(a) > len(b)", "_ is True"),
    v("same-length", "`s` and `t` are strings. Write an expression that is True when they are NOT the same length.", 's = "abc"\nt = "ab"', "gives True", "len(s) != len(t)", "_ is True"),
  ]),

  skill("str-concat", 1, { explain: "+ joins strings into a new string; strings are never changed in place." }, [
    v("two", "`a` and `b` are strings. Join them into one string.", 'a = "ab"\nb = "cd"', 'gives "abcd"', "a + b", '_ == "abcd"'),
    v("with-space", "`first` and `last` are strings. Join them with a single space between.", 'first = "Ada"\nlast = "Byron"', 'gives "Ada Byron"', 'first + " " + last', '_ == "Ada Byron"', {
      accepted: ['f"{first} {last}"', '" ".join([first, last])'],
    }),
    v("append-char", "`path` is a string and `c` is a single character. Add `c` to the end of `path`.", 'path = "ab"\nc = "c"', 'path becomes "abc"', "path += c", 'path == "abc"', {
      explain: "Strings have no append(); += builds a new string.",
    }),
    v("prepend-char", "`s` is a string and `c` is a single character. Put `c` at the front of `s`.", 's = "bc"\nc = "a"', 's becomes "abc"', "s = c + s", 's == "abc"'),
    v("repeat", "`s` is a string and `n` is an int. Get `s` repeated `n` times.", 's = "ab"\nn = 3', 'gives "ababab"', "s * n", '_ == "ababab"', {
      explain: "* repeats a string, the same as for a list.",
    }),
    v("int-needs-str", "`label` is a string and `n` is an int. Join them into one string.", 'label = "id"\nn = 7', 'gives "id7"', "label + str(n)", '_ == "id7"', {
      accepted: ['f"{label}{n}"'],
      explain: "str + int raises TypeError; convert the int with str() first.",
    }),
  ]),

  skill("str-in", 1, { explain: "For strings, `in` tests for a substring, not just a single character." }, [
    v("substring", "`s` and `sub` are strings. Write an expression that is True when `sub` appears somewhere inside `s`.", 's = "hello"\nsub = "ell"', "gives True", "sub in s", "_ is True"),
    v("vowel", "`c` is a single lowercase character. Write an expression that is True when it is a vowel.", 'c = "e"', "gives True", 'c in "aeiou"', "_ is True", {
      explain: "Testing against a literal string is the short way to check a small set of characters.",
    }),
    v("not-in", "`s` is a string and `c` is a single character. Write an expression that is True when `c` does NOT appear in `s`.", 's = "hello"\nc = "z"', "gives True", "c not in s", "_ is True"),
  ]),

  skill("str-compare", 1, { explain: "Strings compare by value with ==, and alphabetically with < and >." }, [
    v("equal", "`s` and `t` are strings. Write an expression that is True when they hold the same text.", 's = "abc"\nt = "abc"', "gives True", "s == t", "_ is True", {
      explain: "== compares contents; `is` compares identity and is the wrong tool here.",
    }),
    v("before", "`a` and `b` are strings. Write an expression that is True when `a` comes before `b` alphabetically.", 'a = "apple"\nb = "banana"', "gives True", "a < b", "_ is True"),
    v("ignore-case", "`a` and `b` are strings. Write an expression that is True when they are equal ignoring upper and lower case.", 'a = "Hello"\nb = "hELLO"', "gives True", "a.lower() == b.lower()", "_ is True"),
  ]),

  // ---- split and join ----

  skill("str-split", 1, { explain: "split() returns a list of strings." }, [
    v("whitespace", "`s` is a sentence as a string. Break it into a list of words, splitting on any amount of whitespace.", 's = "a b  c"', 'gives ["a", "b", "c"]', "s.split()", '_ == ["a", "b", "c"]', {
      explain: 'split() with no argument collapses runs of whitespace; split(" ") does not.',
    }),
    v("comma", "`s` is a string of values separated by commas. Break it into a list of the values.", 's = "1,2,3"', 'gives ["1", "2", "3"]', 's.split(",")', '_ == ["1", "2", "3"]'),
    v("to-ints", "`s` is a string of whole numbers separated by commas. Turn it into a list of ints. Call each piece `x`.", 's = "1,2,3"', "gives [1, 2, 3]", '[int(x) for x in s.split(",")]', "_ == [1, 2, 3]", {
      accepted: ['list(map(int, s.split(",")))'],
      explain: "split gives strings; each piece still needs int().",
    }),
    v("first-word", "`s` is a sentence as a string. Get just its first word.", 's = "hello big world"', 'gives "hello"', "s.split()[0]", '_ == "hello"'),
    v("once", "`s` is a string with a key, an equals sign and a value that may itself contain equals signs. Split it at the FIRST equals sign only.", 's = "k=a=b"', 'gives ["k", "a=b"]', 's.split("=", 1)', '_ == ["k", "a=b"]', {
      explain: "The second argument of split is the maximum number of splits.",
    }),
  ]),

  skill("str-join", 1, { explain: "join is a method of the separator string, and every item must already be a string." }, [
    v("chars", "`path` is a list of single characters. Glue them into one string with nothing between them.", 'path = ["a", "b"]', 'gives "ab"', '"".join(path)', '_ == "ab"'),
    v("words", "`words` is a list of strings. Join them into one string with a single space between each.", 'words = ["hi", "yo"]', 'gives "hi yo"', '" ".join(words)', '_ == "hi yo"'),
    v("comma", "`parts` is a list of strings. Join them into one string with a comma between each.", 'parts = ["a", "b", "c"]', 'gives "a,b,c"', '",".join(parts)', '_ == "a,b,c"'),
    v("ints", "`nums` is a list of ints. Join them into one string of digits with nothing between them.", "nums = [1, 2, 3]", 'gives "123"', '"".join(map(str, nums))', '_ == "123"', {
      accepted: ['"".join(str(x) for x in nums)'],
      explain: "join raises TypeError on ints; convert each one with str first.",
    }),
    v("reverse-words", "`s` is a sentence as a string. Get the sentence with its words in reverse order, separated by single spaces.", 's = "the sky is blue"', 'gives "blue is sky the"', '" ".join(s.split()[::-1])', '_ == "blue is sky the"', {
      accepted: ['" ".join(reversed(s.split()))'],
      explain: "Split into words, reverse the list, join back.",
    }),
  ]),

  skill("str-sort", 2, { explain: "sorted() on a string gives a LIST of characters; join it to get a string back." }, [
    v("sorted-list", "`s` is a string. Get its characters as a sorted list.", 's = "cab"', 'gives ["a", "b", "c"]', "sorted(s)", '_ == ["a", "b", "c"]', {
      explain: "Strings have no sort() method.",
    }),
    v("sorted-string", "`s` is a string. Get a new string with the same characters in sorted order.", 's = "cab"', 'gives "abc"', '"".join(sorted(s))', '_ == "abc"'),
    v("anagram", "`s` and `t` are strings. Using sorting, write an expression that is True when they are anagrams of each other.", 's = "listen"\nt = "silent"', "gives True", "sorted(s) == sorted(t)", "_ is True"),
    v("palindrome", "`sub` is a string. Write an expression that is True when it reads the same backwards.", 'sub = "aba"', "gives True", "sub == sub[::-1]", "_ is True", {
      explain: "Compare the string with its reversed slice.",
    }),
  ]),

  // ---- methods ----

  skill("str-strip", 1, { explain: "strip removes from the ends only, and returns a new string." }, [
    v("both", "`s` is a string with spaces at both ends. Get it without the leading and trailing whitespace.", 's = "  a b "', 'gives "a b"', "s.strip()", '_ == "a b"', {
      explain: "strip, not trim.",
    }),
    v("left", "`s` is a string with spaces at both ends. Remove the whitespace from the left end only.", 's = "  ab "', 'gives "ab "', "s.lstrip()", '_ == "ab "'),
    v("right", "`s` is a string with spaces at both ends. Remove the whitespace from the right end only.", 's = "  ab "', 'gives "  ab"', "s.rstrip()", '_ == "  ab"'),
    v("leading-zeros", "`s` is a string of digits with zeros at the front. Get it without those leading zeros.", 's = "00420"', 'gives "420"', 's.lstrip("0")', '_ == "420"', {
      explain: "Pass the characters to strip; the zero at the end is kept because lstrip only works on the left.",
    }),
  ]),

  skill("str-case", 1, { explain: "Case methods return a new string; the original is unchanged." }, [
    v("lower", "`s` is a string. Get a lowercase copy of it.", 's = "AbC"', 'gives "abc"', "s.lower()", '_ == "abc"'),
    v("upper", "`s` is a string. Get an uppercase copy of it.", 's = "AbC"', 'gives "ABC"', "s.upper()", '_ == "ABC"'),
    v("is-upper", "`c` is a single letter. Check whether it is uppercase.", 'c = "Q"', "gives True", "c.isupper()", "_ is True"),
  ]),

  skill("str-test", 1, { explain: "The is... tests are methods and need the parentheses." }, [
    v("isdigit", "`c` is a single character. Check whether it is a digit.", 'c = "7"', "gives True", "c.isdigit()", "_ is True"),
    v("isalpha", "`c` is a single character. Check whether it is a letter.", 'c = "x"', "gives True", "c.isalpha()", "_ is True"),
    v("isalnum", "`c` is a single character. Check whether it is a letter or a digit.", 'c = "a"', "gives True", "c.isalnum()", "_ is True"),
    v("isspace", "`c` is a single character. Check whether it is whitespace.", 'c = " "', "gives True", "c.isspace()", "_ is True"),
    v("whole-string", "`s` is a string. Check whether every character in it is a digit.", 's = "2024"', "gives True", "s.isdigit()", "_ is True", {
      explain: "The same methods work on a whole string: True only if every character passes.",
    }),
    v("filter-alnum", "`s` is a string with punctuation. Build a new string holding only its letters and digits. Call each character `c`.", 's = "a,b! 1"', 'gives "ab1"', '"".join(c for c in s if c.isalnum())', '_ == "ab1"', {
      explain: "Filter with a generator, then join the survivors.",
    }),
  ]),

  skill("str-find", 2, { explain: "find returns -1 when the text is missing; index raises ValueError instead." }, [
    v("find", "`s` and `sub` are strings. Get the index where `sub` first appears in `s`, in the way that gives -1 if it is missing.", 's = "hello"\nsub = "l"', "gives 2", "s.find(sub)", "_ == 2"),
    v("find-missing", "`s` is a string and `sub` does not appear in it. Search for `sub` without raising an error.", 's = "hello"\nsub = "z"', "gives -1", "s.find(sub)", "_ == -1"),
    v("rfind", "`s` and `sub` are strings. Get the index where `sub` LAST appears in `s`.", 's = "hello"\nsub = "l"', "gives 3", "s.rfind(sub)", "_ == 3"),
    v("count", "`s` is a string and `c` is a character. Get how many times `c` appears in `s`.", 's = "banana"\nc = "a"', "gives 3", "s.count(c)", "_ == 3"),
    v("startswith", "`s` and `p` are strings. Check whether `s` begins with `p`.", 's = "apple"\np = "ap"', "gives True", "s.startswith(p)", "_ is True", {
      explain: "All lowercase: startswith, not startsWith.",
    }),
    v("endswith", "`s` and `suffix` are strings. Check whether `s` ends with `suffix`.", 's = "apple"\nsuffix = "le"', "gives True", "s.endswith(suffix)", "_ is True"),
  ]),

  skill("str-replace", 1, { explain: "replace returns a new string and replaces every occurrence." }, [
    v("swap", "`s` is a string. Get a copy in which every `old` is replaced by `new`.", 's = "a-b-c"\nold = "-"\nnew = "+"', 'gives "a+b+c"', "s.replace(old, new)", '_ == "a+b+c"'),
    v("remove-spaces", "`s` is a string. Get a copy with every space removed, including those in the middle.", 's = "a b c"', 'gives "abc"', 's.replace(" ", "")', '_ == "abc"', {
      explain: "strip() only trims the ends; replace reaches the middle.",
    }),
    v("reassign", "`s` is a string. Replace every dash in it with a space, updating `s` itself.", 's = "a-b"', 's becomes "a b"', 's = s.replace("-", " ")', 's == "a b"', {
      explain: "s.replace(...) alone does nothing lasting; assign the result back.",
    }),
  ]),

  // ---- characters and numbers ----

  skill("str-ord", 2, { explain: "ord gives a character's code point and chr turns a code point back into a character." }, [
    v("ord", "`c` is a single character. Get its numeric code point.", 'c = "a"', "gives 97", "ord(c)", "_ == 97"),
    v("chr", "`n` is a code point. Get the character it stands for.", "n = 98", 'gives "b"', "chr(n)", '_ == "b"'),
    v("letter-index", '`c` is one lowercase letter. Get its position in the alphabet, where "a" is 0 and "z" is 25.', 'c = "d"', "gives 3", 'ord(c) - ord("a")', "_ == 3", {
      explain: "Characters cannot be subtracted directly; go through ord.",
    }),
    v("index-letter", '`i` is an int from 0 to 25. Get the lowercase letter at that position in the alphabet, where 0 is "a".', "i = 2", 'gives "c"', 'chr(ord("a") + i)', '_ == "c"'),
    v("next-letter", "`c` is a single lowercase letter before z. Get the letter that follows it in the alphabet.", 'c = "f"', 'gives "g"', "chr(ord(c) + 1)", '_ == "g"'),
    v("digit-value", "`c` is a single digit character. Get its value as an int.", 'c = "7"', "gives 7", "int(c)", "_ == 7", {
      accepted: ['ord(c) - ord("0")'],
    }),
  ]),

  skill("str-count-array", 2, { explain: "A list of 26 counts indexed by ord(c) - ord(\"a\") is the fixed-size alternative to a Counter." }, [
    v("create", "Create `counts`, a list of 26 zeros, one slot per lowercase letter.", "", "counts is a list of 26 zeros", "counts = [0] * 26", "counts == [0] * 26"),
    v("increment", "`counts` is a list of 26 zeros, one slot per lowercase letter, and `c` is a lowercase letter. Add 1 to the slot for `c`.", 'counts = [0] * 26\nc = "c"', "counts[2] becomes 1", 'counts[ord(c) - ord("a")] += 1', "counts[2] == 1 and sum(counts) == 1"),
    v("as-key", "`counts` is a list of 26 ints that you want to use as a dictionary key. Convert it to a form that can be a key.", "counts = [0] * 26", "gives a tuple of 26 zeros", "tuple(counts)", "_ == (0,) * 26", {
      explain: "Lists are unhashable; a tuple of the counts can be a dict key.",
    }),
  ]),

  skill("str-convert", 1, { explain: "int() and str() convert between text and numbers; nothing converts automatically." }, [
    v("to-int", "`s` is a string of digits. Convert it to an int.", 's = "42"', "gives 42", "int(s)", "_ == 42", {
      explain: "int() parses; there is no parseInt.",
    }),
    v("to-str", "`n` is an int. Convert it to a string.", "n = 42", 'gives "42"', "str(n)", '_ == "42"'),
    v("digits", "`n` is a positive int. Get a list of its digits as ints. Call each digit character `d`.", "n = 407", "gives [4, 0, 7]", "[int(d) for d in str(n)]", "_ == [4, 0, 7]", {
      accepted: ["list(map(int, str(n)))"],
    }),
    v("digit-sum", "`n` is a positive int. Get the sum of its digits. Call each digit character `d`.", "n = 407", "gives 11", "sum(int(d) for d in str(n))", "_ == 11", {
      accepted: ["sum(map(int, str(n)))"],
    }),
    v("digit-count", "`n` is a positive int. Get how many digits it has.", "n = 4070", "gives 4", "len(str(n))", "_ == 4"),
    v("from-binary", "`s` is a string of binary digits. Convert it to the int it represents.", 's = "101"', "gives 5", "int(s, 2)", "_ == 5", {
      explain: "The second argument of int() is the base.",
    }),
    v("to-binary", "`n` is an int. Get its binary digits as a string, without the 0b prefix.", "n = 5", 'gives "101"', "bin(n)[2:]", '_ == "101"', {
      accepted: ['f"{n:b}"', 'format(n, "b")'],
      explain: 'bin(5) is "0b101"; slice off the first two characters.',
    }),
  ]),

  skill("str-format", 2, { explain: "An f-string evaluates whatever is inside the braces." }, [
    v("values", "`name` is a string and `age` is an int. Using an f-string, build the text of the name, the word is, and the age, separated by spaces.", 'name = "Ada"\nage = 36', 'gives "Ada is 36"', 'f"{name} is {age}"', '_ == "Ada is 36"', {
      explain: "The f goes before the opening quote; no str() needed inside the braces.",
    }),
    v("expression", "`a` and `b` are ints. Using an f-string, build the text sum= followed by their sum.", "a = 2\nb = 3", 'gives "sum=5"', 'f"sum={a + b}"', '_ == "sum=5"'),
    v("decimals", "`x` is a float. Format it as a string with exactly 2 digits after the decimal point.", "x = 3.14159", 'gives "3.14"', 'f"{x:.2f}"', '_ == "3.14"', {
      accepted: ['format(x, ".2f")'],
      explain: "The format spec goes after a colon: .2f is two decimals.",
    }),
    v("zero-pad", "`n` is an int. Format it as a string padded with leading zeros to a width of 3.", "n = 7", 'gives "007"', "str(n).zfill(3)", '_ == "007"', {
      accepted: ['f"{n:03d}"', 'f"{n:03}"'],
    }),
  ]),

  skill("str-immutable", 2, { explain: "Strings cannot be changed in place; rebuild them, or build a list and join it at the end." }, [
    v("drop-last", "`path` is a string. Remove its last character, updating `path`.", 'path = "abc"', 'path becomes "ab"', "path = path[:-1]", 'path == "ab"', {
      explain: "There is no pop() on a string; reassign a slice.",
    }),
    v("to-list-and-back", "`chars` is a list of characters that was edited in place. Turn it back into a string named `s`.", 'chars = ["h", "i"]', 's is "hi"', 's = "".join(chars)', 's == "hi"', {
      explain: "The usual pattern: list(s), change the list, then join.",
    }),
  ]),
]);
