"use client";

import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-medium text-foreground">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive alerts.
        </p>
      </div>
      <div className="border-t border-border" />

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
          <div className="space-y-0.5">
            <h4 className="text-sm font-medium text-foreground">
              Marketing Emails
            </h4>
            <p className="text-xs text-muted-foreground">
              Receive news, updates, and promotions.
            </p>
          </div>
          {/* Use a proper Shadcn Switch component here if you have one installed */}
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300 text-primary"
            defaultChecked
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
          <div className="space-y-0.5">
            <h4 className="text-sm font-medium text-foreground">
              Security Alerts
            </h4>
            <p className="text-xs text-muted-foreground">
              Get notified of new logins and password changes.
            </p>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300 text-primary"
            defaultChecked
            disabled
          />
        </div>

        <Button className="mt-4">Save Preferences</Button>
      </div>
    </div>
  );
}
