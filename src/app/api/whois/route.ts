import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://who-dat.as93.net/${domain}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Who-Dat API returned status: ${response.status}`);
      // Retornar erro com informações úteis
      return NextResponse.json(
        {
          error: 'WHOIS service unavailable',
          domain,
          message: 'The WHOIS lookup service is temporarily unavailable. Please try the manual links below.',
        },
        { status: 503 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WHOIS API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch WHOIS data',
        domain,
        message: 'Unable to connect to WHOIS service. Please try the manual links below.',
      },
      { status: 500 }
    );
  }
}
