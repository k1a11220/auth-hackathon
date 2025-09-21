import { stackServerApp, isStackConfigured } from "../../stack"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArtifactsPageContent } from "@/components/artifacts-page-content"

interface ArtifactsPageProps {
  searchParams: { tab?: string }
}

export default async function ArtifactsPage({ searchParams }: ArtifactsPageProps) {
  if (!isStackConfigured || !stackServerApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Stack Auth Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Please configure Stack Auth environment variables to access your artifacts.
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

  // In a real app, you'd check if the user has purchased
  // For demo purposes, we'll show the artifacts
  const hasPurchased = true

  if (!hasPurchased) {
    redirect("/dashboard")
  }

  // Generate unique investor number and transaction ID (in a real app, this would come from a database)
  const investorNumber = `INV-${Date.now().toString().slice(-6)}`
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`
  const investmentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const defaultTab = searchParams.tab || "term-sheet"

  return (
    <ArtifactsPageContent
      investorNumber={investorNumber}
      transactionId={transactionId}
      investmentDate={investmentDate}
      userDisplayName={user.displayName ?? null}
      userEmail={user.primaryEmail ?? null}
      defaultTab={defaultTab}
    />
  )
}
