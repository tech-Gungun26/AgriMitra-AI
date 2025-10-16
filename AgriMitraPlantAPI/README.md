# AgriMitra-AI — AgriMitraPlantAPI (project overview)

This README summarizes the AgriMitra-AI project (frontend, backend, and data), lists the current files, and provides run/config instructions and next steps for development.

---

## Project summary

AgriMitra-AI is a farmer-focused mobile/web app built with Expo (React Native + expo-router). It provides features such as:

- Weather info (OpenWeatherMap integration)
- Mandi/market prices (data.gov.in APIs)
- Plant analysis (image/ML placeholder)
- Government schemes
- Voice/OTP authentication (Firebase auth UI present, currently mocked)

This repository contains the Expo frontend and a placeholder backend API skeleton under `AgriMitraPlantAPI/`.

---

## Frontend (app/) — stack and structure

- Stack: Expo + React Native (React 19), TypeScript, `expo-router` for routing.
- Key dependencies: `expo`, `expo-router`, `firebase`, `expo-camera`, `expo-speech`, `@expo/vector-icons`, `react-native-paper`, etc.

Key frontend files and folders:

- `app/` — main route files and screens (tabs, index, profile, mandi-prices, schemes, plant-analysis, etc.).
  - `app/(tabs)/index.tsx` — Home screen, shows weather card, quick actions, news, voice button. Weather integrates OpenWeatherMap (see note on keys).
  - `app/(tabs)/mandi-prices.tsx` — Market prices screen (now wired to data.gov.in API in code).
  - `app/(tabs)/schemes.tsx` — Government schemes screen (uses an API endpoint, earlier patched to call data source).
  - `app/auth.tsx` and other route files — auth and navigation.
- `components/FirebaseAuth.tsx` — Authentication UI (OTP/email/phone) currently mocked to simulate Firebase OTP flow. Replace with real Firebase logic as needed.
- `hooks/` — small hooks (e.g., `useFrameworkReady.ts`).

Notes:
- Some API keys are currently in source files (e.g., OpenWeatherMap key in `index.tsx`, data.gov.in API keys in `schemes.tsx` and `mandi-prices.tsx`). For security, move these to environment variables and do not commit keys to git.
- The frontend uses mocked Firebase auth (UI only). To enable real auth, add Firebase config and replace mock calls with `firebase/auth` logic or `expo-firebase` equivalents.

---

## Backend (AgriMitraPlantAPI/)

This folder is a placeholder created to host backend API services. Files created (placeholders):

- `AgriMitraPlantAPI/app/main.py` — API routes (placeholder)
- `AgriMitraPlantAPI/app/database.py` — DB connection (placeholder)
- `AgriMitraPlantAPI/app/models.py` — ORM models (placeholder)
- `AgriMitraPlantAPI/app/model.py` — ML model loader / inference stub (placeholder)
- `AgriMitraPlantAPI/requirements.txt` — Python requirements (placeholder)

Recommended backend stack (suggestion):
- FastAPI for building the REST API (quick to develop, async-friendly).
- Uvicorn or Hypercorn as the ASGI server (for local dev use `uvicorn --reload`).
- Database: PostgreSQL (production) or SQLite (dev) with SQLAlchemy / Tortoise ORM.
- ML: A simple `model.py` can load a saved TensorFlow/PyTorch artifact or call an external inference service.

Suggested API endpoints to implement:
- `GET /health` — health check.
- `POST /predict` — accept an image (multipart/form-data) and return plant analysis result.
- `GET /schemes` — proxy/fetch latest government schemes and cache results.
- `GET /mandi-prices` — proxy market price data or provide cached / aggregated data.

Security & CORS:
- Allow CORS for your Expo origin(s) during development.
- Secure endpoints that require authentication (JWT or Firebase token verification).

---

## Database

Current repo: No production DB configured. Frontend uses mocked auth; some screens fetch from public APIs.

Recommendations:
- Use Firestore / Realtime DB if you prefer Firebase ecosystem (easy integration with client).
- Use PostgreSQL + SQLAlchemy for structured data (users, saved reports, historical mandi prices).

Suggested schema examples:
- `users` (id, displayName, email, phone, created_at)
- `predictions` (id, user_id, image_url, result, confidence, created_at)
- `mandi_prices` (id, commodity, market, min_price, max_price, modal_price, arrival_unit, date)

---

## Configuration & Secrets

Do NOT commit API keys or secrets into source control. Instead:

- Frontend (Expo) options:
  - Use `app.config.js` / `app.json` with environment variables or `expo-constants`.
  - Use `react-native-dotenv` or `babel-plugin-inline-dotenv` during build; for Expo managed apps prefer secure runtime storage or server-side proxy.
- Backend:
  - Use `.env` and `python-dotenv` or environment variables in the hosting environment.

Keys currently found in repo (search and remove before publishing):
- OpenWeatherMap API key in `app/(tabs)/index.tsx` (replace and move to env)
- data.gov.in API key present in `schemes.tsx` and `mandi-prices.tsx` (should be moved to env)

---

## How to run the Frontend (development)

From project root (`project/`):

```bash
# 1. install dependencies
npm install

# 2. start Expo dev server
npm run dev
```

Open the Expo dev tools and run on Android/iOS simulator or web.

---

## How to run the Backend (suggested)

(These are suggested steps once you add code to `AgriMitraPlantAPI/app`.)

```bash
# create venv
python -m venv venv
venv\Scripts\activate     # Windows PowerShell

# install
pip install -r AgriMitraPlantAPI/requirements.txt

# run (example for FastAPI)
uvicorn app.main:app --reload --port 8000
```

Expose the backend (or use tunnel) and update frontend API base URLs accordingly.

---

## Development notes & next steps

- Move API keys to environment variables and remove hardcoded keys.
- Implement real Firebase auth or an alternative server-side auth flow.
- Harden backend (rate limiting, auth, input validation).
- Add tests for critical flows (auth, prediction endpoint, price fetching).
- Implement caching for external API data (mandi/schemes/weather) to avoid rate limits.

---

## File map (current important files)

- `app/(tabs)/index.tsx` — Home & weather UI (OpenWeatherMap integration)
- `app/(tabs)/mandi-prices.tsx` — Market prices (now calling data.gov.in)
- `app/(tabs)/schemes.tsx` — Government schemes (calls API)
- `components/FirebaseAuth.tsx` — Auth UI (mocked OTP)
- `AgriMitraPlantAPI/app/*.py` — backend placeholders (main.py, database.py, models.py, model.py)
- `package.json` — project dependencies and scripts

---

## Contact / Support

If you'd like, I can:

- Scaffold the backend with a minimal FastAPI app and example endpoints.
- Add environment variable support for Expo and a `.env.example` file.
- Implement Firebase auth wiring or a simple JWT-based auth in the backend.


