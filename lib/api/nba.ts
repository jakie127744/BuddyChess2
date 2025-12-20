export interface NbaGame {
  id: string; // Changed to string to match API
  date: string;
  home_team: {
    id: number;
    full_name: string;
    abbreviation: string;
    score: number;
    wins: number;
    losses: number;
  };
  visitor_team: {
    id: number;
    full_name: string;
    abbreviation: string;
    score: number;
    wins: number;
    losses: number;
  };
  status: string; // "Final", "8:00 PM ET", etc.
}

interface NbaResponse {
  scoreboard: {
    games: Array<{
      gameId: string;
      gameCode: string; // "20240211/BOSMIA"
      gameStatusText: string;
      homeTeam: {
        teamId: number;
        teamName: string;
        teamTricode: string;
        score: number;
        wins: number;
        losses: number;
      };
      awayTeam: {
        teamId: number;
        teamName: string;
        teamTricode: string;
        score: number;
        wins: number;
        losses: number;
      };
    }>;
  };
}

export async function getUpcomingNbaGames(): Promise<NbaGame[]> {
  try {
    // Live NBA Scoreboard Data
    const res = await fetch("https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json", {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch NBA data");

    const data: NbaResponse = await res.json();

    return data.scoreboard.games.map((game) => ({
      id: game.gameId,
      date: game.gameCode.split("/")[0], // Extract YYYYMMDD
      home_team: {
        id: game.homeTeam.teamId,
        full_name: game.homeTeam.teamName, // "Nuggets" (City is separate in raw data, but name is fine)
        abbreviation: game.homeTeam.teamTricode,
        score: game.homeTeam.score,
        wins: game.homeTeam.wins,
        losses: game.homeTeam.losses
      },
      visitor_team: {
        id: game.awayTeam.teamId,
        full_name: game.awayTeam.teamName,
        abbreviation: game.awayTeam.teamTricode,
        score: game.awayTeam.score,
        wins: game.awayTeam.wins,
        losses: game.awayTeam.losses
      },
      status: game.gameStatusText,
    }));
  } catch (error) {
    console.error("Error fetching NBA games:", error);
    return [];
  }
}
