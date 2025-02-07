FROM seleniarm/standalone-chromium

USER root

# Install Google Chrome
RUN apt-get update && apt-get install -y wget \
    && wget -O /tmp/google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y /tmp/google-chrome.deb \
    && rm /tmp/google-chrome.deb

# Install Python
RUN apt-get update && apt-get install -y python3-pip

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies with --break-system-packages
RUN pip3 install --no-cache-dir -r requirements.txt --break-system-packages

# Copy the rest of the application
COPY . .

# Expose port if needed
EXPOSE 8000

# Set Python to unbuffered mode
ENV PYTHONUNBUFFERED=1

# Start command (Modify if running Flask, FastAPI, etc.)
CMD ["fastapi", "run"]