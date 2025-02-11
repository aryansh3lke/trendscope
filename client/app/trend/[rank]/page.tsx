"use client";
import { useTrendsData } from "@/context/TrendsContext";
import { TrendsData, Trend } from "@/lib/types";
import { useParams } from "next/navigation";
import VantaGlobe from "@/components/VantaGlobe";
import TrendPanel from "@/components/TrendPanel";
import TweetCarousel from "@/components/TweetCarousel";
import { useEffect, useState } from "react";

export default function TrendPage() {
  const { rank } = useParams<{ rank: string }>();
  const trendsData: TrendsData | null = useTrendsData();
  const [trend, setTrend] = useState<Trend | null>(null);

  useEffect(() => {
    if (trendsData) {
      setTrend(trendsData.data[Number(rank)] ?? null);
    }
  }, [trendsData]);

  return (
    <main className="min-h-screen p-5 max-sm:max-w-lg">
      <VantaGlobe />
      {trendsData ? (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="lg:w-1/2 h-[500px] max-[400px]:max-w-72 max-[480px]:max-w-80 max-sm:max-w-md max-lg:max-w-xl">
            {trend && <TrendPanel trend={trend} />}
          </div>
          <div className="lg:w-1/2 h-[500px] max-[400px]:max-w-72 max-[480px]:max-w-80 max-sm:max-w-md max-lg:max-w-xl">
            {trend && <TweetCarousel tweets={trend.tweets} />}
          </div>
        </div>
      ) : (
        <h1 className="font-medium text-5xl text-center mb-4">Loading...</h1>
      )}
    </main>
  );
}
