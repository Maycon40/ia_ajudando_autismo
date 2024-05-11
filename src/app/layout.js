import { Inter } from "next/font/google";

import { Providers } from "@/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Autismo",
    description: "Entenda o autismo!",
};

export default function RootLayout({ children }) {
    console.log("providers", Providers)

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
