import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Poopydex",
    description: "Thanks PokeAPI for helping to create this Poopydex.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <header className="h-12 border-b flex flex-row items-center px-3 gap-4 sticky top-0 bg-background/75 backdrop-blur-lg">
                    <strong className="text-xl">Poopydex</strong>
                    <nav>
                        <ul className="flex flex-row gap-2">
                            <li>
                                <Link href="/pkmn" className="underline">
                                    Pkmn List
                                </Link>
                            </li>
                            <li>
                                <Link href="/type" className="underline">
                                    Type List
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
