import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt"; // The jose utility we made

export async function middleware(request) {
  // 1. Get the raw string from the cookie
  const token = request.cookies.get("omni_auth_token")?.value;

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  // 2. ACTUALLY VERIFY THE TOKEN
  let verifiedPayload = null;
  if (token) {
    // This uses jose to ensure the token was signed with your JWT_SECRET
    // If it's forged, expired, or garbage text, this returns null.
    verifiedPayload = await verifyToken(token);
  }

  // 3. Logic: If trying to access dashboard WITHOUT a VALID token
  if (isDashboardRoute && !verifiedPayload) {
    const response = NextResponse.redirect(new URL("/auth", request.url));

    // If they had a fake/expired cookie, delete it so it doesn't linger
    if (token) {
      response.cookies.delete("omni_auth_token");
    }

    return response;
  }

  // 4. Logic: If trying to access auth WITH a VALID token, skip to dashboard
  if (isAuthRoute && verifiedPayload) {
    return NextResponse.redirect(new URL("/dashboard/audiences", request.url));
  }

  // 5. Allow the request to continue normally
  const response = NextResponse.next();

  // PRO TIP: Pass the verified user ID downstream!
  // This lets your Server Components know who is logged in
  // without having to re-verify the token in every single file.
  if (verifiedPayload) {
    response.headers.set("x-user-id", verifiedPayload.userId);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
