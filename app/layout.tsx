import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sheet, Trophy, Crown } from "lucide-react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WC2026",
    description: "Schedule WC2026",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <div className="relative flex flex-col flex-1 items-center justify-center font-sans">
                    <div
                        className="absolute inset-0 -z-10 opacity-90"
                        style={{ backgroundImage: `url(/bg-main.jpg)`, backgroundSize: 'cover' }}
                    />
                    <div className="flex flex-1 w-full max-w-3xl flex-col items-center py-20 px-4 md:px-16 sm:items-start">
                        <nav className="w-full mb-8 flex flex-wrap gap-2">
                            <Link href="/" className="bg-black text-amber-300 font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Trophy size={20} />
                                <span>WC 2026</span>
                            </Link>
                            <Link href="/team/Mexico" className="bg-lime-300 text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Image src="https://crests.football-data.org/769.svg" width={25} height={0} alt="Bandera de México" />
                                <span>MÉXICO</span>
                            </Link>
                            <Link href="/team/Argentina" className="bg-cyan-300 text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Image src="https://crests.football-data.org/762.svg" width={25} height={0} alt="Bandera de México" />
                                <span>ARGENTINA</span>
                            </Link>
                            <Link href="/groups" className="bg-[#ea1f6e] text-white font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Sheet size={20} />
                                <span>GRUPOS</span>
                            </Link>
                            <Link href="/standings" className="bg-[#eeff41] text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Crown size={20} />
                                <span>RANKING</span>
                            </Link>
                            <Link href="/champion" className="bg-[#7119ed] text-white font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Trophy size={20} />
                                <span>CAMPEÓN</span>
                            </Link>
                        </nav>
                        <main className="w-full">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
