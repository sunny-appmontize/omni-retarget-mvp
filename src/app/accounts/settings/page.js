"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-medium text-foreground">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your language and regional settings.
        </p>
      </div>
      <div className="border-t border-border" />

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2 ">
          <Label>Language</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="space-y-2 ">
          <Label>Timezone</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Pacific Standard Time (PST)</option>
            <option>Eastern Standard Time (EST)</option>
            <option>Coordinated Universal Time (UTC)</option>
          </select>
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
                Updating...
              </>
            ) : (
              "Update preferences"
            )}
          </Button>
          {isSaved && (
            <div className="flex items-center text-sm text-emerald-500 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 mr-1.5" /> Saved
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
