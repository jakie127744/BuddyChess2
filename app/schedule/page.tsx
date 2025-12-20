import { Search, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SchedulePage() {
  const players = [
    {
      name: "Nikola Jokic",
      team: "DEN",
      position: "C",
      image: "/placeholder.svg?height=64&width=64",
      remainingGames: 28,
      sosRank: 3,
      sosRating: "Easy",
      playoffSchedule: "Elite",
      nextWeek: 4,
      b2bGames: 3,
      restDays: 1.8,
    },
    {
      name: "Giannis Antetokounmpo",
      team: "MIL",
      position: "PF",
      image: "/placeholder.svg?height=64&width=64",
      remainingGames: 29,
      sosRank: 18,
      sosRating: "Hard",
      playoffSchedule: "Average",
      nextWeek: 3,
      b2bGames: 5,
      restDays: 1.5,
    },
    {
      name: "Luka Doncic",
      team: "DAL",
      position: "PG",
      image: "/placeholder.svg?height=64&width=64",
      remainingGames: 27,
      sosRank: 8,
      sosRating: "Medium",
      playoffSchedule: "Good",
      nextWeek: 4,
      b2bGames: 2,
      restDays: 2.1,
    },
  ]

  const weekSchedule = [
    { week: "Week 15", games: 4, difficulty: "Easy", opponents: ["POR", "SAC", "UTA", "LAL"] },
    { week: "Week 16", games: 3, difficulty: "Medium", opponents: ["PHX", "LAC", "GSW"] },
    { week: "Week 17", games: 4, difficulty: "Easy", opponents: ["MIN", "OKC", "HOU", "SAS"] },
    { week: "Week 18", games: 2, difficulty: "Hard", opponents: ["BOS", "MIL"] },
    { week: "Week 19 (Playoffs)", games: 4, difficulty: "Easy", opponents: ["WAS", "CHA", "DET", "ORL"] },
    { week: "Week 20 (Playoffs)", games: 4, difficulty: "Medium", opponents: ["NYK", "BKN", "ATL", "IND"] },
  ]

  const tradeTargets = [
    {
      type: "Buy Low",
      name: "Devin Booker",
      reason: "Brutal schedule past 2 weeks, elite playoff schedule ahead",
      sosImprovement: "+12 ranks",
      playoffGames: 12,
    },
    {
      type: "Sell High",
      name: "De'Aaron Fox",
      reason: "Easy schedule now, tough playoff schedule coming",
      sosChange: "-8 ranks",
      playoffGames: 8,
    },
    {
      type: "Buy Low",
      name: "Trae Young",
      reason: "Recent tough matchups, 4-game playoff weeks ahead",
      sosImprovement: "+9 ranks",
      playoffGames: 13,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            SCHEDULE ANALYZER
          </h1>
          <p className="text-muted-foreground">Identify playoff schedules and trade opportunities</p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Search */}
          <Card className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search player to analyze their schedule..."
                className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </Card>

          {/* Player Schedule Cards */}
          {players.map((player, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-primary">
                  <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                  <AvatarFallback>
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">{player.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{player.team}</Badge>
                    <Badge variant="outline">{player.position}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{player.remainingGames}</div>
                  <div className="text-xs text-muted-foreground">Games Left</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">SOS Rank</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">#{player.sosRank}</span>
                    <Badge
                      className={
                        player.sosRating === "Easy"
                          ? "bg-green-500/10 text-green-500"
                          : player.sosRating === "Hard"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {player.sosRating}
                    </Badge>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Playoff Schedule</div>
                  <div className="text-2xl font-bold text-primary">{player.playoffSchedule}</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Next Week</div>
                  <div className="text-2xl font-bold">{player.nextWeek} Games</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Back-to-Backs</div>
                  <div className="text-2xl font-bold">{player.b2bGames}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Remaining Schedule Breakdown
                </h4>
                <div className="grid gap-2">
                  {weekSchedule.slice(0, 3).map((week, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{week.week}</span>
                        <Badge variant="outline">{week.games} Games</Badge>
                        <Badge
                          className={
                            week.difficulty === "Easy"
                              ? "bg-green-500/10 text-green-500"
                              : week.difficulty === "Hard"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {week.difficulty}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {week.opponents.map((opp, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {opp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}

          {/* Playoff Schedule Visualization */}
          <Card className="p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">PLAYOFF WEEKS SCHEDULE</h2>
            <div className="grid gap-2">
              {weekSchedule.slice(4).map((week, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-primary/5 rounded-lg p-4 border border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{week.week}</span>
                    <Badge className="bg-primary/10 text-primary">{week.games} Games</Badge>
                    <Badge
                      className={
                        week.difficulty === "Easy"
                          ? "bg-green-500/10 text-green-500"
                          : week.difficulty === "Hard"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {week.difficulty}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    {week.opponents.map((opp, j) => (
                      <Badge key={j} variant="outline" className="text-xs">
                        {opp}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trade Opportunities */}
          <Card className="p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">
              SCHEDULE-BASED TRADE TARGETS
            </h2>
            <div className="grid gap-4">
              {tradeTargets.map((target, idx) => (
                <div key={idx} className="flex items-start justify-between bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {target.type === "Buy Low" ? (
                      <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-[family-name:var(--font-bebas)] text-lg tracking-wide">
                          {target.name}
                        </span>
                        <Badge
                          className={
                            target.type === "Buy Low" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }
                        >
                          {target.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{target.reason}</p>
                      <div className="flex gap-3 text-xs">
                        <span>
                          SOS Change: <span className="font-semibold">{target.sosImprovement || target.sosChange}</span>
                        </span>
                        <span>
                          Playoff Games: <span className="font-semibold">{target.playoffGames}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
