import * as React from "react"

interface EmailTemplateProps {
  founderName: string
  companyName: string
  oneLiner: string
  url: string
}

export function EmailTemplate({ founderName, companyName, oneLiner, url }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <p>🎉 Congrats <strong>{founderName}</strong>!</p>
      <p>
        We just processed your $1 blahblahvc investment package. Here&apos;s what&apos;s on the way for
        <strong> {companyName}</strong>:
      </p>
      <ul>
        <li>Custom term sheet packed with VC buzzwords</li>
        <li>Investor badge proving you&apos;re funded</li>
        <li>
          AI hype trailer featuring your site: <a href={url}>{url}</a>
        </li>
      </ul>
      <p>
        <strong>Your pitch:</strong> {oneLiner}
      </p>
      <p>Thanks for using blahblahvc – welcome to the funded club! 🚀</p>
    </div>
  )
}

