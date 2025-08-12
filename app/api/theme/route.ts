import {cookies} from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const ThemeSchema = z.object({
  theme: z.enum(['light', 'dark']),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ThemeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const cookieStore = await cookies()
  cookieStore.set('theme', parsed.data.theme, {
    maxAge: 60 * 60 * 24 * 365, // 1년
    sameSite: 'lax',
    httpOnly: true, // 클라 JS에서 직접 읽을 필요 없으면 true 권장
    secure: true,   // HTTPS 권장
  })

  return new NextResponse(null, { status: 204 });
}