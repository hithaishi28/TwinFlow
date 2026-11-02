import { NextRequest, NextResponse } from 'next/server';
import { runDisruptionSimulation } from '@/lib/simulationEngine';
import { SimulationScenario } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: SimulationScenario = await req.json();
    const result = runDisruptionSimulation(body);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
