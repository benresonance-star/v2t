/**
 * Tokenizes text into an array of words, preserving punctuation and returns.
 */
export function tokenizeText(text: string): string[] {
  // Split by whitespace but keep the whitespace as part of the tokens or as separate tokens
  // To keep it simple and preserve the exact display, we split by space/newline 
  // but we need to be careful about how we align.
  return text === "" ? [] : text.split(/(\s+)/);
}

/**
 * Normalizes a single token for comparison (removes punctuation and lowercase).
 */
export function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()"'?<>]/g, "")
    .trim();
}
