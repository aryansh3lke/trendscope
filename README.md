# TrendScope

An AI tool to gain insight into X (Twitter) trends through web-scraping, natural language processing, and abstractive summarization.

Keep up to date with the latest X trends here: [trendscope.fyi](https://trendscope.fyi)

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Usage](#usage)
4. [Installation](#installation)

## Introduction

TrendScope is a full-stack (Next.js/FastAPI) web application that relies on Selenium web-scraping to extract the latest trends from X (formerly known as Twitter). With the use of multiple headers and Chrome options, Selenium's Chrome webdriver is able to run in headless mode, avoid bot detection, and be perceived as a real human user. After key details about a trend are found, the top 50 tweets are scraped and given to ChatGPT with OpenAI's API to both summarize the trend and assign it a sentiment score based on user's feelings about the subject matter. All of this information is bundled together for each trend to be stored in MongoDB with a timestamp of when the data was collected.

When a user loads the webpage, the client makes a request to fetch the data and populate the cards on the page. The client takes advantage of Next.js data caching and periodically makes requests every 10 minutes to fetch for any new data to the server and compares timestamps of the data on the client with the stored data in MongoDB to determine if new data needs to be fetched. Trends are periodically scheduled to be scraped with a cron job every 4 hours with FastAPI utilities.

The Next.js frontend is deployed on Vercel due to its robust integration for the framework, while the FastAPI backend is deployed on Railway since Vercel's serverless function limit is easily surpassed by the Python dependencies in this project. The MongoDB database is also within Railway as it has a very straightforward integration in comparison to MongoDB Atlas, which requires static bound IPs instead of just an environment variable.

The current version of the app is also severely limited in its webscraping capabilities since X has strict rate limits which are quickly hit by scraping even just half of the available trends. A rotating residential proxy is currently not being used due to it slow speed when used with the webdriver and the requirement of being logged into X with a legitimate account. Although this type of proxy would generally be used to avoid IP bans, X will easily be able to detect webscraping behavior when signing into the same account with different IPs. Multiple accounts could be created in theory and used in tandem with rotating proxies, but this would significantly increase the complexity of the app. The proxy is also an additonal cost to run this project. Currently Railway's lowest hobby tier and the domain for the website are already expensive enough to run this app for free.

## Tech Stack

### Frontend

<b>Framework:</b> [Next.js (TypeScript)](https://nextjs.org)\
<b>Styling:</b> [Tailwind CSS](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com), [Vanta.js](https://www.vantajs.com)

### Backend

<b>Framework:</b> [FastAPI (Python)](https://fastapi.tiangolo.com)\
<b>Database:</b> [MongoDB](https://www.mongodb.com)

### DevOps

<b>Frontend Deployment:</b> [Vercel](https://vercel.com)\
<b>Backend Deployment:</b> [Railway](https://railway.com)\
<b>Containerization:</b> [Docker](https://www.docker.com)\
<b>DNS Provider:</b> [Porkbun](https://porkbun.com)

### Libraries

<b>Web Scraping:</b> [Selenium Webdriver](https://www.selenium.dev/documentation/webdriver)\
<b>Summarization/Sentiment Analysis:</b> [OpenAI API (ChatGPT 3.5-turbo)](https://github.com/openai/openai-python)

## Usage

#### 1. Quickly gain insight on the latest trends in the world to get a grasp on how people are feeling on the topic with a sentiment score and a summary to be up to date without having to scroll through many tweets.

![mainpage](https://github.com/user-attachments/assets/50e9af69-273f-4a43-a446-4c11a70922dd)

#### 2. Click on one of the trends on the main page to see the full summary and access a carousel of the original tweets that were sniped and analyzed.

![trendpage](https://github.com/user-attachments/assets/0c8e4f6b-5aee-4170-bbe6-5a2ece1acb67)

## Installation

Follow these steps to set up TrendScope locally:

#### 1. Clone the repository

`git clone https://github.com/aryansh3lke/trendscope.git`

#### 2. Navigate to the server directory (backend)

`cd server`

#### 3. Add the following environment variables in a .env file

```
# Webscraping Twitter Account Info
TWITTER_EMAIL=<your-twitter-email>
TWITTER_USERNAME=<your-twitter-username>
TWITTER_PASSWORD=<your-twitter-password>

# CHATGPT 3.5-Turbo OpenAI API Key
OPENAI_API_KEY=<your-api-key>

# MongoDB Compass NoSQL Database
MONGO_URL=mongodb://localhost:27017/
MONGO_DB=<your-db-name>
MONGO_COLLECTION=<your-collection-name>

# Deployment
PRODUCTION=False
FRONTEND_DOMAINS=http://localhost:3000
```

> IMPORTANT: You will need to create a Twitter account for webscraping and an OpenAI API Key to use ChatGPT. For local development, utilize MongoDB Compass to store the trends data by designating a database and collection for it. When deploying the FastAPI server in production, make sure to add the domain for the deployed frontend to `FRONTEND_DOMAINS` as a whitelist to allow CORS requests to follow through and set `PRODUCTION=True`. Additionally, change the `MONGO_URL` to access your deployed MongoDB instance.

#### 4. Navigate to the client directory (frontend)

`cd ../client`

#### 5. Install all necessary Node and Python dependencies

`pnpm run init`

#### 6. Run the Next.js and FastAPI servers concurrently

`pnpm run stack`

#### 7. View the website locally

http://localhost:3000
