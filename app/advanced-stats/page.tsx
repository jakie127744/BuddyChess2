import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, Activity, Target, Zap } from "lucide-react"

const advancedMetrics = {
  runningBacks: [
    {
      name: "Christian McCaffrey",
      team: "SF",
      standardStats: { carries: 18.5, yards: 89.2, tds: 1.4 },
      advancedStats: {
        ypc: 4.8,
        yardsAfterContact: 3.2,
        evadedTackles: 2.8,
        targetShare: "19.2%",
        snapShare: "92%",
        redZoneCarries: 5.2,
        goalLineCarries: 2.1,
        brkTackles: 3.1,
      },
      efficiency: { successRate: "68%", epaPerPlay: 0.28 },
    },
    {
      name: "Bijan Robinson",
      team: "ATL",
      standardStats: { carries: 16.2, yards: 82.5, tds: 0.9 },
      advancedStats: {
        ypc: 5.1,
        yardsAfterContact: 3.8,
        evadedTackles: 3.2,
        targetShare: "14.5%",
        snapShare: "78%",
        redZoneCarries: 4.1,
        goalLineCarries: 1.6,
        brkTackles: 2.9,
      },
      efficiency: { successRate: "71%", epaPerPlay: 0.32 },
    },
    {
      name: "Saquon Barkley",
      team: "PHI",
      standardStats: { carries: 19.8, yards: 94.1, tds: 1.1 },
      advancedStats: {
        ypc: 4.7,
        yardsAfterContact: 3.5,
        evadedTackles: 3.5,
        targetShare: "12.8%",
        snapShare: "85%",
        redZoneCarries: 6.1,
        goalLineCarries: 2.3,
        brkTackles: 3.8,
      },
      efficiency: { successRate: "64%", epaPerPlay: 0.24 },
    },
  ],
  wideReceivers: [
    {
      name: "Tyreek Hill",
      team: "MIA",
      standardStats: { targets: 9.2, receptions: 6.8, yards: 98.5, tds: 0.8 },
      advancedStats: {
        targetShare: "28.5%",
        airYardsShare: "42.1%",
        averageDepth: 12.8,
        yardsPerRoute: 2.85,
        catchRate: "73.9%",
        yac: 4.2,
        redZoneTargets: 2.1,
        endZoneTargets: 1.2,
      },
      efficiency: { separationRate: "89%", contestedCatchRate: "58%" },
    },
    {
      name: "CeeDee Lamb",
      team: "DAL",
      standardStats: { targets: 10.5, receptions: 7.9, yards: 102.1, tds: 0.9 },
      advancedStats: {
        targetShare: "31.2%",
        airYardsShare: "38.5%",
        averageDepth: 10.5,
        yardsPerRoute: 3.12,
        catchRate: "75.2%",
        yac: 3.8,
        redZoneTargets: 2.8,
        endZoneTargets: 1.5,
      },
      efficiency: { separationRate: "84%", contestedCatchRate: "62%" },
    },
    {
      name: "Ja'Marr Chase",
      team: "CIN",
      standardStats: { targets: 10.1, receptions: 7.2, yards: 103.5, tds: 0.9 },
      advancedStats: {
        targetShare: "29.8%",
        airYardsShare: "45.2%",
        averageDepth: 13.5,
        yardsPerRoute: 2.95,
        catchRate: "71.3%",
        yac: 5.1,
        redZoneTargets: 2.5,
        endZoneTargets: 1.4,
      },
      efficiency: { separationRate: "82%", contestedCatchRate: "65%" },
    },
  ],
  quarterbacks: [
    {
      name: "Patrick Mahomes",
      team: "KC",
      standardStats: { attempts: 35.2, completions: 24.8, yards: 289.5, tds: 2.1, ints: 0.6 },
      advancedStats: {
        completionRate: "70.5%",
        yardsPerAttempt: 8.2,
        airYards: 315.2,
        timeToThrow: 2.68,
        pressureRate: "28.5%",
        blitzRate: "32.1%",
        redZoneAttempts: 5.8,
        deepBallAttempts: 6.2,
      },
      efficiency: { epaPerPlay: 0.34, successRate: "58%", qbr: 78.5 },
    },
    {
      name: "Josh Allen",
      team: "BUF",
      standardStats: { attempts: 36.8, completions: 23.9, yards: 301.2, tds: 2.3, ints: 0.8 },
      advancedStats: {
        completionRate: "65.0%",
        yardsPerAttempt: 8.2,
        airYards: 342.1,
        timeToThrow: 2.82,
        pressureRate: "31.2%",
        blitzRate: "29.5%",
        redZoneAttempts: 6.5,
        deepBallAttempts: 7.8,
      },
      efficiency: { epaPerPlay: 0.31, successRate: "55%", qbr: 75.2 },
    },
  ],
}

