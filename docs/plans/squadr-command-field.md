# Squadr Command field for T3 Code

Status: M0 fork setup and Windows baseline verification complete. M1 is proposed; no Command field feature is implemented yet.
Baseline: `pingdotgg/t3code` at `efecd3cf8bcec3d1891b5f5a27dc2f6d797c6448` (2026-10-04).
Branch: `experiment/squadr-command-field` in `Stormxftw/t3code`.

## Intent

“I don't want to overpower T3; I want to empower it.”

Add a quiet, optional way to survey work across projects and reach the right thread quickly. T3 remains the application: its navigation, conversation, composer, terminal, provider controls, settings, and design language remain authoritative. Squadr contributes spatial awareness, stable numbered selection, and a fast return to the field.

## Project start gate

- **Problem:** Switching among several active threads makes it difficult to retain an overview of project activity.
- **First user:** A developer already using T3 with several threads.
- **First useful action:** Open Command field, identify a thread, and reach its existing T3 conversation by keyboard or pointer.
- **Demo:** Three real T3 threads in one test project; select the second card, open its thread, use the normal composer/terminal, and return to the same field position.
- **Version 0.1 finish line:** This loop works with accurate identity/status, refresh and disconnect handling, keyboard isolation, and unchanged normal T3 behavior when the feature is disabled.
- **Existing alternative:** An optional view in a T3 fork. The standalone Squadr checkout remains available as a reference and fallback; its database and provider code are not prerequisites.

## Product decisions

1. **Opt in.** Add one client preference, disabled by default, through T3's existing settings path. When enabled, expose one Command field navigation entry. Preserve T3's default landing behavior. Turning it off returns to an ordinary T3 route and removes its handlers/subscriptions.
2. **Use T3's visual language.** Reuse its typography, spacing, surfaces, buttons, status treatment, and existing light/dark themes. A restrained orange selection accent inside the field is a design candidate, not a global theme replacement. Show one bounded visual proposal before implementing the new surface.
3. **One purpose per surface.** The field answers “what is happening, and which thread do I want?” Full conversation, prompting, approvals, stop, diffs, and terminal work stay in their existing T3 surfaces for version 0.1.
4. **Real identity.** Key every card and project by environment plus native T3 identity. Similar titles, identical project paths on different machines, and duplicate thread IDs across environments must remain distinct. Drafts are not running threads.
5. **Stable positions.** Streaming activity updates labels without moving cards or changing visible shortcut assignments. New cards append within their project; a deliberate filter/sort change may recompute positions. Restore selection and scroll after opening a thread.
6. **Bounded data.** Use the existing shell summaries and connection state. Do not subscribe to every thread's full history, add polling, synthesize agent summaries, or animate continuous I/O. Missing or stale information stays visibly missing or stale.
7. **Keep T3 in charge.** The field's initial actions are navigation and local selection. Opening a card must never launch, resume, stop, or take ownership of a provider process.

## Existing extension points

These were inspected at the pinned baseline; recheck them when upgrading upstream.

