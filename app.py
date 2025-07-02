from flask import Flask, request, jsonify
from flask_cors import CORS
from interview_ai import get_feedback
import logging
import os
from groq import Groq
from dotenv import load_dotenv

# Load environment variables FIRST
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow frontend to connect
app.logger.setLevel(logging.INFO)

# Initialize Groq client AFTER loading env vars
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/api/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    question = data.get("question")
    answer = data.get("answer")

    if not question or not answer:
        return jsonify({"error": "Missing question or answer"}), 400

    feedback_response = get_feedback(question, answer)
    return jsonify({"feedback": feedback_response})

@app.route("/api/generate-questions", methods=["POST"])
def generate_questions():
    data = request.get_json()
    job_title = data.get("job_title", "")

    if not job_title.strip():
        return jsonify({"error": "Job title is required"}), 400

    prompt = f"""
    Generate exactly 5 interview questions for the position: {job_title}.
    Return ONLY a numbered list of questions, one per line.
    Format each question as: 1. Question text here
    
    Focus on questions specific to {job_title} role including technical skills, experience, and situational scenarios.
    """

    try:
        print(f"Generating questions for job title: {job_title}")  # Debug log
        
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Current recommended replacement for mixtral
            messages=[
                {"role": "system", "content": "You are a professional interviewer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=800
        )

        content = response.choices[0].message.content.strip()
        print(f"Raw AI response: {content}")  # Debug log
        
        lines = content.split("\n")
        print(f"Split lines: {lines}")  # Debug log
        
        # More robust parsing
        questions = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Check if line starts with a number followed by . or )
            if any(line.startswith(f"{i}.") or line.startswith(f"{i})") for i in range(1, 10)):
                # Extract the question part after the number
                if ". " in line:
                    question = line.split(". ", 1)[1].strip()
                elif ") " in line:
                    question = line.split(") ", 1)[1].strip()
                else:
                    question = line
                
                if question:
                    questions.append(question)
            elif line and len(line) > 10:  # Fallback for unnumbered questions
                questions.append(line)
        
        print(f"Parsed questions: {questions}")  # Debug log
        
        if not questions:
            print("No questions parsed, returning error")
            return jsonify({"error": "Failed to parse questions from AI response"}), 500

        return jsonify({"questions": questions})

    except Exception as e:
        print(f"Exception occurred: {str(e)}")  # Debug log
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Error generating questions: {str(e)}"}), 500

if __name__ == "__main__":
    
    app.run(host='0.0.0.0', port=10000)
