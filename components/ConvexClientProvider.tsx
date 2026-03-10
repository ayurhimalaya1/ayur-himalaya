"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useState } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    const [convex] = useState(() => {
        if (!convexUrl) return null;
        return new ConvexReactClient(convexUrl);
    });

    if (!convex) {
        return <>{children}</>;
    }

    return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
