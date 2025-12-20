"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Trophy,
  BarChart3,
  Newspaper,
  ArrowLeftRight,
  Target,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  GitCompare,
  FileText,
  Database,
  Menu,
  X,
  LayoutDashboard,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/", label: "Home", icon: Trophy },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/draft", label: "Draft Assistant", icon: BarChart3 },
  { href: "/lineup", label: "Lineup Optimizer", icon: Trophy },
  { href: "/stats", label: "Player Stats", icon: Newspaper },
  { href: "/trade", label: "Trade Analyzer", icon: ArrowLeftRight },
  { href: "/predictions", label: "Game Predictions", icon: Target },
  { href: "/compare", label: "Player Comparison", icon: GitCompare },
  { href: "/waiver", label: "Waiver Wire", icon: Users },
  { href: "/schedule", label: "Schedule Analyzer", icon: Calendar },
  { href: "/mock-draft", label: "Mock Draft", icon: TrendingUp },
  { href: "/playoff-odds", label: "Playoff Odds", icon: BarChart3 },
  { href: "/tips", label: "Roster Tips", icon: FileText },
  { href: "/matchups", label: "Matchup History", icon: Database },
  { href: "/settings", label: "League Settings", icon: Settings },
  { href: "/start-sit", label: "Start/Sit Assistant", icon: Target },
  { href: "/bye-week", label: "Bye Week Planner", icon: Calendar },
  { href: "/advanced-stats", label: "Advanced Stats", icon: BarChart3 },
  { href: "/manage", label: "Sync Team", icon: Database },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      const firstFocusable = mobileMenuRef.current?.querySelector("a")
      firstFocusable?.focus()
    }

    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen])

  // Split items for Desktop: Top 6 are visible, rest go in "Tools"
  const visibleItems = navItems.slice(0, 6)
  const overflowItems = navItems.slice(6)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" aria-label="Fantasy Vertex - Home">
                <div className="relative h-8 w-8 bg-primary rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                     <Trophy className="h-5 w-5 text-primary-foreground absolute z-10" />
                     <div className="absolute inset-0 bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    FANTASY VERTEX
                </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
              {visibleItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap focus:ring-2 focus:ring-primary focus:outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                )
              })}

              {/* Tools Dropdown for Overflow Items */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 h-auto text-sm font-medium text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                    Tools
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>More Features</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto">
                    {overflowItems.map((item) => {
                       const Icon = item.icon
                       return (
                        <DropdownMenuItem key={item.href} asChild>
                          <Link href={item.href} className="cursor-pointer flex items-center gap-2 w-full">
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                       )
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2" role="group" aria-label="League selection">
                <button
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium border border-border rounded-md hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                  aria-label="Switch to NBA league"
                >
                  NBA
                </button>
                <button
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                  aria-label="Switch to NFL league"
                  aria-pressed="true"
                >
                  NFL
                </button>
              </div>

               {/* Profile / User Icon Placeholder (Will be updated in next task) */}
              <Link href="/profile">
                  <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="User Profile">
                    <Users className="w-5 h-5" />
                  </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden focus:ring-2 focus:ring-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                }
              }}
              aria-hidden="true"
              tabIndex={-1}
            />

            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              className="fixed top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border overflow-y-auto lg:hidden shadow-xl"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors focus:ring-2 focus:ring-primary focus:outline-none",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      )}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
}

