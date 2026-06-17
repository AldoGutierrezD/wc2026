import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sheet, Trophy, Crown, Flag } from "lucide-react";
import Link from "next/link";
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
            <body className="min-h-full flex flex-col bg-red-300">
                <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                    <div className="flex flex-1 w-full max-w-3xl flex-col items-center py-20 px-16 sm:items-start">
                        <nav className="mb-8 flex gap-2">
                            <Link href="/" className="bg-black text-amber-300 font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Trophy size={20} />
                                <span>WC 2026</span>
                            </Link>
                            <Link href="/team/Mexico" className="bg-lime-300 text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Flag size={20} />
                                <span>MÉXICO</span>
                            </Link>
                            <Link href="/team/Argentina" className="bg-cyan-300 text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Flag size={20} />
                                <span>ARGENTINA</span>
                            </Link>
                            {/* <Link href="/" className="bg-[#ea1f6e] text-white font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Sheet size={20} />
                                <span>GRUPOS</span>
                            </Link> */}
                            <Link href="/standings" className="bg-[#eeff41] text-black font-wc2026 text-xl py-2 px-6 rounded-md flex justify-center items-center gap-2">
                                <Crown size={20} />
                                <span>RANKING</span>
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
