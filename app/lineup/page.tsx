import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Lock, TrendingUp, AlertTriangle, CheckCircle2, ArrowUpDown } from "lucide-react"

// Mock lineup data
const startingLineup = [
  {
    position: "QB",
    player: {
      name: "Patrick Mahomes",
      team: "KC",
      opponent: "vs JAX",
      projectedPoints: 24.5,
      confidence: "high",
      matchupRating: "favorable",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "RB",
    player: {
      name: "Christian McCaffrey",
      team: "SF",
      opponent: "vs ARI",
      projectedPoints: 22.8,
      confidence: "high",
      matchupRating: "favorable",
      avatar: "/diverse-football-player.png",
    },
    locked: true,
  },
  {
    position: "RB",
    player: {
      name: "Bijan Robinson",
      team: "ATL",
      opponent: "@ NO",
      projectedPoints: 18.3,
      confidence: "medium",
      matchupRating: "neutral",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "WR",
    player: {
      name: "Tyreek Hill",
      team: "MIA",
      opponent: "vs BUF",
      projectedPoints: 21.7,
      confidence: "high",
      matchupRating: "favorable",
      avatar: "/diverse-football-player.png",
    },
    locked: true,
  },
  {
    position: "WR",
    player: {
      name: "CeeDee Lamb",
      team: "DAL",
      opponent: "@ PHI",
      projectedPoints: 19.4,
      confidence: "medium",
      matchupRating: "tough",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "WR",
    player: {
      name: "Amon-Ra St. Brown",
      team: "DET",
      opponent: "vs GB",
      projectedPoints: 17.9,
      confidence: "medium",
      matchupRating: "neutral",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "TE",
    player: {
      name: "Travis Kelce",
      team: "KC",
      opponent: "vs JAX",
      projectedPoints: 14.2,
      confidence: "high",
      matchupRating: "favorable",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "FLEX",
    player: {
      name: "Deebo Samuel",
      team: "SF",
      opponent: "vs ARI",
      projectedPoints: 16.5,
      confidence: "medium",
      matchupRating: "favorable",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
  {
    position: "K",
    player: {
      name: "Justin Tucker",
      team: "BAL",
      opponent: "@ CLE",
      projectedPoints: 9.8,
      confidence: "medium",
      matchupRating: "neutral",
      avatar: "/diverse-football-player.png",
    },
    locked: false,
  },
]

const benchPlayers = [
  {
    name: "Isiah Pacheco",
    team: "KC",
    position: "RB",
    opponent: "vs JAX",
    projectedPoints: 12.4,
    suggestion: "Consider starting over Deebo Samuel",
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Jaylen Waddle",
    team: "MIA",
    position: "WR",
    opponent: "vs BUF",
    projectedPoints: 15.2,
    suggestion: null,
    avatar: "/diverse-football-player.png",
  },
  {
    name: "Tony Pollard",
    team: "DAL",
    position: "RB",
    opponent: "@ PHI",
    projectedPoints: 11.8,
    suggestion: null,
    avatar: "/diverse-football-player.png",
  },
]

function getMatchupColor(rating: string) {
  switch (rating) {
    case "favorable":
      return "text-primary"
    case "tough":
      return "text-destructive"
    default:
      return "text-muted-foreground"
  }
}

function getConfidenceBadge(confidence: string) {
  switch (confidence) {
    case "high":
      return <Badge className="bg-primary/20 text-primary border-primary/50">High</Badge>
    case "medium":
      return <Badge variant="outline">Medium</Badge>
    default:
      return <Badge variant="outline">Low</Badge>
  }
}

export default function LineupPage() {
  const totalProjected = startingLineup.reduce((sum, slot) => sum + (slot.player?.projectedPoints || 0), 0)

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2">
            LINEUP OPTIMIZER
          </h1>
          <p className="text-muted-foreground text-lg">
            Maximize your weekly points with AI-powered lineup recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Lineup Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Optimize Banner */}
            <Card className="bg-primary/5 border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Optimization Available</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We found 2 potential improvements to boost your projected score by 4.2 points
                    </p>
                    <Button size="sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto-Optimize Lineup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Starting Lineup */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Starting Lineup</CardTitle>
                    <CardDescription>Week 14 - Sunday 1:00 PM ET</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="font-[family-name:var(--font-bebas)] text-3xl text-primary">
                      {totalProjected.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Projected Points</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {startingLineup.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all group"
                    >
                      {/* Position Label */}
                      <div className="flex-shrink-0 w-16">
                        <Badge variant="outline" className="w-full justify-center">
                          {slot.position}
                        </Badge>
                      </div>

                      {/* Player Info */}
                      {slot.player && (
                        <>
                          <Avatar className="w-10 h-10 border-2 border-border">
                            <AvatarImage src={slot.player.avatar || "/placeholder.svg"} alt={slot.player.name} />
                            <AvatarFallback>{slot.player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">{slot.player.name}</h3>
                              {slot.locked && <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{slot.player.team}</span>
                              <span>•</span>
                              <span className={getMatchupColor(slot.player.matchupRating)}>{slot.player.opponent}</span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="hidden md:flex flex-col items-end gap-1 mr-4">
                            <div className="text-sm font-semibold text-foreground">
                              {slot.player.projectedPoints} pts
                            </div>
                            {getConfidenceBadge(slot.player.confidence)}
                          </div>

                          {/* Matchup Indicator */}
                          <div className="flex-shrink-0">
                            {slot.player.matchupRating === "favorable" && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                            {slot.player.matchupRating === "tough" && (
                              <AlertTriangle className="w-5 h-5 text-destructive" />
                            )}
                            {slot.player.matchupRating === "neutral" && (
                              <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bench Players */}
            <Card>
              <CardHeader>
                <CardTitle>Bench Players</CardTitle>
                <CardDescription>Alternative options for your lineup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benchPlayers.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all group"
                    >
                      <Avatar className="w-10 h-10 border-2 border-border">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {player.position}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{player.team}</span>
                          <span>•</span>
                          <span>{player.opponent}</span>
                          <span>•</span>
                          <span className="font-medium">{player.projectedPoints} pts</span>
                        </div>
                        {player.suggestion && (
                          <div className="text-xs text-primary mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {player.suggestion}
                          </div>
                        )}
                      </div>

                      <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                        Swap
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Week Overview */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Matchups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Favorable</span>
                  <span className="text-sm font-medium text-primary">5 players</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Neutral</span>
                  <span className="text-sm font-medium">3 players</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tough</span>
                  <span className="text-sm font-medium text-destructive">1 player</span>
                </div>
              </CardContent>
            </Card>

            {/* Lineup Tips */}
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-foreground" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Start CMC:</span> Elite matchup vs ARI weak run
                      defense
                    </p>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Monitor CeeDee:</span> Tough matchup vs PHI elite
                      secondary
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Weather Alert:</span> Wind in Cleveland may impact
                      kickers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projected Standings */}
            <Card>
              <CardHeader>
                <CardTitle>League Projection</CardTitle>
                <CardDescription>Your team vs opponents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                        YOU
                      </div>
                      <span className="font-medium">Your Team</span>
                    </div>
                    <span className="font-[family-name:var(--font-bebas)] text-xl text-primary">
                      {totalProjected.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        OPP
                      </div>
                      <span className="text-sm">Opponent Team</span>
                    </div>
                    <span className="font-semibold text-muted-foreground">142.3</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Win Probability</span>
                      <span className="font-semibold text-primary">68%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
