import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, BarChart3, Newspaper, ArrowLeftRight, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden" aria-label="Hero section">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="absolute inset-0 bg-[url('/abstract-sports-pattern.png')] opacity-5 bg-cover bg-center" />

          <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-4 sm:mb-6 text-balance">
                DOMINATE YOUR FANTASY LEAGUE
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Your ultimate fantasy sports command center. Get player rankings, optimize lineups, analyze trades, and
                stay ahead with real-time stats for NBA and NFL.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg" className="text-base w-full sm:w-auto">
                  <Link href="/dashboard">
                    <Trophy className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent w-full sm:w-auto">
                  <Link href="/draft">Start Drafting</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24" aria-labelledby="features-heading">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2
              id="features-heading"
              className="font-[family-name:var(--font-bebas)] text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 sm:mb-4"
            >
              EVERYTHING YOU NEED TO WIN
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Powerful tools to give you the competitive edge
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <Link
              href="/draft"
              className="group"
              aria-label="Draft Assistant - Get real-time player rankings and draft suggestions to build a championship roster"
            >
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <BarChart3
                      className="w-6 h-6 text-primary group-hover:text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-xl">Draft Assistant</CardTitle>
                  <CardDescription>
                    Get real-time player rankings and draft suggestions to build a championship roster
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link
              href="/lineup"
              className="group"
              aria-label="Lineup Optimizer - Maximize your points with AI-powered lineup recommendations based on matchups"
            >
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Target className="w-6 h-6 text-primary group-hover:text-primary-foreground" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">Lineup Optimizer</CardTitle>
                  <CardDescription>
                    Maximize your points with AI-powered lineup recommendations based on matchups
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link
              href="/stats"
              className="group"
              aria-label="Player Stats - Access comprehensive stats, injury updates, and breaking news for all players"
            >
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Newspaper
                      className="w-6 h-6 text-primary group-hover:text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-xl">Player Stats</CardTitle>
                  <CardDescription>
                    Access comprehensive stats, injury updates, and breaking news for all players
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link
              href="/trade"
              className="group"
              aria-label="Trade Analyzer - Evaluate trade proposals and get instant feedback on trade fairness"
            >
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <ArrowLeftRight
                      className="w-6 h-6 text-primary group-hover:text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-xl">Trade Analyzer</CardTitle>
                  <CardDescription>Evaluate trade proposals and get instant feedback on trade fairness</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-card border-y border-border" aria-labelledby="stats-heading">
          <div className="container mx-auto px-4 py-12 sm:py-14 md:py-16">
            <h2 id="stats-heading" className="sr-only">
              Platform statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
              <dl className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <dd className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl text-primary mb-2">
                  99%
                </dd>
                <dt className="text-muted-foreground">Prediction Accuracy</dt>
              </dl>
              <dl className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <dd className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl text-primary mb-2">
                  50K+
                </dd>
                <dt className="text-muted-foreground">Active Users</dt>
              </dl>
              <dl className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Trophy className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <dd className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl text-primary mb-2">
                  1000+
                </dd>
                <dt className="text-muted-foreground">Championships Won</dt>
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
