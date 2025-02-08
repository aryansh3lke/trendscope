"use client";
import TrendCard from "@/components/TrendCard";
import { TrendsData } from "@/lib/types";
import { formatTimestamp } from "@/lib/utils";
import { useTrendsData } from "@/context/TrendsContext";

const Trends = () => {
  const trendsData: TrendsData | null = useTrendsData();

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="font-medium text-5xl text-center mb-4">
        The Latest Trends on X
      </h1>
      <h2 className="font-medium text-lg text-center mb-4">
        {trendsData &&
          "Trends last sniped on " + formatTimestamp(trendsData.timestamp)}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendsData &&
          Object.keys(trendsData.data).map((rank) => (
            <TrendCard key={rank} trend={trendsData.data[rank]} />
          ))}
      </div>
    </div>
  );
};

export default Trends;
