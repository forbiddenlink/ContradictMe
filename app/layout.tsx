import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
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
    <html lang="en" className={`${plusJakarta.variable} ${firaCode.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
