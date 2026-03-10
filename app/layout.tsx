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
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#1B3022" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Ayur Himalaya" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
            </head>
            <body className="font-sans bg-ayur-bg text-ayur-charcoal">
                <ConvexClientProvider>
                    <CartProvider>
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                    </CartProvider>
                </ConvexClientProvider>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js');
                                });
                            }
                        `,
                    }}
                />
            </body>
        </html>
    );
}
