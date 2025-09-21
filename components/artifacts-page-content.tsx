"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Users, Receipt, TrendingUp, ArrowLeft } from "lucide-react";
import { TermSheet } from "@/components/term-sheet";
import { InvestmentBadge } from "@/components/investment-badge";
import { InvestmentReceipt } from "@/components/investment-receipt";

type CompanyInfo = {
  companyName: string;
  founderName: string;
  oneLiner: string;
  email: string;
  url: string;
};

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  companyName: "NextGen Innovations",
  founderName: "Visionary Founder",
  oneLiner: "Revolutionizing the future with AI-powered experiences.",
  email: "founder@example.com",
  url: "https://company.com",
};

type ArtifactsPageContentProps = {
  investorNumber: string;
  transactionId: string;
  investmentDate: string;
  userDisplayName?: string | null;
  userEmail?: string | null;
  defaultTab?: string;
};

export function ArtifactsPageContent({
  investorNumber,
  transactionId,
  investmentDate,
  userDisplayName,
  userEmail,
  defaultTab,
}: ArtifactsPageContentProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("companyInfo");
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as Partial<CompanyInfo>;
      setCompanyInfo({
        companyName: parsed.companyName?.trim() || DEFAULT_COMPANY_INFO.companyName,
        founderName: parsed.founderName?.trim() || userDisplayName?.trim() || DEFAULT_COMPANY_INFO.founderName,
        oneLiner: parsed.oneLiner?.trim() || DEFAULT_COMPANY_INFO.oneLiner,
        email: parsed.email?.trim() || userEmail?.trim() || DEFAULT_COMPANY_INFO.email,
        url: parsed.url?.trim() || DEFAULT_COMPANY_INFO.url,
      });
    } catch (error) {
      console.warn("[v0] Failed to load stored company info for artifacts", error);
    }
  }, [userDisplayName, userEmail]);

  const companyData = useMemo(
    () => ({
      founderName: companyInfo.founderName,
      companyName: companyInfo.companyName,
      mission: companyInfo.oneLiner,
    }),
    [companyInfo],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Your Investment Artifacts</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs">
              Investor #{investorNumber}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Welcome, {userDisplayName || userEmail || companyInfo.founderName}
            </span>
            <Link href="/handler/sign-out">
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Congratulations Banner */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-4">
            🎉 Welcome to the <span className="text-primary">Funded Club</span>!
          </h1>
          <p className="text-lg text-muted-foreground text-pretty mb-6">
            Your official investment artifacts are ready for {companyInfo.companyName}. Time to show the world you're funded!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline">Investment Date: {investmentDate}</Badge>
            <Badge variant="outline">Investor ID: #{investorNumber}</Badge>
            <Badge variant="outline">Contact: {companyInfo.email}</Badge>
          </div>
        </div>

        {/* Artifacts Tabs */}
        <Tabs defaultValue={defaultTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="term-sheet" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Term Sheet
            </TabsTrigger>
            <TabsTrigger value="badge" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Badge
            </TabsTrigger>
            <TabsTrigger value="receipt" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Receipt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="term-sheet" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Official Term Sheet</h2>
              <p className="text-muted-foreground">Your professional investment document tailored to {companyInfo.companyName}.</p>
            </div>
            <TermSheet
              founderName={companyData.founderName}
              companyName={companyData.companyName}
              mission={companyData.mission}
              investorNumber={investorNumber}
              date={investmentDate}
            />
          </TabsContent>

          <TabsContent value="badge" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Investment Badge</h2>
              <p className="text-muted-foreground">Show off {companyInfo.companyName}'s funded status.</p>
            </div>
            <InvestmentBadge
              founderName={companyData.founderName}
              companyName={companyData.companyName}
              investorNumber={investorNumber}
              date={investmentDate}
              amount="$1.00"
            />
          </TabsContent>

          <TabsContent value="receipt" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Investment Receipt</h2>
              <p className="text-muted-foreground">Official transaction record for your investment package.</p>
            </div>
            <InvestmentReceipt
              founderName={companyData.founderName}
              companyName={companyData.companyName}
              investorNumber={investorNumber}
              date={investmentDate}
              amount="$1.00"
              transactionId={transactionId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
