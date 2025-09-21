import '../globals.css';

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

export const metadata = {
  title: "CampusConnect",
  description: "A Next.js project for college students to connect and share resources.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ 
    children }: { 
        children: React.ReactNode;
    }) {
    return (
    <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className} bg-dark-1`}>
             {children}
            </body>
        </html>
        </ClerkProvider>
    )};