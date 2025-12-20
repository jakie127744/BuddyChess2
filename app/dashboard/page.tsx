import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { League, ActionItem } from "@/lib/types"
import { getNflState, getTrendingPlayers } from "@/lib/api/sleeper"
import { getUpcomingNbaGames } from "@/lib/api/nba"

// Mock Data (To be replaced by API later)
const activeLeague: League = {
  id: "l1",
  name: "Dynasty Warriors",
  platform: "Sleeper",
  record: "7-3",
  rank: 2,
  totalTeams: 12,
  nextMatchup: {
    opponentName: "Team Solomid",
    projectedScore: 124.5,
    opponentProjectedScore: 118.2,
    winProbability: 62,
  },
}

const actionItems: ActionItem[] = [
  {
    id: "a1",
    type: "warning",
    title: "Lineup Alert",
    description: "Justin Jefferson is Questionable for MNF.",
  },
  {
    id: "a2",
    type: "info",
    title: "Trade Offer",
    description: "New offer received from Team Liquid.",
    link: "/trade",
    linkText: "Review Trade",
  },
]

export default async function DashboardPage() {
  // Fetch Real-time Data
  const [nflState, trendingNfl, nbaGames] = await Promise.all([
    getNflState(),
    getTrendingPlayers("nfl", "add"),
    getUpcomingNbaGames()
  ])

  const currentWeek = nflState ? `Week ${nflState.week}` : "Preseason";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-[family-name:var(--font-bebas)]">
              LEAGUE DASHBOARD
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back. NFL is in <span className="font-semibold text-primary">{currentWeek}</span>.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/lineup">
              <Button size="lg" className="w-full md:w-auto font-bold">
                <Shield className="mr-2 h-4 w-4" /> Manage Lineup
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active League Card */}
            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Trophy className="text-primary h-6 w-6" />
                      {activeLeague.name}
                    </CardTitle>
                    <CardDescription>
                      {activeLeague.platform} &bull; {activeLeague.totalTeams} Teams
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{activeLeague.record}</div>
                    <Badge variant={activeLeague.rank <= 4 ? "default" : "secondary"}>
                      Rank #{activeLeague.rank}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold uppercase text-muted-foreground">Next Matchup</span>
                    <Badge variant="outline" className="text-xs">{currentWeek}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">You</div>
                      <div className="text-2xl text-primary font-[family-name:var(--font-bebas)]">
                        {activeLeague.nextMatchup?.projectedScore}
                      </div>
                    </div>
                    <div className="text-center px-4">
                      <div className="text-xs text-muted-foreground mb-1">Win Prob</div>
                      <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                        {activeLeague.nextMatchup?.winProbability}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{activeLeague.nextMatchup?.opponentName}</div>
                      <div className="text-2xl text-muted-foreground font-[family-name:var(--font-bebas)]">
                        {activeLeague.nextMatchup?.opponentProjectedScore}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NBA Live / Upcoming */}
             <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                   NBA Games Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="grid gap-3 sm:grid-cols-2">
                    {nbaGames.map((game) => (
                      <div key={game.id} className="flex justify-between items-center p-3 border rounded-md bg-muted/20">
                         <div className="text-center">
                            <div className="font-bold">{game.visitor_team.abbreviation}</div>
                            <div className="text-xs text-muted-foreground">{game.visitor_team.score}</div>
                         </div>
                         <div className="text-xs text-muted-foreground font-semibold">
                            VS
                            <div className="font-normal text-[10px] mt-1">{game.status}</div>
                         </div>
                         <div className="text-center">
                            <div className="font-bold">{game.home_team.abbreviation}</div>
                            <div className="text-xs text-muted-foreground">{game.home_team.score}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <div className="grid gap-4 md:grid-cols-2">
               {actionItems.map((item) => (
                 <Card key={item.id} className="border-l-4 border-l-yellow-500 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors cursor-pointer">
                   <CardContent className="p-4 flex items-start gap-3">
                     <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                     <div>
                       <h4 className="font-bold text-yellow-900 dark:text-yellow-200">{item.title}</h4>
                       <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">{item.description}</p>
                       {item.link && (
                         <Link href={item.link} className="text-xs font-semibold text-yellow-700 hover:underline flex items-center">
                           {item.linkText || "View Details"} <ArrowUpRight className="h-3 w-3 ml-1" />
                         </Link>
                       )}
                     </div>
                   </CardContent>
                 </Card>
               ))}
            </div>

            {/* Quick Tools Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link href="/start-sit">
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                    <Activity className="h-8 w-8 text-primary mb-1" />
                    <span className="font-bold text-sm">Start/Sit</span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/waiver">
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                    <Zap className="h-8 w-8 text-yellow-500 mb-1" />
                    <span className="font-bold text-sm">Waiver Wire</span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/trade">
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-500 mb-1" />
                    <span className="font-bold text-sm">Trade Analyzer</span>
                  </CardContent>
                </Card>
              </Link>
               <Link href="/schedule">
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                    <Calendar className="h-8 w-8 text-blue-500 mb-1" />
                    <span className="font-bold text-sm">Schedule</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
             {/* Trending Players (Real Data) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Adds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingNfl.length > 0 ? (
                  trendingNfl.map((player) => (
                    <div key={player.player_id} className="border-b last:border-0 pb-3 last:pb-0 flex items-center justify-between">
                       <div>
                          <h4 className="font-semibold text-sm">Player ID: {player.player_id}</h4>
                          <Link href={`https://www.google.com/search?q=nfl+player+${player.player_id}`} target="_blank" className="text-xs text-muted-foreground hover:underline">
                             Search Player
                          </Link>
                       </div>
                       <Badge variant="secondary" className="text-xs text-green-600">
                         +{player.count} Adds
                       </Badge>
                    </div>
                  ))
                ) : (
                   <p className="text-sm text-muted-foreground">No trending data available.</p>
                )}
                <Button variant="ghost" size="sm" className="w-full text-primary">View Waiver Wire</Button>
              </CardContent>
            </Card>

            {/* Pro Tip */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="bg-primary/20 p-2 rounded-full h-fit">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Pro Tip of the Week</h4>
                    <p className="text-xs text-muted-foreground">
                      Don't blow your FAAB on chasing points. Look for volume trends over the last 3 weeks instead.
                    </p>
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
