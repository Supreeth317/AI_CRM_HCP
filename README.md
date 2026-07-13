# AI CRM HCP Interaction Logger

## Overview

AI CRM HCP Interaction Logger is an AI-powered CRM application designed for Healthcare Professionals (HCPs). Users can enter interaction notes in natural language, and the system automatically extracts structured CRM fields using AI.

The project combines:

- FastAPI Backend
- React Frontend
- Groq LLM
- LangGraph Agent Workflow

---

## Features

- Natural language interaction logging
- Automatic extraction of CRM fields
- HCP name detection
- Interaction type classification
- Date and time extraction
- Attendee extraction
- Topics discussed extraction
- Materials shared extraction
- Sentiment analysis
- Outcome extraction
- Follow-up action generation

---

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- FastAPI
- Python

### AI
- Groq LLM
- LangChain
- LangGraph

---

## LangGraph Workflow

The project includes a LangGraph agent workflow with tools:

- Log Interaction Tool
- Summarize Interaction Tool
- Sentiment Analysis Tool
- Follow-up Tool
- Edit Interaction Tool

---

## Project Structure

AI_CRM_HCP/
├── backend/
│ ├── main.py
│ ├── agent.py
│ ├── tools.py
│ ├── test_agent.py
│ ├── requirements.txt
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── README.md
└── .gitignore

---

## Setup Instructions

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Sample Interaction

Input:

```
Met Dr. Priya Nair on July 12 at 3 PM regarding CardioX.
Discussed dosage updates and shared product brochure.
Follow-up call next week.
```

Output:

```
HCP Name: Dr. Priya Nair
Interaction Type: Meeting
Date: 2026-07-12
Time: 03:00 PM
Topics Discussed: Dosage updates
Materials Shared: Product brochure
Sentiment: Neutral
Follow-up Actions: Follow-up call next week
```

---

## Author

Supreeth S
MCA, Amrita Vishwa Vidyapeetham, Mysuru