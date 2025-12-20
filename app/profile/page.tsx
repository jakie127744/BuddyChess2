"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile, UserProfile } from "@/hooks/use-profile"
import { validateUsername } from "@/lib/validation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CheckCircle2, Save, User, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { profile, loading, saveProfile, clearProfile } = useProfile()
  
  const [formData, setFormData] = useState({
    username: "",
    teamName: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Load existing profile into form
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        teamName: profile.teamName,
      })
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // 1. Validate Username
    const validation = validateUsername(formData.username)
    if (!validation.valid) {
      setError(validation.error || "Invalid username")
      return
    }

    // 2. Validate Team Name
    if (formData.teamName.length < 3) {
      setError("Team Name must be at least 3 characters")
      return
    }

    // 3. Save Profile
    const newProfile: UserProfile = {
      username: formData.username,
      teamName: formData.teamName,
      avatar: "/diverse-football-player.png", // Default for now
      joinedAt: profile?.joinedAt || new Date().toLocaleDateString(),
    }

    saveProfile(newProfile)
    setSuccess(true)
    
    // Optional: Redirect to dashboard after delay if it was a new registration
    if (!profile) {
       setTimeout(() => router.push("/dashboard"), 1500)
    }
  }

  const handleLogout = () => {
    clearProfile()
    router.push("/")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl tracking-tight mb-2">
              USER PROFILE
            </h1>
            <p className="text-muted-foreground">
              Manage your manager identity and settings
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {profile ? "Edit Profile" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {profile 
                  ? "Update your display name and team details." 
                  : "Join Fantasy Vertex to track your leagues and stats."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="Enter username"
                      className="pl-10"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only letters, numbers, and underscores. No offensive terms.
                  </p>
                </div>

                {/* Team Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="e.g. Gotham City Rogues"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  />
                </div>

                {/* Feedback Messages */}
                {error && (
                  <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-500/10 rounded-md">
                    <CheckCircle2 className="h-4 w-4" />
                    Profile saved successfully! Redirecting...
                  </div>
                )}

                <Button type="submit" className="w-full font-bold">
                  <Save className="mr-2 h-4 w-4" />
                  {profile ? "Save Changes" : "Create Profile"}
                </Button>

                {profile && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out / Reset
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
