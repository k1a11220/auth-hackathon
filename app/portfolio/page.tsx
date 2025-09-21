import { stackServerApp, isStackConfigured } from "../../stack"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Award,
  DollarSign,
  ArrowRight,
  Download,
  Share2,
  PieChart,
  BarChart3,
  Target,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default async function PortfolioPage() {
  if (!isStackConfigured || !stackServerApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Stack Auth Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please configure Stack Auth environment variables to access your portfolio.
            </p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  let user = null
  try {
    user = await stackServerApp.getUser()
  } catch (error) {
    console.log("[v0] Error getting user:", error)
    redirect("/")
  }

  if (!user) {
    redirect("/handler/sign-in")
  }

  const portfolioCompanies = [
    {
      id: 1,
      company: "TechFlow AI",
      ticker: "TFAI",
      logo: "/ai-robot-technology-logo.jpg",
      amount: 0.25,
      shares: 25,
      currentValue: 0.28,
      return: 0.03,
      returnPercentage: 12.0,
      status: "Active",
      investmentDate: "March 15, 2024",
      type: "Seed Round",
      description: "AI-powered workflow automation platform",
    },
    {
      id: 2,
      company: "GreenEnergy Co",
      ticker: "GREN",
      logo: "/green-energy-leaf-logo.jpg",
      amount: 0.35,
      shares: 35,
      currentValue: 0.32,
      return: -0.03,
      returnPercentage: -8.6,
      status: "Active",
      investmentDate: "February 8, 2024",
      type: "Series A",
      description: "Sustainable energy solutions for urban areas",
    },
    {
      id: 3,
      company: "HealthTech Labs",
      ticker: "HTLB",
      logo: "/medical-health-cross-logo.jpg",
      amount: 0.4,
      shares: 40,
      currentValue: 0.43,
      return: 0.03,
      returnPercentage: 7.5,
      status: "Active",
      investmentDate: "January 22, 2024",
      type: "Seed Round",
      description: "Digital health monitoring and telemedicine",
    },
  ]

  const totalInvestment = portfolioCompanies.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = portfolioCompanies.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalReturn = totalCurrentValue - totalInvestment
  const returnPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0

  const portfolioData = {
    totalInvestment,
    currentValue: totalCurrentValue,
    totalReturn,
    returnPercentage,
    investmentDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    investorNumber: `INV-${Date.now().toString().slice(-6)}`,
    status: "Active",
    artifacts: 3,
    sharesSold: 0,
    sharesRemaining: 100,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Proof-of-Backed</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
                  Portfolio
                </Button>
              </Link>
              <Link href="/artifacts">
                <Button variant="ghost" size="sm">
                  Artifacts
                </Button>
              </Link>
            </nav>
            <Badge variant="secondary" className="text-xs">
              Investor #{portfolioData.investorNumber}
            </Badge>
            <span className="text-sm text-muted-foreground">Welcome, {user.displayName || user.primaryEmail}</span>
            <Link href="/handler/sign-out">
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PieChart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-4">
              Your Investment <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Track your funded startup journey and investment performance
            </p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Total</Badge>
                </div>
                <h3 className="text-2xl font-bold text-primary">${portfolioData.totalInvestment.toFixed(2)}</h3>
                <p className="text-sm text-muted-foreground">Total Investment</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Current</Badge>
                </div>
                <h3 className="text-2xl font-bold text-accent">${portfolioData.currentValue.toFixed(2)}</h3>
                <p className="text-sm text-muted-foreground">Current Value</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-3/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-chart-3" />
                  </div>
                  <Badge
                    className={`${portfolioData.totalReturn >= 0 ? "bg-chart-3 text-white" : "bg-destructive text-destructive-foreground"}`}
                  >
                    {portfolioData.totalReturn >= 0 ? "+" : ""}
                    {portfolioData.returnPercentage.toFixed(1)}%
                  </Badge>
                </div>
                <h3
                  className={`text-2xl font-bold ${portfolioData.totalReturn >= 0 ? "text-chart-3" : "text-destructive"}`}
                >
                  ${portfolioData.totalReturn >= 0 ? "+" : ""}
                  {portfolioData.totalReturn.toFixed(2)}
                </h3>
                <p className="text-sm text-muted-foreground">Total Return</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-4/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-chart-4" />
                  </div>
                  <Badge className="bg-chart-4 text-white">{portfolioData.artifacts}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-chart-4">{portfolioData.status}</h3>
                <p className="text-sm text-muted-foreground">Portfolio Status</p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Holdings */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Investment Holdings</h2>
              <p className="text-muted-foreground">Your current investment positions and performance</p>
            </div>

            <div className="space-y-6">
              {portfolioCompanies.map((investment) => (
                <Card
                  key={investment.id}
                  className="border-2 border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={investment.logo || "/placeholder.svg"}
                          alt={`${investment.company} logo`}
                          className="w-16 h-16 object-contain rounded-lg bg-muted/20 p-2"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{investment.company}</CardTitle>
                            <Badge variant="outline" className="font-mono text-xs">
                              {investment.ticker}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{investment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{investment.type}</Badge>
                            <Badge
                              className={`${investment.status === "Active" ? "bg-chart-3 text-white" : "bg-muted"}`}
                            >
                              {investment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${investment.currentValue.toFixed(2)}</div>
                        <div className={`text-sm ${investment.return >= 0 ? "text-chart-3" : "text-destructive"}`}>
                          {investment.return >= 0 ? "+" : ""}${investment.return.toFixed(2)} (
                          {investment.returnPercentage >= 0 ? "+" : ""}
                          {investment.returnPercentage.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Investment Amount</p>
                        <p className="text-lg font-semibold">${investment.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Shares Owned</p>
                        <p className="text-lg font-semibold">{investment.shares}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Investment Date</p>
                        <p className="text-lg font-semibold">{investment.investmentDate}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Shares Remaining</span>
                        <span className="font-medium">
                          {investment.shares}/{investment.shares}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Link href="/artifacts" className="flex-1">
                        <Button className="w-full group">
                          View Artifacts
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Portfolio Insights */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <p className="text-sm text-muted-foreground">Your investment journey</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time Invested</span>
                    <span className="font-medium">Since {portfolioData.investmentDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment Type</span>
                    <Badge variant="outline">Seed Round</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge className="bg-chart-3 text-white">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Investment Timeline</CardTitle>
                    <p className="text-sm text-muted-foreground">Key milestones</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Investment Completed</p>
                      <p className="text-sm text-muted-foreground">{portfolioData.investmentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Artifacts Generated</p>
                      <p className="text-sm text-muted-foreground">Term sheet, badge, and receipt created</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-muted-foreground">Future Updates</p>
                      <p className="text-sm text-muted-foreground">Stay tuned for portfolio updates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
