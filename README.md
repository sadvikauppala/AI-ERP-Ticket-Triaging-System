# ERP Ticket Triage AI

An AI-powered system to automatically analyze and triage ERP support tickets.

## Setup

1.  **Backend Setup**:
    *   Navigate to the `backend` folder.
    *   Initialize environment variables: `cp .env.example .env`.
    *   Install dependencies: `npm install`.

2.  **Ollama Setup**:
    *   Ensure [Ollama](https://ollama.ai/) is installed and running.
    *   Pull the Llama 3 model: `ollama pull llama3`.

3.  **Frontend Setup**:
    *   Install root dependencies: `npm install` (if using the root launcher).

## Running the Application

### Option 1: Root Launcher (Recommended)
From the root directory, run:
```bash
npm run dev
```
This will start both the backend server and a static file server for the frontend.

### Option 2: Manual Start
*   **Backend**: `cd backend && node server.js`
*   **Frontend**: Open `frontend/index.html` directly in a browser.

## Features
*   **AI Analysis**: Uses local LLMs via Ollama to categorize and prioritize tickets.
*   **Auto Validation**: Backend logic ensures all required fields are present and fixes common issues.
*   **Support Response Generation**: Automatically generates a professional acknowledgement message.
*   **Robustness**: Error handling for when AI services are offline.
