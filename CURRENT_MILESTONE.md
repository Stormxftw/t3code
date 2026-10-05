# Current milestone

## M0: T3 fork and Command field implementation plan

**Goal:** Establish a separate, reviewable T3 experiment with a verified baseline and a bounded plan for an optional Squadr Command field.

**User-visible result:** A personal fork and test branch with clear setup instructions, evidence, and one next implementation milestone.

**Authorization:** On 2026-10-04, the user requested a T3 fork, test branch, and smooth implementation plan: “I don't want to overpower T3; I want to empower it.” This milestone sets up and plans the experiment. The new UI is proposed, not implemented.

**Plan:** [Squadr Command field](docs/plans/squadr-command-field.md).

**Repository:** https://github.com/Stormxftw/t3code

**Branch:** `experiment/squadr-command-field`

**Pinned upstream base:** `efecd3cf8bcec3d1891b5f5a27dc2f6d797c6448`

## Completion checklist

- [x] Personal fork verified with `pingdotgg/t3code` as its parent.
- [x] Separate local checkout, upstream remote, and published experiment branch.
- [x] Implementation plan ties the field to existing T3 state, navigation, preferences and focus rules.
- [ ] Frozen dependency install and bounded web build/startup checks complete; limitations recorded.
- [ ] Documentation reviewed, committed on the experiment branch, pushed, and remote parity verified.

## Baseline evidence

The unchanged upstream application source is pinned above. Dependency installation and baseline checks are in progress. No Command field UI, provider integration or standalone Squadr data migration has been implemented.

Interactive browser/desktop acceptance and real provider execution belong to M1; setup and HTTP checks do not complete them. Follow upstream's explicit browser-authorization requirement when scheduling that acceptance.

## Not part of this milestone

- New UI implementation or a global T3 redesign.
- Importing the standalone Squadr server, terminal, database or sessions.
- Hermes integration, additional providers, orchestration, control groups or broadcast commands.
- Desktop packaging, replacement of the installed T3 app, or an upstream pull request.

## Exact next action

Finish M0 verification and publish its evidence. Then review one bounded Command field visual proposal and implement M1's survey-to-thread loop from the plan. Keep ordinary T3 behavior available throughout.
