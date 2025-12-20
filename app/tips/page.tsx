import { Lightbulb, Target, Users, TrendingUp, Shield, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TipsPage() {
  const draftStrategies = [
    {
      title: "Zero RB Strategy",
      description: "Load up on elite WRs/TEs early, stream RBs from waiver",
      difficulty: "Advanced",
      bestFor: "PPR Leagues",
      icon: Target,
      pros: ["More consistent WR production", "RBs available late", "Injury protection"],
      cons: ["Requires active waiver management", "Risk of missing RB1s", "Not ideal in standard"],
    },
    {
      title: "Robust RB Strategy",
      description: "Draft 3 RBs in first 5 rounds to dominate scarcest position",
      difficulty: "Beginner",
      bestFor: "Standard Scoring",
      icon: Shield,
      pros: ["RB scarcity advantage", "Trade leverage", "Consistent point floor"],
      cons: ["Weak at WR early", "Injury vulnerability", "RB value drops fast"],
    },
    {
      title: "Late Round QB",
      description: "Wait on QB until round 10+, prioritize skill positions",
      difficulty: "Beginner",
      bestFor: "All Formats",
      icon: TrendingUp,
      pros: ["Max value at RB/WR", "QB depth abundant", "Stream matchups"],
      cons: ["Miss elite QB upside", "Inconsistent scoring", "Stress on bye weeks"],
    },
  ]

  const stackStrategies = [
    {
      type: "QB + WR Stack",
      description: "Draft a QB with their top receiver for correlated scoring",
      example: "Mahomes + Rice or Allen + Diggs",
      upside: "High",
      risk: "Medium",
      tips: ["Best for playoff ceiling", "Increases variance", "Great for tournaments"],
    },
    {
      type: "RB Handcuff",
      description: "Draft the backup to your elite RB to protect investment",
      example: "CMC + Elijah Mitchell",
      upside: "Medium",
      risk: "Low",
      tips: ["Insurance policy", "Best for injury-prone RBs", "Use late picks"],
    },
    {
      type: "Game Stack",
      description: "Multiple players from same high-scoring game",
      example: "Chiefs QB + WR + opposing team WR",
      upside: "Very High",
      risk: "High",
      tips: ["Leverage high totals", "DFS strategy", "Boom or bust"],
    },
  ]

  const positionTips = [
    {
      position: "RB",
      priority: "Elite",
      draftRange: "Rounds 1-3",
      streamable: false,
      tips: [
        "Prioritize volume and opportunity over talent",
        "Target 3-down backs with goal line work",
        "Avoid timeshares unless clear lead back",
        "Handcuff your elite RBs in later rounds",
      ],
    },
    {
      position: "WR",
      priority: "High",
      draftRange: "Rounds 2-6",
      streamable: true,
      tips: [
        "Target high-volume receivers (8+ targets/game)",
        "Value WR1s on their team over WR2s on better offenses",
        "Consider rookie WRs as late-round fliers",
        "Prioritize red zone targets for TD upside",
      ],
    },
    {
      position: "TE",
      priority: "Medium",
      draftRange: "Rounds 3-8",
      streamable: true,
      tips: [
        "Elite tier (Kelce, Andrews) worth premium",
        "Otherwise wait until round 8+",
        "Stream based on matchups after bye weeks",
        "Target pass-heavy offenses for volume",
      ],
    },
    {
      position: "QB",
      priority: "Low",
      draftRange: "Rounds 6-12",
      streamable: true,
      tips: [
        "Wait until round 10+ in most formats",
        "Rushing QBs provide higher floor",
        "Stream based on matchups and weather",
        "Draft 2 QBs max in standard leagues",
      ],
    },
  ]

  const weeklyStrategies = [
    {
      title: "Streaming Defense",
      tip: "Target defenses facing rookie QBs or bottom-5 offenses. Look for home games with low Vegas totals.",
    },
    {
      title: "Bye Week Planning",
      tip: "Draft players with staggered bye weeks. Keep 1-2 bench spots for bye week fill-ins starting week 5.",
    },
    {
      title: "Start Your Studs",
      tip: "Don't overthink it - start your best players even in tough matchups. Elite talent overcomes bad matchups.",
    },
    {
      title: "Weather Watch",
      tip: "Heavy rain/wind impacts passing games. Pivot to RBs and ground game in bad weather, avoid kickers.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            ROSTER CONSTRUCTION TIPS
          </h1>
          <p className="text-muted-foreground">Master strategies to dominate your league</p>
        </div>

        <Tabs defaultValue="draft" className="mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="draft">Draft Strategy</TabsTrigger>
            <TabsTrigger value="stacks">Stacking</TabsTrigger>
            <TabsTrigger value="positions">By Position</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="draft" className="mt-6">
            <div className="grid gap-6">
              {draftStrategies.map((strategy, idx) => {
                const Icon = strategy.icon
                return (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
                              {strategy.title}
                            </h3>
                            <p className="text-muted-foreground mt-1">{strategy.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={
                                strategy.difficulty === "Advanced"
                                  ? "bg-red-500/10 text-red-500"
                                  : "bg-green-500/10 text-green-500"
                              }
                            >
                              {strategy.difficulty}
                            </Badge>
                            <Badge variant="outline">{strategy.bestFor}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/20">
                        <h4 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Pros
                        </h4>
                        <ul className="space-y-1">
                          {strategy.pros.map((pro, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
                        <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Cons
                        </h4>
                        <ul className="space-y-1">
                          {strategy.cons.map((con, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="stacks" className="mt-6">
            <div className="grid gap-6">
              {stackStrategies.map((stack, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide mb-2">{stack.type}</h3>
                      <p className="text-muted-foreground mb-2">{stack.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{stack.example}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Upside</div>
                        <Badge
                          className={
                            stack.upside === "Very High" || stack.upside === "High"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {stack.upside}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Risk</div>
                        <Badge
                          className={
                            stack.risk === "High"
                              ? "bg-red-500/10 text-red-500"
                              : stack.risk === "Medium"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-green-500/10 text-green-500"
                          }
                        >
                          {stack.risk}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-1">
                      {stack.tips.map((tip, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions" className="mt-6">
            <div className="grid gap-4">
              {positionTips.map((pos, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">{pos.position}</h3>
                        <Badge
                          className={
                            pos.priority === "Elite"
                              ? "bg-red-500/10 text-red-500"
                              : pos.priority === "High"
                                ? "bg-orange-500/10 text-orange-500"
                                : pos.priority === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-green-500/10 text-green-500"
                          }
                        >
                          {pos.priority} Priority
                        </Badge>
                        {pos.streamable && (
                          <Badge variant="outline" className="text-xs">
                            Streamable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Typical Draft Range: {pos.draftRange}</p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {pos.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {weeklyStrategies.map((item, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.tip}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-2xl mb-3 tracking-wide">WEEKLY CHECKLIST</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Check injury reports (Friday)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Review weather forecasts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Check Vegas lines and totals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Monitor practice reports</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Set lineup before Thursday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Check for late scratches (Sunday AM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Plan waiver claims (Tuesday)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded border-2 border-primary" />
                    <span className="text-sm">Review bye weeks ahead</span>
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
