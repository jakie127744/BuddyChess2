import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Clock, Activity, AlertCircle } from "lucide-react"

// Mock stats data
const trendingPlayers = [
  {
    name: "Puka Nacua",
    team: "LAR",
    position: "WR",
    trend: "+23%",
    reason: "Returning from injury Week 14",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Kyren Williams",
    team: "LAR",
    position: "RB",
    trend: "+18%",
    reason: "3 TDs in last 2 games",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Sam LaPorta",
    team: "DET",
    position: "TE",
    trend: "+15%",
    reason: "Target share increasing",
    avatar: "/diverse-football-player.png",
  },
]

const injuryReport = [
  {
    name: "Justin Jefferson",
    team: "MIN",
    position: "WR",
    status: "Questionable",
    injury: "Hamstring",
    impact: "Monitor practice reports",
    severity: "medium",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Jonathan Taylor",
    team: "IND",
    position: "RB",
    status: "Out",
    injury: "Ankle",
    impact: "Zack Moss becomes RB1",
    severity: "high",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Mike Evans",
    team: "TB",
    position: "WR",
    status: "Probable",
    injury: "Knee",
    impact: "Expected to play full workload",
    severity: "low",
    avatar: "/diverse-football-player.png",
  },
]

const recentNews = [
  {
    time: "2 hours ago",
    headline: "Christian McCaffrey expected to play despite illness",
    source: "ESPN",
    impact: "positive",
    players: ["Christian McCaffrey"],
  },
  {
    time: "4 hours ago",
    headline: "Bills to feature Cook more in passing game",
    source: "NFL Network",
    impact: "positive",
    players: ["James Cook"],
  },
  {
    time: "6 hours ago",
    headline: "Dolphins WR Tyreek Hill dealing with ankle injury",
    source: "Yahoo Sports",
    impact: "negative",
    players: ["Tyreek Hill"],
  },
  {
    time: "8 hours ago",
    headline: "Chiefs planning to limit Kelce's snaps in blowouts",
    source: "The Athletic",
    impact: "negative",
    players: ["Travis Kelce"],
  },
]

const topPerformers = [
  {
    name: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    stats: { rec: 12, yards: 158, tds: 2 },
    points: 33.8,
    week: "Week 13",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Raheem Mostert",
    team: "MIA",
    position: "RB",
    stats: { rush: 18, yards: 142, tds: 3 },
    points: 32.2,
    week: "Week 13",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Jalen Hurts",
    team: "PHI",
    position: "QB",
    stats: { pass: 315, rush: 45, tds: 4 },
    points: 31.6,
    week: "Week 13",
    avatar: "/diverse-football-player.png",
  },
]

function getInjuryColor(severity: string) {
  switch (severity) {
    case "high":
      return "bg-destructive/20 text-destructive border-destructive/50"
    case "medium":
      return "bg-accent/20 text-accent-foreground border-accent/50"
    case "low":
      return "bg-primary/20 text-primary border-primary/50"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function StatsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2">
            PLAYER STATS & NEWS
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time statistics, injury updates, and breaking news for all players
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search for any player..." className="pl-11 h-12 text-base" />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs for different views */}
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="news">Latest News</TabsTrigger>
                <TabsTrigger value="injuries">Injury Report</TabsTrigger>
                <TabsTrigger value="performers">Top Performers</TabsTrigger>
              </TabsList>

              <TabsContent value="news" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Breaking News</CardTitle>
                    <CardDescription>Latest updates affecting fantasy value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentNews.map((news, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {news.time}
                              </span>
                              <Badge
                                variant="outline"
                                className={
                                  news.impact === "positive"
                                    ? "bg-primary/20 text-primary border-primary/50"
                                    : "bg-destructive/20 text-destructive border-destructive/50"
                                }
                              >
                                {news.impact === "positive" ? "Good News" : "Concern"}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-foreground mb-1 leading-snug">{news.headline}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{news.source}</span>
                              <span>•</span>
                              <span className="text-primary">{news.players.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full mt-6 bg-transparent">
                      Load More News
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="injuries" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Injury Report</CardTitle>
                    <CardDescription>Current injury status and fantasy impact</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {injuryReport.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all"
                        >
                          <Avatar className="w-12 h-12 border-2 border-border">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{player.name}</h3>
                              <Badge variant="outline">{player.position}</Badge>
                              <Badge className={getInjuryColor(player.severity)}>{player.status}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              {player.team} • {player.injury}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-foreground">Impact: </span>
                              <span className="text-muted-foreground">{player.impact}</span>
                            </div>
                          </div>

                          <AlertCircle
                            className={`w-5 h-5 flex-shrink-0 ${
                              player.severity === "high"
                                ? "text-destructive"
                                : player.severity === "medium"
                                  ? "text-accent-foreground"
                                  : "text-primary"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Highest scoring players from last week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all"
                        >
                          <div className="flex-shrink-0 w-10 text-center">
                            <div className="font-[family-name:var(--font-bebas)] text-3xl text-primary">
                              {index + 1}
                            </div>
                          </div>

                          <Avatar className="w-12 h-12 border-2 border-border">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{player.name}</h3>
                              <Badge variant="outline">{player.position}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {player.team} • {player.week}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {player.position === "QB" && (
                                <>
                                  {player.stats.pass} pass yds, {player.stats.rush} rush yds, {player.stats.tds} TDs
                                </>
                              )}
                              {player.position === "RB" && (
                                <>
                                  {player.stats.rush} rush, {player.stats.yards} yds, {player.stats.tds} TDs
                                </>
                              )}
                              {player.position === "WR" && (
                                <>
                                  {player.stats.rec} rec, {player.stats.yards} yds, {player.stats.tds} TDs
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <div className="font-[family-name:var(--font-bebas)] text-2xl text-primary">
                              {player.points}
                            </div>
                            <div className="text-xs text-muted-foreground">Points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Players */}
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle>Trending Up</CardTitle>
                </div>
                <CardDescription>Players gaining fantasy value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingPlayers.map((player, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 border-2 border-border">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-foreground truncate">{player.name}</h3>
                          <span className="text-xs font-semibold text-primary whitespace-nowrap">{player.trend}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {player.team} • {player.position}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{player.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>League Leaders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Passing Yards</span>
                    <Badge variant="outline">QB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dak Prescott</span>
                    <span className="font-[family-name:var(--font-bebas)] text-xl text-primary">3,858</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Rushing Yards</span>
                    <Badge variant="outline">RB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Christian McCaffrey</span>
                    <span className="font-[family-name:var(--font-bebas)] text-xl text-primary">1,459</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Receiving Yards</span>
                    <Badge variant="outline">WR</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CeeDee Lamb</span>
                    <span className="font-[family-name:var(--font-bebas)] text-xl text-primary">1,416</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Touchdowns</span>
                    <Badge variant="outline">ALL</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tyreek Hill</span>
                    <span className="font-[family-name:var(--font-bebas)] text-xl text-primary">13</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Week Status */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Games Started</span>
                  <span className="font-medium">3/16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Games in Progress</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Games Remaining</span>
                  <span className="font-medium">13</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
