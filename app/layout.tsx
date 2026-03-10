import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import ClientLayout from "@/components/ClientLayout";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Ayur Himalaya | Pure Altitude Awakening",
    description: "Ayurvedic formulations born in the pure high-altitude air of the Himalayas.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans bg-ayur-bg text-ayur-charcoal">
                <ConvexClientProvider>
                    <CartProvider>
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                    </CartProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
