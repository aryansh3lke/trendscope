# TrendScope

An AI tool to gain insight into Twitter (X) trends through web-scraping, natural language processing, and abstractive summarization.

Keep up to date with the latest X trends here: [trendscope.fyi](https://trendscope.fyi)

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)

## Introduction

TrendScope is a full-stack web application that relies on Selenium web-scraping to extract the latest trends from X (formerly known as Twitter). After key details about a trend are found, the top tweets are scraped and given to ChatGPT with OpenAI's API to both summarize the trend and assign it a sentiment score based on user's feelings about the subject matter. All of this information is bundled together for each trend to be stored in MongoDB with a timestamp of when the data was collected.

When a user loads the webpage, the client makes a request to fetch the data and populate the cards on the page. The client periodically makes requests to the server and compares timestamps of the data on the client with the stored data in MongoDB to determine if new data needs to be fetched. Trends are periodically scheduled to be scraped with a cron job every 4 hours with FastAPI utilities.

## Tech Stack

### Frontend

<b>Framework:</b> Next.js (TypeScript)\
<b>Styling:</b> Tailwind CSS, Shadcn UI, Vanta.js

### Backend

<b>Framework:</b> FastAPI (Python)\
<b>Database:</b> MongoDB\
<b>APIs:</b> RESTful APIs

### DevOps

<b>Cloud:</b> Vercel (Frontend), Railway.app (Backend)\
<b>Containerization:</b> Docker (Backend)

### Libraries

<b>Web Scraping:</b> Selenium\
<b>Summarization/Sentiment Analysis:</b> OpenAPI (ChatGPT 3.5-turbo)

## Installation

Follow these steps to set up TrendScope locally:

#### 1. Clone the repository

`git clone https://github.com/asshelke/trendscope.git`

#### 2. Navigate to the server directory (backend)

`cd server`

#### 3. Install all necessary Python dependencies

`pip install -r requirements.txt`

#### 2. Navigate to the client directory (frontend)

`cd ../client`

#### 4. Install all necessary Node dependencies

`pnpm install`

#### 5. Run the Next.js and FastAPI servers concurrently

`pnpm run stack`

#### 6. View the website locally

http://localhost:3000
