# Swipe to Brand

An AI-powered Brand Intelligence Studio that turns an early idea into a coherent launch-ready identity through a guided strategy workflow. The experience is built around making decisions: users discover the problem, position the opportunity, swipe between genuinely different brand directions, shape an identity, pressure-test it, then receive an editorial brand showcase.

## Features

- Seven connected stages: Discover, Position, Choose, Shape, Visualize, Challenge and Deliver.
- Structured shared project state, saved locally between reloads.
- Three distinct strategic routes and an accessible swipe deck with pointer/touch, buttons and arrow-key support.
- Editable discovery, positioning, name and tagline.
- Generated naming, personality, voice, palette and launch copy.
- AI challenge findings are presented as directional evaluation signals, not scientific scores.
- Consistency Guardian checks future copy against the saved brand context.
- Responsive editorial case-study showcase and downloadable standalone HTML brand kit.
- Intentional light and dark themes, persisted in local storage; reduced motion support.
- Express API with a provider adapter and realistic demo responses when no key is configured.

## Architecture and AI workflow

The React client owns a single `brandProject` workflow object. Each stage posts the relevant prior decisions to its corresponding Express endpoint. The server selects the stage-specific prompt, calls the configured OpenAI-compatible chat completions endpoint for structured JSON, or returns a deterministic realistic demo result when `AI_API_KEY` is absent. API keys stay on the server. The workflow deliberately chains discovery → positioning → directions → selected direction → shape → visual direction → challenge → launch/consistency instead of asking one prompt to produce everything.

## Tech stack

- Frontend: React 18, Vite, React Router, Framer Motion, Tailwind CSS, Lucide icons.
- Backend: Node.js, Express, Zod and dotenv.
- AI: configurable OpenAI-compatible provider adapter; demo mode requires no credentials.

## Install and run

Use two terminals from the project root.

### Backend

```sh
cd backend
npm install
cp .env.example .env
npm run dev
```

The API listens on `http://localhost:8787` by default.

### Frontend

```sh
cd frontend
npm install
npm run dev
```

Open the Vite URL (normally `http://localhost:5173`). Vite proxies `/api` to the backend.

On Windows PowerShell, copy the environment file with `Copy-Item .env.example .env`.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | Express port | `8787` |
| `FRONTEND_ORIGIN` | CORS origin(s), comma-separated | unrestricted for local demo |
| `AI_PROVIDER` | `openai` or `openai-compatible` | `openai` |
| `AI_API_KEY` | Server-side provider key; omit for demo mode | empty |
| `AI_MODEL` | Model name | `gpt-4o-mini` |
| `AI_BASE_URL` | OpenAI-compatible API root | `https://api.openai.com/v1` |

Without `AI_API_KEY`, all API stages return grounded demo content and the interface indicates demo mode. The browser never receives the key. Provider errors and malformed JSON are surfaced as stage errors; the client offers retry by revisiting the stage.

## API endpoints

All workflow endpoints accept a JSON object containing the accumulated workflow context and return stage JSON plus `mode` (`AI` or `DEMO`). Invalid/empty contexts return HTTP 400.

| Method | Endpoint | Result |
| --- | --- | --- |
| GET | `/api/health` | Health and configured/demo status |
| POST | `/api/discover` | Problem, audience, context, goals, constraints, assumptions and questions |
| POST | `/api/position` | Category, audience, differentiator, value proposition and pitch |
| POST | `/api/directions` | Three strategically distinct brand routes |
| POST | `/api/shape` | Traits, naming territories, shortlist, tagline, messages and voice |
| POST | `/api/visualize` | Palette, typography, imagery, shapes and symbol direction |
| POST | `/api/challenge` | Specific strengths, generic risks, conflicts, changes and directional score |
| POST | `/api/launch` | Hero headline, pitch and social launch copy |
| POST | `/api/consistency` | Directional content match, conflicts and a suggested revision |

## Project structure

```text
frontend/                 React + Vite client
  src/components/         Reusable component location
  src/context/            Persistent shared workflow and theme state
  src/data/                Demo brand system
  src/pages/               Page extension point
  src/services/            API client
  src/App.jsx              Routed workflow experience and screens
  src/index.css            Theme tokens, responsive system and motion
backend/
  prompts/                 Stage-specific structured prompts
  routes/                  Validated Express endpoints
  services/                Provider adapter, demo responses and workflow orchestration
  server.js                Express entry point
```

## Notes

The downloadable file is a self-contained printable HTML brand kit. Browser local storage holds the current project and theme. Demo brand copy demonstrates the full flow without an API credential; for an LLM-backed run, add a server key to `backend/.env` and restart the backend.
