"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <Sun key="light" size={ICON_SIZE} className={"text-muted-foreground"} />
      ) : theme === "dark" ? (
        <Moon key="dark" size={ICON_SIZE} className={"text-muted-foreground"} />
      ) : (
        <Laptop
          key="system"
          size={ICON_SIZE}
          className={"text-muted-foreground"}
        />
      )}
    </Button>
  );
};

export { ThemeSwitcher };
