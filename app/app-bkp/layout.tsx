import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google"; // Import Space Grotesk and Inter from Google Fonts
import './globals.css';
import Head from 'next/head';

// Import Space Grotesk from Google Fonts
const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'], // Choose the weights for Space Grotesk
  subsets: ['latin'],
  variable: '--font-space-grotesk', // Create a CSS variable for Space Grotesk
  display: 'swap',
});

// Import Inter from Google Fonts
const inter = Inter({
  weight: ['400', '500', '600', '700'], // Choose the weights for Inter
  subsets: ['latin'],
  variable: '--font-inter', // Create a CSS variable for Inter
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DuelStakes",
  description: "TAP TO VOTE - WHO WILL BE THE NEXT PRESIDENT?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} // Apply both Space Grotesk and Inter globally
      >
        {children}
      </body>
    </html>
  );
} 