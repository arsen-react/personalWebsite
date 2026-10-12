import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fullName, siteConfig } from "@/config/site";
import { ThemeScript } from "@/features/theme";
import { CursorGlow, ScrollReveal } from "@/shared/effects";
import { fontVariables } from "./fonts";
import { personStructuredData, toJsonScript } from "./structured-data";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/utilities.css";

const title = `${fullName} — ${siteConfig.person.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${fullName}` },
  description: siteConfig.description,
  applicationName: siteConfig.brand,
  authors: [{ name: fullName, url: siteConfig.url }],
  creator: fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: siteConfig.brand,
    title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    firstName: siteConfig.person.firstName,
    lastName: siteConfig.person.lastName,
  },
  twitter: { card: "summary", title, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // ThemeScript sets data-theme on <html> before React hydrates.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonScript(personStructuredData()) }}
        />
        <CursorGlow />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
