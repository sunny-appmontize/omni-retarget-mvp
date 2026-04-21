import { SignJWT, jwtVerify } from "jose";

// The Edge runtime requires secrets to be encoded as Uint8Array
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return new TextEncoder().encode(secret);
};

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 7 days
    .sign(getJwtSecretKey());
}

export async function verifyToken(token) {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());
    return verified.payload; // Returns the decoded data (e.g., { userId: 123 })
  } catch (error) {
    // If the token is fake, altered, or expired, it throws an error.
    return null;
  }
}
