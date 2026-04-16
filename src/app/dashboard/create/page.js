"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Zap,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { saveJourneyToDB } from "@/lib/actions/create_journey";
import { seedDatabase } from "@/lib/seed";

export default function CreateJourneyPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [journeyConfig, setJourneyConfig] = useState({
    name: "New Retargeting Campaign",
    triggerEvent: "cart_abandoned",
    delayAmount: "2",
    delayUnit: "hours",
    channel: "whatsapp",
    templateId: "temp_1",
  });

  useEffect(() => {
    seedDatabase();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    // Call the Server Action just like a normal function
    const result = await saveJourneyToDB(journeyConfig);

    setIsSaving(false);

    if (result.success) {
      alert(`Success! Saved to SQLite with ID: ${result.id}`);
      // Usually, you would router.push('/dashboard') here to go back
    } else {
      alert("Failed to save. Check terminal.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center border-b border-slate-300 pb-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-slate-600" />
          </Link>
          <div>
            <input
              type="text"
              value={journeyConfig.name}
              onChange={(e) =>
                setJourneyConfig({ ...journeyConfig, name: e.target.value })
              }
              className="text-xl font-semibold tracking-tight text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0"
            />
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Status: Draft
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-colors">
            Test Logic
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Save className="h-4 w-4" /> Save & Activate
          </button>
        </div>
      </div>

      {/* THE BUILDER CANVAS */}
      <div className="bg-white border border-slate-300 p-8">
        <div className="max-w-2xl mx-auto relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-8 bottom-8 w-px bg-slate-300 z-0"></div>

          {/* STEP 1: TRIGGER */}
          <div className="relative z-10 flex gap-6 mb-12 group">
            <div className="h-12 w-12 bg-slate-900 flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 bg-white border border-slate-300 p-5 group-hover:border-slate-400 transition-colors shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                1. Trigger Event
              </h3>
              <p className="text-[11px] text-slate-500 mb-4">
                When a user performs this action on your site.
              </p>

              <select
                value={journeyConfig.triggerEvent}
                onChange={(e) =>
                  setJourneyConfig({
                    ...journeyConfig,
                    triggerEvent: e.target.value,
                  })
                }
                className="w-full border border-slate-300 p-2.5 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
              >
                <option value="cart_abandoned">cart_abandoned</option>
                <option value="product_viewed">product_viewed</option>
                <option value="checkout_started">checkout_started</option>
                <option value="account_created">account_created</option>
              </select>
            </div>
          </div>

          {/* STEP 2: DELAY & CONDITION */}
          <div className="relative z-10 flex gap-6 mb-12 group">
            <div className="h-12 w-12 bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
              <Clock className="h-5 w-5 text-slate-600" />
            </div>
            <div className="flex-1 bg-white border border-slate-300 p-5 group-hover:border-slate-400 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                    2. Delay & Evaluate
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Wait this long, then check if conversion goal is unmet.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Wait for
                </span>
                <input
                  type="number"
                  value={journeyConfig.delayAmount}
                  onChange={(e) =>
                    setJourneyConfig({
                      ...journeyConfig,
                      delayAmount: e.target.value,
                    })
                  }
                  className="w-20 border border-slate-300 p-2 text-sm text-center font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <select
                  value={journeyConfig.delayUnit}
                  onChange={(e) =>
                    setJourneyConfig({
                      ...journeyConfig,
                      delayUnit: e.target.value,
                    })
                  }
                  className="w-32 border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>

              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-400" />
                System will check if{" "}
                <code className="font-bold">purchased == true</code>. If true,
                journey stops.
              </div>
            </div>
          </div>

          {/* STEP 3: ACTION / EXECUTION */}
          <div className="relative z-10 flex gap-6 group">
            <div className="h-12 w-12 bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 bg-white border border-blue-200 p-5 shadow-[0_0_0_1px_#bfdbfe] transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
                3. Execute Action
              </h3>
              <p className="text-[11px] text-blue-700/70 mb-4">
                Send message to user via selected channel.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Delivery Channel
                  </label>
                  <select
                    value={journeyConfig.channel}
                    onChange={(e) =>
                      setJourneyConfig({
                        ...journeyConfig,
                        channel: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 p-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="whatsapp">WhatsApp Business API</option>
                    <option value="email">Email (SendGrid)</option>
                    <option value="sms">SMS (Twilio)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Message Template
                  </label>
                  <select
                    value={journeyConfig.templateId}
                    onChange={(e) =>
                      setJourneyConfig({
                        ...journeyConfig,
                        templateId: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 p-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                  >
                    <option value="temp_1">Cart Recovery - 10% Discount</option>
                    <option value="temp_2">
                      Cart Recovery - FOMO (Running out of stock)
                    </option>
                    <option value="temp_3">Welcome Series - Brand Intro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
