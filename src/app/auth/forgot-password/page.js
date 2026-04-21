"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with real reset API call
      // await sendPasswordResetEmail(email);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error("Reset failed:", error);
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
          Check your email
        </h2>
        <p className="text-xs text-muted-foreground">
          We've sent a password reset link to{" "}
          <span className="font-medium text-foreground">{email}</span>.
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
          Reset password
        </h2>
        <p className="text-xs text-muted-foreground">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleReset}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs text-foreground">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-10 text-xs text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            "Send Reset Link"
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
