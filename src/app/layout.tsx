import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LoadingProvider } from "../context/LoadingContext";
import { AuthProvider } from "../context/AuthContext";
import { CurrencyProvider } from "../context/CurrencyContext";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/ui/ToastContainer";
import { themeInitScript } from "../lib/utils/theme-hydration";
import "../lib/utils/devHelpers"; // Dev helper functions

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PlantShop - Transform Your Space with Beautiful Plants",
    description: "Discover our collection of healthy, beautiful plants. Expert care tips, fast delivery, and everything you need to create thriving indoor gardens.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <script
                    dangerouslySetInnerHTML={{
                        __html: themeInitScript,
                    }}
                />
                <LoadingProvider>
                    <AuthProvider>
                        <ThemeProvider>
                            <CurrencyProvider>
                                <ToastProvider>
                                    {children}
                                    <ToastContainer />
                                </ToastProvider>
                            </CurrencyProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </LoadingProvider>
            </body>
        </html>
    );
}
