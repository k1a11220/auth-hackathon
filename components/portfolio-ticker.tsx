"use client"

import { useEffect, useState } from "react"

const portfolioCompanies = [
  { name: "Stripe", ticker: "STRIPE", logo: "/stripe-logo.png" },
  { name: "Airbnb", ticker: "ABNB", logo: "/airbnb-house-logo.jpg" },
  { name: "Uber", ticker: "UBER", logo: "/uber-car-logo.jpg" },
  { name: "Spotify", ticker: "SPOT", logo: "/spotify-music-logo.jpg" },
  { name: "Slack", ticker: "WORK", logo: "/slack-communication-logo.jpg" },
  { name: "Zoom", ticker: "ZM", logo: "/zoom-video-call-logo.jpg" },
  { name: "Notion", ticker: "NTION", logo: "/notion-notes-logo.jpg" },
  { name: "Figma", ticker: "FIGMA", logo: "/figma-design-logo.jpg" },
  { name: "Discord", ticker: "DSCD", logo: "/discord-gaming-logo.jpg" },
  { name: "Canva", ticker: "CANVA", logo: "/canva-design-logo.jpg" },
  { name: "Shopify", ticker: "SHOP", logo: "/shopify-ecommerce-logo.jpg" },
  { name: "Twilio", ticker: "TWLO", logo: "/twilio-communication-logo.jpg" },
]

export function PortfolioTicker() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-muted/20 py-8 border-y border-border/50">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-muted-foreground">OUR PORTFOLIO COMPANIES</span>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>

      <div className="relative">
        <div
          className={`flex gap-8 transition-transform duration-1000 ${isVisible ? "animate-scroll" : ""}`}
          style={{
            width: "calc(200% + 2rem)",
            animation: isVisible ? "scroll 30s linear infinite" : "none",
          }}
        >
          {/* First set */}
          {portfolioCompanies.map((company, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50 hover:border-primary/30 transition-colors min-w-fit"
            >
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="w-8 h-8 object-contain rounded"
              />
              <div>
                <div className="font-semibold text-sm">{company.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{company.ticker}</div>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {portfolioCompanies.map((company, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50 hover:border-primary/30 transition-colors min-w-fit"
            >
              <img
                src={company.logo || "/placeholder.svg"}
                alt={`${company.name} logo`}
                className="w-8 h-8 object-contain rounded"
              />
              <div>
                <div className="font-semibold text-sm">{company.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{company.ticker}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
