import { Play, RotateCcw, Settings, Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function MockDraftPage() {
  const draftSettings = {
    teams: 12,
    rounds: 15,
    position: 3,
    type: "Snake",
    scoring: "PPR",
  }

  const myPicks = [
    { round: 1, pick: 3, player: "Luka Doncic", position: "PG", team: "DAL" },
    { round: 2, pick: 22, player: "Devin Booker", position: "SG", team: "PHX" },
    { round: 3, pick: 27, player: "Domantas Sabonis", position: "C", team: "SAC" },
  ]

  const availablePlayers = [
    { name: "Anthony Edwards", position: "SG", team: "MIN", adp: 28, value: "+3", tier: 1 },
    { name: "Tyrese Haliburton", position: "PG", team: "IND", adp: 29, value: "+2", tier: 1 },
    { name: "Paolo Banchero", position: "PF", team: "ORL", adp: 31, value: "0", tier: 2 },
    { name: "LaMelo Ball", position: "PG", team: "CHA", adp: 32, value: "+1", tier: 2 },
    { name: "Damian Lillard", position: "PG", team: "MIL", adp: 33, value: "0", tier: 2 },
  ]

  const recentPicks = [
    { team: "Team 1", player: "Nikola Jokic", position: "C", pick: 1 },
    { team: "Team 2", player: "Shai Gilgeous-Alexander", position: "PG", pick: 2 },
    { team: "You", player: "Luka Doncic", position: "PG", pick: 3 },
    { team: "Team 4", player: "Giannis Antetokounmpo", position: "PF", pick: 4 },
    { team: "Team 5", player: "Joel Embiid", position: "C", pick: 5 },
  ]

  const positionNeeds = [
    { position: "PG", filled: 2, needed: 2, status: "full" },
    { position: "SG", filled: 1, needed: 2, status: "need" },
    { position: "SF", filled: 0, needed: 2, status: "critical" },
    { position: "PF", filled: 0, needed: 2, status: "critical" },
    { position: "C", filled: 1, needed: 2, status: "need" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl mb-2 text-primary tracking-wide">
            MOCK DRAFT SIMULATOR
          </h1>
          <p className="text-muted-foreground">Practice your draft strategy against AI opponents</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Draft Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Draft Settings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide">DRAFT SETTINGS</h2>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{draftSettings.teams}</div>
                  <div className="text-xs text-muted-foreground">Teams</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{draftSettings.rounds}</div>
                  <div className="text-xs text-muted-foreground">Rounds</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">#{draftSettings.position}</div>
                  <div className="text-xs text-muted-foreground">Your Pick</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-primary">{draftSettings.type}</div>
                  <div className="text-xs text-muted-foreground">Format</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-primary">{draftSettings.scoring}</div>
                  <div className="text-xs text-muted-foreground">Scoring</div>
                </div>
              </div>
            </Card>

            {/* Current Pick Alert */}
            <Card className="p-6 bg-primary/5 border-2 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide mb-1">YOUR PICK - 4.46</h3>
                  <p className="text-sm text-muted-foreground">Round 4, Pick 46 overall</p>
                </div>
                <div className="flex gap-2">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Target className="w-4 h-4 mr-2" />
                    Make Pick
                  </Button>
                  <Button size="lg" variant="outline">
                    Auto-Pick
                  </Button>
                </div>
              </div>
            </Card>

            {/* Available Players */}
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">AVAILABLE PLAYERS</h2>
              <div className="space-y-2">
                {availablePlayers.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-secondary/30 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-primary"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg?height=48&width=48" alt={player.name} />
                        <AvatarFallback>
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {player.team}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {player.position}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">ADP</div>
                        <div className="font-bold">{player.adp}</div>
                      </div>
                      <Badge
                        className={
                          player.value.startsWith("+")
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }
                      >
                        Value {player.value}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Picks */}
            <Card className="p-6">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl mb-4 tracking-wide">RECENT PICKS</h2>
              <div className="space-y-2">
                {recentPicks.map((pick, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                        {pick.pick}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{pick.player}</div>
                        <div className="text-xs text-muted-foreground">{pick.team}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{pick.position}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Draft Controls */}
            <Card className="p-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-4 tracking-wide">DRAFT CONTROLS</h3>
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  <Play className="w-4 h-4 mr-2" />
                  Start New Draft
                </Button>
                <Button className="w-full bg-transparent" variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Draft
                </Button>
              </div>
            </Card>

            {/* Your Team */}
            <Card className="p-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-4 tracking-wide flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                YOUR TEAM
              </h3>
              <div className="space-y-3">
                {myPicks.map((pick, idx) => (
                  <div key={idx} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{pick.player}</span>
                      <Badge variant="outline" className="text-xs">
                        {pick.position}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Round {pick.round}, Pick {pick.pick}
                    </div>
                  </div>
                ))}
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="p-3 bg-secondary/20 rounded-lg border border-dashed border-border">
                    <div className="text-xs text-muted-foreground">Empty slot</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Position Needs */}
            <Card className="p-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-4 tracking-wide">POSITION NEEDS</h3>
              <div className="space-y-3">
                {positionNeeds.map((pos, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{pos.position}</span>
                      <span className="text-xs text-muted-foreground">
                        {pos.filled}/{pos.needed}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${pos.status === "full" ? "bg-green-500" : pos.status === "critical" ? "bg-red-500" : "bg-yellow-500"}`}
                        style={{ width: `${(pos.filled / pos.needed) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Draft Tips */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl mb-3 tracking-wide">DRAFT TIP</h3>
              <p className="text-sm text-muted-foreground">
                With the next pick at 4.46, consider targeting a wing player like Anthony Edwards. Your team needs SF/PF
                depth and he provides elite value at current ADP.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
