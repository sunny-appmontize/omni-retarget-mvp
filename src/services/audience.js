// Import your database instance here
// import { db } from "@/lib/db";

export async function getUserProfileData(userId) {
  // Real world:
  // const user = await db.users.findUnique({ where: { id: userId } });
  // if (!user) throw new Error("User not found");
  // return user;
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Fake network delay

  // Simulated for now:
  return {
    id: userId,
    firstName: "Aisha",
    lastName: "Alamari",
    email: "aishaalamari777@gmail.com",
    mobile: "+97339666325",
    omniId: "68c13cb63fcf3b475512834f",
    status: "REGISTERED",
    lifecycle: { lastActive: "02 Dec 2025", sessions: 32 },
    conversion: { count: 0, ltv: 0 },
    acquisition: { firstSeen: "10 Sep 2025", campaign: "N/A" },
    location: { city: "Manama", country: "Bahrain" },
  };
}
