"use client";
import React, { useState, useEffect } from "react";
import { TrendsData } from "@/lib/types";
import { BACKEND_PROXY } from "@/lib/proxy";
import TrendCard from "@/components/TrendCard";

const Trends = () => {
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);

  useEffect(() => {
    fetch(BACKEND_PROXY + "/api/fetch-data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrendsData(data["trends_data"]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="font-medium text-5xl mb-4">Trends</h1>
      <h2 className="font-medium text-xl mb-4">
        Data last fetched at: {trendsData && trendsData.timestamp}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {trendsData &&
          Object.keys(trendsData.data).map((rank) => (
            <TrendCard key={rank} trend={trendsData.data[rank]} />
          ))}
      </div>
    </div>
  );
};

export default Trends;
