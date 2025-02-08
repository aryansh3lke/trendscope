import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import FaviconUpdater from "@/components/FaviconUpdater";
import Navbar from "@/components/Navbar";
import VantaBackground from "@/components/VantaBackground";

import { getTrendsData } from "@/lib/data";
import { TrendsProvider } from "@/context/TrendsContext";
import { TrendsData } from "@/lib/types";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TrendScope",
  description: "Gain insight into the latest trends on X",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const trendsData: TrendsData = (await getTrendsData())["trends_data"]; // Cached & updated every couple of hours

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <FaviconUpdater />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TrendsProvider trendsData={trendsData}>
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col gap-5 lg:gap-15 items-center">
                <Navbar />
                <div className="flex flex-col">
                  <VantaBackground />
                  <div className="flex flex-col gap-20 max-w-5xl p-5">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </TrendsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
