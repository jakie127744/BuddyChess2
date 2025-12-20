import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ComparePage() {
  const players = [
    {
      name: "Luka Doncic",
      team: "DAL",
      position: "PG",
      image: "/placeholder.svg?height=80&width=80",
      ppg: 28.4,
      apg: 9.1,
      rpg: 8.3,
      fg: "48.7%",
      fantasyRank: 3,
      nextGames: ["vs PHX", "@ LAL", "vs DEN"],
      trend: "up",
      projection: 52.3,
      usage: "36.2%",
    },
    {
      name: "Shai Gilgeous-Alexander",
      team: "OKC",
      position: "PG",
      image: "/placeholder.svg?height=80&width=80",
      ppg: 30.2,
      apg: 6.3,
      rpg: 5.5,
      fg: "51.3%",
      fantasyRank: 2,
      nextGames: ["@ MEM", "vs MIN", "@ HOU"],
      trend: "up",
      projection: 54.1,
      usage: "33.8%",
    },
  ]

  const comparisonMetrics = [
    { label: "Points Per Game", p1: 28.4, p2: 30.2, winner: 2 },
    { label: "Assists Per Game", p1: 9.1, p2: 6.3, winner: 1 },
    { label: "Rebounds Per Game", p1: 8.3, p2: 5.5, winner: 1 },
    { label: "Field Goal %", p1: 48.7, p2: 51.3, winner: 2 },
    { label: "Fantasy Points/Game", p1: 52.3, p2: 54.1, winner: 2 },
    { label: "Usage Rate", p1: 36.2, p2: 33.8, winner: 1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            PLAYER COMPARISON
          </h1>
          <p className="text-muted-foreground">Compare up to 4 players side-by-side</p>
        </div>

        <div className="grid gap-6 mb-8">
          {/* Player Selection */}
          <Card className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((slot) => (
                <div key={slot}>
                  <label className="text-sm font-medium mb-2 block">Player {slot}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search player..."
                      className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Player Cards Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {players.map((player, idx) => (
              <Card key={idx} className="p-6 border-2 border-primary/20">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-20 h-20 border-2 border-primary">
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
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        Rank #{player.fantasyRank}
                      </Badge>
                    </div>
                  </div>
                  {player.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-primary">{player.ppg}</div>
                    <div className="text-xs text-muted-foreground">PPG</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{player.apg}</div>
                    <div className="text-xs text-muted-foreground">APG</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{player.rpg}</div>
                    <div className="text-xs text-muted-foreground">RPG</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">FG%</span>
                    <span className="font-semibold">{player.fg}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Usage Rate</span>
                    <span className="font-semibold">{player.usage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projected FP</span>
                    <span className="font-semibold text-primary">{player.projection}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Next 3 Games</div>
                  <div className="flex gap-2">
                    {player.nextGames.map((game, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {game}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Head-to-Head Comparison */}
          <Card className="p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">HEAD-TO-HEAD STATS</h2>
            <div className="space-y-4">
              {comparisonMetrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-xs text-muted-foreground">Winner: Player {metric.winner}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-3 rounded-lg ${metric.winner === 1 ? "bg-primary/10 border-2 border-primary" : "bg-secondary"}`}
                    >
                      <div className="text-2xl font-bold">{metric.p1}</div>
                      <div className="text-xs text-muted-foreground">Luka Doncic</div>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${metric.winner === 2 ? "bg-primary/10 border-2 border-primary" : "bg-secondary"}`}
                    >
                      <div className="text-2xl font-bold">{metric.p2}</div>
                      <div className="text-xs text-muted-foreground">Shai Gilgeous-Alexander</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-2 tracking-wide">RECOMMENDATION</h3>
            <p className="text-sm mb-3">
              Based on the comparison, <strong>Shai Gilgeous-Alexander</strong> has the edge with higher scoring and
              efficiency, though <strong>Luka Doncic</strong> provides more assists and rebounds for category leagues.
            </p>
            <div className="flex gap-2">
              <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                Better for Points Leagues: SGA
              </Badge>
              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                Better for Category Leagues: Luka
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
