"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Download, Share2, Loader2, Sparkles } from "lucide-react"

interface AITrailerGeneratorProps {
  companyName: string
  founderName: string
  onTrailerGenerated?: (trailerUrl: string) => void
}

export function AITrailerGenerator({ companyName, founderName, onTrailerGenerated }: AITrailerGeneratorProps) {
  const [mission, setMission] = useState("")
  const [website, setWebsite] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrailer, setGeneratedTrailer] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    if (!mission.trim()) return

    setIsGenerating(true)
    setProgress(0)

    // Simulate AI trailer generation progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 500)

    try {
      // In a real app, this would call an AI video generation API
      // For demo purposes, we'll simulate the process
      await new Promise((resolve) => setTimeout(resolve, 8000))

      // Mock generated trailer URL
      const mockTrailerUrl = "/api/generated-trailer/sample-trailer.mp4"
      setGeneratedTrailer(mockTrailerUrl)
      onTrailerGenerated?.(mockTrailerUrl)
      setProgress(100)
    } catch (error) {
      console.error("Error generating trailer:", error)
    } finally {
      setIsGenerating(false)
      clearInterval(progressInterval)
    }
  }

  const handleDownload = () => {
    if (generatedTrailer) {
      // In a real app, this would download the actual video file
      console.log("Downloading trailer:", generatedTrailer)
    }
  }

  const handleShare = () => {
    if (navigator.share && generatedTrailer) {
      navigator.share({
        title: `${companyName} - AI Generated Hype Trailer`,
        text: `Check out our startup hype trailer! We're officially funded! 🚀`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!generatedTrailer ? (
        <Card className="border-2 border-chart-3/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-chart-3" />
              AI Trailer Generator
            </CardTitle>
            <p className="text-muted-foreground">
              Tell us about your startup and we'll create a 10-second hype trailer that makes you look like the next
              unicorn!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isGenerating ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Company Mission (Required)</label>
                    <Textarea
                      placeholder="Describe your startup's mission in one compelling sentence. What problem are you solving?"
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      className="min-h-[100px]"
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{mission.length}/200 characters</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Website or Demo Link (Optional)</label>
                    <Input
                      placeholder="https://your-startup.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-chart-3" />
                    What You'll Get:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 10-second AI-generated video trailer</li>
                    <li>• Professional startup aesthetic with your branding</li>
                    <li>• Compelling voiceover based on your mission</li>
                    <li>• Perfect for social media and investor presentations</li>
                  </ul>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!mission.trim() || isGenerating}
                  size="lg"
                  className="w-full group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Generate My Hype Trailer
                </Button>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-chart-3 animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Creating Your Hype Trailer</h3>
                  <p className="text-muted-foreground mb-4">
                    Our AI is crafting the perfect trailer for {companyName}...
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className="bg-chart-3 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✨ Analyzing your mission statement...</p>
                  <p>🎬 Generating visual elements...</p>
                  <p>🎵 Adding background music...</p>
                  <p>🗣️ Creating voiceover...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-chart-3/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-chart-3" />
              Your AI-Generated Hype Trailer
            </CardTitle>
            <p className="text-muted-foreground">Ready to show the world you're the next big thing!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Player Placeholder */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{companyName}</h3>
                    <p className="text-white/80">The Future is Here</p>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">10 seconds</Badge>
                </div>
              </div>
              <Button
                size="lg"
                className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/20 border-0"
                onClick={() => console.log("Playing trailer...")}
              >
                <span className="sr-only">Play trailer</span>
              </Button>
            </div>

            {/* Trailer Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Trailer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>10 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolution:</span>
                    <span>1080p HD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span>MP4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generated:</span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Features Included</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✨ AI-generated visuals</p>
                  <p>🎵 Professional background music</p>
                  <p>🗣️ Compelling voiceover</p>
                  <p>🎬 Startup-focused aesthetic</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
              <Button onClick={handleDownload} className="flex-1 group">
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Download Trailer
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1 group bg-transparent">
                <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Share on Social
              </Button>
            </div>

            {/* Regenerate Option */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Not happy with the result?</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setGeneratedTrailer(null)
                  setMission("")
                  setWebsite("")
                }}
              >
                Generate New Trailer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
