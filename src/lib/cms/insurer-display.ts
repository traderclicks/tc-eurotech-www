import type { Insurer } from './insurers';

/**
 * The single source of truth for WHICH insurers are shown to users, and in what
 * order. Both surfaces — the /insurance logo grid and the Insurance Contacts
 * popup — render exactly this set, so the two can never drift apart.
 *
 * An insurer is shown when it has a contact phone number. Logo-only entries
 * (no phone) are excluded, because the popup needs a number to be useful and
 * the grid must match the popup.
 *
 * Pure (no fs) so it is safe to import into client components — unlike
 * insurers.ts, which reads the JSON at request time on the server.
 */
export function displayInsurers(insurers: Insurer[]): Insurer[] {
  return insurers.filter((i) => i.phone);
}
