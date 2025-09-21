import type { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

type Data = {
  success?: boolean
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  if (!resend) {
    return res.status(503).json({ error: "Email service not configured" })
  }

  try {
    const {
      email,
      companyName,
      founderName,
      oneLiner,
      url,
    }: {
      email?: string
      companyName?: string
      founderName?: string
      oneLiner?: string
      url?: string
    } = typeof req.body === "string" ? JSON.parse(req.body) : req.body

    if (!email) {
      return res.status(400).json({ error: "Missing recipient email" })
    }

    const safeCompany = companyName?.trim() || "Your Startup"
    const safeFounder = founderName?.trim() || "Founder"
    const safeOneLiner = oneLiner?.trim() || "Building the future with blahblahvc."
    const safeUrl = url?.trim() || "https://company.com"

    await new Promise((resolve) => setTimeout(resolve, 10_000))

    const { error } = await resend.emails.send({
      from: "blahblahvc <onboarding@resend.dev>",
      to: [email],
      subject: `${safeCompany} is funded!`,
      react: EmailTemplate({
        founderName: safeFounder,
        companyName: safeCompany,
        oneLiner: safeOneLiner,
        url: safeUrl,
      }),
    })

    if (error) {
      console.error("[v0] Resend error", error)
      return res.status(400).json({ error: "Failed to send email" })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("[v0] confirm-purchase handler error", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

