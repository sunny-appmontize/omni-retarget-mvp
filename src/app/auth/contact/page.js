"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSupportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with real support ticket API call
      // await fetch('/api/support', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 text-center lg:text-left">
        <div className="flex justify-center lg:justify-start mb-4">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Message Sent
        </h2>
        <p className="text-xs text-muted-foreground">
          Our support team has received your request and will get back to you
          shortly.
        </p>
        <div className="pt-4 flex justify-center lg:justify-start">
          <Link
            href="/auth/login"
            className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="mr-2 transition-transform group-hover:-translate-x-1"
            />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Contact Support
        </h2>
        <p className="text-xs text-muted-foreground">
          Need help accessing your account? Send us a message.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs text-foreground">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-9 text-xs text-foreground"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-xs text-foreground">
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            placeholder="e.g. Account Access Issue"
            className="h-9 text-xs text-foreground"
            value={formData.subject}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Please provide details about your issue..."
            className="min-h-[120px] text-xs resize-none bg-background custom-scrollbar text-foreground"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-xs font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>

      <div className="flex justify-center lg:justify-start">
        <Link
          href="/auth/login"
          className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="mr-2 transition-transform group-hover:-translate-x-1"
          />
          Back to login
        </Link>
      </div>
    </div>
  );
}
