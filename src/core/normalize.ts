/**
 * Normalizes text by converting to lowercase, removing punctuation,
 * and collapsing multiple whitespaces.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Tokenizes text into an array of words.
 */
export function tokenizeText(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized === "" ? [] : normalized.split(" ");
}
