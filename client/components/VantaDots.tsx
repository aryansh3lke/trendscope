"use client"; // Ensures the component is only rendered client-side

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const VantaDots = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadVanta = async () => {
        // Dynamically import THREE and VantaDots only on the client-side
        const THREE = await import("three");
        (window as any).THREE = THREE; // Ensure Vanta.js finds THREE globally

        const DOTS = (await import("vanta/src/vanta.dots")).default;

        // Initialize Vanta.js effect if it's not already initialized
        if (vantaRef.current && !vantaEffect) {
          const effect = DOTS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: activeTheme === "dark" ? "cyan" : "blue", // Initial dot color based on theme
            showLines: false,
            backgroundColor: activeTheme === "dark" ? "black" : "white", // Initial background color based on theme
          });

          setVantaEffect(effect); // Store the effect reference
        }
      };

      loadVanta();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Cleanup the Vanta effect on unmount
    };
  }, [vantaEffect, activeTheme]); // Re-run when theme or vantaEffect changes

  // Reset the vantaEffect whenever the theme changes
  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null); // Reset effect to reinitialize
    }
  }, [activeTheme]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ minHeight: "100vh" }} // Ensure full height coverage
    ></div>
  );
};

export default VantaDots; // No dynamic loading
