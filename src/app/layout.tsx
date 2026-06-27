import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rescue Church | Staten Island, NY & Wake Forest, NC",
    template: "%s | Rescue Church",
  },
  description:
    "Rescue Church is a Bible-believing, Holy Spirit-filled, bilingual church family in Staten Island, NY and Wake Forest, NC. Plan your visit today.",
  metadataBase: new URL("https://rescuechurchny.net"),
  openGraph: {
    title: "Rescue Church",
    description:
      "A warm and friendly church family in Staten Island, NY and Wake Forest, NC.",
    url: "https://rescuechurchny.net",
    siteName: "Rescue Church",
    images: ["/brand/logo-horizontal.png"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentional: App Router layout, this rule predates the app dir */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Jost:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
