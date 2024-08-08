import type { Request, Response } from "express";
import { db } from "../db";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    let user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Corrected: Wrap email and password inside the `data` object
    user = await db.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: "this is login method" });
};
