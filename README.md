# faizGPT

Small MERN chat app (React + Vite • Node/Express • MongoDB).

**Live:** https://faizgpt-1.onrender.com/

## Features
- Prompt → reply (faizGPT)
- Thread list, switch & delete
- Render-ready (frontend + backend)

## Tech
React, Vite, Express, Mongoose, CORS, dotenv.

## Run locally
### Backend
```bash
cd Backend
npm install
# .env -> MONGODB_URI=your_atlas_uri
npm start   # http://localhost:8080/healthz -> ok

Frontend
cd frontend
npm install
npm run dev   # http://localhost:5173

Deploy (Render)

Backend (Web Service)
Root Dir: Backend • Build: npm ci • Start: npm start
Env: MONGODB_URI • Health: /healthz

Frontend (Static Site)
Root Dir: frontend • Build: npm ci && npm run build • Publish: dist
SPA Rewrite: /* -> /index.html

API (quick)

POST /api/chat → { reply }

GET /api/thread → [ { threadId, title } ]

GET /api/thread/:id → chat history

DELETE /api/thread/:id → { success }

Made with ♥ by Faiz.

::contentReference[oaicite:0]{index=0}

