import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import FaviconUpdater from "@/components/FaviconUpdater";
import AppLogo from "@/components/AppLogo";
import VantaBackground from "@/components/VantaBackground";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-5 lg:gap-15 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link
                      className="flex flex-row items-center gap-2 text-3xl"
                      href={"/"}
                    >
                      <AppLogo />
                      <p>TrendScope</p>
                    </Link>
                  </div>
                  <ThemeSwitcher />
                </div>
              </nav>

              <div className="flex flex-col">
                <VantaBackground />
                <div className="flex flex-col gap-20 max-w-5xl p-5">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
