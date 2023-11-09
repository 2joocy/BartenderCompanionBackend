import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/users";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "No authorization header" });
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, JWT_SECRET) as User;

    req.body.decoded = { user };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.body.decoded;

  if (!user.is_admin) {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  next();
};

export const sign = (user: User) =>
  jwt.sign(user, JWT_SECRET, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
