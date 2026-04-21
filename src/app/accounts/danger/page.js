"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DangerPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-medium text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-muted-foreground">
          Irreversible and destructive actions.
        </p>
      </div>
      <div className="border-t border-destructive/20" />

      <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-6 space-y-4 max-w-xl">
        <h4 className="text-base font-semibold text-foreground">
          Delete Account
        </h4>
        <p className="text-sm text-muted-foreground">
          Permanently remove your personal account and all of its contents from
          the OmniTarget platform. This action is not reversible.
        </p>
        <div className="pt-2 space-x-4">
          <Button variant="outline" className="font-semibold">
            Deactivate Account
          </Button>
          <Button variant="destructive" className="font-semibold">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
