from fastapi import FastAPI

from trend_scraper import get_latest_trends_data
from trend_summarizer import summarize_trends
from sentiment_analyzer import analyze_sentiments
from utils import write_to_json

app = FastAPI()

timestamp = 0

def update_data():
    trends_data = get_latest_trends_data(10)
    trend_summaries = summarize_trends(trends_data["data"])
    sentiment_scores = analyze_sentiments(trends_data["data"])
    
    for rank in trends_data["data"]:
        del trends_data["data"][rank]["tweets"]
        trends_data["data"][rank]["summary"] = trend_summaries[rank]
        trends_data["data"][rank]["sentiment_score"] = sentiment_scores[rank]
        
    global timestamp
    timestamp = trends_data["timestamp"]
        
    write_to_json(trends_data, "data.json")
    
@app.get("/")
async def root():
    update_data()
    return {"message": "Hello World"}