# Standalone Voice‑to‑Text Reference Checker

## 1. Intent

Build a reusable module that allows a user to **recite a target
reference text aloud** and receive structured feedback showing how
closely their spoken words match the reference text.

The module must: - capture microphone audio - transcribe speech -
compare spoken words to a reference text - visually highlight matches
and errors - remain modular so it can later plug into the Passage app or
other applications

This module is built **standalone first** to validate speech, UI, and
comparison logic independently.

------------------------------------------------------------------------

## 2. Product Goal

The goal is **not generic speech transcription**.

The goal is:

> Help a user practice reciting a reference text and receive clear
> feedback about correctness.

Primary use cases include: - scripture memorisation - recitation
training - language learning - scripted practice

------------------------------------------------------------------------

## 3. Definition of Done

The module is complete when:

-   A user can input or load reference text
-   A user can start and stop recording speech
-   Spoken words are transcribed
-   Transcribed words are compared with the reference text
-   The UI highlights:
    -   correct words
    -   omitted words
    -   inserted words
    -   substituted words
-   The session can be reset
-   Architecture supports swapping speech providers
-   Code is modular and typed

------------------------------------------------------------------------

## 4. In Scope (MVP)

Included features:

-   reference text input
-   microphone recording
-   speech transcription
-   text normalization
-   token-based comparison
-   visual highlighting
-   completion percentage
-   retry/reset controls

------------------------------------------------------------------------

## 5. Out of Scope

Not included in MVP:

-   user accounts
-   authentication
-   database storage
-   Passage integration
-   group features
-   pronunciation scoring
-   phoneme analysis
-   analytics dashboards

------------------------------------------------------------------------

## 6. Design Principles

The module must follow these principles:

-   **Modular architecture**
-   **Speech provider abstraction**
-   **Clear separation of concerns**
-   **Token‑level comparison logic**
-   **Mobile‑first UI**
-   **Testable pure functions for core logic**

Correct comparison is more important than visual complexity.

------------------------------------------------------------------------

## 7. User Flow

Primary flow:

1.  User enters or loads reference text
2.  User taps Start
3.  App records microphone input
4.  Speech is transcribed
5.  Transcript is compared with reference text
6.  UI highlights match states
7.  User stops recording
8.  Result summary is shown
9.  User can retry

Failure flows include: - microphone permission denied - empty audio
input - transcription unavailable

------------------------------------------------------------------------

## 8. UI Layout

Three stacked zones:

### Reference Text

Displays target passage with highlighting states.

### Transcript Panel

Displays spoken transcript.

### Controls

Contains: - start button - stop button - reset button - progress
indicator

UI must be **mobile friendly** for iPhone Safari.

------------------------------------------------------------------------

## 9. Functional Requirements

### Text Normalization

Reference and transcript must be normalized before comparison.

Normalization rules:

-   lowercase
-   remove punctuation
-   collapse whitespace

### Token Comparison

Tokens are compared word‑by‑word.

Statuses:

-   correct
-   omitted
-   inserted
-   substituted

### Score Calculation

Score = matched_tokens / reference_tokens

------------------------------------------------------------------------

## 10. Technical Architecture

System modules:

UI Layer Handles rendering and interaction.

Speech Layer Handles microphone capture and transcription provider.

Core Logic - normalize - tokenize - align - score

Session State Tracks recording session state.

------------------------------------------------------------------------

## 11. File Structure

Expected project structure:

src/

components/ voiceChecker/

core/ normalize/ tokenize/ align/ score/

services/ speech/

types/

hooks/

------------------------------------------------------------------------

## 12. Data Contracts

Alignment result example:

``` json
{
  "referenceTokens": ["for","god","so","loved","the","world"],
  "spokenTokens": ["for","god","loved","the","world"],
  "alignment": [
    {"ref":"for","spoken":"for","status":"correct"},
    {"ref":"god","spoken":"god","status":"correct"},
    {"ref":"so","spoken":null,"status":"omitted"},
    {"ref":"loved","spoken":"loved","status":"correct"}
  ],
  "score":0.83
}
```

------------------------------------------------------------------------

## 13. Error Handling

The system must handle:

-   microphone permission denied
-   no speech detected
-   partial transcripts
-   repeated tokens
-   punctuation mismatch

------------------------------------------------------------------------

## 14. Performance Expectations

-   UI must remain responsive
-   comparison must not block rendering
-   transcript updates should feel near‑real‑time

------------------------------------------------------------------------

## 15. Implementation Warnings

Do not:

-   embed logic inside React UI components
-   tightly couple UI to Whisper or any provider
-   compare raw strings without normalization
-   create a monolithic component
-   use `any` in core logic

------------------------------------------------------------------------

## 16. Build Order

Recommended implementation sequence:

1.  UI scaffold
2.  Mock transcript comparison
3.  Speech provider interface
4.  Real transcription integration
5.  Alignment engine
6.  Scoring logic
7.  Testing and cleanup

------------------------------------------------------------------------

## 17. Testing Requirements

Tests required for:

-   normalization
-   token alignment
-   score calculation
-   session state

------------------------------------------------------------------------

## 18. Acceptance Criteria

The module passes when:

-   speech can be recorded
-   speech is transcribed
-   comparison output is generated
-   UI correctly highlights match states
-   session reset works
-   architecture remains modular

------------------------------------------------------------------------

## 19. Deployment Strategy

After the UI scaffold is complete:

1.  Push repository to GitHub
2.  Deploy project to Vercel
3.  Test module in **iPhone Safari**

The Vercel deployment acts as a **mobile validation harness** to test:

-   layout
-   microphone permissions
-   interaction flow
-   transcript readability

------------------------------------------------------------------------

## 20. Future Extensions

Possible future improvements:

-   Passage integration
-   strict vs grace comparison modes
-   spaced repetition integration
-   pronunciation feedback
-   session history
