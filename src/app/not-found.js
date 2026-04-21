import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center font-sans">
      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-md">
        {/* Themed Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6 ring-8 ring-primary/5">
            <SearchX className="h-16 w-16 text-primary" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold tracking-tight text-foreground">
            404
          </h1>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Target Not Found
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page or audience segment you are looking for doesn't exist, has
            been removed, or you might not have access to it.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            asChild
            className="w-full sm:w-auto h-10 text-xs font-semibold"
          >
            <Link href="/" className="flex">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-10 text-xs text-foreground font-medium"
          >
            <Link href="/auth/contact" className="flex">
              <LifeBuoy className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
