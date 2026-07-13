from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import os
import json
from agent import agent

load_dotenv()

app = FastAPI(title="AI CRM HCP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


@app.get("/")
def home():
    return {"message": "AI CRM HCP Backend Running"}


@app.post("/ai-log")
def ai_log(data: dict):
    text = data.get("text", "")

    # Pass through LangGraph Agent
    agent_result = agent.invoke(
        {
            "text": text,
            "result": ""
        }
    )

    text = agent_result["result"]

    prompt = f"""
You are an AI assistant for pharmaceutical CRM systems.

Extract information from the interaction below.

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do not return markdown.
- Do not return explanations.
- Extract date in YYYY-MM-DD format.
- Extract time in HH:MM 24-hour format.

Interaction Type must be EXACTLY one of:
- Meeting
- Call
- Email

Rules:
- Face-to-face meeting, hospital visit, clinic visit, in-person discussion = Meeting
- Phone call, telephonic discussion, telephone conversation = Call
- Email communication = Email

Sentiment must be EXACTLY one of:
- Positive
- Neutral
- Negative

If any value is not found, return empty string.

Return JSON exactly in this structure:

{{
  "hcp_name": "",
  "interaction_type": "",
  "date": "",
  "time": "",
  "attendees": "",
  "topics_discussed": "",
  "materials_shared": "",
  "sentiment": "",
  "outcomes": "",
  "follow_up_actions": "",
  "meeting_summary": ""
}}

Interaction:

{text}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1,
    )

    ai_response = response.choices[0].message.content

    try:
        extracted = json.loads(ai_response)

        # -----------------------
        # Normalize Interaction Type
        # -----------------------
        interaction_type = (
            extracted.get("interaction_type", "")
            .strip()
            .lower()
        )

        if any(word in interaction_type for word in [
            "call",
            "phone",
            "telephonic",
            "telephone"
        ]):
            extracted["interaction_type"] = "Call"

        elif any(word in interaction_type for word in [
            "email",
            "mail"
        ]):
            extracted["interaction_type"] = "Email"

        else:
            extracted["interaction_type"] = "Meeting"

        # -----------------------
        # Normalize Sentiment
        # -----------------------
        sentiment = (
            extracted.get("sentiment", "")
            .strip()
            .lower()
        )

        if "positive" in sentiment:
            extracted["sentiment"] = "Positive"

        elif "negative" in sentiment:
            extracted["sentiment"] = "Negative"

        else:
            extracted["sentiment"] = "Neutral"

        return {
            "success": True,
            "data": extracted
        }

    except Exception:
        return {
            "success": False,
            "raw_response": ai_response
        }