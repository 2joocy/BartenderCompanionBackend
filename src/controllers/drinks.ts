import express from "express";
import { auth, isAdmin, sign } from "../middleware/auth";
import { DrinksRepository } from "../db/drinks";

type DrinksControllerProps = {
  drinksRepository: DrinksRepository;
};

export function DrinksController({ drinksRepository }: DrinksControllerProps) {
  const router = express.Router();

  router.post("/", auth, isAdmin, async (req, res) => {
    const { name, description, ingredients, image } = req.body;

    if (!name || !description || !ingredients || !image) {
      res
        .status(400)
        .json({ message: "Missing name, description, ingredients or image" });
      return;
    }

    const drink = await drinksRepository.create(
      name,
      description,
      ingredients,
      image
    );

    res.status(201).json({ drink });
  });

  router.get("/", async (req, res) => {
    const drinks = await drinksRepository.findAll();

    res.status(200).json({ drinks });
  });

  return router;
}
