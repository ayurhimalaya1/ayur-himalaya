"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <CartDrawer />
            <LeadPopup />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
