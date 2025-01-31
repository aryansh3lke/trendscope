"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AppLogo() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch (avoid SSR issues)
  if (!mounted)
    return (
      <Image
        src="/trendscope-light.png"
        alt="TrendScope Logo"
        width={48}
        height={48}
      />
    );

  // Determine the correct theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc =
    currentTheme === "dark" ? "/trendscope-dark.png" : "/trendscope-light.png";

  return <Image src={logoSrc} alt="TrendScope Logo" width={48} height={48} />;
}
