/** Base path when the interactive app is mounted on the main Vercel deployment. */
export const IX_BASE = "/attractive";

export function ixPath(path: string): string {
  if (!path || path === "/") return IX_BASE;
  if (path.startsWith("/#")) return `${IX_BASE}${path.slice(1)}`;
  if (path.startsWith("#")) return `${IX_BASE}/${path}`;
  return `${IX_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}