import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Calendar, TrendingUp, Users, Download, CheckCircle2 } from "lucide-react"

const byeWeekSchedule = {
  week5: [
    { team: "DET", key: ["Amon-Ra St. Brown", "David Montgomery", "Jared Goff"] },
    { team: "LAC", key: ["Austin Ekeler", "Keenan Allen", "Justin Herbert"] },
    { team: "PHI", key: ["Jalen Hurts", "A.J. Brown", "DeVonta Smith"] },
    { team: "TEN", key: ["Derrick Henry", "DeAndre Hopkins"] },
  ],
  week6: [
    { team: "KC", key: ["Patrick Mahomes", "Travis Kelce", "Isiah Pacheco"] },
    { team: "LAR", key: ["Cooper Kupp", "Puka Nacua", "Kyren Williams"] },
    { team: "MIA", key: ["Tyreek Hill", "Jaylen Waddle", "Raheem Mostert"] },
    { team: "MIN", key: ["Justin Jefferson", "Jordan Addison"] },
  ],
  week7: [
    { team: "CLE", key: ["Nick Chubb", "Amari Cooper", "Deshaun Watson"] },
    { team: "GB", key: ["Aaron Jones", "Christian Watson", "Jordan Love"] },
    { team: "IND", key: ["Jonathan Taylor", "Michael Pittman Jr."] },
    { team: "PIT", key: ["Najee Harris", "George Pickens"] },
  ],
  week9: [
    { team: "BUF", key: ["Josh Allen", "Stefon Diggs", "James Cook"] },
    { team: "DAL", key: ["Dak Prescott", "CeeDee Lamb", "Tony Pollard"] },
    { team: "JAX", key: ["Trevor Lawrence", "Travis Etienne", "Calvin Ridley"] },
    { team: "SF", key: ["Christian McCaffrey", "Deebo Samuel", "Brock Purdy"] },
  ],
  week13: [
    { team: "ATL", key: ["Bijan Robinson", "Drake London"] },
    { team: "CIN", key: ["Joe Burrow", "Ja'Marr Chase", "Tee Higgins"] },
    { team: "NO", key: ["Alvin Kamara", "Chris Olave"] },
    { team: "NYJ", key: ["Aaron Rodgers", "Garrett Wilson", "Breece Hall"] },
  ],
  week14: [
    { team: "ARI", key: ["James Conner", "Marquise Brown"] },
    { team: "CHI", key: ["D.J. Moore", "Justin Fields"] },
    { team: "HOU", key: ["C.J. Stroud", "Tank Dell", "Nico Collins"] },
    { team: "TB", key: ["Mike Evans", "Rachaad White", "Baker Mayfield"] },
  ],
}

const fillInOptions = {
  week5: {
    rb: [
      { name: "Javonte Williams", team: "DEN", matchup: "vs NYJ", availability: "95%" },
      { name: "Gus Edwards", team: "BAL", matchup: "@ PIT", availability: "82%" },
      { name: "Roschon Johnson", team: "CHI", matchup: "vs WAS", availability: "76%" },
    ],
    wr: [
      { name: "Jayden Reed", team: "GB", matchup: "vs LV", availability: "89%" },
      { name: "Tank Dell", team: "HOU", matchup: "@ ATL", availability: "67%" },
      { name: "Josh Downs", team: "IND", matchup: "vs CLE", availability: "71%" },
    ],
    qb: [
      { name: "Sam Howell", team: "WAS", matchup: "@ CHI", availability: "97%" },
      { name: "Joshua Dobbs", team: "ARI", matchup: "vs CIN", availability: "99%" },
      { name: "Gardner Minshew", team: "IND", matchup: "vs CLE", availability: "94%" },
    ],
  },
  week6: {
    rb: [
      { name: "Zack Moss", team: "IND", matchup: "vs JAX", availability: "88%" },
      { name: "Jerome Ford", team: "CLE", matchup: "@ SF", availability: "81%" },
      { name: "Tyler Allgeier", team: "ATL", matchup: "vs WAS", availability: "92%" },
    ],
    wr: [
      { name: "Jakobi Meyers", team: "LV", matchup: "vs NE", availability: "85%" },
      { name: "Dontayvion Wicks", team: "GB", matchup: "@ DEN", availability: "79%" },
      { name: "Demario Douglas", team: "NE", matchup: "@ LV", availability: "93%" },
    ],
    qb: [
      { name: "Russell Wilson", team: "DEN", matchup: "vs GB", availability: "98%" },
      { name: "Kyler Murray", team: "ARI", matchup: "vs LAR", availability: "96%" },
      { name: "Geno Smith", team: "SEA", matchup: "vs CIN", availability: "99%" },
    ],
  },
  week9: {
    rb: [
      { name: "Javonte Williams", team: "DEN", matchup: "@ KC", availability: "91%" },
      { name: "Kareem Hunt", team: "CLE", matchup: "vs ARI", availability: "87%" },
      { name: "D'Onta Foreman", team: "CHI", matchup: "vs NO", availability: "84%" },
    ],
    wr: [
      { name: "Michael Pittman Jr.", team: "IND", matchup: "vs CAR", availability: "72%" },
      { name: "Rashid Shaheed", team: "NO", matchup: "@ CHI", availability: "68%" },
      { name: "Romeo Doubs", team: "GB", matchup: "@ LAR", availability: "83%" },
    ],
    qb: [
      { name: "Gardner Minshew", team: "IND", matchup: "vs CAR", availability: "98%" },
      { name: "Bryce Young", team: "CAR", matchup: "@ IND", availability: "99%" },
      { name: "Taylor Heinicke", team: "ATL", matchup: "vs MIN", availability: "95%" },
    ],
  },
}

