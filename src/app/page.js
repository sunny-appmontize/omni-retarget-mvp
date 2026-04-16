import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      {/* The Main Card: White background, subtle border, soft shadow */}
      <main className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Omnichannel Retargeting
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            The control center for event tracking, automated triggers, and
            multi-channel campaign execution.
          </p>
        </div>

        {/* Conceptual Grid: Reminds you of the 3 steps we discussed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 transition hover:border-blue-200">
            <h3 className="font-medium text-slate-800">1. Track</h3>
            <p className="text-sm text-slate-500 mt-1">
              Capture abandoned carts & user events.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 transition hover:border-blue-200">
            <h3 className="font-medium text-slate-800">2. Trigger</h3>
            <p className="text-sm text-slate-500 mt-1">
              Evaluate logic and delay timers.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 transition hover:border-blue-200">
            <h3 className="font-medium text-slate-800">3. Execute</h3>
            <p className="text-sm text-slate-500 mt-1">
              Fire WhatsApp, SMS, or Email APIs.
            </p>
          </div>
        </div>

        {/* Primary Call to Action Button */}
        <div className="pt-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          >
            Enter Dashboard MVP
          </Link>
        </div>
      </main>
    </div>
  );
}
