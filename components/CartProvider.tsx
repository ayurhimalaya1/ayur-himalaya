"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        useCartStore.persist.rehydrate();
    }, []);

    if (!isMounted) {
        return null;
    }

    return <>{children}</>;
}
