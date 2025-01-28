from datetime import datetime
import pytz

def get_current_formatted_time():
    # Define the timezone (e.g., PST)
    timezone = pytz.timezone("US/Pacific")
    
    # Get the current time in the specified timezone
    current_time = datetime.now(timezone)
    
    # Format the day with a suffix
    day = current_time.day
    if 11 <= day <= 13:  # Special case for '11th', '12th', '13th'
        day_suffix = "th"
    else:
        day_suffix = {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    
    # Format the full string
    formatted_time = current_time.strftime(f"%B {day}{day_suffix}, %Y %I:%M %p %Z")
    
    return formatted_time