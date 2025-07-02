import requests
import os
from dotenv import load_dotenv
load_dotenv()


def get_feedback(question, answer):
    prompt = f"""
    You are an AI interview coach. A user answered the following interview question:

    Interviewer: {question}
    User: {answer}

    Give detailed feedback on their answer. Rate it from 1 to 10. Suggest how they could improve it.
    """

    try:
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama3-8b-8192",
            "messages": [
                {"role": "system", "content": "You are a helpful and constructive interview coach."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7
        }

        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        return result["choices"][0]["message"]["content"]
    
    except Exception as e:
        return f"Error: {str(e)}"
