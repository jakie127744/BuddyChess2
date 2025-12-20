export interface Player {
  id: string;
  name: string;
  position: "QB" | "RB" | "WR" | "TE" | "K" | "DEF";
  team: string;
  opponent?: string;
  imageUrl?: string;
  status?: "Active" | "Questionable" | "Doubtful" | "Out" | "IR";
  projectedPoints?: number;
  actualPoints?: number;
}

export interface League {
  id: string;
  name: string;
  platform: "Sleeper" | "ESPN" | "Yahoo";
  avatar?: string;
  record: string; // e.g., "6-4"
  rank: number;
  totalTeams: number;
  nextMatchup?: Matchup;
}

export interface Matchup {
  opponentName: string;
  opponentAvatar?: string;
  projectedScore: number;
  opponentProjectedScore: number;
  winProbability: number; // 0-100
}

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  player?: string;
  impact: "High" | "Medium" | "Low";
  type: "Injury" | "Transaction" | "Performance" | "Weather";
  timestamp: string;
}

export interface ActionItem {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}
