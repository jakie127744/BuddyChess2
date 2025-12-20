import { TrendingUp, TrendingDown, AlertCircle, Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PlayoffOddsPage() {
  const teamStats = {
    rank: 4,
    record: "8-5",
    pointsFor: 1456,
    pointsAgainst: 1392,
    projectedWins: 10.2,
    playoffOdds: 78,
    byeOdds: 15,
  }

  const standings = [
    { rank: 1, team: "The Dynasty", record: "10-3", pf: 1589, odds: 99, trend: "up" },
    { rank: 2, team: "Hoops Masters", record: "9-4", pf: 1523, odds: 95, trend: "up" },
    { rank: 3, team: "Ballers United", record: "9-4", pf: 1487, odds: 92, trend: "stable" },
    { rank: 4, team: "Your Team", record: "8-5", pf: 1456, odds: 78, trend: "up", isYou: true },
    { rank: 5, team: "Court Kings", record: "8-5", pf: 1445, odds: 74, trend: "down" },
    { rank: 6, team: "Rim Rockers", record: "7-6", pf: 1398, odds: 58, trend: "stable" },
    { rank: 7, team: "Fast Break", record: "6-7", pf: 1356, odds: 32, trend: "down" },
    { rank: 8, team: "Slam Squad", record: "5-8", pf: 1298, odds: 12, trend: "down" },
  ]

  const scenarios = [
    {
      title: "Win Next 2 Games",
      impact: "+15%",
      odds: 93,
      description: "Clinches playoff spot with 2 wins",
      positive: true,
    },
    {
      title: "Lose Next 2 Games",
      impact: "-24%",
      odds: 54,
      description: "Drops to bubble team territory",
      positive: false,
    },
    {
      title: "Court Kings Loses Out",
      impact: "+8%",
      odds: 86,
      description: "Helps separation in standings",
      positive: true,
    },
  ]

  const remainingSchedule = [
    { week: 14, opponent: "Slam Squad", difficulty: "Easy", winProb: 72, importance: "Medium" },
    { week: 15, opponent: "The Dynasty", difficulty: "Hard", winProb: 38, importance: "High" },
    { week: 16, opponent: "Fast Break", difficulty: "Medium", winProb: 64, importance: "Critical" },
    { week: 17, opponent: "Rim Rockers", difficulty: "Medium", winProb: 58, importance: "Critical" },
  ]

  const magicNumber = 2

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            PLAYOFF ODDS CALCULATOR
          </h1>
          <p className="text-muted-foreground">Track your path to the championship</p>
        </div>

        <div className="grid gap-6">
          {/* Your Team Overview */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide mb-2">YOUR TEAM</h2>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-primary-foreground">Rank #{teamStats.rank}</Badge>
                  <Badge variant="outline">{teamStats.record}</Badge>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Trending Up</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary">{teamStats.playoffOdds}%</div>
                <div className="text-sm text-muted-foreground">Playoff Odds</div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl font-bold">{teamStats.pointsFor}</div>
                <div className="text-xs text-muted-foreground">Points For</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl font-bold">{teamStats.pointsAgainst}</div>
                <div className="text-xs text-muted-foreground">Points Against</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{teamStats.projectedWins}</div>
                <div className="text-xs text-muted-foreground">Projected Wins</div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{teamStats.byeOdds}%</div>
                <div className="text-xs text-muted-foreground">First Round Bye</div>
              </div>
            </div>
          </Card>

          {/* Magic Number */}
          <Card className="p-6 bg-green-500/5 border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide mb-1">MAGIC NUMBER</h3>
                <p className="text-sm text-muted-foreground">Wins needed to clinch playoff spot</p>
              </div>
              <div className="text-6xl font-bold text-green-500">{magicNumber}</div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Standings */}
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">LEAGUE STANDINGS</h2>
              <div className="space-y-2">
                {standings.map((team, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-lg ${team.isYou ? "bg-primary/10 border-2 border-primary" : "bg-secondary/30"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${team.rank <= 6 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                      >
                        {team.rank}
                      </div>
                      <div>
                        <div className="font-semibold">{team.team}</div>
                        <div className="text-xs text-muted-foreground">{team.record}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">PF</div>
                        <div className="font-semibold">{team.pf}</div>
                      </div>
                      <div className="text-right min-w-16">
                        <div className="text-2xl font-bold text-primary">{team.odds}%</div>
                        <div className="text-xs text-muted-foreground">Odds</div>
                      </div>
                      {team.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : team.trend === "down" ? (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Scenarios */}
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">WHAT IF SCENARIOS</h2>
              <div className="space-y-4">
                {scenarios.map((scenario, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${scenario.positive ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2">
                        {scenario.positive ? (
                          <Target className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-semibold mb-1">{scenario.title}</h3>
                          <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        </div>
                      </div>
                      <Badge
                        className={scenario.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
                      >
                        {scenario.impact}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm text-muted-foreground">New Playoff Odds</span>
                      <span className="text-2xl font-bold text-primary">{scenario.odds}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Remaining Schedule */}
          <Card className="p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">REMAINING SCHEDULE</h2>
            <div className="grid gap-3">
              {remainingSchedule.map((game, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">WK</div>
                        <div className="font-bold">{game.week}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">vs {game.opponent}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            game.difficulty === "Easy"
                              ? "border-green-500/50 text-green-500"
                              : game.difficulty === "Hard"
                                ? "border-red-500/50 text-red-500"
                                : "border-yellow-500/50 text-yellow-500"
                          }
                        >
                          {game.difficulty}
                        </Badge>
                        <Badge
                          className={
                            game.importance === "Critical"
                              ? "bg-red-500/10 text-red-500"
                              : game.importance === "High"
                                ? "bg-orange-500/10 text-orange-500"
                                : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {game.importance}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{game.winProb}%</div>
                    <div className="text-xs text-muted-foreground">Win Probability</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Playoff Picture */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">PLAYOFF PICTURE</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-500">Locked In (Top 6)</h3>
                <div className="space-y-2">
                  {standings.slice(0, 3).map((team, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg">
                      <span className="font-medium">{team.team}</span>
                      <Badge className="bg-green-500/10 text-green-500">{team.odds}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-yellow-500">Bubble Teams</h3>
                <div className="space-y-2">
                  {standings.slice(3, 6).map((team, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${team.isYou ? "bg-primary/10 border-2 border-primary" : "bg-yellow-500/5"}`}
                    >
                      <span className="font-medium">{team.team}</span>
                      <Badge className="bg-yellow-500/10 text-yellow-500">{team.odds}%</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
