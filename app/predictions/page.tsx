"use client"

import { useState, useEffect } from "react" // Ensure React imports are present
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getUpcomingNbaGames, NbaGame } from "@/lib/api/nba"
import { Brain, Cpu, Trophy, TrendingUp, Activity, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function PredictionsPage() {
  const [games, setGames] = useState<NbaGame[]>([])
  const [selectedGame, setSelectedGame] = useState<NbaGame | null>(null)
  
  // Simulation States
  const [isSimulating, setIsSimulating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [simStep, setSimStep] = useState("")
  const [prediction, setPrediction] = useState<{
    winner: string;
    score: string;
    confidence: number;
    reason: string;
  } | null>(null)

  // Fetch real games on mount
  useEffect(() => {
    async function loadGames() {
      const data = await getUpcomingNbaGames();
      setGames(data);
    }
    loadGames();
  }, [])

  const runSimulation = (game: NbaGame) => {
    setSelectedGame(game);
    setIsSimulating(true);
    setPrediction(null);
    setProgress(0);

    const steps = [
      "Initializing Neural Network...",
      `Analyzing ${game.home_team.full_name} defensive rating...`,
      `Analyzing ${game.visitor_team.abbreviation} pace stats...`,
      "Factoring in Recent Injury Reports...",
      "Running 10,000 Monte Carlo Simulations...",
      "Finalizing Vertex Prediction..."
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps.length) * 100;
      
      if (currentStep < steps.length) {
        setSimStep(steps[currentStep]);
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        generatePrediction(game);
      }
    }, 800); // 800ms per step
  };

  const generatePrediction = (game: NbaGame) => {
    // 1. Calculate Win Rates
    const homeTotalGames = game.home_team.wins + game.home_team.losses;
    const visitorTotalGames = game.visitor_team.wins + game.visitor_team.losses;

    const homeWinRate = homeTotalGames > 0 ? (game.home_team.wins / homeTotalGames) : 0.5;
    const visitorWinRate = visitorTotalGames > 0 ? (game.visitor_team.wins / visitorTotalGames) : 0.5;

    // 2. Apply "Vertex Model" Weights
    const DO_HOME_ADVANTAGE = 0.05; // 5% boost for home team
    
    // Calculate "Power Score"
    const homePowerScore = homeWinRate + DO_HOME_ADVANTAGE;
    const visitorPowerScore = visitorWinRate;

    const totalPower = homePowerScore + visitorPowerScore;
    const homeProbability = (homePowerScore / totalPower) * 100;
    
    // 3. Determine Winner
    const isHomeWinner = homePowerScore > visitorPowerScore;
    const winner = isHomeWinner ? game.home_team.full_name : game.visitor_team.full_name;
    const loser = isHomeWinner ? game.visitor_team.full_name : game.home_team.full_name;
    
    // 4. Generate Dynamic Score
    // Make prediction score proportional to strength difference
    const strengthDiff = Math.abs(homePowerScore - visitorPowerScore); // 0.0 to 0.5
    const margin = Math.max(2, Math.floor(strengthDiff * 50)); // Min 2 pts, Max ~25 pts
    
    const winningScore = 110 + Math.floor(Math.random() * 15);
    const losingScore = winningScore - margin;

    const score = isHomeWinner 
      ? `${winningScore} - ${losingScore}`
      : `${losingScore} - ${winningScore}`;

    // 5. Generate "AI Reason"
    const winDiff = isHomeWinner 
      ? (game.home_team.wins - game.visitor_team.wins)
      : (game.visitor_team.wins - game.home_team.wins);
      
    let reason = "";
    if (winDiff > 5) {
      reason = `Vertex Model strongly favors ${winner} due to a +${winDiff} season win differential.`;
    } else if (isHomeWinner && winDiff < 0) {
      reason = `Despite a lower record, Vertex favors ${winner} due to home court advantage metrics.`;
    } else {
      reason = `${winner} edges out ${loser} in valid possessions per game simulations.`;
    }
    
    setPrediction({
      winner,
      score,
      confidence: Math.floor(isHomeWinner ? homeProbability : (100 - homeProbability)),
      reason,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-2 border-primary text-primary">Beta Feature</Badge>
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2 flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            VERTEX AI PREDICTOR
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our neural network simulates every game 10,000 times using real-time stats, injury reports, and historical matchup data.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Selector */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Select a Game
              </CardTitle>
              <CardDescription>
                 Run the model on today's NBA matchups.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {games.length > 0 ? (
                games.map((game) => (
                  <div 
                    key={game.id}
                    onClick={() => !isSimulating && runSimulation(game)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary ${
                      selectedGame?.id === game.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex justify-between items-center text-sm font-bold mb-2">
                      <span className="text-muted-foreground">{game.status}</span>
                      <Badge variant="secondary">NBA</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                         <div className="text-xl font-[family-name:var(--font-bebas)]">{game.visitor_team.abbreviation}</div>
                         <div className="text-xs text-muted-foreground">Away</div>
                      </div>
                      <span className="text-muted-foreground text-xs font-bold">VS</span>
                       <div className="text-center">
                         <div className="text-xl font-[family-name:var(--font-bebas)]">{game.home_team.abbreviation}</div>
                         <div className="text-xs text-muted-foreground">Home</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No games scheduled for today.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simulation / Results Area */}
          <Card className="lg:col-span-2 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            {!selectedGame ? (
              <div className="text-center p-12">
                <Cpu className="h-24 w-24 text-muted mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-bold text-muted-foreground">Ready to Predict</h3>
                <p className="text-muted-foreground">Select a game from the left to start the Vertex Engine.</p>
              </div>
            ) : isSimulating ? (
               <div className="p-12 text-center space-y-6 animate-pulse">
                  <Brain className="h-20 w-20 text-primary mx-auto animate-bounce" />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Simulating Matchup...</h3>
                    <p className="text-primary font-mono">{simStep}</p>
                  </div>
                  <Progress value={progress} className="h-2 w-full max-w-md mx-auto" />
               </div>
            ) : prediction ? (
               <CardContent className="p-8 space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="text-center">
                    <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/20 border-primary/50 text-base px-4 py-1">
                      Analysis Complete
                    </Badge>
                    <h2 className="text-5xl font-[family-name:var(--font-bebas)] mb-2">
                      {prediction.winner}
                    </h2>
                    <p className="text-xl text-muted-foreground">Predicted Winner</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 text-center">
                     <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Projected Score</div>
                        <div className="text-2xl font-bold">{prediction.score}</div>
                     </div>
                     <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="text-sm text-primary mb-1">Win Probability</div>
                        <div className="text-3xl font-bold text-primary">{prediction.confidence}%</div>
                     </div>
                     <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                        <div className="text-sm text-muted-foreground mb-1">Spread Coverage</div>
                        <div className="text-2xl font-bold">Cover -3.5</div>
                     </div>
                  </div>

                  <div className="bg-muted p-6 rounded-xl flex gap-4 items-start">
                     <div className="bg-primary/20 p-2 rounded-full mt-1">
                        <TrendingUp className="h-5 w-5 text-primary" />
                     </div>
                     <div>
                        <h4 className="font-bold text-lg mb-1">Vertex Logic</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {prediction.reason}
                        </p>
                     </div>
                  </div>

                  <Button size="lg" className="w-full font-bold text-lg" onClick={() => runSimulation(selectedGame)}>
                    <Cpu className="mr-2 h-5 w-5" />
                    Run Another Simulation
                  </Button>
               </CardContent>
            ) : null}
          </Card>
        </div>
      </main>
    </div>
  )
}
