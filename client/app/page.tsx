import Trends from "@/components/Trends";
import VantaDots from "@/components/VantaDots";

export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <VantaDots />
      <Trends />
    </main>
  );
}
