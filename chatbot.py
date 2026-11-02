# Imports
from groq import Groq
import sys

# Read API keys
api_key = GROQ_API_KEY=os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=api_key)

# Select model
model = "openai/gpt-oss-120b"

# TwinFlow Grounded System Context
SYSTEM_PROMPT = """You are TwinFlow AI Copilot, an enterprise workforce continuity intelligence agent for Apex Technologies.
Your goal is to help managers identify workforce dependencies, predict operational disruptions, optimize internal backup staffing, and preserve critical institutional knowledge.

ORGANIZATIONAL CONTEXT (APEX TECHNOLOGIES):
- Arjun Mehta: Lead Cloud & SRE Architect (EMP-104). Workload: 92%. Critical SPOF. Owns Multi-Region Kubernetes cluster failover (Task TSK-101), Project Apollo infrastructure delivery (Project PRJ-01), and eBPF live kernel tracing. 0 verified backups.
- Sarah Lin: Senior SRE (EMP-108). Workload: 65% (healthy 35% bandwidth buffer). 88% skill match for Arjun. RECOMMENDED primary backup because her balanced workload avoids operational burnout.
- Marcus Vance: Principal Enterprise Architect (EMP-102). Workload: 98% (severe burnout risk). 96% raw skill match, but assigning Arjun's duties to Marcus will derail Core Banking API V2 (Project PRJ-02).
- Elena Rostova: DevOps Engineer (EMP-115). Workload: 60%. Solid Linux/CI/CD foundation, but requires 28 hours of ramp-up in Terraform state locks. Viable as secondary support.

Always be concise, professional, and quote factual employee IDs and evidence sources."""

# Chat function
def chat():
    # Welcome message
    print("=" * 65)
    print("  TWINFLOW AI COPILOT — POWERED BY GROQ & OPENAI/GPT-OSS-120B")
    print("=" * 65)
    print("Welcome to the TwinFlow Chatbot! Type 'exit', 'quit', or 'end' to exit.\n")
    
    # Conversation history (list) with TwinFlow system grounding
    conversation_history = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Infinite loop
    while True:
        try:
            # User input
            user_input = input("\nYou: ")

            # Check for the exit condition (exit, quit, end)
            if user_input.lower().strip() in ["exit", "quit", "end"]:
                print("Chatbot: Goodbye!")
                break

            if not user_input.strip():
                continue

            # Add user input to conversation history
            conversation_history.append({"role": "user", "content": user_input})

            # Build a prompt using conversation history
            # Get the Groq response
            response = client.chat.completions.create(
                model=model,
                messages=conversation_history,
                max_tokens=600,
                temperature=0.4,
            )

            # extract the output text
            ai_output = response.choices[0].message.content

            # print the output text
            print(f"\nChatbot: {ai_output}")

            # add the ai message into the conversation history as an object with a role
            conversation_history.append({"role": "assistant", "content": ai_output})

        except Exception as e:
            # Add an exception message
            print(f"\nAI: Sorry, I encountered an error: {str(e)}")

# run the chatbot
if __name__ == "__main__":
    chat()
