import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { Kanit } from "next/font/google"; // Import the Kanit font
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { ReduxProvider } from "@/redux/provider/provider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/redux/provider/AuthProvider";
import SocketContextProvider from "@/redux/provider/SocketProvider";

// Configure the Kanit font
const fontKanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "700"], // Choose weights you need
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontKanit.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> */}
            <main className="container mx-auto flex-grow flex justify-center items-center h-[100vh]">
              <ReduxProvider>
                <AuthProvider>
                  <SocketContextProvider>{children}</SocketContextProvider>
                </AuthProvider>
              </ReduxProvider>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
