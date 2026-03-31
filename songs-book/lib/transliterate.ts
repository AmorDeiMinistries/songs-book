export function transliterate(text: string): string {
  const consonants: Record<string, string> = {
    "క": "k", "ఖ": "k", "గ": "g", "ఘ": "g",
    "చ": "ch", "ఛ": "ch", "జ": "j", "ఝ": "j",
    "ట": "t", "ఠ": "t", "డ": "d", "ఢ": "d",
    "త": "t", "థ": "t", "ద": "d", "ధ": "d",
    "ప": "p", "ఫ": "p", "బ": "b", "భ": "b",
    "మ": "m", "య": "y", "ర": "r", "ల": "l",
    "వ": "v", "శ": "s", "ష": "s", "స": "s",
    "హ": "h", "ళ": "l", "ఱ": "r", "ణ": "n",
    "న": "n", "ఙ": "ng", "ఞ": "ny"
  }

  const vowels: Record<string, string> = {
    "అ": "a", "ఆ": "a", "ఇ": "i", "ఈ": "i",
    "ఉ": "u", "ఊ": "u", "ఎ": "e", "ఏ": "e",
    "ఐ": "ai", "ఒ": "o", "ఓ": "o", "ఔ": "au"
  }

  const vowelSigns: Record<string, string> = {
    "ా": "a",
    "ి": "i",
    "ీ": "i",
    "ు": "u",
    "ూ": "u",
    "ె": "e",
    "ే": "e",
    "ై": "ai",
    "ొ": "o",
    "ో": "o",
    "ౌ": "au"
  }

  let result = ""

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (vowels[char]) {
      result += vowels[char]
    }
    else if (consonants[char]) {
      if (next && vowelSigns[next]) {
        result += consonants[char] + vowelSigns[next]
        i++
      } else {
        result += consonants[char] + "a"
      }
    }
  }

  return normalize(result)
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/h/g, "")       // remove h variations
    .replace(/aa/g, "a")     // collapse long vowels
    .replace(/ee/g, "i")
    .replace(/oo/g, "u")
}