| Concern                    | Existing code to reuse                                                                                                                        | Proposed boundary                                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation                 | `apps/web/src/routes/_chat.tsx`, `_chat.index.tsx`, `threadRoutes.ts`, `components/ThreadRouteView.tsx`                                       | Add a sibling field route and a small navigation entry. Preserve the layout's draft-to-thread mounting behavior and the current index route. Use `buildThreadRouteParams` to enter the normal thread route. |
| Cards and project grouping | `apps/web/src/state/entities.ts`, `state/environments.ts`, `sidebarProjectGrouping.ts`                                                        | Read `useProjects`, `useThreadShells` and scoped references from the existing state owners. Reuse existing grouping where compatible; do not merge environments by path alone.                              |
| Live status and excerpts   | `packages/contracts/src/orchestrationV2.ts` (`OrchestrationV2ThreadShell`), `packages/client-runtime/src/state/shell.ts`                      | Use existing status, `latestVisibleMessage`, timestamps and connection freshness. Keep bounded excerpts and expose detail through the normal thread route.                                                  |
| Focus and shortcuts        | `apps/web/src/keybindings.ts`, `packages/contracts/src/keybindings.ts`, `lib/terminalFocus.ts`, `lib/editableFocus.ts`, `lib/previewFocus.ts` | Reuse the matcher, hint formatting and focus guards. Existing thread-jump commands already have sidebar semantics; do not silently repoint them to canvas positions.                                        |
| Preferences                | `apps/web/src/hooks/useSettings.ts`, `routes/settings.appearance.tsx`                                                                         | Extend the current client settings model. Do not create another settings store or migrate server data.                                                                                                      |
| UI and accessibility       | `apps/web/src/components/ui`, existing sidebar status/accessibility helpers                                                                   | Use normal DOM sections/cards with keyboard and pointer access. Avoid a graph framework or custom terminal/chat renderer.                                                                                   |

The likely feature home is `apps/web/src/components/command-field/`, with a small pure selector/order helper. Extract only what the implementation needs. No speculative provider abstraction or new server endpoint is planned.

## Ordered milestones

### M0 — establish the experiment (completed 2026-10-04)

Create and verify the fork and branch, preserve upstream ancestry, install the unchanged baseline, record a bounded startup/build check, and publish this plan. Keep test data and logs local and ignored. Do not replace the installed desktop app.

The authoritative setup evidence and verification limits are in [CURRENT_MILESTONE.md](../../CURRENT_MILESTONE.md). Frozen install, scoped web build and isolated server/proxy HTTP checks passed. The test process was stopped and cleanup verified. Provider interaction and visual acceptance have not been tested in this fork.

### M1 — one complete survey-to-thread loop

**Size:** Medium. Proposed next implementation milestone, pending review of this plan and the bounded visual proposal.

1. Confirm the placement and visual treatment of one optional Command field entry using T3's current shell.
2. Add the client preference, optional route, project sections and cards from existing summaries. Include loading, empty, cached/disconnected, deleted-thread and failed-preference states.
3. Support click/Enter and visible `1–9` shortcuts in field focus, opening the exact existing thread. Initially show a bounded set with explicit filtering/overflow; do not expand into control groups to handle large collections.
4. Provide a visible Return to field action only for navigation originating from the field. Restore project filter, order, selection and scroll. Browser Back/Forward and direct thread links continue to work.
5. Finish the keyboard contract and acceptance checks below. Remove hidden-view subscriptions and event listeners on disable/unmount.

**Keyboard contract:** Bare number keys are active only while the field itself owns focus. Composer/editable controls, dialogs, the command palette, model picker, preview, terminal and IME composition own their input. Terminal Escape remains terminal input. A return chord, if added, must use the existing configurable binding system after conflict checks; pointer return is always available. Namespaced field commands can extend T3's binding registry with a default-false `commandFieldFocus` context. Changes to shared command schemas require focused compatibility tests, including older servers; do not add a second persisted shortcut configuration. Keep existing T3 bindings and user overrides intact.

**Finish-line checks:**

- [ ] Disabled feature preserves normal landing, thread navigation, composer and existing shortcut behavior.
- [ ] Three real dedicated test threads render from T3 state; selecting card 2 opens the matching environment/thread IDs without creating another thread or provider process.
- [ ] Status/recent-message changes update the correct card without reordering it or renumbering a focused field.
- [ ] Return restores field context; refresh, Back/Forward, a deleted thread and a disconnected environment remain understandable.
- [ ] Type in composer, terminal, search, dialog and IME without field shortcuts firing; test reserved/remapped bindings as well as defaults.
- [ ] Cached summaries are distinguishable from live state; absent progress or verification is never invented.
- [ ] One scoped selector/order test covers duplicate IDs across environments, incoming updates and deletion/filter behavior. Focused navigation/keybinding tests cover actual regressions.
- [ ] Relevant package typecheck/build and focused tests pass. Inspect web and desktop behavior at desktop and narrow widths; verify reduced motion and keyboard accessibility. Report each surface actually tested.
- [ ] A short real task can be completed through T3's existing thread view and revisited from the field. Record native continuation separately from fixture checks. User accepts the added view's usefulness and visual fit.

