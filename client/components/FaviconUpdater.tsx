"use client";

import { useEffect } from "react";

export default function FaviconUpdater() {
  useEffect(() => {
    const setFavicon = () => {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      let favicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement | null;

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }

      favicon.href = isDarkMode ? "/favicon-dark.ico" : "/favicon-light.ico";
    };

    // Set favicon on initial load
    setFavicon();

    // Listen for system theme changes
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addEventListener("change", setFavicon);

    return () => {
      darkModeMediaQuery.removeEventListener("change", setFavicon);
    };
  }, []);

  return null; // This component doesn't render anything
}
