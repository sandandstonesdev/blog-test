import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { consent } = await request.json()
  
  if (consent === true) {
    // User gave consent - start telemetry
    const { startTelemetry } = await import('@/instrumentation.node')
    await startTelemetry()
    
    return NextResponse.json({ message: 'Telemetry enabled' })
  } else {
    // User revoked consent - stop telemetry
    const { stopTelemetry } = await import('@/instrumentation.node')
    await stopTelemetry()
    
    return NextResponse.json({ message: 'Telemetry disabled' })
  }
}
