import { NextRequest, NextResponse } from 'next/server';
import { generateHandoverPlan } from '@/lib/handoverEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetEmployeeId, backupEmployeeId, durationDays } = body;

    const plan = generateHandoverPlan(
      targetEmployeeId || 'EMP-104',
      backupEmployeeId || 'EMP-108',
      Number(durationDays) || 14
    );

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
