import { Search, TrendingUp, TrendingDown, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MatchupsPage() {
  const playerMatchups = {
    player: "Luka Doncic",
    team: "DAL",
    position: "PG",
    image: "/placeholder.svg?height=80&width=80",
  }

  const vsTeams = [
    {
      opponent: "LAL",
      games: 12,
      avgPoints: 31.4,
      avgRebounds: 9.2,
      avgAssists: 10.1,
      trend: "up",
      rating: "Excellent",
      lastGame: { date: "Nov 15, 2024", points: 35, rebounds: 11, assists: 12 },
    },
    {
      opponent: "GSW",
      games: 15,
      avgPoints: 26.8,
      avgRebounds: 7.5,
      avgAssists: 8.3,
      trend: "down",
      rating: "Average",
      lastGame: { date: "Oct 28, 2024", points: 24, rebounds: 6, assists: 7 },
    },
    {
      opponent: "PHX",
      games: 18,
      avgPoints: 29.3,
      avgRebounds: 8.7,
      avgAssists: 9.4,
      trend: "up",
      rating: "Good",
      lastGame: { date: "Dec 10, 2024", points: 32, rebounds: 9, assists: 10 },
    },
  ]

  const topMatchups = [
    { player: "Tyrese Haliburton", opponent: "WAS", avgFP: 52.3, games: 8, trend: "+8.2" },
    { player: "Trae Young", opponent: "CHA", avgFP: 49.7, games: 10, trend: "+6.5" },
    { player: "Damian Lillard", opponent: "POR", avgFP: 48.1, games: 6, trend: "+11.3" },
    { player: "De'Aaron Fox", opponent: "HOU", avgFP: 46.8, games: 9, trend: "+5.7" },
  ]

  const worstMatchups = [
    { player: "LaMelo Ball", opponent: "MIA", avgFP: 28.4, games: 7, trend: "-12.1" },
    { player: "Darius Garland", opponent: "BOS", avgFP: 29.7, games: 6, trend: "-9.4" },
    { player: "Jordan Poole", opponent: "MEM", avgFP: 31.2, games: 8, trend: "-8.8" },
    { player: "Jalen Green", opponent: "MIN", avgFP: 32.5, games: 5, trend: "-7.3" },
  ]

  const defensiveRankings = [
    { team: "BOS", rank: 1, ptsAllowed: 104.2, opponentFG: "44.1%", rating: "Elite D" },
    { team: "OKC", rank: 2, ptsAllowed: 105.8, opponentFG: "44.8%", rating: "Elite D" },
    { team: "MIA", rank: 3, ptsAllowed: 107.1, opponentFG: "45.2%", rating: "Strong D" },
    { team: "CLE", rank: 4, ptsAllowed: 108.3, opponentFG: "45.9%", rating: "Strong D" },
    { team: "DAL", rank: 5, ptsAllowed: 109.7, opponentFG: "46.4%", rating: "Good D" },
  ]

  const positionVsTeam = [
    { position: "PG", easy: ["WAS", "CHA", "POR"], tough: ["BOS", "MIA", "OKC"] },
    { position: "SG", easy: ["SAC", "ATL", "IND"], tough: ["MEM", "HOU", "CLE"] },
    { position: "C", easy: ["GSW", "PHX", "DAL"], tough: ["BOS", "DEN", "LAL"] },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            HISTORICAL MATCHUP DATABASE
          </h1>
          <p className="text-muted-foreground">Find favorable and unfavorable matchups for any player</p>
        </div>

        <Tabs defaultValue="player" className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="player">Player Matchups</TabsTrigger>
            <TabsTrigger value="trending">Trending Matchups</TabsTrigger>
            <TabsTrigger value="defense">Team Defense</TabsTrigger>
          </TabsList>

          <TabsContent value="player" className="mt-6">
            <Card className="p-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search player to view matchup history..."
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Card>

            {/* Player Header */}
            <Card className="p-6 mb-6 border-2 border-primary/20">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-primary">
                  <AvatarImage src={playerMatchups.image || "/placeholder.svg"} alt={playerMatchups.player} />
                  <AvatarFallback>
                    {playerMatchups.player
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                    {playerMatchups.player}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{playerMatchups.team}</Badge>
                    <Badge variant="outline">{playerMatchups.position}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Matchup History */}
            <div className="grid gap-4">
              {vsTeams.map((matchup, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
                          VS {matchup.opponent}
                        </h3>
                        <Badge
                          className={
                            matchup.rating === "Excellent"
                              ? "bg-green-500/10 text-green-500"
                              : matchup.rating === "Good"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {matchup.rating} Matchup
                        </Badge>
                        {matchup.trend === "up" ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Career: {matchup.games} games</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-1">Avg Points</div>
                      <div className="text-2xl font-bold text-primary">{matchup.avgPoints}</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-1">Avg Rebounds</div>
                      <div className="text-2xl font-bold text-primary">{matchup.avgRebounds}</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-xs text-muted-foreground mb-1">Avg Assists</div>
                      <div className="text-2xl font-bold text-primary">{matchup.avgAssists}</div>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Last Meeting</div>
                        <div className="font-semibold">{matchup.lastGame.date}</div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">PTS:</span>{" "}
                          <span className="font-bold">{matchup.lastGame.points}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">REB:</span>{" "}
                          <span className="font-bold">{matchup.lastGame.rebounds}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">AST:</span>{" "}
                          <span className="font-bold">{matchup.lastGame.assists}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Best Matchups */}
              <div>
                <Card className="p-6 mb-4 bg-green-500/5 border-green-500/20">
                  <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-2 tracking-wide flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    BEST MATCHUPS THIS WEEK
                  </h2>
                  <p className="text-sm text-muted-foreground">Players with historically great matchups</p>
                </Card>

                <div className="space-y-3">
                  {topMatchups.map((player, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{player.player}</div>
                          <div className="text-sm text-muted-foreground">vs {player.opponent}</div>
                          <div className="text-xs text-muted-foreground mt-1">{player.games} career games</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{player.avgFP}</div>
                          <div className="text-xs text-muted-foreground">Avg FP</div>
                          <Badge className="bg-green-500/10 text-green-500 mt-1">+{player.trend}</Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Worst Matchups */}
              <div>
                <Card className="p-6 mb-4 bg-red-500/5 border-red-500/20">
                  <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-2 tracking-wide flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    TOUGH MATCHUPS THIS WEEK
                  </h2>
                  <p className="text-sm text-muted-foreground">Players facing historically tough defenses</p>
                </Card>

                <div className="space-y-3">
                  {worstMatchups.map((player, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{player.player}</div>
                          <div className="text-sm text-muted-foreground">vs {player.opponent}</div>
                          <div className="text-xs text-muted-foreground mt-1">{player.games} career games</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{player.avgFP}</div>
                          <div className="text-xs text-muted-foreground">Avg FP</div>
                          <Badge className="bg-red-500/10 text-red-500 mt-1">{player.trend}</Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Position-Specific Matchups */}
            <Card className="p-6 mt-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">
                POSITION-SPECIFIC MATCHUPS
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {positionVsTeam.map((pos, idx) => (
                  <div key={idx} className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-3 tracking-wide text-primary">
                      {pos.position}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Target className="w-3 h-3 text-green-500" />
                          Target These Teams
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pos.easy.map((team, i) => (
                            <Badge key={i} className="bg-green-500/10 text-green-500 text-xs">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Target className="w-3 h-3 text-red-500" />
                          Avoid These Teams
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pos.tough.map((team, i) => (
                            <Badge key={i} className="bg-red-500/10 text-red-500 text-xs">
                              {team}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="defense" className="mt-6">
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">
                TEAM DEFENSIVE RANKINGS
              </h2>
              <div className="space-y-2">
                {defensiveRankings.map((team, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                        {team.rank}
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-bebas)] text-xl tracking-wide">{team.team}</div>
                        <Badge
                          className={
                            team.rating === "Elite D"
                              ? "bg-red-500/10 text-red-500"
                              : team.rating === "Strong D"
                                ? "bg-orange-500/10 text-orange-500"
                                : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {team.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-8 text-sm">
                      <div className="text-right">
                        <div className="text-muted-foreground text-xs">PPG Allowed</div>
                        <div className="font-bold text-lg">{team.ptsAllowed}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground text-xs">Opp FG%</div>
                        <div className="font-bold text-lg">{team.opponentFG}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-3 tracking-wide">MATCHUP STRATEGY</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use defensive rankings to identify start/sit decisions. Avoid starting marginal players against top-5
                defenses. Target streamers and waiver pickups facing bottom-10 defenses.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                  <h4 className="font-semibold text-green-500 mb-2">Start With Confidence</h4>
                  <p className="text-sm">Players facing teams ranked 20+ in defense</p>
                </div>
                <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
                  <h4 className="font-semibold text-red-500 mb-2">Proceed With Caution</h4>
                  <p className="text-sm">Players facing top-5 defenses unless they are studs</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
