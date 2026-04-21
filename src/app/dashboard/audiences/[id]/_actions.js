"use server";

import { revalidatePath } from "next/cache";

export async function testReachabilityChannel(userId, channel) {
  try {
    // 1. Hit your external service / API
    // await sendTestNotification(userId, channel);

    // 2. Revalidate the page so UI updates immediately
    revalidatePath(`/dashboard/audience/${userId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to test channel" };
  }
}

export async function getActivityTimeline(userId) {
  // Simulate a heavy database query or external API call
  // e.g., const logs = await db.activityLogs.findMany({ where: { userId } })

  await new Promise((resolve) => setTimeout(resolve, 1500)); // Fake network delay

  return [
    {
      id: "evt_1",
      time: "03:35 am",
      date: "02 Dec 2025",
      title: "App/Site Opened",
      category: "Lifecycle",
      gap: "< 1 s",
      source: "MoEngage",
      platform: "Web",
      details: [
        { key: "Event Time", value: "02 Dec 2025, 03:35:02 am" },
        { key: "Event Received Time", value: "02 Dec 2025, 04:35:02 am" },
        { key: "SDK Version", value: "2.64.00" },
        { key: "App Version", value: "1.0" },
        { key: "moe_session_id", value: "1f17de80-b52f-41f3-a358-377b16a3..." },
        { key: "MOE Event Category", value: "Lifecycle" },
        { key: "First Session", value: "false" },
        { key: "MOE Event Source", value: "INTERNAL" },
        { key: "moe_logged_in_status", value: "true" },
        { key: "URL", value: "https://omnitarget.com/ar/account..." },
      ],
    },
    {
      id: "evt_2",
      time: "03:35 am",
      date: "02 Dec 2025",
      title: "Viewed Web Page",
      category: "Lifecycle",
      gap: "1 hr 45 mins",
      source: "MoEngage",
      platform: "Web",
      details: [
        { key: "Page URL", value: "/pricing" },
        { key: "Time Spent", value: "45s" },
      ],
    },
    {
      id: "evt_3",
      time: "01:49 am",
      date: "02 Dec 2025",
      title: "Email Delivered",
      category: "Campaign Activity",
      gap: "1 s",
      source: "OmniTarget",
      platform: "Email",
      details: [
        { key: "Campaign ID", value: "CMP-BF-2025" },
        { key: "Delivery Status", value: "Success" },
      ],
    },
    {
      id: "evt_4",
      time: "01:49 am",
      date: "02 Dec 2025",
      title: "Email Sent",
      category: "Campaign Activity",
      gap: "15 s",
      source: "OmniTarget",
      platform: "Email",
      details: [{ key: "Campaign ID", value: "CMP-BF-2025" }],
    },
    {
      id: "evt_5",
      time: "01:49 am",
      date: "02 Dec 2025",
      title: "User Exited Flow",
      category: "Campaign Activity",
      gap: "7 mins 12 s",
      source: "OmniTarget",
      platform: "System",
      details: [{ key: "Flow Name", value: "Abandoned Cart Sequence" }],
    },
  ];
}
