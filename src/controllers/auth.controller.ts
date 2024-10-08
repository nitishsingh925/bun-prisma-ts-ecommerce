import type { NextFunction, Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../envhandler";
import { BadRequestsException } from "../exception/bad-requesta";
import { ErrorCode } from "../exception/root";

interface ISignup {
  email: string;
  password: string;
  name?: string;
}

type SignupRequest = Request<{}, {}, ISignup>;

export const signup = async (
  req: SignupRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(
        new BadRequestsException(
          "User already exists",
          ErrorCode.USER_ALREADY_EXISTS
        )
      );
    }

    const hashedPassword = await Bun.password.hash(password);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Handle unique constraint error
      return res.status(409).json({
        message: "User with this email already exists.",
      });
    }
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

interface ILogin {
  email: string;
  password: string;
}

type LoginRequest = Request<{}, {}, ILogin>;

export const login = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
