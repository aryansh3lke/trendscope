import { NEXT_PUBLIC_BACKEND_PROXY } from "@/lib/proxy";

export async function getTrendsData() {
  console.log(NEXT_PUBLIC_BACKEND_PROXY);
  const response = await fetch(NEXT_PUBLIC_BACKEND_PROXY + "/api/fetch-data", {
    next: { revalidate: 1800 }, // Refresh data every 30 minutes
  });

  if (!response.ok) throw new Error("Failed to fetch trends");

  return response.json();
}
