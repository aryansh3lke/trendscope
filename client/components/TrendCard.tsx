import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trend } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getSentimentColor, getSentimentEmoji } from "@/lib/utils";

const TrendCard = ({ trend }: { trend: Trend }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-start justify-between gap-4">
          <p
            className="text-xl truncate"
            title={trend.rank + ". " + trend.title}
          >
            {trend.rank}. {trend.title}
          </p>
          <Link
            href={`/trend/${trend.rank}`}
            target="_blank" // Open in a new tab
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon" className="w-7 h-7 p-1">
              <ExternalLink />
            </Button>
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-col justify-centeritems-center gap-2">
          <p className="text-lg truncate" title={trend.category}>
            {trend.category}
            {trend.posts && " • " + trend.posts + " posts"}
          </p>
          <Badge
            className="w-fit drop-shadow-lg shadow-black gap-1"
            title={trend.sentiment_score}
            style={{
              backgroundColor: getSentimentColor(trend.sentiment_score),
            }}
          >
            <span className="text-xl shadow-2xl">
              {getSentimentEmoji(trend.sentiment_score)}
            </span>
            <p className="text-lg text-black">{trend.sentiment_score}</p>
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-[8]">{trend.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default TrendCard;
