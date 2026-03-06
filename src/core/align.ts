export type MatchStatus = "correct" | "omitted" | "inserted" | "substituted";

export interface AlignmentResult {
  ref: string | null;
  spoken: string | null;
  status: MatchStatus;
}

/**
 * Aligns reference tokens with spoken tokens using a simple word-by-word comparison.
 * For MVP, we use a basic greedy alignment. This can be upgraded to 
 * Needleman-Wunsch or Smith-Waterman for more robust alignment later.
 */
export function alignTokens(
  referenceTokens: string[],
  spokenTokens: string[]
): AlignmentResult[] {
  const alignment: AlignmentResult[] = [];
  let refIdx = 0;
  let spokenIdx = 0;

  while (refIdx < referenceTokens.length || spokenIdx < spokenTokens.length) {
    const refToken = referenceTokens[refIdx];
    const spokenToken = spokenTokens[spokenIdx];

    if (refToken && spokenToken) {
      if (refToken === spokenToken) {
        alignment.push({ ref: refToken, spoken: spokenToken, status: "correct" });
        refIdx++;
        spokenIdx++;
      } else {
        // Simple heuristic: check if next spoken matches current ref (insertion)
        // or if next ref matches current spoken (omission)
        const nextSpoken = spokenTokens[spokenIdx + 1];
        const nextRef = referenceTokens[refIdx + 1];

        if (nextSpoken === refToken) {
          alignment.push({ ref: null, spoken: spokenToken, status: "inserted" });
          spokenIdx++;
        } else if (nextRef === spokenToken) {
          alignment.push({ ref: refToken, spoken: null, status: "omitted" });
          refIdx++;
        } else {
          alignment.push({ ref: refToken, spoken: spokenToken, status: "substituted" });
          refIdx++;
          spokenIdx++;
        }
      }
    } else if (refToken) {
      alignment.push({ ref: refToken, spoken: null, status: "omitted" });
      refIdx++;
    } else if (spokenToken) {
      alignment.push({ ref: null, spoken: spokenToken, status: "inserted" });
      spokenIdx++;
    }
  }

  return alignment;
}
