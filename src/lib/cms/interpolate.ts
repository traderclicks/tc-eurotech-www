/**
 * Client-safe token substitution helper.
 * Replaces {key} placeholders in a string with values from a vars map.
 * Unknown tokens are left untouched so they surface in QA rather than vanish.
 */
export function interpolate(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    return v === undefined ? `{${key}}` : String(v);
  });
}
