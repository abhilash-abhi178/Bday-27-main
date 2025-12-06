import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const msg = url.searchParams.get('msg') || 'no-msg'
    console.log('[/api/debug] client event:', msg)
  } catch (e) {
    console.log('[/api/debug] error parsing url', e)
  }
  return NextResponse.json({ ok: true })
}
