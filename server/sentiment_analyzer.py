from utils import write_to_json, read_from_json, ask_chatgpt

SENTIMENT_SYSTEM_ROLE = """
    You are a sentiment analyzer. Your task is to perform sentiment analysis on 
    the latest trends from X. You will be given a list of tweets for each trend, 
    and your task is to give a score of how positive or negative each trend is.
    Your output should always only consist of a single number between -1 and 1.
"""

def analyze_sentiments(trend_data):
    sentiment_scores = {}
    for rank, trend in trend_data.items():
        prompt = f"""
            A trend on X right now is called {trend["title"]}. Please assign a
            sentiment score to each tweet in the given list of strings from -1 
            to 1 and return the average of all sentiment scores. Your output 
            should be a single number rounded to 4 decimal places. Do not put
            any text: {trend["tweets"]}
        """
        sentiment_scores[rank] = str(round(float(ask_chatgpt(prompt, SENTIMENT_SYSTEM_ROLE)[0]) * 100, 4)) + "%"
    print("All sentiment scores succesfully calculated.")
    return sentiment_scores
    
if __name__ == "__main__":
    sentiment_scores = analyze_sentiments(read_from_json("additional_data.json")["data"])
    write_to_json(sentiment_scores, "sentiment_scores.json")