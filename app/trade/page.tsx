"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Search,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react"
import { useState } from "react"

// Mock player data
const mockPlayers = [
  {
    id: 1,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    value: 95,
    projectedPoints: 18.5,
    avatar: "/diverse-football-player.png",
  },
  {
    id: 2,
    name: "Tyreek Hill",
    team: "MIA",
    position: "WR",
    value: 92,
    projectedPoints: 17.2,
    avatar: "/diverse-football-player.png",
  },
  {
    id: 3,
    name: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    value: 90,
    projectedPoints: 16.8,
    avatar: "/diverse-football-player.png",
  },
  {
    id: 4,
    name: "Bijan Robinson",
    team: "ATL",
    position: "RB",
    value: 88,
    projectedPoints: 16.3,
    avatar: "/diverse-football-player.png",
  },
]

const recentTrades = [
  {
    teamA: ["Ja'Marr Chase"],
    teamB: ["Amon-Ra St. Brown", "Tony Pollard"],
    rating: "Fair",
    winner: null,
  },
  {
    teamA: ["Travis Kelce"],
    teamB: ["Mark Andrews", "Zay Flowers"],
    rating: "Good",
    winner: "Team B",
  },
  {
    teamA: ["Josh Allen", "Alexander Mattison"],
    teamB: ["Lamar Jackson", "D.J. Moore"],
    rating: "Fair",
    winner: null,
  },
]

export default function TradePage() {
  const [givingPlayers, setGivingPlayers] = useState<typeof mockPlayers>([mockPlayers[0]])
  const [receivingPlayers, setReceivingPlayers] = useState<typeof mockPlayers>([mockPlayers[1]])

  const givingValue = givingPlayers.reduce((sum, p) => sum + p.value, 0)
  const receivingValue = receivingPlayers.reduce((sum, p) => sum + p.value, 0)
  const valueDiff = receivingValue - givingValue
  const tradeRating = Math.abs(valueDiff) <= 5 ? "Fair Trade" : valueDiff > 0 ? "Good for You" : "Good for Them"

  const removeGivingPlayer = (id: number) => {
    setGivingPlayers(givingPlayers.filter((p) => p.id !== id))
  }

  const removeReceivingPlayer = (id: number) => {
    setReceivingPlayers(receivingPlayers.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2">
            TRADE ANALYZER
          </h1>
          <p className="text-muted-foreground text-lg">
            Evaluate trade proposals and get instant feedback on fairness and value
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Trade Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Build Your Trade</CardTitle>
                <CardDescription>Add players to evaluate the trade value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* You Give Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">You Give</h3>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {givingPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-destructive/5"
                        >
                          <Avatar className="w-10 h-10 border-2 border-border">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground text-sm truncate">{player.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {player.position}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {player.team} • Value: {player.value} • {player.projectedPoints} pts/week
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={() => removeGivingPlayer(player.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      {givingPlayers.length === 0 && (
                        <div className="p-8 border border-dashed border-border rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">No players added yet</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 px-4">
                      <span className="text-sm text-muted-foreground">Total Value</span>
                      <span className="font-[family-name:var(--font-bebas)] text-2xl text-destructive">
                        {givingValue}
                      </span>
                    </div>
                  </div>

                  {/* Trade Arrow */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowLeftRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* You Receive Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">You Receive</h3>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {receivingPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-primary/5"
                        >
                          <Avatar className="w-10 h-10 border-2 border-border">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground text-sm truncate">{player.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {player.position}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {player.team} • Value: {player.value} • {player.projectedPoints} pts/week
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={() => removeReceivingPlayer(player.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      {receivingPlayers.length === 0 && (
                        <div className="p-8 border border-dashed border-border rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">No players added yet</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 px-4">
                      <span className="text-sm text-muted-foreground">Total Value</span>
                      <span className="font-[family-name:var(--font-bebas)] text-2xl text-primary">
                        {receivingValue}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" size="lg">
                  Analyze Trade
                </Button>
              </CardContent>
            </Card>

            {/* Trade Analysis Result */}
            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Trade Analysis</CardTitle>
                  {tradeRating === "Fair Trade" && (
                    <Badge className="bg-accent/20 text-accent-foreground border-accent/50">Fair Trade</Badge>
                  )}
                  {tradeRating === "Good for You" && (
                    <Badge className="bg-primary/20 text-primary border-primary/50">Good for You</Badge>
                  )}
                  {tradeRating === "Good for Them" && (
                    <Badge className="bg-destructive/20 text-destructive border-destructive/50">Good for Them</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Value Comparison */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Value Difference</span>
                    <span
                      className={`font-semibold ${
                        valueDiff > 0 ? "text-primary" : valueDiff < 0 ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {valueDiff > 0 ? "+" : ""}
                      {valueDiff} points
                    </span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden flex">
                    <div
                      className="bg-destructive transition-all"
                      style={{ width: `${(givingValue / (givingValue + receivingValue)) * 100}%` }}
                    />
                    <div
                      className="bg-primary transition-all"
                      style={{ width: `${(receivingValue / (givingValue + receivingValue)) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>You Give ({givingValue})</span>
                    <span>You Receive ({receivingValue})</span>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Pros
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">Better playoff schedule for incoming players</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">Consolidates roster spots</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">Addresses positional need at WR</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      Cons
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span className="text-muted-foreground">Giving up top-tier RB in PPR format</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span className="text-muted-foreground">Injury risk with incoming player</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span className="text-muted-foreground">Selling low on potential breakout</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Recommendation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tradeRating === "Fair Trade" &&
                          "This is a balanced trade. Consider your team needs and playoff matchups before deciding."}
                        {tradeRating === "Good for You" &&
                          "This trade favors you. Accept if the incoming players fill roster needs and have favorable schedules."}
                        {tradeRating === "Good for Them" &&
                          "This trade favors your opponent. Try to negotiate for additional value or counter with a different offer."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Community Trades */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Community Trades</CardTitle>
                <CardDescription>See how similar trades were evaluated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className={
                            trade.rating === "Fair"
                              ? "bg-accent/20 text-accent-foreground border-accent/50"
                              : "bg-primary/20 text-primary border-primary/50"
                          }
                        >
                          {trade.rating}
                        </Badge>
                        {trade.winner && <span className="text-xs text-muted-foreground">Winner: {trade.winner}</span>}
                      </div>

                      <div className="grid md:grid-cols-3 gap-3 items-center text-sm">
                        <div>
                          <div className="font-medium text-foreground mb-1">Team A Gave</div>
                          <div className="text-muted-foreground">{trade.teamA.join(", ")}</div>
                        </div>

                        <div className="flex justify-center">
                          <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                        </div>

                        <div>
                          <div className="font-medium text-foreground mb-1">Team B Gave</div>
                          <div className="text-muted-foreground">{trade.teamB.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Search */}
            <Card>
              <CardHeader>
                <CardTitle>Add Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search players..." className="pl-10" />
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {mockPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-card/50 transition-all cursor-pointer"
                    >
                      <Avatar className="w-8 h-8 border border-border">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">{player.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {player.team} • {player.position}
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trade Tips */}
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle>Trade Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    Target players with favorable playoff schedules (Weeks 15-17)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    Avoid trading for players with injury concerns or tough matchups
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">
                    2-for-1 trades can help upgrade if you have depth
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trade Deadline */}
            <Card className="bg-destructive/5 border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Trade Deadline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="font-[family-name:var(--font-bebas)] text-4xl text-destructive mb-2">5 DAYS</div>
                  <p className="text-sm text-muted-foreground">Saturday, December 9th at 11:59 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
