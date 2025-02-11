"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <Button
      variant="ghost"
      size={"sm"}
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
    >
      {activeTheme === "light" ? (
        <Sun key="light" size={ICON_SIZE} className={"text-muted-foreground"} />
      ) : (
        <Moon key="dark" size={ICON_SIZE} className={"text-muted-foreground"} />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