const survivalTips = [
  {
    title: "Plan Ahead Early",
    description: "Start preparing for bye weeks during the draft. Target handcuffs and streaming options.",
    icon: Calendar,
  },
  {
    title: "Stack Your Bench",
    description: "Keep 1-2 extra players at positions affected by upcoming bye weeks.",
    icon: Users,
  },
  {
    title: "Monitor Waiver Wire",
    description: "Target fill-in players on Wednesday to beat your league mates to the best options.",
    icon: TrendingUp,
  },
  {
    title: "Trade Through Byes",
    description: "Package players with same bye week to consolidate roster space.",
    icon: AlertTriangle,
  },
]

export default function ByeWeekPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-3 sm:mb-4">
            BYE WEEK PLANNER
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Plan ahead for bye weeks with key players on bye and top waiver wire replacements
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 via-card to-card">
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Upcoming Bye Weeks</CardTitle>
                    <CardDescription>Teams and key fantasy players on bye by week</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(byeWeekSchedule).map(([week, teams]) => (
                    <div key={week} className="p-4 bg-card border border-border rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">
                            {week.replace("week", "WEEK ")}
                          </h3>
                          <p className="text-sm text-muted-foreground">{teams.length} teams on bye</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {teams.map((teamData) => (
                          <div key={teamData.team} className="p-3 bg-secondary rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-primary text-primary-foreground">{teamData.team}</Badge>
                              <span className="text-xs text-muted-foreground">BYE</span>
                            </div>
                            <div className="space-y-1">
                              {teamData.key.map((player) => (
                                <div key={player} className="flex items-center gap-2 text-sm">
                                  <AlertTriangle className="w-3 h-3 text-yellow-500 shrink-0" />
                                  <span className="truncate">{player}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Fill-In Options</CardTitle>
                <CardDescription>Top waiver wire targets to plug the gaps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(fillInOptions).map(([week, positions]) => (
                  <div key={week}>
                    <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide mb-4">
                      {week.replace("week", "WEEK ")}
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(positions).map(([position, players]) => (
                        <div key={position}>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="uppercase">
                              {position}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Recommended fill-ins</span>
                          </div>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {players.map((player) => (
                              <div
                                key={player.name}
                                className="p-3 border border-border rounded-lg hover:border-primary transition-colors"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-sm">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {player.team} {player.matchup}
                                    </p>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {player.availability}
                                  </Badge>
                                </div>
                                <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                                  View Stats
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Survival Tips</CardTitle>
                <CardDescription>How to navigate bye weeks successfully</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {survivalTips.map((tip) => {
                  const Icon = tip.icon
                  return (
                    <div key={tip.title} className="p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm">{tip.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hardest Bye Weeks</CardTitle>
                <CardDescription>Weeks with the most fantasy impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Week 9</p>
                    <p className="text-xs text-muted-foreground">BUF, DAL, JAX, SF</p>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Week 6</p>
                    <p className="text-xs text-muted-foreground">KC, LAR, MIA, MIN</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white">High Impact</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-semibold">Week 13</p>
                    <p className="text-xs text-muted-foreground">ATL, CIN, NO, NYJ</p>
                  </div>
                  <Badge variant="secondary">Moderate</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Drop your kicker or defense before adding a bye week fill-in</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Target players with favorable playoff schedules during bye weeks</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Trade for players with opposite bye weeks as your starters</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <p>Handcuff RBs become more valuable during bye weeks</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
