# 1/26 CURRENT LIMIT: 819 tweets, 50 trends per trend, failure on 19th trend
from seleniumwire import webdriver
from selenium.webdriver.common.proxy import Proxy, ProxyType
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

from dotenv import load_dotenv
import json
import os
import re
import time
import sys

SLEEP_INTERVAL = 3

# Load environment variables

load_dotenv()
ROTATING_PROXY = os.getenv("ROTATING_PROXY")
TWITTER_EMAIL = os.getenv("TWITTER_EMAIL")
TWITTER_USERNAME = os.getenv("TWITTER_USERNAME")
TWITTER_PASSWORD = os.getenv("TWITTER_PASSWORD")
HEADLESS_MODE = os.getenv("HEADLESS_MODE", "True").lower() in ('true', '1', 't')

seleniumwire_options = {
    "proxy": {
        "http": ROTATING_PROXY,
        "https": ROTATING_PROXY
    }
}

# Run Chrome in headless mode by default
options = Options()
if HEADLESS_MODE:
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1920,1080")
options.add_argument("--log-level=0")

# Set up the Chrome driver
driver = webdriver.Chrome(
    service=Service(executable_path="./chromedriver"),
    # seleniumwire_options=seleniumwire_options,
    options=options
)
driver.maximize_window()
actions = ActionChains(driver)

def get_trend_info(info):
    trend_dict = { }
    
    # Extract trend rank
    trend_dict["rank"] = info[0]
    
    # Extract trend title
    for idx, line in enumerate(info):
        if "trending" in line.lower():
            trend_dict["title"] = info[idx + 1]
            break
        
    # Extract post count if it exists
    if "posts" in info[-1]:
        trend_dict["posts"] =re.match(r"[0-9,.]+[A-Z]?", info[-1], re.IGNORECASE).group()
    
    # Extract category if it exists
    if "trending" not in info[1].lower():
        trend_dict["category"] = info[1]
    # Extract location as category instead
    elif "trending in" in info[1].lower():
        trend_dict["category"] = info[1][len("trending in "):]
        
    return trend_dict

def login_to_twitter():
    # Navigate to the Twitter login page
    driver.get("https://x.com/login")
    time.sleep(6)

    # Enter username into text input
    username_input = driver.find_element(By.NAME, "text")
    username_input.send_keys(TWITTER_USERNAME + Keys.ENTER)
    time.sleep(2)

    # Enter email if unusual activity prompted
    try:
        unusual_activity_input = driver.find_element(By.NAME, "text")
        unusual_activity_input.send_keys(TWITTER_EMAIL + Keys.ENTER)
        time.sleep(3)
    except Exception as e:
        pass
        
    # Enter password into password input
    password_input = driver.find_element(By.NAME, "password")
    password_input.send_keys(TWITTER_PASSWORD + Keys.ENTER)
    time.sleep(2)
    
    # Enter email if unusual activity prompted
    try:
        unusual_activity_input = driver.find_element(By.NAME, "text")
        unusual_activity_input.send_keys(TWITTER_EMAIL + Keys.ENTER)
        time.sleep(3)
    except Exception as e:
        pass
    
    print("Twitter login successful.")
    
def scrape_tweets():
    print("Scraping tweets...")
    scraped_tweets = set()
    
    MAX_TWEETS = 50
    MAX_ATTEMPTS = 15
    attempts = MAX_ATTEMPTS

    while len(scraped_tweets) < MAX_TWEETS:
        # Acquire the current batch of tweets
        try:
            tweets = driver.find_elements(By.CSS_SELECTOR, '[data-testid="tweetText"]')
            
            prev_count = len(scraped_tweets)
            
            # Update the set of scraped tweets
            for tweet in tweets:
                if tweet.text not in scraped_tweets and len(scraped_tweets) < MAX_TWEETS:
                    scraped_tweets.add(tweet.text)
                    
            #     Scroll down to the last scraped tweet
            print("Tweets accumulated", len(scraped_tweets))
            
            if len(scraped_tweets) == prev_count:
                attempts -= 1
                print("Current attempts:", attempts)
                if attempts == 0:
                    break
            else:
                attempts = MAX_ATTEMPTS
            driver.execute_script("arguments[0].scrollIntoView(true);", tweets[-1])
            time.sleep(0.25)
        except Exception as e:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    return list(scraped_tweets)

