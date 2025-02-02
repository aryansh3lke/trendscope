import json
from openai import OpenAI, OpenAIError
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

# ChatGPT-3.5-turbo Model
CHATGPT_TOKEN_LIMIT = 16385
RESPONSE_TOKEN_LIMIT = 500
REQUEST_TOKEN_LIMIT = CHATGPT_TOKEN_LIMIT - RESPONSE_TOKEN_LIMIT

def ask_chatgpt(prompt, system_role):
    """
    Send a prompt to ChatGPT and retrieve the response.

    This function sends a prompt to the OpenAI ChatGPT model with a specified system role and returns the response.

    Args:
        prompt (str): The user's input prompt.
        system_role (str): The role of the system for context setting in the conversation.

    Returns:
        tuple:
            - str: The response from ChatGPT if successful.
            - str: None if successful, or an error message if an error occurs.

    Examples:
        >>> ask_chatgpt("Tell me a joke.", "You are a friendly assistant.")
        ('Why don't scientists trust atoms? Because they make up everything!', None)
        >>> ask_chatgpt("invalid_prompt", "Invalid role")
        (None, 'OpenAIError: Invalid request')
    """

    try:
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_role},
            {"role": "user", "content": prompt}
        ],
        max_tokens=RESPONSE_TOKEN_LIMIT,
        temperature=0.7
    )
        return completion.choices[0].message.content, None
    except OpenAIError as e:
        return None, f"OpenAIError: {str(e)}"
    except Exception as e:
        return None, {str(e)}

def read_from_json(file_path):
    with open(file_path, "r") as json_file:
        return json.load(json_file)

def write_to_json(data, file_path):
    with open(file_path, "w") as json_file:
        json.dump(data, json_file, indent=4)
    print(f"Data saved to {file_path}")