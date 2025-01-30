export interface TrendsData {
  data: { [rank: string]: Trend };
  timestamp: string;
}

export interface Trend {
  rank: string;
  title: string;
  category: string;
  tweets: string;
  summary: string;
  sentiment_score: string;
}
