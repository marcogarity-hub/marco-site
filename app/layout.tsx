import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/standard.css";
import "./globals.css";
import { getContent } from "@/lib/content";

const { profile } = getContent();

export const metadata: Metadata = {
  title: profile.name,
  description: profile.headline,
  openGraph: { title: profile.name, description: profile.headline, type: "profile" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1b33" },
  ],
};

// Runs before paint so the page never flashes the wrong theme.
const themeScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
