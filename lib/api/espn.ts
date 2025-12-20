export interface EspnTeam {
  id: number;
  abbrev: string;
  name: string; // "Team Smith"
  logo: string;
  owners: string[]; 
  roster: {
    entries: Array<{
       playerId: number;
       // We will need to map detailed player data from a separate manifest or hope the view provides names
       playerPoolEntry: {
          player: {
             fullName: string;
             id: number;
             proTeamId: number;
             stats?: any[];
          }
       }
    }>
  }
}

export interface EspnLeagueResponse {
  formattedTeams: EspnTeam[]; // We will process raw data into this
  raw: any;
}

export async function syncEspnLeague(leagueId: string, swid?: string, s2?: string, year: number = 2025) {
  try {
    const res = await fetch("/api/espn/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leagueId, swid, s2, year })
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Sync Failed:", error);
    throw error;
  }
}
