import type React from "react"
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack/server";
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "blahblahvc - You're Funded!",
  description: "Get your investment artifacts and join the funded startup club",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}><StackProvider app={stackServerApp}><StackTheme>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </StackTheme></StackProvider></body>
    </html>
  )
}
