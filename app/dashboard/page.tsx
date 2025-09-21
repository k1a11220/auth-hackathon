"use client";

import { CompanyInfoForm } from "@/components/company-info-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@stackframe/stack";
import {
  ArrowRight,
  Award,
  CheckCircle,
  DollarSign,
  Download,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const user = useUser();

  if (!user) return null;

  const hasPurchased = false; // Change to true to see the funded state

  const investorNumber = `INV-${Date.now().toString().slice(-6)}`;
  const investmentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">blahblahvc</span>
          </div>
          <div className="flex items-center gap-4">
            {hasPurchased && (
              <>
                <nav className="hidden md:flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-primary/10 text-primary"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/artifacts">
                    <Button variant="ghost" size="sm">
                      Artifacts
                    </Button>
                  </Link>
                </nav>
                <Badge variant="secondary" className="text-xs">
                  Investor #{investorNumber}
                </Badge>
              </>
            )}
            <span className="text-sm text-muted-foreground">
              Welcome, {user.displayName || user.primaryEmail}
            </span>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {!hasPurchased ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-balance mb-4">
                Ready to Get <span className="text-primary">Funded</span>?
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Complete your investment package for just $1 and join the funded
                startup club.
              </p>
            </div>

            {/* Investment Package Card */}
            <Card className="max-w-2xl mx-auto border-2 border-primary/20 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Investment Package</CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-primary">$1</span>
                  <Badge variant="secondary">One-time</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <Award className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Official Term Sheet</h3>
                      <p className="text-sm text-muted-foreground">
                        Professional investment document from "Your Fund" with
                        all the VC terminology
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                      <Users className="w-3 h-3 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Investment Receipt & Badge
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Digital badge with unique investor number and
                        downloadable receipt
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full text-lg py-6 group"
                    onClick={() => setShowCompanyForm(true)}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Get Your Investment Package
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Secure payment • Instant delivery
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Funded Status Banner */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-balance mb-4">
                🎉 You're{" "}
                <span className="text-primary">Officially Funded</span>!
              </h1>
              <p className="text-lg text-muted-foreground text-pretty mb-6">
                Welcome to the exclusive club of funded startups. Your
                investment artifacts are ready!
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <Badge variant="outline">
                  Investment Date: {investmentDate}
                </Badge>
                <Badge variant="outline">Investor ID: #{investorNumber}</Badge>
                <Badge className="bg-primary text-primary-foreground">
                  Status: Funded
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">$1.00</h3>
                  <p className="text-sm text-muted-foreground">
                    Investment Amount
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent">3</h3>
                  <p className="text-sm text-muted-foreground">
                    Artifacts Ready
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-chart-3" />
                  </div>
                  <h3 className="text-2xl font-bold text-chart-3">10K+</h3>
                  <p className="text-sm text-muted-foreground">
                    Funded Members
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-chart-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-chart-4">∞</h3>
                  <p className="text-sm text-muted-foreground">
                    Credibility Boost
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Investment Artifacts */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  Your Investment Artifacts
                </h2>
                <p className="text-muted-foreground">
                  Everything you need to show the world you're funded
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Term Sheet */}
                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Official Term Sheet
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Professional VC document
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        Ready
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your official investment document from "Your Fund" with
                      all the professional VC terminology and legal structure.
                    </p>
                    <div className="flex gap-2">
                      <Link href="/artifacts?tab=term-sheet" className="flex-1">
                        <Button className="w-full group">
                          View Document
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

                {/* Investment Badge */}
                <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Investment Badge
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Digital proof of funding
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">
                        Ready
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your unique digital badge with investor number #
                      {investorNumber} proving you're part of the funded startup
                      club.
                    </p>
                    <div className="flex gap-2">
                      <Link href="/artifacts?tab=badge" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full group bg-transparent"
                        >
                          View Badge
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

                {/* Investment Receipt */}
                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-colors group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-chart-3" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Investment Receipt
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Transaction record
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-chart-3 text-white">Ready</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Official transaction receipt for your $1 investment
                      package with all payment details and confirmation.
                    </p>
                    <div className="flex gap-2">
                      <Link href="/artifacts?tab=receipt" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full group bg-transparent"
                        >
                          View Receipt
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
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-16">
              <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    Share Your Success
                  </CardTitle>
                  <p className="text-center text-muted-foreground">
                    Let the world know you're part of the funded startup club!
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm font-mono text-center">
                      🚀 Excited to announce that we've secured investment from
                      Your Fund! We're officially part of the funded startup
                      club. #Funded #Startup #Investment
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="group">
                      Share on Twitter
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Share on LinkedIn
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Copy All Artifacts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {showCompanyForm && (
        <CompanyInfoForm onClose={() => setShowCompanyForm(false)} />
      )}
    </div>
  );
}
