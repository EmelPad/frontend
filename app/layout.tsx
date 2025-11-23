import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Roboto_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["300", "400", "700"]
});

const roboto = Roboto_Mono({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "700"]
});


export const metadata: Metadata = {
  title: "emelpad",
  description: "launch nft collections in seconds",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${roboto.variable} antialiased`}
      >
        <div className="relative bg-black text-white">
            <Providers>
                <Header />
                <div className="min-h-screen max-w-6xl mx-auto space-y-8 px-5 py-14 lg:px-10">
                    {children}
                </div>
                <Footer />
                <Toaster />
            </Providers>
        </div>
      </body>
    </html>
  );
}
