import { Settings, TrendingUp, Users, Calculator } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const scoringSettings = [
    { category: "Passing TD", standard: 4, current: 6, impact: "+15%", positions: ["QB"] },
    { category: "Passing Yards", standard: "1 per 25", current: "1 per 20", impact: "+8%", positions: ["QB"] },
    { category: "Rushing Yards", standard: "1 per 10", current: "1 per 10", impact: "0%", positions: ["RB", "WR"] },
    { category: "Rushing TD", standard: 6, current: 6, impact: "0%", positions: ["RB", "WR", "QB"] },
    { category: "Reception", standard: 0, current: 1, impact: "+25%", positions: ["WR", "TE", "RB"] },
    {
      category: "Receiving Yards",
      standard: "1 per 10",
      current: "1 per 10",
      impact: "0%",
      positions: ["WR", "TE", "RB"],
    },
    { category: "Receiving TD", standard: 6, current: 6, impact: "0%", positions: ["WR", "TE", "RB"] },
  ]

  const rosterSettings = {
    qb: { slots: 1, standard: 1 },
    rb: { slots: 2, standard: 2 },
    wr: { slots: 2, standard: 2 },
    te: { slots: 1, standard: 1 },
    flex: { slots: 1, standard: 1 },
    bench: { slots: 6, standard: 6 },
    ir: { slots: 2, standard: 1 },
  }

  const impactedPlayers = [
    {
      name: "Patrick Mahomes",
      position: "QB",
      standardValue: 285,
      newValue: 342,
      change: "+20%",
      newRank: 1,
      oldRank: 3,
    },
    {
      name: "Christian McCaffrey",
      position: "RB",
      standardValue: 328,
      newValue: 378,
      change: "+15%",
      newRank: 2,
      oldRank: 1,
    },
    {
      name: "Cooper Kupp",
      position: "WR",
      standardValue: 245,
      newValue: 295,
      change: "+20%",
      newRank: 8,
      oldRank: 15,
    },
    {
      name: "Travis Kelce",
      position: "TE",
      standardValue: 198,
      newValue: 248,
      change: "+25%",
      newRank: 1,
      oldRank: 1,
    },
  ]

  const presets = [
    {
      name: "Standard",
      description: "Traditional scoring with no PPR",
      scoring: "No PPR, 6pt TDs",
      popularity: "35%",
    },
    {
      name: "Half PPR",
      description: "0.5 points per reception",
      scoring: "0.5 PPR, 6pt TDs",
      popularity: "40%",
    },
    {
      name: "Full PPR",
      description: "1 point per reception",
      scoring: "1 PPR, 6pt TDs",
      popularity: "20%",
    },
    {
      name: "Superflex",
      description: "QB premium league with extra flex",
      scoring: "1 PPR, 4pt pass TD, SF",
      popularity: "5%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            LEAGUE SETTINGS CONFIGURATOR
          </h1>
          <p className="text-muted-foreground">See how custom scoring affects player values</p>
        </div>

        <Tabs defaultValue="scoring" className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="scoring">Scoring Settings</TabsTrigger>
            <TabsTrigger value="roster">Roster Config</TabsTrigger>
            <TabsTrigger value="presets">League Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="scoring" className="mt-6">
            <div className="grid gap-6">
              {/* Current Settings Overview */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
                      YOUR LEAGUE SETTINGS
                    </h2>
                    <p className="text-sm text-muted-foreground">Modified PPR scoring with 6pt passing TDs</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Custom League</Badge>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">League Type</div>
                    <div className="font-semibold">Full PPR</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Teams</div>
                    <div className="font-semibold">12 Team</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Pass TD</div>
                    <div className="font-semibold">6 Points</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Format</div>
                    <div className="font-semibold">Redraft</div>
                  </div>
                </div>
              </Card>

              {/* Scoring Rules */}
              <Card className="p-6">
                <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">SCORING BREAKDOWN</h2>
                <div className="space-y-3">
                  {scoringSettings.map((rule, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{rule.category}</div>
                        <div className="flex gap-2">
                          {rule.positions.map((pos, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {pos}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Standard</div>
                          <div className="font-semibold">{rule.standard}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Your League</div>
                          <div className="font-semibold text-primary">{rule.current}</div>
                        </div>
                        <div className="min-w-20 text-right">
                          <Badge
                            className={
                              rule.impact === "0%" ? "bg-gray-500/10 text-gray-500" : "bg-green-500/10 text-green-500"
                            }
                          >
                            {rule.impact}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Most Impacted Players */}
              <Card className="p-6">
                <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  BIGGEST VALUE CHANGES
                </h2>
                <div className="space-y-3">
                  {impactedPlayers.map((player, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-lg">{player.newRank}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <Badge variant="outline" className="mt-1">
                            {player.position}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Standard</div>
                          <div className="font-semibold">{player.standardValue} pts</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground mb-1">Your League</div>
                          <div className="font-semibold text-primary">{player.newValue} pts</div>
                        </div>
                        <div className="text-right min-w-24">
                          <Badge className="bg-green-500/10 text-green-500">{player.change}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            #{player.oldRank} → #{player.newRank}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="roster" className="mt-6">
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                ROSTER CONFIGURATION
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(rosterSettings).map(([key, value], idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-lg uppercase">{key}</div>
                      <div className="text-xs text-muted-foreground">Starting slots</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Standard</div>
                        <div className="font-semibold">{value.standard}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Your League</div>
                        <div className="font-bold text-2xl text-primary">{value.slots}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-3 tracking-wide flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                ROSTER IMPACT ANALYSIS
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-500">Positions to Prioritize</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Standard roster sizes favor RBs in early rounds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Extra IR spots allow injury-risk picks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>1 TE league means wait on tight end</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-primary">Draft Strategy Adjustments</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Build depth at RB/WR for flex spots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Bench size allows handcuff strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Stream QB and TE based on matchups</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="presets" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {presets.map((preset, idx) => (
                <Card key={idx} className="p-6 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide mb-2">
                        {preset.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                      <Badge variant="outline">{preset.scoring}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{preset.popularity}</div>
                      <div className="text-xs text-muted-foreground">Popularity</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Load Preset
                  </button>
                </Card>
              ))}
            </div>

            <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-3 tracking-wide">CHOOSING A FORMAT</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Standard Scoring</p>
                    <p className="text-sm text-muted-foreground">
                      Best for casual leagues. Running backs dominate early rounds. More touchdown dependent.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">PPR Scoring</p>
                    <p className="text-sm text-muted-foreground">
                      Increases WR value significantly. Pass-catching RBs become premium. More consistent scoring week
                      to week.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Superflex/2QB</p>
                    <p className="text-sm text-muted-foreground">
                      Quarterbacks become extremely valuable. Draft 2 QBs in first 3 rounds. High scoring, QB focused.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
