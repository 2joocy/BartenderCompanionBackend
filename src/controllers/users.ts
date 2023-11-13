import { UsersRepository } from "../db/users";
import express from "express";
import { auth, isAdmin, sign } from "../middleware/auth";
import bcrypt from "bcrypt";

type UserControllerProps = {
  usersRepository: UsersRepository;
};

export function UsersController({ usersRepository }: UserControllerProps) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing name, email or password" });
      return;
    }

    const user = await usersRepository.findByEmail(email);

    if (user) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    await usersRepository.create(name, email, password);

    res.status(201).json({ message: "User created" });
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing email or password" });
      return;
    }

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }

    const isValidPassword = bcrypt.compareSync(password, user.password!);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = sign(user);

    delete user.password;

    res.status(200).json({ token, user });
  });

  router.post("/admin", auth, isAdmin, async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing name, email or password" });
      return;
    }

    const user = await usersRepository.findByEmail(email);

    if (user) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    await usersRepository.create(name, email, password, true);

    res.status(201).json({ message: "User created" });
  });

  return router;
}
