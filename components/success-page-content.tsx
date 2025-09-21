"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Zap, ArrowRight } from "lucide-react";

type SuccessPageContentProps = {
  sessionLabel: string;
  userName?: string | null;
  userEmail?: string | null;
};

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

export function SuccessPageContent({ sessionLabel, userName, userEmail }: SuccessPageContentProps) {
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
        founderName: parsed.founderName?.trim() || DEFAULT_COMPANY_INFO.founderName,
        oneLiner: parsed.oneLiner?.trim() || DEFAULT_COMPANY_INFO.oneLiner,
        email: parsed.email?.trim() || userEmail?.trim() || DEFAULT_COMPANY_INFO.email,
        url: parsed.url?.trim() || DEFAULT_COMPANY_INFO.url,
      });
    } catch (error) {
      console.warn("[v0] Failed to load stored company info", error);
    }
  }, [userEmail]);

  const welcomeName = userName?.trim() || companyInfo.founderName;
  const contactEmail = companyInfo.email || userEmail || DEFAULT_COMPANY_INFO.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">blahblahvc</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {welcomeName || userEmail}
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance mb-4">
              🎉 {companyInfo.companyName} is officially <span className="text-primary">Funded</span>!
            </h1>
            <p className="text-lg text-muted-foreground text-pretty mb-8">
              {companyInfo.oneLiner || DEFAULT_COMPANY_INFO.oneLiner}
            </p>
            <Badge className="text-sm px-4 py-2 mb-8" variant="secondary">
              Payment Successful • Session ID: {sessionLabel}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Confirmation sent to {contactEmail}. Keep an eye out for your docs and badge.
            </p>
          </div>

          {/* What's Next */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Term Sheet Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Drafting {companyInfo.companyName}'s official term sheet with all the VC buzzwords.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Badge Minting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Creating a personalized investor badge for {companyInfo.founderName}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-3/20">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="text-lg">AI Trailer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prepping a hype trailer to showcase {companyInfo.companyName}'s vision ({companyInfo.url}).
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Link href="/artifacts">
              <Button size="lg" className="text-lg px-8 py-6 group">
                View Your Investment Artifacts
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your artifacts will be available in your dashboard within 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

