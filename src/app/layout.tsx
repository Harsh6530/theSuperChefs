"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../../redux/ReduxProvider";
import { DataStateProvider } from "@/app/context/dataContext";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <title>SuperChefs - Expert Chefs & Gourmet Catering for Every Occasion</title>
        <meta name="description" content="SuperChefs brings expert chefs, customized menus, and a flawless dining experience, turning every meal into a gourmet celebration. Book a chef for your next event!" />
        <link rel="icon" type="image/png" href="/favicon1.png" />
      </head>
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
