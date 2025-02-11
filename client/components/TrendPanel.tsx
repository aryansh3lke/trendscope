import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trend } from "@/lib/types";
import { getSentimentColor, getSentimentEmoji } from "@/lib/utils";

const TrendPanel = ({ trend }: { trend: Trend }) => {
  return (
    <Card className="h-full overflow-scroll">
      <CardHeader>
        <CardTitle className="flex flex-row items-start justify-between gap-4">
          <p
            className="text-xl truncate"
            title={trend.rank + ". " + trend.title}
          >
            {trend.rank}. {trend.title}
          </p>
        </CardTitle>
        <CardDescription className="flex flex-row items-center gap-2">
          <p className="text-lg truncate" title={trend.category}>
            {trend.category} • {trend.posts + " posts"}
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
        <p className="">{trend.summary}</p>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default TrendPanel;
