import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConditionalSiteFooter } from "@/components/layout/ConditionalSiteFooter";
import { LeadModalProvider } from "@/components/rooms/LeadModalProvider";
import { ModalSlot } from "@/components/rooms/ModalSlot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EVOQ: From AI pilots to coordinated execution",
  description:
    "EVOQ helps enterprises move from isolated AI pilots to coordinated execution that runs, learns, and improves, across Create, Transform, and Operate.",
  openGraph: {
    title: "EVOQ: Experience Center",
    description:
      "From AI pilots to coordinated execution. An experience center for enterprise leaders and investors.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LeadModalProvider>
          {children}
          <ModalSlot>{modal}</ModalSlot>
          <ConditionalSiteFooter />
        </LeadModalProvider>
        {/* analytics: attach provider here when account exists */}
      </body>
    </html>
  );
}
