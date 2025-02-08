"use client";

import { createContext, useContext } from "react";
import { TrendsData } from "@/lib/types";

const TrendsContext = createContext<TrendsData | null>(null);

export function TrendsProvider({
  trendsData,
  children,
}: {
  trendsData: TrendsData | null;
  children: React.ReactNode;
}) {
  return (
    <TrendsContext.Provider value={trendsData}>
      {children}
    </TrendsContext.Provider>
  );
}

export function useTrendsData() {
  return useContext(TrendsContext);
}
