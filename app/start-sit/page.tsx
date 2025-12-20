import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Search,
  AlertTriangle,
  Target,
  Shield,
  Activity,
} from "lucide-react"

const startSitDecisions = {
  mustStart: [
    {
      name: "Tyreek Hill",
      position: "WR",
      team: "MIA",
      opponent: "vs NYJ",
      confidence: 98,
      projectedPoints: 18.5,
      reasons: [
        "Top 5 WR in PPR formats",
        "Jets allow 3rd most fantasy points to WRs",
        "Averaged 22.4 points in last 3 games",
        "Elite target share (28.5%)",
      ],
      stats: { targets: 9.2, receptions: 6.8, yards: 98.5, tds: 0.8 },
    },
    {
      name: "Christian McCaffrey",
      position: "RB",
      team: "SF",
      opponent: "@ SEA",
      confidence: 99,
      projectedPoints: 24.2,
      reasons: [
        "RB1 overall in all formats",
        "Seahawks allow 2nd most rushing yards",
        "Touches leader in NFL (23.1 per game)",
        "Red zone workhorse (8 TDs in last 5 games)",
      ],
      stats: { carries: 18.5, rushYards: 89.2, targets: 4.6, tds: 1.4 },
    },
    {
      name: "Ja'Marr Chase",
      position: "WR",
      team: "CIN",
      opponent: "vs CLE",
      confidence: 96,
      projectedPoints: 19.8,
      reasons: [
        "Browns secondary ranks 28th vs WRs",
        "On pace for career-high targets",
        "Joe Burrow's favorite red zone target",
        "5+ receptions in every game this season",
      ],
      stats: { targets: 10.1, receptions: 7.2, yards: 103.5, tds: 0.9 },
    },
  ],
  toughDecisions: [
    {
      player1: {
        name: "Deebo Samuel",
        position: "WR",
        team: "SF",
        opponent: "@ SEA",
        projectedPoints: 14.8,
        pros: ["High ceiling in 49ers offense", "Rushing upside", "Favorable matchup"],
        cons: ["Target competition with Aiyuk", "Inconsistent usage", "Injury concern this week"],
      },
      player2: {
        name: "Amari Cooper",
        position: "WR",
        team: "CLE",
        opponent: "@ CIN",
        projectedPoints: 14.2,
        pros: ["Consistent target volume", "WR1 on Browns", "Good floor in PPR"],
        cons: ["Limited ceiling with Watson", "Tough CB matchup", "Lower TD upside"],
      },
      recommendation: "Deebo Samuel",
      reasoning:
        "Higher ceiling and rushing upside make Deebo the play despite injury concern. Monitor practice reports.",
      confidence: 62,
    },
    {
      player1: {
        name: "Travis Kelce",
        position: "TE",
        team: "KC",
        opponent: "vs DEN",
        projectedPoints: 13.5,
        pros: ["Elite TE1 upside", "Mahomes' safety valve", "Playoff experience"],
        cons: ["Age concerns", "Split targets with Rice", "Lower snap count recently"],
      },
      player2: {
        name: "Evan Engram",
        position: "TE",
        team: "JAX",
        opponent: "vs HOU",
        projectedPoints: 12.1,
        pros: ["High target volume", "PPR monster", "Lawrence's favorite target"],
        cons: ["Lower TD upside", "Injury-prone", "Inconsistent week-to-week"],
      },
      recommendation: "Travis Kelce",
      reasoning:
        "Kelce's ceiling remains elite and he's the safer playoff play. Engram has the volume but Kelce wins in high-leverage situations.",
      confidence: 68,
    },
  ],
  sitCandidates: [
    {
      name: "Courtland Sutton",
      position: "WR",
      team: "DEN",
      opponent: "@ KC",
      confidence: 82,
      projectedPoints: 8.2,
      reasons: [
        "Chiefs allow fewest fantasy points to WRs",
        "Russell Wilson struggling with accuracy",
        "Limited red zone opportunities",
        "Averaged only 6.1 points in last 3 games",
      ],
      betterOptions: ["Michael Pittman Jr.", "Jaylen Waddle", "Brandon Aiyuk"],
    },
    {
      name: "James Conner",
      position: "RB",
      team: "ARI",
      opponent: "vs SF",
      confidence: 79,
      projectedPoints: 9.5,
      reasons: [
        "49ers #1 ranked run defense",
        "Cardinals offense struggling",
        "Limited passing game work",
        "Game script likely unfavorable",
      ],
      betterOptions: ["Javonte Williams", "Raheem Mostert", "Gus Edwards"],
    },
  ],
}

const weeklyTrends = [
  {
    trend: "Weather Alert",
    icon: AlertTriangle,
    color: "text-yellow-500",
    description: "Buffalo game expected 20+ mph winds - fade passing games",
    affectedPlayers: ["Josh Allen", "Stefon Diggs", "Gabe Davis"],
  },
  {
    trend: "Injury Impact",
    icon: Activity,
    color: "text-red-500",
    description: "Travis Etienne OUT - Tank Bigsby becomes top 20 RB",
    affectedPlayers: ["Tank Bigsby", "D'Ernest Johnson"],
  },
  {
    trend: "Revenge Game",
    icon: Target,
    color: "text-primary",
    description: "DeAndre Hopkins vs Cardinals - high target game expected",
    affectedPlayers: ["DeAndre Hopkins"],
  },
  {
    trend: "Defensive Matchup",
    icon: Shield,
    color: "text-green-500",
    description: "Panthers give up most fantasy points to TEs this season",
    affectedPlayers: ["All TEs vs CAR"],
  },
]

