"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Download, Share2 } from "lucide-react"

interface TermSheetProps {
  founderName: string
  companyName: string
  mission: string
  investorNumber: string
  date: string
}

export function TermSheet({ founderName, companyName, mission, investorNumber, date }: TermSheetProps) {
  const handleDownload = () => {
    // Convert the term sheet to PDF or image for download
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${companyName} Term Sheet`,
        text: `Check out our official investment term sheet from Your Fund!`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-card/80">
        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">YOUR FUND</h1>
                <p className="text-sm text-muted-foreground">Venture Capital Partners</p>
              </div>
            </div>
            <Badge className="text-xs px-3 py-1">CONFIDENTIAL</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-balance">TERM SHEET</h2>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Investment Date: {date}</span>
              <span>•</span>
              <span>Investor ID: #{investorNumber}</span>
            </div>
          </div>

          {/* Company Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">COMPANY INFORMATION</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Name:</span>
                  <span className="font-semibold">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founder:</span>
                  <span className="font-semibold">{founderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stage:</span>
                  <span className="font-semibold">Seed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-semibold">Technology</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">INVESTMENT TERMS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Amount:</span>
                  <span className="font-semibold text-primary">$1.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valuation:</span>
                  <span className="font-semibold">$1,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Equity:</span>
                  <span className="font-semibold">0.0001%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security Type:</span>
                  <span className="font-semibold">SAFE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">COMPANY MISSION</h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm leading-relaxed italic">"{mission}"</p>
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">INVESTMENT HIGHLIGHTS</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Market Opportunity</h4>
                <p className="text-xs text-muted-foreground">
                  Addressing a massive, underserved market with significant growth potential and clear monetization
                  pathways.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Competitive Advantage</h4>
                <p className="text-xs text-muted-foreground">
                  Proprietary technology and first-mover advantage in an emerging category with high barriers to entry.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Team Excellence</h4>
                <p className="text-xs text-muted-foreground">
                  Experienced founding team with proven track record and deep domain expertise in the target market.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Scalability</h4>
                <p className="text-xs text-muted-foreground">
                  Highly scalable business model with strong unit economics and clear path to profitability.
                </p>
              </div>
            </div>
          </div>

          {/* Key Terms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">KEY TERMS & CONDITIONS</h3>
            <div className="grid md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Liquidation Preference:</span>
                  <span>1x Non-Participating</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anti-Dilution:</span>
                  <span>Weighted Average</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Board Composition:</span>
                  <span>Founder Controlled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drag Along:</span>
                  <span>Standard</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tag Along:</span>
                  <span>Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Rights:</span>
                  <span>Pro Rata</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Information Rights:</span>
                  <span>Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pro Rata Rights:</span>
                  <span>Yes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="border-t border-border pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">INVESTOR</h4>
                <div className="space-y-2">
                  <div className="border-b border-border w-48 pb-1">
                    <span className="text-sm font-semibold">Your Fund Partners</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Managing Partner</p>
                  <p className="text-xs text-muted-foreground">Date: {date}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">COMPANY</h4>
                <div className="space-y-2">
                  <div className="border-b border-border w-48 pb-1">
                    <span className="text-sm font-semibold">{founderName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Chief Executive Officer</p>
                  <p className="text-xs text-muted-foreground">Date: {date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            <Button onClick={handleDownload} className="flex-1 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Download Term Sheet
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1 group bg-transparent">
              <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Share Achievement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
