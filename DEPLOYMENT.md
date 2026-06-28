# Render Deployment Guide

## Architecture

```
Frontend (landing page) ─── axios ──→ Backend API
      │                                   │
      │ Redirect                           │ mongoose
      ▼                                   ▼
Dashboard (trading UI) ─── axios ──→ Backend API ──→ MongoDB Atlas
```

## Environment Variables

### Backend (`backend/`)

| Variable | Required | Example | Description |
|---|---|---|---|
| `MONGODB_URI` | yes | `mongodb+srv://user:pass@cluster.mongodb.net/db` | MongoDB connection string |
| `JWT_SECRET` | yes | `<random-64-char-string>` | Secret for signing JWTs |
| `PORT` | yes | `3002` | Express listen port (Render assigns via `$PORT`) |
| `FRONTEND_URL` | yes | `https://zerodha-frontend.onrender.com` | Frontend origin for CORS |
| `DASHBOARD_URL` | yes | `https://zerodha-dashboard.onrender.com` | Dashboard origin for CORS |
| `NODE_ENV` | no | `production` | Enables production mode |

Render Web Service sets `PORT` automatically. Set all others in the Render dashboard.

### Frontend (`frontend/`)

| Variable | Required | Example | Description |
|---|---|---|---|
| `REACT_APP_API_URL` | yes | `https://zerodha-api.onrender.com` | Backend base URL |
| `REACT_APP_DASHBOARD_URL` | yes | `https://zerodha-dashboard.onrender.com` | Dashboard URL for post-login redirect |

Set these as **environment variables** (not secret files) in the Render Static Site dashboard. CRA embeds them at build time. A rebuild is required after changing values.

### Dashboard (`dashboard/`)

| Variable | Required | Example | Description |
|---|---|---|---|
| `REACT_APP_API_URL` | yes | `https://zerodha-api.onrender.com` | Backend base URL |
| `REACT_APP_FRONTEND_URL` | yes | `https://zerodha-frontend.onrender.com` | Frontend URL (used for login redirects) |

Same as frontend — set as env vars in the Render Static Site dashboard.

## Deployment Checklist

### Pre-deployment
- [ ] All `.env.example` files are committed (actual `.env` files are in `.gitignore`)
- [ ] Backend `index.js` validates `MONGODB_URI`, `JWT_SECRET`, `PORT` on startup
- [ ] JWT secret is a strong random string — generate fresh for each deployment:
      `openssl rand -hex 64`
- [ ] No hardcoded secrets in any source file (grep for `JWT_SECRET`, `MONGODB_URI`, `password`, `secret`, `token` to verify)
- [ ] Backend CORS allows both frontend and dashboard origins
- [ ] `frontend/static.json` and `dashboard/static.json` exist with SPA rewrite rules (Render picks these up automatically)
- [ ] MongoDB indexes are created on first request (collections: Orders, Holdings, Positions, Funds, Transactions, Watchlist, Users)

### Render — Backend (Web Service)
1. Create a **Web Service**
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add env vars:
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — generate a fresh 64-byte hex string:
        `openssl rand -hex 64`
   - `PORT` — leave blank (Render assigns it)
   - `FRONTEND_URL` — e.g., `https://zerodha-frontend.onrender.com`
   - `DASHBOARD_URL` — e.g., `https://zerodha-dashboard.onrender.com`
   - `NODE_ENV` — `production`
6. Deploy and verify `/health` endpoint returns `{"status":"ok"}`

### Render — Frontend (Static Site)
1. Create a **Static Site**
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add env vars:
   - `REACT_APP_API_URL` — full URL of the backend (e.g., `https://zerodha-api.onrender.com`)
   - `REACT_APP_DASHBOARD_URL` — full URL of the dashboard (e.g., `https://zerodha-dashboard.onrender.com`)
6. Deploy and verify landing page loads

### Render — Dashboard (Static Site)
1. Create a **Static Site**
2. Root directory: `dashboard`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add env vars:
   - `REACT_APP_API_URL` — full URL of the backend (e.g., `https://zerodha-api.onrender.com`)
   - `REACT_APP_FRONTEND_URL` — full URL of the frontend (e.g., `https://zerodha-frontend.onrender.com`)
6. Deploy and verify dashboard loads after login redirect

### Post-deployment
- [ ] Test full signup → login → dashboard → buy/sell flow against deployed API
- [ ] Verify profile update and password change
- [ ] Test CORS by checking browser console for cross-origin errors
- [ ] Confirm 401 redirects from dashboard go to the frontend login page
- [ ] Verify MongoDB IP whitelist includes Render's outbound IPs (or set to 0.0.0.0/0)