def scrape_trends():
    # Navigate to the Twitter trends page
    driver.get("https://x.com/explore/tabs/trending")
    time.sleep(SLEEP_INTERVAL)
    
    scraped_trends = {}
    prev_scroll_height = 0

    while True:
        # Select all trends currently in the DOM
        trends = driver.find_elements(By.CSS_SELECTOR, '[data-testid="cellInnerDiv"]')
        
        # Save trends to dictionary
        for idx in range(len(trends)):
            try:
                info = [i.strip() for i in re.split(r"[\u00b7\n]", trends[idx].text) if i != ""]
                trend_number = info[0]
                if trend_number not in scraped_trends:
                    scraped_trends[trend_number] = get_trend_info(info)
                    print(f"Info added for trend #{trend_number}")

                    # Open a new tab for every newly scraped trend
                    actions.key_down(Keys.COMMAND).click(trends[idx]).key_up(Keys.COMMAND).perform()
                    
                    driver.implicitly_wait(2)

                    # Switch to the new tab
                    all_tabs = driver.window_handles
                    driver.switch_to.window(all_tabs[-1])
                    
                    driver.implicitly_wait(2)
                    
                    # Scrape the tweets for this trend
                    scraped_trends[trend_number]["tweets"] = scrape_tweets()
                    scraped_trends[trend_number]["tweet_count"] = len(scraped_trends[trend_number]["tweets"])
                    print(f"Tweets scraped for trend #{trend_number}")
                    
                    # Close the tab and switch back to the main tab
                    driver.close()
                    driver.switch_to.window(all_tabs[0])
                    
                    time.sleep(5)
                    
                    trends = driver.find_elements(By.CSS_SELECTOR, '[data-testid="cellInnerDiv"]')
                    
            except Exception as e:
                pass
                # print("EXCEPTION CAUGHT:", e)
                
        #     if len(scraped_trends) == 5:
        #         break
            
        # if len(scraped_trends) == 5:
        #     break

        # Scroll to the bottom of the trend page
        driver.execute_script("arguments[0].scrollIntoView(true);", trends[-1])
        
        # Update the previous scroll height or stop if the bottom is reached
        scroll_height = driver.execute_script("return document.body.scrollHeight")
        if scroll_height == prev_scroll_height:
            break
        prev_scroll_height = scroll_height
        
    if len(scraped_trends) == 30:
        print("All trends successfully scraped.")
        
    # all_tabs = driver.window_handles
    # for tab_number in range(1, len(all_tabs)):
    #     driver.switch_to.window(all_tabs[tab_number])
    #     time.sleep(SLEEP_INTERVAL)
        
    #     scraped_tweets = set()
    #     while len(scraped_tweets) < 10:
    #         # Acquire the current batch of tweets
    #         tweets = driver.find_elements(By.CSS_SELECTOR, '[data-testid="tweetText"]')
            
    #         if not tweets:
    #             break
            
    #         # Update the set of scraped tweets
    #         for tweet in tweets:
    #             if tweet.text not in scraped_tweets:
    #                 scraped_tweets.add(tweet.text)
            
    #         time.sleep(SLEEP_INTERVAL // 2)
            
    #         # Scroll down to the last scraped tweet
    #         driver.execute_script("arguments[0].scrollIntoView(true);", tweets[-1]) 
            
    #     scraped_trends[str(tab_number)]["tweets"] = list(scraped_tweets)
        
    #     time.sleep(SLEEP_INTERVAL)
    
    print("All tweets successfully scraped.")
        
    file_path = "output.json"
    with open(file_path, "w") as json_file:
        json.dump(scraped_trends, json_file, indent=4)
    print(f"Dictionary saved to {file_path}")

login_to_twitter()
scrape_trends()
driver.quit()