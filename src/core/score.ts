import { AlignmentResult } from "./align";

/**
 * Calculates the accuracy score based on the alignment results.
 * Score = matched_tokens / reference_tokens
 */
export function calculateScore(
  alignment: AlignmentResult[],
  referenceTokenCount: number
): number {
  if (referenceTokenCount === 0) return 0;
  
  const correctCount = alignment.filter((a) => a.status === "correct").length;
  return parseFloat((correctCount / referenceTokenCount).toFixed(2));
}
