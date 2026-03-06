import { normalizeToken } from "./normalize";

export type MatchStatus = "correct" | "omitted" | "inserted" | "substituted" | "whitespace";

export interface AlignmentResult {
  ref: string | null;
  spoken: string | null;
  status: MatchStatus;
}

/**
 * Aligns reference tokens with spoken tokens.
 * Preserves whitespace and punctuation in the reference tokens.
 */
export function alignTokens(
  referenceTokens: string[],
  spokenTokens: string[]
): AlignmentResult[] {
  const alignment: AlignmentResult[] = [];
  let refIdx = 0;
  let spokenIdx = 0;

  // Filter spoken tokens to only include non-whitespace for easier matching
  const cleanSpoken = spokenTokens.filter(t => t.trim() !== "");
  let cleanSpokenIdx = 0;

  while (refIdx < referenceTokens.length) {
    const refToken = referenceTokens[refIdx];
    
    // If it's pure whitespace, just push it as is
    if (refToken.trim() === "") {
      alignment.push({ ref: refToken, spoken: null, status: "whitespace" });
      refIdx++;
      continue;
    }

    const spokenToken = cleanSpoken[cleanSpokenIdx];

    if (spokenToken) {
      const normRef = normalizeToken(refToken);
      const normSpoken = normalizeToken(spokenToken);

      if (normRef === normSpoken) {
        alignment.push({ ref: refToken, spoken: spokenToken, status: "correct" });
        refIdx++;
        cleanSpokenIdx++;
      } else {
        // Simple lookahead
        const nextSpoken = cleanSpoken[cleanSpokenIdx + 1];
        const nextRefToken = referenceTokens.slice(refIdx + 1).find(t => t.trim() !== "");
        
        if (nextSpoken && normalizeToken(nextSpoken) === normRef) {
          // Spoken has an insertion, but we are iterating primarily by ref
          // So we mark current spoken as inserted and stay on current ref
          alignment.push({ ref: null, spoken: spokenToken, status: "inserted" });
          cleanSpokenIdx++;
        } else if (nextRefToken && normalizeToken(nextRefToken) === normSpoken) {
          alignment.push({ ref: refToken, spoken: null, status: "omitted" });
          refIdx++;
        } else {
          alignment.push({ ref: refToken, spoken: spokenToken, status: "substituted" });
          refIdx++;
          cleanSpokenIdx++;
        }
      }
    } else {
      alignment.push({ ref: refToken, spoken: null, status: "omitted" });
      refIdx++;
    }
  }

  // Add remaining spoken tokens as insertions
  while (cleanSpokenIdx < cleanSpoken.length) {
    alignment.push({ ref: null, spoken: cleanSpoken[cleanSpokenIdx], status: "inserted" });
    cleanSpokenIdx++;
  }

  return alignment;
}
