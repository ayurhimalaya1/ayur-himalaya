"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { ReactNode, useState } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    const [convex] = useState(() => {
        if (!convexUrl) {
            console.error("NEXT_PUBLIC_CONVEX_URL is not set");
            return null;
        }
        return new ConvexReactClient(convexUrl);
    });

    // If we're on the server (prerendering), we might not have the URL.
    // We return children without the provider so the build can finish.
    if (!convex) {
        return <>{children}</>;
    }

    return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
