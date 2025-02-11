export interface TrendsData {
  data: { [rank: string]: Trend };
  timestamp: string;
}

export interface Trend {
  rank: string;
  title: string;
  category: string;
  posts: string;
  tweets: Tweet[];
  summary: string;
  sentiment_score: string;
}

export interface Tweet {
  text: string;
  url: string;
}
