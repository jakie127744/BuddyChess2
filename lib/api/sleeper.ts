export interface SleeperState {
  week: number;
  season_type: string;
  season: string;
  day: number;
}

export interface TrendingPlayer {
  player_id: string;
  count: number;
}

const SLEEPER_API_BASE = "https://api.sleeper.app/v1";

export async function getNflState(): Promise<SleeperState | null> {
  try {
    const res = await fetch(`${SLEEPER_API_BASE}/state/nfl`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch NFL state");
    return await res.json();
  } catch (error) {
    console.error("Error fetching NFL state:", error);
    return null;
  }
}

export async function getTrendingPlayers(
  sport: string = "nfl",
  type: "add" | "drop" = "add"
): Promise<TrendingPlayer[]> {
  try {
    const res = await fetch(`${SLEEPER_API_BASE}/players/${sport}/trending/${type}?lookback_hours=24&limit=5`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch trending ${sport} players`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching trending ${sport} players:`, error);
    return [];
  }
}
