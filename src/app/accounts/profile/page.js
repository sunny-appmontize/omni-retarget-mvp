"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-medium text-foreground">Public Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <div className="border-t border-border" />

      <form onSubmit={handleSave} className="space-y-8">
        {/* Avatar Upload */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-foreground">Avatar</Label>
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
                <span className="text-2xl font-semibold text-muted-foreground group-hover:opacity-0 transition-opacity">
                  JD
                </span>
              </div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <Button type="button" variant="outline" size="sm" className="h-8">
                Change avatar
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              defaultValue="John Doe"
              className=" h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue="john@company.com"
              disabled
              className=" h-10 text-sm bg-muted/50 cursor-not-allowed"
            />
            <p className="text-[13px] text-muted-foreground">
              Used for login. Cannot be changed here.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              rows={4}
              className="flex w-full  rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              defaultValue="I build cool things for the internet."
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 px-8 text-sm font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Update profile"
            )}
          </Button>

          {isSaved && (
            <div className="flex items-center text-sm text-emerald-500 animate-in fade-in slide-in-from-left-2">
              <CheckCircle2 className="h-4 w-4 mr-1.5" /> Saved successfully
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
