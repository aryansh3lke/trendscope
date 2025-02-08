import Link from "next/link";
import AppLogo from "@/components/AppLogo";
import { ThemeSwitcher } from "@/components/theme-switcher";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center bg-white dark:bg-black border-b border-b-foreground/10 h-16">
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
  );
};

export default Navbar;
