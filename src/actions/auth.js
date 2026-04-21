"use server";

import { cookies } from "next/headers";
import { signToken } from "@/lib/jwt";
import { redirect } from "next/navigation";
// import bcrypt from "bcryptjs";
// import { db } from "@/lib/db"; // Assuming Prisma or your MySQL connection pool

export async function loginUser(formData) {
  const { email, password } = formData;

  try {
    // 0. Basic Input Validation
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // ==========================================
    // THE REAL PRODUCTION DATABASE CALL
    // ==========================================

    /*
    // 1. Fetch the user by email (Example uses Prisma syntax, adapt for raw MySQL if needed)
    const user = await db.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });

    // Security Best Practice: Always return a generic "Invalid credentials" error.
    // Never tell the client "User not found" vs "Wrong password" to prevent user enumeration attacks.
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // 2. Compare the plain-text password to the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    // 3. Optional: Check if the user is active/banned before letting them in
    if (user.status !== "ACTIVE") {
      throw new Error("Account is suspended or pending verification.");
    }
    */

    // ==========================================
    // THE MOCK USER (Remove this when DB is live)
    // ==========================================

    // Simulating a DB delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // We mock the user object exactly as the database would return it
    const mockUser = {
      id: "68c13cb63fcf3b475512834f", // Using your OmniTarget ID format
      email: email.toLowerCase(),
      role: "ADMIN",
    };

    // ==========================================
    // TOKEN GENERATION & COOKIE SETTING
    // ==========================================

    // 4. Create the JWT Payload
    // ONLY put non-sensitive identifier data here. Never passwords or personal info.
    const tokenPayload = {
      // Use the real `user` object here when DB is live
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    };

    // 5. Sign the token using our custom jose utility
    const token = await signToken(tokenPayload);

    const cookieStore = await cookies();

    // 6. Set the HTTP-only cookie
    // This is locked down so client-side JavaScript cannot read it (XSS protection)
    cookieStore.set({
      name: "omni_auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    // Optional: Log the successful login in your database
    /*
    await db.auditLog.create({
      data: { userId: user.id, action: "LOGIN_SUCCESS", ipAddress: headers().get("x-forwarded-for") }
    });
    */

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error.message);
    // Only return safe error messages to the client
    return {
      success: false,
      error: error.message || "An unexpected error occurred.",
    };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();

  // 1. Destroy the session cookie
  cookieStore.delete("omni_auth_token");

  // 2. Force the user back to the login screen
  redirect("/auth");
}
