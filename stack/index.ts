export { stackServerApp } from "./server"
export { stackClientApp } from "./client"

const requiredEnvVars = [
  process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
  process.env.STACK_SECRET_SERVER_KEY,
]

export const isStackConfigured = requiredEnvVars.every(Boolean)
