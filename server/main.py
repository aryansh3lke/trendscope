# Libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utilities import repeat_every
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
import sys

# User defined modules
from trend_scraper import get_latest_trends_data
from trend_summarizer import summarize_trends
from sentiment_analyzer import analyze_sentiments
from utils import get_chrome_version, get_chromedriver_version, write_to_json
from datetime import datetime

# Env variables
PRODUCTION_MODE = os.getenv("PRODUCTION", "True") == "True"
FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN")
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")

load_dotenv()
app = FastAPI()

# List of allowed origins (frontends)
origins = [
    "http://localhost:3000",  # Frontend URL (for local dev)
    FRONTEND_DOMAIN,  # Production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specifies the allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Print system information
print("Mode:", "Production" if PRODUCTION_MODE else "Development")
print("Python Version:" , sys.version)
print("Chrome Version:", get_chrome_version())
print("Chromedriver Version:", get_chromedriver_version())
print("MONGO_URL:", MONGO_URL)
print("MONGO_DB:", MONGO_DB)
print("MONGO_COLLECTION:", MONGO_COLLECTION)

try:
    # Attempt to connect to MongoDB
    client = MongoClient(MONGO_URL)
    db = client[MONGO_DB]
    collection = db[MONGO_COLLECTION]
    db.command("ping")  # Test connection
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    sys.exit(1)  # Stop the app if DB connection fails

@app.on_event('startup')
@repeat_every(seconds=60*60*2) # 2 hours
def update_data():
    print("Executing trend scrape cron job at " + str(datetime.now()) + "...")
    trends_data = get_latest_trends_data(3)
    write_to_json(trends_data, "data.json")
    print("Summarizing trends...")
    trend_summaries = summarize_trends(trends_data["data"])
    print("Anaylzing sentiments...")
    sentiment_scores = analyze_sentiments(trends_data["data"])
    
    for rank in trends_data["data"]:
        del trends_data["data"][rank]["tweets"]
        trends_data["data"][rank]["summary"] = trend_summaries[rank]
        trends_data["data"][rank]["sentiment_score"] = sentiment_scores[rank]

    try:
        collection.delete_many({})
        collection.insert_one(trends_data)
        return {"message": "TrendData succesfully saved."}
    except Exception as e:
        return {"error": e}
    
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/fetch-timestamp")
async def fetch_timestamp():
    try:
        server_timestamp = collection.find_one()["timestamp"]
        if server_timestamp:
            return {"server_timestamp": server_timestamp}
        else:
            return {"error": "No data found"}
    except Exception as e:
        return {"error": e}
    
@app.get("/api/fetch-data")
async def fetch_data():
    try:
        trends_data = collection.find_one()
        del trends_data["_id"]
        return {"trends_data": trends_data}
    except Exception as e:
        return {"error": e}
    
@app.get("/api/clear-data")
async def clear_data():
    try:
        result = collection.delete_many({})
        print(result)
        return {"message": "TrendData successfuly cleared."}
    except Exception as e:
        return {"error": e}