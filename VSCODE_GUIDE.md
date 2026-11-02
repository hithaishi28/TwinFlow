# TWINFLOW — VS Code Setup & Run Guide
### AI-Powered Workforce Digital Twin for Organizational Continuity

This guide explains how to open, install, and run **TWINFLOW** locally on your machine in **Visual Studio Code**.

---

## 📋 Prerequisites
1. **Node.js**: Version 18.x or 20.x ([Download Node.js](https://nodejs.org/))
2. **Python**: Version 3.10, 3.11, or 3.12+ ([Download Python](https://python.org/))
3. **VS Code**: Visual Studio Code with the recommended extensions:
   - *Tailwind CSS IntelliSense*
   - *Python*
   - *ESLint*

---

## 🚀 1-Click Fast Start in VS Code

### Step 1: Open the Project in VS Code
1. Extract the downloaded `twinflow-source.zip` folder.
2. In VS Code, go to **File > Open Folder...** and select the extracted `twinflow` directory.
3. Open a new terminal in VS Code: **Terminal > New Terminal** (`Ctrl + \``).

---

### Step 2: Set Up & Run the Python AI Backend
In your VS Code terminal (Terminal 1):

```bash
# 1. Install Python dependencies
pip install -r backend/requirements.txt

# 2. Launch FastAPI service on port 8000
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

* Backend health status is live at: `http://127.0.0.1:8000/health`
* Interactive API documentation (Swagger UI): `http://127.0.0.1:8000/docs`

---

### Step 3: Set Up & Run the Next.js Frontend
Open a **second terminal split** in VS Code (**Terminal > Split Terminal** or click `+`):

```bash
# 1. Install frontend packages
npm install

# 2. Start development server
npm run dev
```

* The full TWINFLOW interface will be live at: **`http://localhost:3000`**

---

### Step 4 (Optional): Run the Standalone CLI Chatbot
In a third terminal window:

```bash
python chatbot.py
```
This launches the interactive terminal chatbot directly grounded in the Apex Technologies organizational graph.

---

## 🔑 Environment Variables
The `.env.local` file is pre-configured with default settings:
```ini
NEXT_PUBLIC_APP_NAME="TWINFLOW"
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
GROQ_API_KEY=os.getenv("GROQ_API_KEY")
GROQ_MODEL="openai/gpt-oss-120b"
```

---

## 🎯 Guided Demonstration Flow (for Judges)
1. **Enterprise SSO (`/login`)**: Use any 1-Click Quick Profile (e.g. *Chief Risk Officer*) to authenticate.
2. **Executive Dashboard (`/` & `/dashboard`)**: Inspect the baseline Continuity Score (68%) and Arjun Mehta SPOF alert.
3. **Dependency Radar (`/dependencies`)**: Review the interactive SVG network graph.
4. **Disruption Simulator (`/simulator`)**: Simulate Arjun Mehta's 14-day absence.
5. **Continuity Optimizer (`/optimizer`)**: Compare Sarah Lin vs. Marcus Vance under workload constraints.
6. **Knowledge Hub (`/knowledge`)**: Synthesize the automated 4-module AI handover runbook.
7. **AI Copilot (`/copilot`)**: Ask *"Why is Sarah Lin recommended over Marcus Vance?"*
8. **Continuity Playbooks (`/playbooks`)**: Click **Execute All Playbook Actions**; return to the dashboard to observe the score elevate from **68% to 84%**.
9. **Reports & Analytics (`/reports`)**: Click **Export PDF Briefing** to download the audit-ready executive document.