const metricExplanations = {
  yac: "Yards After Catch - Average yards gained after the catch",
  yardsAfterContact: "Average yards gained after first contact",
  targetShare: "Percentage of team targets received",
  snapShare: "Percentage of offensive snaps played",
  epaPerPlay: "Expected Points Added per play - measures efficiency",
  successRate: "Percentage of plays that gain expected yards",
  airYardsShare: "Percentage of team's air yards",
  yardsPerRoute: "Average yards per route run",
  separationRate: "How often player creates separation from defender",
}

export default function AdvancedStatsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-3 sm:mb-4">
            ADVANCED STATS DASHBOARD
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Deep dive into advanced metrics that matter: target share, snap counts, efficiency ratings, and more
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for a player..."
                  className="pl-10 h-12 text-base"
                  aria-label="Search for players"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="sm:w-48 h-12">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="qb">Quarterbacks</SelectItem>
                  <SelectItem value="rb">Running Backs</SelectItem>
                  <SelectItem value="wr">Wide Receivers</SelectItem>
                  <SelectItem value="te">Tight Ends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="rb" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="rb">Running Backs</TabsTrigger>
                <TabsTrigger value="wr">Wide Receivers</TabsTrigger>
                <TabsTrigger value="qb">Quarterbacks</TabsTrigger>
              </TabsList>

              <TabsContent value="rb" className="space-y-4">
                {advancedMetrics.runningBacks.map((player) => (
                  <Card key={player.name} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl sm:text-2xl">{player.name}</CardTitle>
                            <Badge variant="secondary">RB</Badge>
                            <Badge variant="outline">{player.team}</Badge>
                          </div>
                          <CardDescription>
                            {player.standardStats.carries} carries, {player.standardStats.yards} yds,{" "}
                            {player.standardStats.tds} TDs per game
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">EPA/Play</div>
                            <div className="flex items-center gap-1">
                              {player.efficiency.epaPerPlay > 0.25 ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-yellow-500" />
                              )}
                              <span className="font-semibold">{player.efficiency.epaPerPlay}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Success Rate</div>
                            <div className="font-semibold text-primary">{player.efficiency.successRate}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Usage & Volume
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Snap Share</div>
                              <div className="font-semibold text-lg">{player.advancedStats.snapShare}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Target Share</div>
                              <div className="font-semibold text-lg">{player.advancedStats.targetShare}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">RZ Carries</div>
                              <div className="font-semibold text-lg">{player.advancedStats.redZoneCarries}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">GL Carries</div>
                              <div className="font-semibold text-lg">{player.advancedStats.goalLineCarries}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            Efficiency Metrics
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">YPC</div>
                              <div className="font-semibold text-lg">{player.advancedStats.ypc}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">YAC</div>
                              <div className="font-semibold text-lg">{player.advancedStats.yardsAfterContact}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Evaded Tackles</div>
                              <div className="font-semibold text-lg">{player.advancedStats.evadedTackles}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Broken Tackles</div>
                              <div className="font-semibold text-lg">{player.advancedStats.brkTackles}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="wr" className="space-y-4">
                {advancedMetrics.wideReceivers.map((player) => (
                  <Card key={player.name} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl sm:text-2xl">{player.name}</CardTitle>
                            <Badge variant="secondary">WR</Badge>
                            <Badge variant="outline">{player.team}</Badge>
                          </div>
                          <CardDescription>
                            {player.standardStats.targets} targets, {player.standardStats.receptions} rec,{" "}
                            {player.standardStats.yards} yds, {player.standardStats.tds} TDs per game
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Y/Route</div>
                            <div className="font-semibold text-primary">{player.advancedStats.yardsPerRoute}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Catch %</div>
                            <div className="font-semibold">{player.advancedStats.catchRate}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            Target & Air Yards
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Target Share</div>
                              <div className="font-semibold text-lg">{player.advancedStats.targetShare}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Air Yards %</div>
                              <div className="font-semibold text-lg">{player.advancedStats.airYardsShare}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Avg Depth</div>
                              <div className="font-semibold text-lg">{player.advancedStats.averageDepth}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">RZ Targets</div>
                              <div className="font-semibold text-lg">{player.advancedStats.redZoneTargets}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            Efficiency & Skills
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">YAC</div>
                              <div className="font-semibold text-lg">{player.advancedStats.yac}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Separation</div>
                              <div className="font-semibold text-lg">{player.efficiency.separationRate}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Contested</div>
                              <div className="font-semibold text-lg">{player.efficiency.contestedCatchRate}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">EZ Targets</div>
                              <div className="font-semibold text-lg">{player.advancedStats.endZoneTargets}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="qb" className="space-y-4">
                {advancedMetrics.quarterbacks.map((player) => (
                  <Card key={player.name} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl sm:text-2xl">{player.name}</CardTitle>
                            <Badge variant="secondary">QB</Badge>
                            <Badge variant="outline">{player.team}</Badge>
                          </div>
                          <CardDescription>
                            {player.standardStats.completions}/{player.standardStats.attempts} for{" "}
                            {player.standardStats.yards} yds, {player.standardStats.tds} TDs per game
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">QBR</div>
                            <div className="font-semibold text-primary">{player.efficiency.qbr}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">EPA/Play</div>
                            <div className="font-semibold">{player.efficiency.epaPerPlay}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Passing Metrics
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Comp %</div>
                              <div className="font-semibold text-lg">{player.advancedStats.completionRate}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Y/A</div>
                              <div className="font-semibold text-lg">{player.advancedStats.yardsPerAttempt}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Air Yards</div>
                              <div className="font-semibold text-lg">{player.advancedStats.airYards}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Deep Balls</div>
                              <div className="font-semibold text-lg">{player.advancedStats.deepBallAttempts}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            Pressure & Efficiency
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Time to Throw</div>
                              <div className="font-semibold text-lg">{player.advancedStats.timeToThrow}s</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Pressure %</div>
                              <div className="font-semibold text-lg">{player.advancedStats.pressureRate}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Blitz %</div>
                              <div className="font-semibold text-lg">{player.advancedStats.blitzRate}</div>
                            </div>
                            <div className="p-3 bg-secondary rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Success %</div>
                              <div className="font-semibold text-lg">{player.efficiency.successRate}</div>
                            </div>
                          </div>
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
                <CardTitle className="text-lg">Metric Glossary</CardTitle>
                <CardDescription>Understanding advanced stats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(metricExplanations).map(([metric, explanation]) => (
                  <div key={metric} className="p-3 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-sm mb-1 uppercase">{metric.replace(/([A-Z])/g, " $1").trim()}</h4>
                    <p className="text-xs text-muted-foreground">{explanation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Thresholds</CardTitle>
                <CardDescription>What numbers to look for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start justify-between p-2 border-l-2 border-green-500 pl-3 bg-green-500/5">
                  <span>Target Share</span>
                  <span className="font-semibold">25%+</span>
                </div>
                <div className="flex items-start justify-between p-2 border-l-2 border-green-500 pl-3 bg-green-500/5">
                  <span>Snap Share</span>
                  <span className="font-semibold">70%+</span>
                </div>
                <div className="flex items-start justify-between p-2 border-l-2 border-green-500 pl-3 bg-green-500/5">
                  <span>EPA/Play</span>
                  <span className="font-semibold">0.20+</span>
                </div>
                <div className="flex items-start justify-between p-2 border-l-2 border-green-500 pl-3 bg-green-500/5">
                  <span>Success Rate</span>
                  <span className="font-semibold">50%+</span>
                </div>
                <div className="flex items-start justify-between p-2 border-l-2 border-green-500 pl-3 bg-green-500/5">
                  <span>Yards/Route</span>
                  <span className="font-semibold">2.0+</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  High target/snap share indicates consistent usage
                </p>
                <p className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  EPA measures true efficiency beyond basic stats
                </p>
                <p className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Red zone usage predicts future TD opportunities
                </p>
                <p className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  Air yards show downfield passing involvement
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
