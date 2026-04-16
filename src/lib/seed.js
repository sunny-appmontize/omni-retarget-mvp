"use server";

import db from "./db.js";
// 1. Create the table WITH all the metric columns
db.exec(`
  CREATE TABLE IF NOT EXISTS journeys (
    id TEXT PRIMARY KEY,
    name TEXT,
    status TEXT,
    triggerEvent TEXT,
    channel TEXT,
    sent INTEGER,
    delivered INTEGER,
    opened INTEGER,
    clicked INTEGER,
    recovered INTEGER,
    revenue INTEGER,
    trend TEXT,
    lastRun TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 2. Fetch all journeys from the DB
export async function getJourneys() {
  try {
    const rows = db
      .prepare(`SELECT * FROM journeys ORDER BY createdAt DESC`)
      .all();

    // We stored the 'trend' array as a JSON string, so we need to parse it back to an array
    return rows.map((row) => ({
      ...row,
      trend: JSON.parse(row.trend),
    }));
  } catch (error) {
    console.error("Failed to fetch journeys:", error);
    return [];
  }
}

// 3. Seed the database with your dummy data if it's empty
export async function seedDatabase() {
  const count = db.prepare(`SELECT COUNT(*) as count FROM journeys`).get();

  if (count.count > 0) {
    return { success: true, message: "Database already has data." };
  }

  const dummyData = [
    {
      id: "j_1",
      name: "Abandoned Cart - High Intent",
      status: "ACTIVE",
      triggerEvent: "cart_abandoned",
      channel: "WhatsApp",
      sent: 1205,
      delivered: 1198,
      opened: 892,
      clicked: 456,
      recovered: 340,
      revenue: 45000,
      trend: [12, 15, 18, 14, 20, 18, 22, 19, 25, 28],
      lastRun: "2h ago",
    },
    {
      id: "j_2",
      name: "Welcome Series - New Signups",
      status: "ACTIVE",
      triggerEvent: "account_created",
      channel: "Email",
      sent: 8900,
      delivered: 8850,
      opened: 4200,
      clicked: 1680,
      recovered: 120,
      revenue: 0,
      trend: [45, 50, 48, 52, 55, 58, 60, 62, 65, 68],
      lastRun: "15m ago",
    },
    {
      id: "j_3",
      name: "Win-back 30 Days",
      status: "PAUSED",
      triggerEvent: "inactive_30d",
      channel: "SMS",
      sent: 450,
      delivered: 448,
      opened: 312,
      clicked: 89,
      recovered: 12,
      revenue: 1200,
      trend: [8, 7, 6, 5, 4, 3, 2, 2, 1, 1],
      lastRun: "3d ago",
    },
    {
      id: "j_4",
      name: "Browse Abandonment - Category",
      status: "ACTIVE",
      triggerEvent: "browse_abandoned",
      channel: "Email",
      sent: 3240,
      delivered: 3220,
      opened: 1850,
      clicked: 680,
      recovered: 145,
      revenue: 18500,
      trend: [15, 18, 16, 20, 22, 25, 23, 28, 30, 32],
      lastRun: "1h ago",
    },
  ];

  const insert = db.prepare(`
    INSERT INTO journeys (id, name, status, triggerEvent, channel, sent, delivered, opened, clicked, recovered, revenue, trend, lastRun)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Run all inserts in a single transaction for speed
  const transaction = db.transaction((journeys) => {
    for (const j of journeys) {
      insert.run(
        j.id,
        j.name,
        j.status,
        j.triggerEvent,
        j.channel,
        j.sent,
        j.delivered,
        j.opened,
        j.clicked,
        j.recovered,
        j.revenue,
        JSON.stringify(j.trend),
        j.lastRun,
      );
    }
  });

  transaction(dummyData);
  return { success: true, message: "Dummy data seeded!" };
}
