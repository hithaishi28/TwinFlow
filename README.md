# TWINFLOW — Workforce Digital Twin for Organizational Continuity

> **"See the workforce. Understand the dependencies. Protect the business."**

TwinFlow is a commercial-grade enterprise SaaS platform designed to help organizations identify workforce dependencies, predict operational disruptions, optimize continuity options, and safeguard critical institutional knowledge before absences or departures occur.

Developed for the **RNS Maverick Innovation Competition**.

---

## 🌟 The Seven Signature Features

1. **Organizational Single Point of Failure (SPOF) Detector (Dependency Radar)**
   - Interactive SVG/Canvas network graph visualizer connecting Employees, Skills, Tasks, Projects, and Business Processes.
   - Live centrality and single-source dependency calculations.
   - Click-to-inspect side telemetry drawer with supporting evidence and direct remediation shortcuts.

2. **What-If Workforce Disruption Simulator**
   - Interactive scenario builder supporting 14-day unexpected absences, resignations, 60-day medical leaves, and internal reallocations.
   - Deterministic impact propagation: computes stalled critical path tasks, estimated milestone slips (+18 days on Project Apollo), and workload deficit hours.
   - Dual-scenario comparison mode.

3. **Least-Disruptive Continuity Optimizer**
   - Multi-objective constraint ranking algorithm evaluating skill compatibility, experience, and critically **available bandwidth headroom** to prevent engineer burnout.
   - Side-by-side 3-candidate deep comparison matrix (Sarah Lin vs. Marcus Vance vs. Elena Rostova).
   - "Why This Recommendation?" transparent justification explaining why Sarah Lin is selected over Marcus Vance despite Marcus having a higher raw technical score.

4. **Knowledge Resilience & AI Handover Engine**
   - Codified organizational knowledge inventory with real-time freshness indices.
   - Automated 4-module handover runbook generator (System Access & Secret Delegation, Critical Runbooks, Operating Cadence, Shadow Sessions).
   - Interactive checklist with exportable Markdown format and document upload simulator.

5. **Organizational Continuity Score & Risk Heatmap**
   - Composite executive readiness score ($$68\% \rightarrow 84\%$$ upon playbook completion).
   - Department-level risk heatmap (Engineering: Critical, IT: High, Ops: Medium, Product: Low, HR: Low).
   - Formula transparency modal displaying exact mathematical weightings.

6. **Explainable AI Copilot & Confidence Intelligence**
   - Conversational AI assistant powered by OpenAI API routes (`/api/copilot`) with full offline deterministic graph fallback.
   - Every answer quotes structured data sources (Employee `#EMP-104`, Task `#TSK-101`, Runbook `#DOC-101`) with confidence ratings and stated assumptions.
   - Quick preset prompts, copy response, and user feedback mechanisms.

7. **Adaptive Continuity Playbooks & Before-After Simulator**
   - Dynamic action item generation with status tracking (Pending Review, Approved, Completed).
   - Manager authorization modals for consequential staffing changes.
   - Live before-and-after gauges: completing actions dynamically cascades updates to the Executive Dashboard in real time.

---

## 🚀 Complete End-to-End Guided Workflow: Arjun Mehta 14-Day Absence

TwinFlow includes an interactive **Guided Demo Tour** banner at the top of the interface:

1. **Step 1: Discover Risk** — View the Executive Dashboard (`/`); observe the baseline Continuity Score of 68% and Arjun Mehta flagged as an unbacked SPOF.
2. **Step 2: Inspect Graph** — Open Dependency Radar (`/dependencies`), select Arjun Mehta, and review downstream project impacts on Project Apollo.
3. **Step 3: Simulate Disruption** — Launch What-If Simulator (`/simulator`) for a 14-day absence; observe +18 days projected delivery slip.
4. **Step 4: Run Optimizer** — Navigate to Continuity Optimizer (`/optimizer`); compare Sarah Lin, Marcus Vance, and Elena Rostova, and confirm Sarah Lin as backup.
5. **Step 5: Generate Handover** — Access Knowledge Hub (`/knowledge`); inspect the synthesized 4-module handover checklist.
6. **Step 6: Query Copilot** — Consult AI Copilot (`/copilot`) with questions like *"Why was Sarah Lin recommended over Marcus Vance?"*; inspect grounded evidence sources.
7. **Step 7: Execute Playbook** — Open Continuity Playbooks (`/playbooks`); approve actions or click **"Execute All Playbook Actions"**.
8. **Step 8: Verify Results** — Return to Dashboard (`/`); verify score has climbed from **68% to 84%**, and Arjun Mehta's SPOF alert is cleared.

---

## 🛠️ Technology Stack & Architecture

- **Frontend & App Framework**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **State Management**: Reactive React Context (`TwinFlowContext`) with real-time score propagation and state persistence.
- **AI Integration**: Official OpenAI Node SDK (`openai`) via server-side API Route (`/api/copilot`). Configurable via `OPENAI_MODEL` with high-fidelity deterministic fallback engine if no API key is supplied.
- **Data & Ontology**: Structured dataset for *Apex Technologies* modeling 24 employees, 32 skills, 18 tasks, 8 projects, 12 business processes, and comprehensive knowledge assets.
- **Graph & Optimization Engine**: Deterministic centrality calculations, ripple impact propagation, and multi-objective constraint scoring.

---

## ⚡ Quick Start & Setup Instructions

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm or pnpm

### 1. Installation
In the project directory (`C:\Users\grees\.gemini\antigravity\scratch\twinflow`):
```bash
npm install
```

### 2. Environment Configuration (Optional)
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Add your OpenAI API key if you wish to test live LLM completions:
```env
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o
```
*(Note: If no API key is set, TwinFlow operates seamlessly using its built-in deterministic graph reasoning engine).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔒 Security & Enterprise Readiness

- **Role-Based Access Simulation**: Switch perspectives between Chief Risk Officer, VP of Engineering, HR Continuity Specialist, and Operations Director.
- **Grounded AI**: Zero hallucination guarantees—the AI assistant strictly quotes authenticated organizational records.
- **Confidential API Key Handling**: Secrets remain entirely on the server; zero credential exposure in client JavaScript bundles.
- **Fictional Data**: All person names, contact emails, and organizational project metrics are entirely fictional.

---

## 🧭 Application Routes

- `/` or `/dashboard`: Executive Continuity Command Center & Heatmap
- `/dependencies`: Dependency Radar & Single Point of Failure (SPOF) Detector
- `/workforce`: Workforce Digital Twin Directory & Employee Profiles
- `/simulator`: What-If Disruption Simulator
- `/optimizer`: Least-Disruptive Continuity Optimizer
- `/knowledge`: Knowledge Resilience & AI Handover Engine
- `/copilot`: Explainable AI Copilot & Grounded Evidence
- `/playbooks`: Adaptive Continuity Playbooks & Before/After Simulator
- `/risk`: Organizational Risk Intelligence & Telemetry
- `/reports`: Executive Board Reports & Analytics
- `/settings`: Enterprise Configuration & AI Model Settings
- `/login`: Enterprise Authentication & Role Switcher
