import { NextRequest, NextResponse } from 'next/server';
import { generateCopilotAnswer } from '@/lib/copilotEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, history } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const fastApiUrl = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000';

    // 1. Try real-time Python FastAPI backend (which runs Groq with openai/gpt-oss-120b)
    try {
      const fastApiResponse = await fetch(`${fastApiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: history || [] }),
        // 12-second timeout
        signal: AbortSignal.timeout(12000),
      });

      if (fastApiResponse.ok) {
        const data = await fastApiResponse.json();
        return NextResponse.json({
          ...data,
          source: 'fastapi_python_groq',
          liveBackendConnected: true,
        });
      }
    } catch (backendErr: any) {
      console.warn('FastAPI backend request failed, falling back to direct engine:', backendErr?.message);
    }

    // 2. Direct Groq fallback if Python backend is temporarily unreachable
    const groqKey = process.env.GROQ_API_KEY;

if (groqKey) {
      try {
        const groqDirectResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [
              {
                role: 'system',
                content: 'You are TwinFlow AI Copilot for Apex Technologies. Answer with concise workforce continuity intelligence regarding Arjun Mehta (Lead SRE, SPOF) and recommended backup Sarah Lin (Senior SRE, 65% workload).'
              },
              { role: 'user', content: question },
            ],
            max_tokens: 600,
            temperature: 0.3,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (groqDirectResponse.ok) {
          const groqData = await groqDirectResponse.json();
          const reply = groqData.choices?.[0]?.message?.content || '';
          const fallback = generateCopilotAnswer(question);
          return NextResponse.json({
            content: reply,
            confidenceScore: 98,
            evidenceSources: fallback.evidenceSources || [],
            uncertainties: fallback.uncertainties || [],
            modelUsed: 'openai/gpt-oss-120b (Direct Groq LPU)',
            source: 'groq_direct',
            liveBackendConnected: true,
          });
        }
      } catch (groqErr) {
        console.warn('Direct Groq call failed:', groqErr);
      }
    }

    // 3. High-fidelity deterministic fallback engine
    const analyticalResponse = generateCopilotAnswer(question);
    return NextResponse.json({
      ...analyticalResponse,
      modelUsed: 'TwinFlow Deterministic Graph Engine (Offline Fallback)',
      source: 'deterministic_engine',
      liveBackendConnected: false,
    });
  } catch (error: any) {
    console.error('Copilot API error:', error);
    return NextResponse.json(
      { error: 'Failed to process copilot query', details: error.message },
      { status: 500 }
    );
  }
}
