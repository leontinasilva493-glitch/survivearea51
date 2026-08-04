import type { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { siteConfig } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Survive Verity in Area 51 Weapons, Map & Gamepass Guide",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: "Survive Verity in Area 51 Weapons, Map & Gamepass Guide",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: siteConfig.images.og, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Survive Verity in Area 51 Field Guide",
    description: siteConfig.description,
    images: [siteConfig.images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to field data
        </a>
        <div className="site-frame">
          <Header />
          {children}
          <Footer />
        </div>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xwvasbalds");`}
        </Script>
      </body>
    </html>
  );
}
