import { type NextRequest, NextResponse } from "next/server"
import { stackServerApp, isStackConfigured } from "../../../stack"

export async function POST(request: NextRequest) {
  try {
    if (!isStackConfigured || !stackServerApp) {
      return NextResponse.json(
        { error: "Stack Auth is not configured. Please set up environment variables." },
        { status: 503 },
      )
    }

    const formData = await request.formData()
    const userId = formData.get("userId") as string

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Verify the user exists in Stack Auth
    const user = await stackServerApp.getUser({ userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // For demo purposes, we'll simulate instant payment success
    // In a real app, you'd integrate with a payment processor here
    const mockSessionId = `stack_session_${Date.now()}_${userId.slice(-6)}`

    // Mark user as funded (in a real app, this would be in your database)
    console.log(`[v0] Processing payment for user ${userId}`)

    // Redirect to success page with session ID
    return NextResponse.json({
      sessionId: mockSessionId,
      redirectUrl: `${request.nextUrl.origin}/success?session_id=${mockSessionId}`,
    })
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
