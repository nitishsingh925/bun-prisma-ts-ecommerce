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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await db.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
