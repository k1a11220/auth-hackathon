import { PortfolioTicker } from "@/components/portfolio-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { stackServerApp } from "../stack/server";

export default async function HomePage() {
  const user = await stackServerApp.getUser().catch(() => null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-balance">blahblahvc</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/handler/sign-out">
                <Button variant="ghost" size="sm">
                  Sign Out
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/handler/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/handler/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 text-sm px-4 py-2" variant="secondary">
            🎉 Join 10,000+ "Funded" Startups
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            You're Now a
            <br />
            <span className="text-primary">Funded Startup</span>
          </h1>

          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto leading-relaxed">
            Get your official investment artifacts for just $1. Term sheets,
            investor badges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Get Your Investment Package
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Only $1 • Instant delivery</span>
            </div>
          </div>

          {/* Sample Cards Preview */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="transform hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50">
              <CardContent className="p-6 flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Term Sheet</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Official-looking investment document from "Your Fund" with all
                  the VC buzzwords.
                </p>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-all duration-300 border-2 hover:border-accent/50">
              <CardContent className="p-6 flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Investor Badge</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Digital badge with your unique investor number and investment
                  receipt NFT.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Ticker Section */}
      <PortfolioTicker />

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Why Founders Love blahblahvc
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Finally, you can say "we're funded" with a straight face (sort
              of).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Instant Credibility
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Look funded in seconds with official-looking documents.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Shareable</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Perfect for LinkedIn, Twitter, and investor meetings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Official Documents</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Term sheets and investor badges that impress potential
                investors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-chart-4/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-chart-4" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Affordable</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                All the startup clout for the price of a coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">
              Ready to Join the Funded Club?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty mb-8">
              Get your investment package in under 60 seconds. No pitch deck
              required.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Funding Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 blahblahvc. Making founders feel funded, one dollar at a
            time.
          </p>
        </div>
      </footer>
    </div>
  );
}
