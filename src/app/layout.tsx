import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { Providers } from "./providers";
import "./globals.css";

// Loaded as variable fonts (no `weight` option), which the design depends on:
// the nameplate sits at 200 and body text at 600, and a static cut would mean
// shipping two extra files to get the ends of that range.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${site.tagline}. ${site.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    title: `${site.name} — Portfolio`,
    description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description,
  },
};

/**
 * Applies the saved MONOSPACED preference before first paint.
 *
 * next-themes does this for `dark` itself; the mono class has no such library
 * behind it, so it needs its own blocking script. Without it the page paints
 * in the sans face and visibly reflows to mono on hydration.
 *
 * Kept to one line and wrapped in try/catch: localStorage throws in Safari
 * private mode, and an uncaught throw here would block the rest of the head.
 */
const MONO_INIT = `try{if(localStorage.getItem('mono')==='1')document.documentElement.classList.add('mono')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required: next-themes writes the theme class
    // on <html> before React hydrates, which would otherwise mismatch. The
    // MONO_INIT script below writes to the same element for the same reason.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MONO_INIT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
