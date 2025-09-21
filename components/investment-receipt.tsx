"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, Download, CheckCircle, DollarSign } from "lucide-react"

interface InvestmentReceiptProps {
  founderName: string
  companyName: string
  investorNumber: string
  date: string
  amount: string
  transactionId: string
}

export function InvestmentReceipt({
  founderName,
  companyName,
  investorNumber,
  date,
  amount,
  transactionId,
}: InvestmentReceiptProps) {
  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-accent/20 shadow-xl bg-gradient-to-br from-card to-accent/5">
        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-accent/5 to-chart-3/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">INVESTMENT RECEIPT</h1>
                <p className="text-sm text-muted-foreground">Official Transaction Record</p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground">PAID</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {/* Receipt Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-balance">Payment Successful</h2>
            <p className="text-muted-foreground">Your investment has been processed</p>
          </div>

          {/* Transaction Details */}
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Transaction Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receipt #:</span>
                  <span className="font-mono text-sm">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investor ID:</span>
                  <span className="font-mono">#{investorNumber}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="font-semibold">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founder:</span>
                  <span className="font-semibold">{founderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary" className="text-xs">
                    Completed
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="bg-gradient-to-r from-accent/5 to-chart-3/5 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Investment Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  Investment Package
                </span>
                <span className="font-bold text-accent">{amount}</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Official Term Sheet Document</p>
                <p>• Digital Investment Badge</p>
                <p>• AI-Generated Hype Trailer</p>
                <p>• Unique Investor Number</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-border/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Payment Method</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary">💳</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Credit Card</p>
                <p className="text-xs text-muted-foreground">Processed by Stripe</p>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="text-xs text-muted-foreground bg-muted/20 rounded-lg p-4">
            <p className="mb-2">
              <strong>Important Notice:</strong> This is a novelty investment receipt for entertainment purposes. This
              does not constitute a real investment or equity stake in any company.
            </p>
            <p>
              By purchasing this package, you acknowledge that this is a fun way to celebrate your entrepreneurial
              journey and does not represent actual funding or investment.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button onClick={handleDownload} className="flex-1 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Email Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
