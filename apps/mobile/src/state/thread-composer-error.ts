import { Atom } from "effect/unstable/reactivity";

import { appAtomRegistry } from "./atom-registry";

/**
 * Why a thread's last message did not go out, shown above that thread's
 * composer. The outbox drain can reject a message after the user has left the
 * thread, so the reason is kept per thread until they dismiss it or send again.
 * Keyed by `scopedThreadKey`.
 */
export const threadComposerErrorAtom = Atom.family((threadKey: string) =>
  Atom.make<string | null>(null).pipe(
    Atom.keepAlive,
    Atom.withLabel(`mobile:thread-composer-error:${threadKey}`),
  ),
);

export function setThreadComposerError(threadKey: string, message: string | null): void {
  appAtomRegistry.set(threadComposerErrorAtom(threadKey), message);
}
