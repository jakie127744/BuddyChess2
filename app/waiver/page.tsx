import { TrendingUp, AlertCircle, ArrowUp, ArrowDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WaiverPage() {
  const topAdds = [
    {
      name: "Malik Monk",
      team: "SAC",
      position: "SG",
      owned: "42%",
      trend: "+18%",
      reason: "Taking over starting role with injury",
      projection: 38.5,
      nextGames: ["vs LAL", "@ GSW", "vs PHX"],
      priority: "High",
    },
    {
      name: "Tari Eason",
      team: "HOU",
      position: "SF",
      owned: "38%",
      trend: "+22%",
      reason: "Breakout defensive stats, stocks machine",
      projection: 36.2,
      nextGames: ["@ OKC", "vs MEM", "@ DAL"],
      priority: "High",
    },
    {
      name: "Amen Thompson",
      team: "HOU",
      position: "PG",
      owned: "28%",
      trend: "+15%",
      reason: "Increased minutes with injury",
      projection: 32.1,
      nextGames: ["@ OKC", "vs MEM", "@ DAL"],
      priority: "Medium",
    },
    {
      name: "Coby White",
      team: "CHI",
      position: "PG",
      owned: "55%",
      trend: "+12%",
      reason: "Hot shooting streak, 25+ PPG last week",
      projection: 35.8,
      nextGames: ["vs BOS", "@ MIA", "vs ATL"],
      priority: "High",
    },
  ]

  const dropCandidates = [
    {
      name: "Kyle Kuzma",
      team: "WAS",
      reason: "Inconsistent minutes, team tanking",
      lastWeek: 18.2,
      dropRate: "+8%",
      replacement: "Malik Monk",
    },
    {
      name: "Jalen Suggs",
      team: "ORL",
      reason: "Injured, timeline uncertain",
      lastWeek: 0,
      dropRate: "+12%",
      replacement: "Coby White",
    },
    {
      name: "Marcus Smart",
      team: "MEM",
      reason: "Low usage, poor efficiency",
      lastWeek: 15.3,
      dropRate: "+5%",
      replacement: "Amen Thompson",
    },
  ]

  const streamingOptions = [
    {
      name: "Josh Okogie",
      team: "PHX",
      position: "SF",
      games: 4,
      matchups: ["vs POR", "@ LAC", "vs UTA", "@ SAC"],
      projectedTotal: 52.4,
      reason: "4 games this week with favorable matchups",
    },
    {
      name: "Kenrich Williams",
      team: "OKC",
      position: "SF",
      games: 4,
      matchups: ["vs HOU", "@ MIN", "vs LAL", "@ DEN"],
      projectedTotal: 48.1,
      reason: "High stocks player with 4-game week",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            WAIVER WIRE ASSISTANT
          </h1>
          <p className="text-muted-foreground">Smart pickups and drops to improve your roster</p>
        </div>

        <Tabs defaultValue="adds" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="adds">Top Adds</TabsTrigger>
            <TabsTrigger value="drops">Drop Candidates</TabsTrigger>
            <TabsTrigger value="streaming">Streaming</TabsTrigger>
          </TabsList>

          <TabsContent value="adds" className="mt-6">
            <div className="grid gap-4">
              {topAdds.map((player, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide">{player.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{player.team}</Badge>
                            <Badge variant="outline">{player.position}</Badge>
                            <Badge
                              className={
                                player.priority === "High"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                              }
                            >
                              {player.priority} Priority
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{player.owned}</div>
                          <div className="text-xs text-muted-foreground">Ownership</div>
                          <div className="flex items-center gap-1 text-green-500 text-sm font-medium mt-1">
                            <ArrowUp className="w-3 h-3" />
                            {player.trend}
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{player.reason}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Projected FP/Game</div>
                          <div className="text-xl font-bold text-primary">{player.projection}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Next 3 Games</div>
                          <div className="flex gap-1">
                            {player.nextGames.map((game, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {game}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drops" className="mt-6">
            <div className="grid gap-4">
              {dropCandidates.map((player, idx) => (
                <Card key={idx} className="p-6 border-red-500/20">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-red-500/50">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide">{player.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {player.team}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{player.lastWeek}</div>
                          <div className="text-xs text-muted-foreground">Last Week FP</div>
                          <div className="flex items-center gap-1 text-red-500 text-sm font-medium mt-1">
                            <ArrowDown className="w-3 h-3" />
                            {player.dropRate}
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-500/5 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{player.reason}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-green-500/5 rounded-lg p-3 border border-green-500/20">
                        <span className="text-sm text-muted-foreground">Suggested Replacement</span>
                        <span className="font-semibold text-green-500">{player.replacement}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="streaming" className="mt-6">
            <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-2 tracking-wide">STREAMING STRATEGY</h3>
              <p className="text-sm text-muted-foreground">
                Players with multiple games this week who are widely available. Perfect for punt strategies or filling
                roster spots.
              </p>
            </Card>

            <div className="grid gap-4">
              {streamingOptions.map((player, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={player.name} />
                      <AvatarFallback>
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide">{player.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{player.team}</Badge>
                            <Badge variant="outline">{player.position}</Badge>
                            <Badge className="bg-primary/10 text-primary">{player.games} Games This Week</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{player.projectedTotal}</div>
                          <div className="text-xs text-muted-foreground">Total FP Projection</div>
                        </div>
                      </div>

                      <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                        <p className="text-sm">{player.reason}</p>
                      </div>

                      <div>
                        <div className="text-xs text-muted-foreground mb-2">This Week's Schedule</div>
                        <div className="flex flex-wrap gap-2">
                          {player.matchups.map((game, i) => (
                            <Badge key={i} variant="outline">
                              {game}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats Sidebar */}
        <Card className="p-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">WAIVER WIRE INSIGHTS</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary mb-1">156</div>
              <div className="text-sm text-muted-foreground">Players Added Today</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">Trending Pickups</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary mb-1">Wed</div>
              <div className="text-sm text-muted-foreground">Waivers Clear</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
