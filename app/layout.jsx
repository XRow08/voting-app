import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

import Header from "@components/Header";


// Import Space Grotesk from Google Fonts
const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'], // Choose the weights for Space Grotesk
  subsets: ['latin'],
  variable: '--font-space-grotesk', // Create a CSS variable for Space Grotesk
  display: 'swap',
});

// Import Inter from Google Fonts
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata = {
  title: "DuelStakes",
  description: "TAP TO VOTE - WHO WILL BE THE NEXT PRESIDENT?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} // Apply both Space Grotesk and Inter globally
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
