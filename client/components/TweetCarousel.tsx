import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import TweetEmbed from "@/components/TweetEmbed";
import TweetSkeleton from "@/components/TweetSkeleton";
import { Tweet } from "@/lib/types";

const TweetCarousel = ({ tweets }: { tweets: Tweet[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(1);
  // Used to load current embed in carousel
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex + 1);
    });
  }, [api]);

  return (
    <Card className="h-full">
      <Carousel setApi={setApi} className="flex flex-col gap-5 p-4">
        <div className="flex flex-row justify-center items-center gap-6">
          <CarouselPrevious className="relative" />
          <p>
            Tweet {current} of {tweets.length}
          </p>
          <CarouselNext className="relative" />
        </div>

        <CarouselContent>
          {tweets.map((tweet, index) => (
            <CarouselItem
              key={index}
              className="height-[300px] overflow-y-scroll"
            >
              <div className="text-center">
                {loadedIndexes.has(index) ? (
                  <TweetEmbed
                    tweetUrl={tweet.url}
                    index={index}
                    setLoadedIndexes={setLoadedIndexes}
                  />
                ) : (
                  <TweetSkeleton />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
};

export default TweetCarousel;
