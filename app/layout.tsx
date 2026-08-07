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
  title: "Evoq: Enterprise Execution Platform",
  description:
    "AI is changing how enterprises operate. Evoq makes enterprise knowledge executable, turning intent and context into governed action across build, modernise, and operate.",
  openGraph: {
    title: "Evoq: Enterprise Execution Platform",
    description:
      "AI is changing how enterprises operate. Evoq makes enterprise knowledge executable so work gets done.",
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
