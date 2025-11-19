import type { Metadata } from "next";
import {
  Shippori_Mincho,
  Zen_Maru_Gothic,
} from "next/font/google";
import "./globals.css";
import { MusicProvider } from "./components/MusicProvider";

const poetic = Shippori_Mincho({
  variable: "--font-poetic",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const rounded = Zen_Maru_Gothic({
  variable: "--font-rounded",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momiji no Toki | Aki no okurimono",
  description:
    "Mobile-first Japanese fall birthday mini-game filled with calm romaji poetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poetic.variable} ${rounded.variable} font-rounded bg-aki-night text-aki-ink antialiased selection:bg-aki-maple/30`}
      >
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
