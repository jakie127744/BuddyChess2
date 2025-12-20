import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, TrendingUp, TrendingDown, AlertCircle, ChevronRight } from "lucide-react"

// Mock draft data
const topPlayers = [
  {
    rank: 1,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    tier: "Elite",
    adp: 1.2,
    trend: "up",
    projectedPoints: 342,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 2,
    name: "Tyreek Hill",
    team: "MIA",
    position: "WR",
    tier: "Elite",
    adp: 2.1,
    trend: "up",
    projectedPoints: 318,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 3,
    name: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    tier: "Elite",
    adp: 2.8,
    trend: "stable",
    projectedPoints: 312,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 4,
    name: "Bijan Robinson",
    team: "ATL",
    position: "RB",
    tier: "Elite",
    adp: 3.5,
    trend: "up",
    projectedPoints: 305,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 5,
    name: "Amon-Ra St. Brown",
    team: "DET",
    position: "WR",
    tier: "Elite",
    adp: 4.2,
    trend: "stable",
    projectedPoints: 298,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 6,
    name: "Breece Hall",
    team: "NYJ",
    position: "RB",
    tier: "Elite",
    adp: 4.9,
    trend: "down",
    projectedPoints: 292,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 7,
    name: "Ja'Marr Chase",
    team: "CIN",
    position: "WR",
    tier: "Elite",
    adp: 5.1,
    trend: "up",
    projectedPoints: 289,
    avatar: "/diverse-football-player.png",
  },
  {
    rank: 8,
    name: "Justin Jefferson",
    team: "MIN",
    position: "WR",
    tier: "Elite",
    adp: 5.7,
    trend: "stable",
    projectedPoints: 285,
    avatar: "/diverse-football-player.png",
  },
]

const draftTips = [
  "Don't reach for a QB early - wait until round 8-10 for value",
  "Target RBs with high touch volume in rounds 1-3",
  "Look for WRs on high-powered offenses",
  "Monitor injury reports closely during draft",
]

function getPositionColor(position: string) {
  switch (position) {
    case "RB":
      return "bg-primary/20 text-primary border-primary/50"
    case "WR":
      return "bg-accent/20 text-accent-foreground border-accent/50"
    case "QB":
      return "bg-chart-3/20 text-chart-3 border-chart-3/50"
    case "TE":
      return "bg-chart-4/20 text-chart-4 border-chart-4/50"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function DraftPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2">
            DRAFT ASSISTANT
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time player rankings and draft recommendations to build your championship team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Rankings Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search players..." className="pl-10" />
                  </div>
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      All
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      RB
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      WR
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      QB
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      TE
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player Rankings */}
            <Card>
              <CardHeader>
                <CardTitle>Top Available Players</CardTitle>
                <CardDescription>Based on projected points and value over replacement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPlayers.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all group cursor-pointer"
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0 w-10 text-center">
                        <div className="font-[family-name:var(--font-bebas)] text-2xl text-primary">{player.rank}</div>
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
                          {player.trend === "up" && <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />}
                          {player.trend === "down" && (
                            <TrendingDown className="w-4 h-4 text-destructive flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{player.team}</span>
                          <span>•</span>
                          <Badge variant="outline" className={getPositionColor(player.position)}>
                            {player.position}
                          </Badge>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">ADP: {player.adp}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden md:flex flex-col items-end gap-1">
                        <div className="text-sm font-medium text-foreground">{player.projectedPoints} pts</div>
                        <div className="text-xs text-muted-foreground">{player.tier}</div>
                      </div>

                      {/* Action */}
                      <Button size="sm" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Draft
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 bg-transparent">
                  Load More Players
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Draft Tips */}
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <CardTitle>Draft Strategy Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {draftTips.map((tip, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Draft Status */}
            <Card>
              <CardHeader>
                <CardTitle>Your Draft Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Roster Spots</span>
                    <span className="font-medium">0/15</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-0 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RB</span>
                    <span className="font-medium">0/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">WR</span>
                    <span className="font-medium">0/3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">QB</span>
                    <span className="font-medium">0/1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TE</span>
                    <span className="font-medium">0/1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">FLEX</span>
                    <span className="font-medium">0/2</span>
                  </div>
                </div>

                <Button className="w-full mt-4">Start Mock Draft</Button>
              </CardContent>
            </Card>

            {/* Position Scarcity */}
            <Card>
              <CardHeader>
                <CardTitle>Position Scarcity Index</CardTitle>
                <CardDescription>Value drops after tier breaks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">RB</span>
                  <Badge className="bg-destructive/20 text-destructive border-destructive/50">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">TE</span>
                  <Badge className="bg-destructive/20 text-destructive border-destructive/50">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">WR</span>
                  <Badge className="bg-accent/20 text-accent-foreground border-accent/50">Medium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">QB</span>
                  <Badge variant="outline">Low</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
