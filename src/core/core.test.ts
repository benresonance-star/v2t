import { normalizeText, tokenizeText } from "./normalize";
import { alignTokens } from "./align";
import { calculateScore } from "./score";

describe("Core Logic", () => {
  describe("Normalization", () => {
    it("should lowercase and remove punctuation", () => {
      expect(normalizeText("Hello, World!")).toBe("hello world");
    });

    it("should collapse whitespace", () => {
      expect(normalizeText("  hello    world  ")).toBe("hello world");
    });
  });

  describe("Tokenization", () => {
    it("should split into words", () => {
      expect(tokenizeText("hello world")).toEqual(["hello", "world"]);
    });

    it("should handle empty strings", () => {
      expect(tokenizeText("")).toEqual([]);
    });
  });

  describe("Alignment", () => {
    it("should identify correct matches", () => {
      const ref = ["for", "god"];
      const spoken = ["for", "god"];
      const result = alignTokens(ref, spoken);
      expect(result).toEqual([
        { ref: "for", spoken: "for", status: "correct" },
        { ref: "god", spoken: "god", status: "correct" },
      ]);
    });

    it("should identify omissions", () => {
      const ref = ["for", "god", "so"];
      const spoken = ["for", "so"];
      const result = alignTokens(ref, spoken);
      expect(result).toContainEqual({ ref: "god", spoken: null, status: "omitted" });
    });

    it("should identify insertions", () => {
      const ref = ["for", "god"];
      const spoken = ["for", "really", "god"];
      const result = alignTokens(ref, spoken);
      expect(result).toContainEqual({ ref: null, spoken: "really", status: "inserted" });
    });

    it("should identify substitutions", () => {
      const ref = ["for", "god"];
      const spoken = ["for", "good"];
      const result = alignTokens(ref, spoken);
      expect(result).toContainEqual({ ref: "god", spoken: "good", status: "substituted" });
    });
  });

  describe("Scoring", () => {
    it("should calculate accuracy correctly", () => {
      const alignment: any[] = [
        { status: "correct" },
        { status: "correct" },
        { status: "omitted" },
      ];
      expect(calculateScore(alignment, 3)).toBe(0.67);
    });
  });
});
