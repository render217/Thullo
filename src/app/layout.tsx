import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryProvider from "@/providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thullo",
  description: "Trello clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontSize: "12px",
              },
            }}
            reverseOrder={false}
          />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* <Analytics /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
