import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { leagueId, swid, s2, year } = await request.json();

    if (!leagueId) {
        return NextResponse.json({ error: "League ID is required" }, { status: 400 });
    }

    // Default to current season. 
    // IMPORTANT: NBA 2025-2026 Season is '2026' in ESPN API.
    const seasonId = year || 2026;
    
    // ESPN Fantasy Basketball API Endpoint
    // FBA = Fantasy Basketball
    const url = `https://fantasy.espn.com/apis/v3/games/fba/seasons/${seasonId}/segments/0/leagues/${leagueId}?view=mRoster&view=mMatchup&view=mSettings&view=mTeam`;

    // Try both Raw and Decoded s2 if possible, but let's stick to the raw input first or try a smart decode.
    // The user usually pastes the raw value from the browser which might contain % signs.
    // ESPN expects the decoded value in the cookie header usually.
    let finalS2 = s2;
    if (s2.includes('%')) {
        try {
            finalS2 = decodeURIComponent(s2);
        } catch (e) {
            console.warn("Failed to decode s2", e);
        }
    }

    const cookieHeader = `swid=${swid}; espn_s2=${finalS2};`;

    console.log(`Fetching ESPN Data for League ${leagueId}...`);

    const res = await fetch(url, {
      method: "GET",
      // IMPORTANT: Do not follow redirects. If they redirect us, it means Auth failed.
      redirect: 'manual', 
      headers: {
        'Cookie': cookieHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (res.status === 302 || res.status === 401 || res.status === 403) {
        console.error("ESPN Auth Failed:", res.status);
        return NextResponse.json({ 
            error: "Authentication Failed", 
            details: "Your SWID or espn_s2 cookies are invalid or expired. Please find them again." 
        }, { status: 401 });
    }

    if (!res.ok) {
        const errorText = await res.text();
        console.error("ESPN API Error:", res.status, errorText);
        return NextResponse.json({ error: `ESPN Error: ${res.statusText}`, details: errorText }, { status: res.status });
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
         const errorText = await res.text();
         console.error("Received HTML instead of JSON", errorText.substring(0, 500));
         return NextResponse.json({ 
             error: "Unexpected Response", 
             details: "ESPN returned HTML instead of JSON. Check League ID." 
         }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ 
        error: "Internal Server Error", 
        details: error.message,
        stack: error.stack 
    }, { status: 500 });
  }
}
