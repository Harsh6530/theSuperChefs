"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../../redux/ReduxProvider";
import { DataStateProvider } from "@/app/context/dataContext";
import { useEffect } from "react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The SuperChefs | At-Home Fine Dining & Catering",
  description:
    "Redefine at-home dining with The SuperChefs. Hire expert chefs for birthdays, anniversaries, and intimate gatherings. Enjoy luxury fine dining in your own kitchen, tailored to your taste.",
  keywords: [
    "catering",
    "private chef",
    "at-home chef",
    "fine dining",
    "birthday catering",
    "anniversary chef",
    "intimate gathering",
    "luxury dining",
    "The SuperChefs",
    "personal chef service",
  ],
  openGraph: {
    title: "The SuperChefs | At-Home Fine Dining & Catering",
    description:
      "Redefine at-home dining with The SuperChefs. Hire expert chefs for birthdays, anniversaries, and intimate gatherings. Enjoy luxury fine dining in your own kitchen, tailored to your taste.",
    url: "https://thesuperchefs.com",
    siteName: "The SuperChefs",
    images: [
      {
        url: "https://thesuperchefs.com/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "The SuperChefs - At-Home Fine Dining",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The SuperChefs | At-Home Fine Dining & Catering",
    description:
      "Redefine at-home dining with The SuperChefs. Hire expert chefs for birthdays, anniversaries, and intimate gatherings. Enjoy luxury fine dining in your own kitchen, tailored to your taste.",
    images: ["https://thesuperchefs.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <Head>
        <title>SuperChefs - Expert Chefs & Gourmet Catering for Every Occasion</title>
        <meta name="description" content="SuperChefs brings expert chefs, customized menus, and a flawless dining experience, turning every meal into a gourmet celebration. Book a chef for your next event!" />
        <link rel="icon" type="image/png" href="/favicon1.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff8c1a" />
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "The SuperChefs",
              image: "https://thesuperchefs.com/og-image.jpg",
              telephone: "+91-XXXXXXXXXX",
              email: "info@thesuperchefs.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Your City",
                addressCountry: "IN",
              },
              url: "https://thesuperchefs.com",
              description:
                "Redefine at-home dining by bringing the luxury of fine dining into your own kitchen. Expert chefs, tailored cuisines, unforgettable meals.",
              priceRange: "$$",
              servesCuisine: [
                "Indian",
                "Continental",
                "Asian",
                "Custom",
              ],
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#fff' }}>
        <DataStateProvider>
          {" "}
          <ReduxProvider>{children}</ReduxProvider>
        </DataStateProvider>
      </body>
    </html>
  );
}
