"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, DollarSign, ArrowRight } from "lucide-react";
import { useStackApp, useUser } from "@stackframe/stack";

interface CompanyInfoFormProps {
  onClose: () => void;
}

export function CompanyInfoForm({ onClose }: CompanyInfoFormProps) {
  const stackApp = useStackApp();
  const user = useUser();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    oneLiner: "",
    founderName: "",
    url: "",
    logo: null as File | null,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      localStorage.setItem("companyInfo", JSON.stringify(formData));
      if (!user) {
        await stackApp.redirectToSignIn();
        return;
      }

      const checkoutUrl = await user.createCheckoutUrl({ offerId: "offer-2" });

      const emailPayload = {
        email: formData.email || user.primaryEmail || undefined,
        companyName: formData.companyName,
        founderName: formData.founderName,
        oneLiner: formData.oneLiner,
        url: formData.url,
      };

      try {
        const body = JSON.stringify(emailPayload);
        const blob = new Blob([body], { type: "application/json" });
        const sent =
          typeof navigator !== "undefined" && "sendBeacon" in navigator
            ? navigator.sendBeacon("/api/confirm-purchase", blob)
            : false;

        if (!sent) {
          void fetch("/api/confirm-purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          });
        }
      } catch (error) {
        console.warn("[v0] Failed to queue confirmation email", error);
      }

      window.open(checkoutUrl, "_blank", "noopener,noreferrer");

      onClose();
      window.location.href = "/success";
    } catch (error) {
      console.error("Error processing form:", error);
      alert("Failed to process form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.companyName &&
    formData.email &&
    formData.oneLiner &&
    formData.founderName &&
    formData.url;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Company Information
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Tell us about your company to complete your investment package
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Logo */}
            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label htmlFor="logo" className="cursor-pointer">
                  {logoPreview ? (
                    <div className="space-y-2">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-20 h-20 object-contain mx-auto rounded-lg border"
                      />
                      <p className="text-sm text-muted-foreground">
                        {formData.logo?.name} - Click to change
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload logo
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g., Acme Inc."
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="founder@company.com"
                required
              />
            </div>

            {/* One Liner */}
            <div className="space-y-2">
              <Label htmlFor="oneLiner">One Liner *</Label>
              <Textarea
                id="oneLiner"
                name="oneLiner"
                value={formData.oneLiner}
                onChange={handleInputChange}
                placeholder="We're building the future of..."
                rows={3}
                required
              />
            </div>

            {/* Founder Name */}
            <div className="space-y-2">
              <Label htmlFor="founderName">Founder Name *</Label>
              <Input
                id="founderName"
                name="founderName"
                value={formData.founderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Company URL */}
            <div className="space-y-2">
              <Label htmlFor="url">Company URL *</Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://company.com"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 group"
                disabled={!isFormValid || isLoading}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {isLoading ? "Processing..." : "Complete Purchase ($1)"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
