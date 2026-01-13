import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContradictMe - Challenge Your Beliefs",
  description: "An AI that actively seeks and presents the strongest arguments against your own views. Think critically by steel-manning opposing perspectives.",
  keywords: ["AI", "critical thinking", "counterarguments", "debate", "intellectual honesty"],
  authors: [{ name: "ContradictMe" }],
  openGraph: {
    title: "ContradictMe - Challenge Your Beliefs",
    description: "An AI that disagrees with you, backed by research. Fight echo chambers, think critically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
