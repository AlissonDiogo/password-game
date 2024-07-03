import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { GameContextProvider } from "./context/gameContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  subsets: ['latin-ext'],
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: "Password Game",
  description: "A simple implementation that mirrors the password game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <GameContextProvider>{children}</GameContextProvider>
      </body>
    </html>
  );
}
