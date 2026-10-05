# Current milestone

## M0 complete: T3 fork and Command field implementation plan

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
- [x] Frozen dependency install and bounded web build/startup checks complete; limitations recorded.
- [x] Documentation reviewed, committed on the experiment branch, pushed, and remote parity verified.

## Baseline evidence

Verified on Windows x64 on 2026-10-04, using Node 24.19.0, the repository-pinned pnpm 11.10.0 and local Vite+ 1.0.0.

| Check                        | Result                                                                                                                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fork identity and ancestry   | GitHub reports `Stormxftw/t3code` as a fork of `pingdotgg/t3code`. Fork `main` retains the pinned upstream base.                                                                                                      |
| Dependency installation      | `pnpm.cmd install --frozen-lockfile --store-dir .pnpm-store` passed; 1,914 packages linked. Native node-pty prebuild/install completed. First installation took 15m 43.5s. No manifest or lockfile changes.           |
| Local tooling                | `pnpm.cmd exec vp --version` reports Vite+ 1.0.0. No global Vite+ install was needed.                                                                                                                                 |
| Web production build         | `pnpm.cmd exec vp run --filter @t3tools/web build` passed in 1m 48s; 8,301 modules transformed and `apps/web/dist/index.html` produced. Upstream chunk-size and plugin-timing advisories remain.                      |
| Isolated development startup | The documented dev command started with offset 900, an explicit `.t3/command-field` home and loopback binding. Observed backend 14673 and web 6633. A separate `userdata/statev2.sqlite` was created under that home. |
| HTTP/proxy smoke             | Web index, direct backend `/.well-known/t3/environment`, and the same endpoint through the web proxy all returned HTTP 200. Both descriptors reported the same environment identity and server version 0.0.45.        |
| Cleanup                      | Stopped the captured test launcher and its process tree; all recorded child identities and both test listeners were confirmed absent. The installed T3 listener remained running.                                     |
| Source preservation          | Application source, scripts, dependency manifests and lockfile still match the pinned upstream base. Only the three reviewed planning/instruction documents differ.                                                   |
| Publication                  | Initial plan commit `f04390357` was pushed and independently matched against the remote branch. The final baseline evidence is published on the same branch.                                                          |

Local startup logs, the process ledger and machine-readable checks are under ignored `.t3/baseline-evidence/`. Startup logs can contain pairing credentials and must stay local. The verification server is stopped; run the command in the plan to start a fresh isolated instance.

No Command field UI, provider integration or standalone Squadr data migration has been implemented. No application code was changed, so no repository-wide test/typecheck run was performed. Desktop packaging and native mobile were not exercised.

Interactive browser/desktop acceptance and real provider execution belong to M1; setup and HTTP checks do not complete them. Follow upstream's explicit browser-authorization requirement when scheduling that acceptance.

## Not part of this milestone

- New UI implementation or a global T3 redesign.
- Importing the standalone Squadr server, terminal, database or sessions.
- Hermes integration, additional providers, orchestration, control groups or broadcast commands.
- Desktop packaging, replacement of the installed T3 app, or an upstream pull request.

## Exact next action

Review one bounded Command field visual proposal, then implement M1's survey-to-thread loop from the plan. M1 remains proposed and unstarted. Keep ordinary T3 behavior available throughout.
