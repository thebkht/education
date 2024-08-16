import type { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "@/services/auth";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    const user = await AuthService.register({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Assuming AuthService returns tokens like this
    const { access, refresh } = user;

    // Set cookies
    setCookie({ res }, "access_token", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    setCookie({ res }, "refresh_token", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "siz tizimga muvaffaqiyatli kirdingiz" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