Stop at this finish line. Shipping M1 does not require Hermes, external session import, scheduling, a new inspector, or data migration.

### M2 — improve one demonstrated friction point

Choose one follow-up from actual M1 use: more efficient project filtering, a small local watch/pin interaction, or a focused contextual action that opens an existing T3 surface. Reuse T3's existing pins/actions where their semantics match. A `Q/W/E/R` overlay is a candidate, not a requirement to replace existing T3 keys. Preserve the original Squadr meanings in the standalone reference until an explicit mapping is selected.

### Later candidates

Preserve project membership connections, optional activity signals, `C`-prefix navigation, control groups and multi-selection as later ideas. Persistent layouts, attention workflows, broadcast commands, orchestration, Hermes, and migration of standalone Squadr history each require their own demonstrated need and acceptance boundary. No work on these is authorized by this setup milestone.

## Verification and local setup

Use the repository's [development runbook](../operations/development.md) and `AGENTS.md`. Node must satisfy the root package engine; the lockfile pins the package manager. Keep the original lockfile and upstream dependency versions for the baseline.

On this Windows checkout, bootstrap without a global Vite+ install:

```powershell
pnpm.cmd install --frozen-lockfile --store-dir .pnpm-store
pnpm.cmd exec vp --version
```

Then start one isolated loopback development instance (read the actual ports from the log):

```powershell
$env:T3CODE_PORT_OFFSET = '900'
pnpm.cmd exec vp run dev --home-dir .t3/command-field --host 127.0.0.1
```

Do not set `VITE_HTTP_URL` or `VITE_WS_URL`. Never point development at the installed T3 userdata directory. Keep pairing URLs, auth tokens, provider credentials and session content out of committed plans, logs shared publicly, and screenshots. Use dedicated harmless test projects/threads for acceptance; no automatic import of the developer's existing conversations is needed for this fork setup.

For baseline web compilation, the intended scoped command is `pnpm.cmd exec vp run --filter @t3tools/web build`. During implementation, run the affected package typecheck and focused tests, including the existing keybinding/terminal-focus tests when touched. Do not run the repository-wide suite for a documentation/setup change. HTTP startup evidence is separate from interactive browser acceptance. Consult the milestone for commands actually executed and their results.

## Keeping the fork maintainable

- `origin` is the personal fork; `upstream` is `pingdotgg/t3code`. Push experiment work only to the fork. Keep fork `main` as the unmodified upstream baseline.
- Keep additions concentrated in the field feature, one settings entry, one navigation entry and the smallest necessary keyboard integration. Preserve upstream license and third-party notices.
- Before upgrading, fetch upstream and read the changes to navigation, settings, summary contracts and keyboard ownership. Merge a chosen revision on a separate `integration/upstream-<date>` branch from the experiment; run the affected checks and the survey-to-thread loop before promoting it. Do not rewrite a shared branch just to take an upstream update.
- Disabling the client preference is the first rollback. Reverting the feature commits is the code rollback; version 0.1 should require no database rollback or provider-session migration.
- Keep the original Squadr application intact. Reassess which base to continue only after a real task demonstrates that the fork improves the workflow. A created fork or polished mockup alone does not settle that decision.

## Decisions still requiring implementation evidence

The exact navigation placement, return affordance/chord, large-field rendering limit and desktop/narrow layout must be resolved in M1. Existing source suggests the integration is feasible; no claim is made yet about its performance, visual acceptance, provider behavior, or remote compatibility. Native mobile receives no field screen in M1; shared contract changes must still preserve its current behavior.
