# AI Minutes of Meeting Backend

## Overview

AI Minutes of Meeting Backend is a Node.js-based backend system that automatically converts meeting audio into structured meeting notes using Artificial Intelligence.

Manual note-taking during meetings is time-consuming and important details can sometimes be missed. This project helps automate the process by converting meeting discussions into organized summaries.

The backend receives meeting audio from the frontend, converts speech into text using Deepgram Speech-to-Text API, and processes the transcript using Groq AI to generate structured meeting information.

The generated output includes:

* Meeting Summary
* Key Discussion Points
* Decisions
* Action Items

All meeting data is stored in MongoDB for future access and management.

---

# Project Workflow

Meeting Audio
↓
Frontend Upload
↓
Backend API
↓
Speech-to-Text Conversion (Deepgram)
↓
Transcript Generation
↓
AI Processing (Groq AI)
↓
Meeting Summary Generation
↓
MongoDB Storage

---

# Technologies Used

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## APIs

* Deepgram API (Speech-to-Text)
* Groq API (AI Summarization)

## Other Packages

* Multer
* dotenv
* cors
* nodemon

---

# Features

* Upload Meeting Audio
* Convert Speech to Text
* AI-Based Meeting Summarization
* Extract Action Items
* Store Meeting Data in MongoDB
* REST API Integration

---

# Folder Structure

```bash
mins-of-meeting/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── uploads/
├── .env
├── package.json
├── server.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Sushmitha-ACT/mins-of-meeting-backend.git
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

DEEPGRAM_API_KEY=your_deepgram_api_key

GROQ_API_KEY=your_groq_api_key
```

---

# Run Backend Server

## Development Mode

```bash
npm run dev
```

## Normal Mode

```bash
node server.js
```

---

# API Endpoint

## Generate Meeting Summary

### POST Request

```bash
/api/meetings/generate
```

### Form Data

| Key   | Type |
| ----- | ---- |
| audio | File |

---

# Sample Output

```json
{
  "meeting_summary": "Discussion about backend API integration for the Minutes of Meeting project.",
  
  "key_points": [
    "Authentication API development",
    "MongoDB integration",
    "Dashboard planning"
  ],

  "decisions": [
    "Backend integration will be completed first"
  ],

  "action_items": [
    {
      "task": "Complete authentication API",
      "assigned_to": "Ravi",
      "deadline": "Tomorrow"
    }
  ]
}
```

---

# Future Improvements

* Real-time meeting transcription
* Speaker identification
* Multi-language support
* Live dashboard updates
* Authentication and authorization

---

# Developer

Sushmitha
AI-Powered Minutes of Meeting Backend Project
