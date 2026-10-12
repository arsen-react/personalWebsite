/** Props for links that leave the site: new tab, and no access to window.opener. */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function mailHref(email: string): string {
  return `mailto:${email}`;
}

/** "+374 44 18 11 61" -> "tel:+37444181161" */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
