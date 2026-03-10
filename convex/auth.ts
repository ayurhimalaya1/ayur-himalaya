import { Phone } from "@convex-dev/auth/providers/Phone";
import { convexAuth } from "@convex-dev/auth/server";

const { auth: authInternal, signIn: signInInternal, signOut: signOutInternal, store: storeInternal } = convexAuth({
    providers: [
        Phone({
            id: "fast2sms",
            async generateVerificationToken() {
                return Math.floor(100000 + Math.random() * 900000).toString();
            },
            async sendVerificationRequest({ identifier: phone, token }) {
                console.log(`[AUTH] Sending OTP ${token} to ${phone}`);
                const apiKey = process.env.FAST2SMS_API_KEY;
                if (!apiKey) {
                    throw new Error("FAST2SMS_API_KEY is not set");
                }

                try {
                    const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
                        method: "POST",
                        headers: {
                            "authorization": apiKey,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            route: "otp",
                            variables_values: token,
                            numbers: phone,
                        }),
                    });

                    if (!response.ok) {
                        const error = await response.text();
                        console.error(`[AUTH] Fast2SMS failed: ${error}`);
                    }
                } catch (err) {
                    console.error(`[AUTH] Network error sending SMS: ${err}`);
                }
            },
        }),
    ],
});

export const auth = authInternal;
export const signIn = signInInternal;
export const signOut = signOutInternal;
export const store = storeInternal;
