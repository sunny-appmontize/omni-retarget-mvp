import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export default async function Home() {
  const cookieStore = await cookies();
  // 1. Grab the auth cookie
  const token = cookieStore.get("omni_auth_token")?.value;

  // 2. If a token exists, verify it's legitimate
  if (token) {
    const verifiedPayload = await verifyToken(token);

    // If valid, send them straight to their workspace
    if (verifiedPayload) {
      redirect("/dashboard");
    }
  }

  // 3. If no token, or the token was fake/expired, send to login
  redirect("/auth");
}
