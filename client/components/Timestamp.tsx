"use client";
import { useEffect, useState } from "react";

const Timestamp = () => {
  const [clientTimestamp, setClientTimestamp] = useState<string | null>(null);
  const [serverTimestamp, setServerTimestamp] = useState<string | null>(null);

  useEffect(() => {
    setClientTimestamp(new Date().getTime());
    const fetchTimestamp = async () => {
      fetch("http://localhost:8000/api/fetch-timestamp")
        .then((res) => res.json())
        .then((data) => setServerTimestamp(data.server_timestamp));
    };
    // Fetch immediately, then every 5 seconds
    fetchTimestamp();
    const interval = setInterval(fetchTimestamp, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  });
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      <h2 className="font-medium text-xl mb-4">
        Client Timestamp: {clientTimestamp && clientTimestamp}
      </h2>
      <h2 className="font-medium text-xl mb-4">
        Server Timestamp: {serverTimestamp && serverTimestamp}
      </h2>
    </div>
  );
};

export default Timestamp;
