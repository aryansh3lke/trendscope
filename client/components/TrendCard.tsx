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

const TrendCard = ({ trend }: { trend: Trend }) => {
  const getSentimentColor = (scoreString: string) => {
    const score = parseFloat(scoreString.replace("%", "")); // Convert "-54.55%" to -54.55

    // Clamp the score between -100 and 100
    const clampedScore = Math.max(-100, Math.min(100, score));

    // Normalize the score to a range between 0 (red) and 1 (green)
    const normalized = (clampedScore + 100) / 200;

    if (normalized < 0.5) {
      // Interpolating between red (255, 0, 0) and white (255, 255, 255)
      const t = normalized * 2;
      return `rgb(255, ${Math.round(255 * t)}, ${Math.round(255 * t)})`; // Red to White
    } else {
      // Interpolating between white (255, 255, 255) and green (0, 255, 0)
      const t = (normalized - 0.5) * 2;
      return `rgb(${Math.round(255 * (1 - t))}, 255, ${Math.round(255 * (1 - t))})`; // White to Green
    }
  };

  const getSentimentEmoji = (scoreString: string) => {
    const score = parseFloat(scoreString.replace("%", "")); // Convert "-54.55%" to -54.55

    if (score > 20) return "😊"; // Positive sentiment
    if (score < -20) return "😡"; // Negative sentiment
    return "😐"; // Neutral sentiment
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row items-start justify-between gap-4">
          <p
            className="text-xl line-clamp-1"
            title={trend.rank + ". " + trend.title}
          >
            {trend.rank}. {trend.title}
          </p>
          <Button variant="outline" size="icon" className="w-7 h-7 p-1">
            <ExternalLink />
          </Button>
        </CardTitle>
        <CardDescription className="flex flex-row items-center gap-2">
          <p className="text-lg" title={trend.category}>
            {trend.category}
          </p>
          <Badge
            className="drop-shadow-lg shadow-black gap-1"
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
