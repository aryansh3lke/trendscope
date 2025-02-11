"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import TweetSkeleton from "@/components/TweetSkeleton";

declare global {
  interface Window {
    twttr?: any;
  }
}

const TweetEmbed = ({
  tweetUrl,
  index,
  setLoadedIndexes,
}: {
  tweetUrl: string;
  index: number;
  setLoadedIndexes: React.Dispatch<React.SetStateAction<Set<number>>>;
}) => {
  const { theme } = useTheme();
  const tweetContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(false);
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => embedTweet();
      document.body.appendChild(script);
    } else {
      embedTweet();
    }

    function embedTweet() {
      if (tweetContainerRef.current && window.twttr) {
        const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1];
        if (!tweetId) return;

        tweetContainerRef.current.innerHTML = "";

        window.twttr.widgets
          .createTweet(tweetId, tweetContainerRef.current, {
            theme: theme === "dark" ? "dark" : "light",
            align: "center",
          })
          .then(() => {
            removeMargins();
            setIsMounted(true);
            setLoadedIndexes((prev) =>
              new Set(prev).add(index + 1).add(index - 1)
            );
          });
      }
    }

    function removeMargins() {
      setTimeout(() => {
        const iframes = tweetContainerRef.current?.querySelectorAll("iframe");
        iframes?.forEach((iframe) => {
          const parentDiv = iframe.parentElement as HTMLElement | null;
          if (parentDiv) {
            parentDiv.style.margin = "0px";
            parentDiv.style.padding = "0px";
          }
          const iframeElement = iframe as HTMLElement;
          iframeElement.style.margin = "0px";
          iframeElement.style.padding = "0px";
        });
      });
    }
  }, [tweetUrl, theme]);

  return (
    <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
      {!isMounted && (
        <div className="absolute inset-0 flex justify-center items-center w-full h-full">
          <TweetSkeleton />
        </div>
      )}

      <div className="w-full h-full overflow-y-auto min-h-full">
        <div ref={tweetContainerRef} className="w-full"></div>
      </div>
    </div>
  );
};

export default TweetEmbed;
