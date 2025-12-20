"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2, Download, Lock } from "lucide-react"
import { syncEspnLeague } from "@/lib/api/espn"

export default function ManagePage() {
  const [leagueId, setLeagueId] = useState("79559586");
  const [year, setYear] = useState("2026");
  const [swid, setSwid] = useState("");
  const [s2, setS2] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [leagueData, setLeagueData] = useState<any>(null);

  const handleSync = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const data = await syncEspnLeague(leagueId, swid, s2, parseInt(year));
        
        // Basic validation that we got a league back
        if (data.id) {
           setLeagueData(data);
           setSuccess(true);
           // Store safely in local/session for this demo
           localStorage.setItem("fantasy_vertex_espn_config", JSON.stringify({ leagueId, swid, s2 }));
        } else {
           setError("Invalid response from ESPN. Check your League ID and permissions.");
        }

    } catch (err: any) {
        setError(err.message || "Failed to sync.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-4xl mb-2">Import Your Team</h1>
            <p className="text-muted-foreground">Connect your ESPN Fantasy Basketball team to unlock personalized insights.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    ESPN Connection
                </CardTitle>
                <CardDescription>
                    You don't need to be the League Manager. Any player can sync their own view.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Season Year</label>
                        <Input 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="2026"
                        />
                         <p className="text-xs text-muted-foreground">NBA 2025-26 Season = 2026</p>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">League ID</label>
                        <Input 
                            placeholder="e.g. 79559586" 
                            value={leagueId} 
                            onChange={(e) => setLeagueId(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                            swid <Lock className="h-3 w-3" />
                        </label>
                        <Input 
                            type="password"
                            placeholder="{...}" 
                            value={swid} 
                            onChange={(e) => setSwid(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                            espn_s2 <Lock className="h-3 w-3" />
                        </label>
                        <Input 
                            type="password"
                            placeholder="AEC..." 
                            value={s2} 
                            onChange={(e) => setS2(e.target.value)}
                        />
                    </div>
                </div>

                <Alert className="bg-primary/5 border-primary/20 text-xs">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>How to find keys?</AlertTitle>
                    <AlertDescription>
                        1. Go to your ESPN League page.<br/>
                        2. Right-click &gt; Inspect &gt; Application Tab &gt; Cookies.<br/>
                        3. Copy values for <b>SWID</b> and <b>espn_s2</b>.
                    </AlertDescription>
                </Alert>

                <Button className="w-full font-bold" onClick={handleSync} disabled={loading}>
                    {loading ? "Syncing..." : "Sync League Now"}
                </Button>

                {error && (
                    <div className="p-3 rounded bg-destructive/10 text-destructive text-sm text-center">
                        {error}
                    </div>
                )}
            </CardContent>
        </Card>

        <Card className="mt-8 border-dashed">
            <CardHeader>
                <CardTitle className="text-lg">Manual Import (Workaround)</CardTitle>
                <CardDescription>If the automatic sync fails, paste your league data here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="text-xs text-muted-foreground p-3 bg-secondary rounded">
                    <strong>Instructions:</strong><br/>
                    1. Go to your ESPN League Page (logged in).<br/>
                    2. Right Click &gt; Inspect &gt; Console.<br/>
                    3. Paste this code and press Enter:<br/>
                    <code className="block mt-2 p-2 bg-black/80 text-white rounded select-all font-mono break-all">
                        fetch(`https://fantasy.espn.com/apis/v3/games/fba/seasons/2026/segments/0/leagues/${leagueId}?view=mRoster&view=mTeam&view=mSettings`).then(r=&gt;r.json()).then(d=&gt;console.log(JSON.stringify(d)))
                    </code>
                    4. Copy the huge output text and paste it below.
                </div>
                <textarea 
                    className="w-full h-32 p-3 text-xs font-mono border rounded bg-background resize-y" 
                    placeholder="Paste the {...} JSON result here..."
                    onChange={(e) => {
                        try {
                            const json = JSON.parse(e.target.value);
                            if(json.id) {
                                setLeagueData(json); 
                                setSuccess(true);
                                setError(null);
                            }
                        } catch (err) {
                            // Ignore parse errors while typing
                        }
                    }}
                />
            </CardContent>
        </Card>
                
                {success && (
                    <div className="p-4 rounded border border-green-500/50 bg-green-500/10 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-green-500 font-bold">
                            <CheckCircle2 className="h-5 w-5" />
                            Sync Successful!
                        </div>
                        <div className="text-sm">
                            Found League: <b>{leagueData?.settings?.name || "Basketball League"}</b>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            View My Dashboard
                        </Button>
                    </div>
                )}


      </main>
    </div>
  )
}
