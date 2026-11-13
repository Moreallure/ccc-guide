import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "katex/dist/katex.min.css";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const BASE_URL = "https://www.cccguide.net";

// Site-wide entity markup so search and AI engines can anchor the brand.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CCC Guide",
      url: BASE_URL,
      logo: `${BASE_URL}/android-chrome-512x512.png`,
      sameAs: ["https://github.com/Moreallure/ccc-guide"],
    },
    {
      "@type": "WebSite",
      name: "CCC Guide",
      alternateName: "Canadian Computing Competition Guide",
      url: BASE_URL,
      inLanguage: "en",
    },
  ],
};

export const metadata = {
  metadataBase: new URL("https://www.cccguide.net"),
  title: {
    default:
      "CCC Guide - Canadian Computing Competition Tutorials & Solutions",
    template: "%s - CCC Guide",
  },
  description:
    "An open-source guide for the Canadian Computing Competition: lessons, worked CCC solutions, and a full problem archive from 2012 to 2026.",
  openGraph: {
    type: "website",
    siteName: "CCC Guide",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
