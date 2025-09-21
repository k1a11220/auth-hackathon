"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2, CheckCircle, TrendingUp } from "lucide-react"

interface InvestmentBadgeProps {
  founderName: string
  companyName: string
  investorNumber: string
  date: string
  amount: string
}

export function InvestmentBadge({ founderName, companyName, investorNumber, date, amount }: InvestmentBadgeProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download the badge as an image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    // Badge generation logic would go here
    console.log("Downloading badge...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${companyName} Investment Badge`,
        text: `I'm officially part of the funded startup club! Check out my investment badge.`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-2 border-primary/30 shadow-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 overflow-hidden">
        <CardContent className="p-0">
          {/* Badge Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white text-balance">FUNDED STARTUP</h2>
              <p className="text-white/90 text-sm">Official Investment Badge</p>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-8 w-4 h-4 bg-white/10 rounded-full"></div>
          </div>

          {/* Badge Content */}
          <div className="p-6 space-y-6">
            {/* Company Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-primary">{companyName}</h3>
              <p className="text-muted-foreground">Founded by {founderName}</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Verified Investment</span>
              </div>
            </div>

            {/* Investment Details */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Investor ID:</span>
                <span className="font-mono font-semibold">#{investorNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Investment Date:</span>
                <span className="font-semibold">{date}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount Invested:</span>
                <span className="font-semibold text-primary">{amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fund:</span>
                <span className="font-semibold">Your Fund Partners</span>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Startup</p>
                <p className="text-sm font-semibold">Status</p>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground">Funded</p>
                <p className="text-sm font-semibold">Club</p>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-4 h-4 text-chart-3" />
                </div>
                <p className="text-xs text-muted-foreground">Verified</p>
                <p className="text-sm font-semibold">Member</p>
              </div>
            </div>

            {/* Badge Footer */}
            <div className="text-center pt-4 border-t border-border/50">
              <Badge variant="outline" className="text-xs mb-4">
                blahblahvc Certified
              </Badge>
              <div className="flex gap-2">
                <Button onClick={handleDownload} size="sm" className="flex-1 group">
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Download
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm" className="flex-1 group bg-transparent">
                  <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
