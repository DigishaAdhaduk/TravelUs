# TravelUs — Group Travel Management Platform

**TravelUs** is a full‑stack group travel coordination platform that helps users create travel groups, plan itineraries, share documents and booking proofs, chat in real time, and manage shared expenses — all in a single collaborative system.

---

## Key Highlights

* Multi‑user group workflows: create/join groups and collaboratively plan trips.
* Real‑time communication: integrated chat with live updates for instant coordination.
* Expense tracking: split costs, automatic balance calculations and settle-up flows.
* Document & media management: upload and store booking confirmations or trip assets.
* Robust backend architecture ensuring data consistency across modules.

---

## Features

* Create, join, and manage travel groups and members
* Create and share itineraries and trip notes
* Real-time group chat (WebSockets) to keep travellers connected
* Add and manage expenses, compute per-user balances automatically
* Upload and retrieve booking proofs and documents (PDF/image storage)
* Role-aware flows (admin-style group management and user interactions)
* Sample data and demo groups for rapid evaluation

---

## Architecture & System Behavior

* **Layered design**: Clear separation between API controllers, business services, and data repositories for maintainability and testability.
* **Event-driven/real-time**: Chat and live updates propagated via WebSockets to connected clients for near-instant sync.
* **Consistency-first**: Expense and group workflows designed to preserve consistency across concurrent updates and member actions.
* **Extensible storage**: Pluggable data/storage layers so H2 (dev) or PostgreSQL (prod) can be used without heavy code changes.

---

## Quick Start (Local)

> The repository contains two parts: **backend** (Spring Boot) and **frontend** (React). Start both to run the full app locally.

### Backend (recommended)

1. Make sure Java 17+ or Java 21 is installed and `mvn` is available.
2. From the backend directory:

```bash
# using the wrapper if available
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

3. The backend will run on `http://localhost:8080` by default and expose REST endpoints (see API section). Sample data is auto-loaded on startup.

### Frontend

1. From the frontend directory (React + Vite):

```bash
npm install
npm run dev
```

2. The frontend dev server runs (usually) on `http://localhost:5173` and connects to backend APIs.

---

## Environment & Configuration

* Backend: configure database URL, JWT secret, file storage path, and other settings in `application.properties` / environment variables.
* Frontend: set `REACT_APP_API_BASE_URL` (or equivalent) to point to the backend API.

*(See `example.env` or `application.properties.sample` if included in the repo.)*

---

## API Overview (examples)

> Example REST endpoints (backend)

* `GET /api/groups` — list groups
* `POST /api/groups` — create a group
* `GET /api/groups/{id}` — group details
* `POST /api/groups/{id}/expenses` — add expense
* `GET /api/groups/{id}/expenses` — list expenses
* `POST /api/auth/register` — user registration
* `POST /api/auth/login` — user login (returns JWT)
* WebSocket endpoint: `/ws` (or `/chat`) — real-time messages

*(Refer to controller classes or API docs for full endpoint list and request/response shapes.)*

---

## Data & Persistence

* Development can use embedded H2 for convenience and demo data.
* Production should use PostgreSQL or another persistent DB (update datasource config).
* File storage can be local (dev) or cloud (S3, etc.) for production.

---

## Testing

* Backend: unit and integration tests may be run via Maven: `mvn test`.
* Frontend: run `npm test` if tests are included.

---

## Deployment Notes

* Containerize frontend and backend for easy deployment.
* Use a reverse proxy (NGINX) to serve frontend and proxy API requests to backend.
* Secure JWT secrets and storage credentials via environment variables or secret manager.

---

## Contribution

Contributions are welcome. Typical workflow:

1. Fork the repo
2. Create a feature branch
3. Add tests and documentation for new features
4. Submit a PR with clear description and rationale

---

## Technologies

**Spring Boot, PostgreSQL, JWT, WebSockets, React.js, TailwindCSS, JavaScript, Redux Toolkit, Supabase, GitHub**

---