export default function StartSitPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-3 sm:mb-4">
            START/SIT ASSISTANT
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Weekly lineup decisions made easy with matchup analysis and confidence ratings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for a player to get start/sit advice..."
                className="pl-10 h-12 text-base"
                aria-label="Search for players"
              />
            </div>

            <Tabs defaultValue="mustStart" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="mustStart" className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Must Start</span>
                  <span className="sm:hidden">Start</span>
                </TabsTrigger>
                <TabsTrigger value="toughCalls" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="hidden sm:inline">Tough Calls</span>
                  <span className="sm:hidden">Tough</span>
                </TabsTrigger>
                <TabsTrigger value="sit" className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  <span>Sit</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mustStart" className="space-y-4">
                {startSitDecisions.mustStart.map((player) => (
                  <Card key={player.name} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl sm:text-2xl">{player.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {player.position}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {player.team}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">{player.opponent}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl text-green-500">
                              {player.confidence}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Target className="w-5 h-5 text-primary" />
                        <span className="font-medium">Projected Points:</span>
                        <span className="font-[family-name:var(--font-bebas)] text-2xl text-primary">
                          {player.projectedPoints}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Why You Should Start Them:</h4>
                        <ul className="space-y-2">
                          {player.reasons.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t">
                        {Object.entries(player.stats).map(([stat, value]) => (
                          <div key={stat} className="text-center">
                            <div className="text-xs text-muted-foreground uppercase mb-1">
                              {stat.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="font-semibold">{value}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="toughCalls" className="space-y-6">
                {startSitDecisions.toughDecisions.map((decision, idx) => (
                  <Card key={idx} className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Tough Decision
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3 p-4 border rounded-lg bg-secondary/30">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-lg">{decision.player1.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {decision.player1.position}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {decision.player1.team} {decision.player1.opponent}
                            </p>
                            <p className="text-sm font-medium mt-2">Proj: {decision.player1.projectedPoints} pts</p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-green-600 mb-2">PROS:</p>
                            <ul className="space-y-1">
                              {decision.player1.pros.map((pro, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <TrendingUp className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-red-600 mb-2">CONS:</p>
                            <ul className="space-y-1">
                              {decision.player1.cons.map((con, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <TrendingDown className="w-3 h-3 text-red-500 mt-1 shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-3 p-4 border rounded-lg bg-secondary/30">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-lg">{decision.player2.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {decision.player2.position}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {decision.player2.team} {decision.player2.opponent}
                            </p>
                            <p className="text-sm font-medium mt-2">Proj: {decision.player2.projectedPoints} pts</p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-green-600 mb-2">PROS:</p>
                            <ul className="space-y-1">
                              {decision.player2.pros.map((pro, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <TrendingUp className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-red-600 mb-2">CONS:</p>
                            <ul className="space-y-1">
                              {decision.player2.cons.map((con, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                  <TrendingDown className="w-3 h-3 text-red-500 mt-1 shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            Our Recommendation
                          </h4>
                          <Badge className="bg-primary text-primary-foreground">
                            {decision.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="font-medium text-lg mb-2">Start: {decision.recommendation}</p>
                        <p className="text-sm text-muted-foreground">{decision.reasoning}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sit" className="space-y-4">
                {startSitDecisions.sitCandidates.map((player) => (
                  <Card key={player.name} className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl sm:text-2xl">{player.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {player.position}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {player.team}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">{player.opponent}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="font-[family-name:var(--font-bebas)] text-2xl sm:text-3xl text-red-500">
                              {player.confidence}%
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Sit Confidence</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <Target className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Projected Points:</span>
                        <span className="font-[family-name:var(--font-bebas)] text-2xl text-muted-foreground">
                          {player.projectedPoints}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Why You Should Sit Them:</h4>
                        <ul className="space-y-2">
                          {player.reasons.map((reason, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t">
                        <h4 className="font-semibold mb-3 text-sm">Better Options:</h4>
                        <div className="flex flex-wrap gap-2">
                          {player.betterOptions.map((option) => (
                            <Badge key={option} variant="secondary">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Trends</CardTitle>
                <CardDescription>Key factors affecting this week's decisions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyTrends.map((trend, idx) => {
                  const Icon = trend.icon
                  return (
                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${trend.color}`} />
                        <h4 className="font-semibold text-sm">{trend.trend}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{trend.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {trend.affectedPlayers.map((player) => (
                          <Badge key={player} variant="outline" className="text-xs">
                            {player}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Always check injury reports before Sunday morning</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Weather can significantly impact passing games</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Don't overthink studs - start your first rounders</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Target players facing weak defenses</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
