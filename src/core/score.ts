import { AlignmentResult } from "./align";

/**
 * Calculates the accuracy score based on the alignment results.
 * Score = matched_tokens / reference_tokens
 */
export function calculateScore(
  alignment: AlignmentResult[]
): number {
  const actualTokens = alignment.filter((a) => a.status !== "whitespace");
  const referenceTokenCount = actualTokens.filter(a => a.ref !== null).length;
  
  if (referenceTokenCount === 0) return 0;
  
  const correctCount = actualTokens.filter((a) => a.status === "correct").length;
  return parseFloat((correctCount / referenceTokenCount).toFixed(2));
}
