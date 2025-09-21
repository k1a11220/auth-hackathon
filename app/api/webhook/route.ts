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

    const body = await request.json()
    const { sessionId, userId } = body

    if (!sessionId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify the user exists in Stack Auth
    const user = await stackServerApp.getUser({ userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Process the "payment" completion
    console.log(`[v0] Payment completed for user ${userId} with session ${sessionId}`)

    // Here we would:
    // 1. Mark the user as having purchased in your database
    // 2. Generate their term sheet
    // 3. Create their investment badge
    // 4. Queue their AI trailer generation

    // For now, we'll just log the success
    console.log(`[v0] User ${userId} is now funded!`)

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
