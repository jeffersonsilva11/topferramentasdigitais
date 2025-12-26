import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://who-dat.as93.net/api/whois/${domain}`);

    if (!response.ok) {
      throw new Error('WHOIS API unavailable');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WHOIS API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch WHOIS data',
        domain,
      },
      { status: 500 }
    );
  }
}
