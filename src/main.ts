import { Pool } from "pg";
import { UsersRepository } from "./db/users";
import { DrinksRepository } from "./db/drinks";
import express from "express";
import cors from "cors";
import { UsersController } from "./controllers/users";
import { DrinksController } from "./controllers/drinks";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:password@localhost:5432/postgres",
});

const usersRepository = new UsersRepository(pool);
const drinksRepository = new DrinksRepository(pool);

const app = express();

app.use(express.json());
app.use(cors());

const usersController = UsersController({ usersRepository });
const drinksController = DrinksController({ drinksRepository });

const initRepositories = async () => {
  await usersRepository.init();
  await drinksRepository.init();

  console.log("Initialized repositories");
};

const insertData = async () => {
  await usersRepository.create("admin", "admin@admin.com", "admin", true);
  await drinksRepository.create(
    "Mojito",
    "A refreshing Cuban classic with lime and mint",
    {
      "White Rum": { description: "2 oz white rum" },
      "Simple Syrup": { description: "1 oz simple syrup" },
      "Lime Juice": { description: "1 oz lime juice" },
      "Mint Leaves": { description: "6 mint leaves" },
      "Soda Water": { description: "1 oz soda water" },
    },
    "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
  );

  await drinksRepository.create(
    "Old Fashioned",
    "A classic cocktail made with bourbon, bitters, and sugar",
    {
      Bourbon: { description: "2 oz bourbon" },
      "Angostura Bitters": { description: "2 dashes angostura bitters" },
      "Simple Syrup": { description: "1 tsp simple syrup" },
      "Orange Peel": { description: "1 orange peel" },
    },
    "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
  );

  await drinksRepository.create(
    "Martini",
    "A classic cocktail made with gin and vermouth",
    {
      Gin: { description: "2 oz gin" },
      Vermouth: { description: "1 oz vermouth" },
      "Green Olive": { description: "1 green olive" },
    },
    "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg"
  );

  await drinksRepository.create(
    "Margarita",
    "A classic cocktail made with tequila, triple sec, and lime juice",
    {
      Tequila: { description: "2 oz tequila" },
      "Triple Sec": { description: "1 oz triple sec" },
      "Lime Juice": { description: "1 oz lime juice" },
    },
    "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
  );

  await drinksRepository.create(
    "Negroni",
    "A classic cocktail made with gin, vermouth, and Campari",
    {
      Gin: { description: "1 oz gin" },
      Vermouth: { description: "1 oz vermouth" },
      Campari: { description: "1 oz Campari" },
    },
    "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
  );

  await drinksRepository.create(
    "Manhattan",
    "A classic cocktail made with bourbon, vermouth, and bitters",
    {
      Bourbon: { description: "2 oz bourbon" },
      Vermouth: { description: "1 oz vermouth" },
      "Angostura Bitters": { description: "2 dashes angostura bitters" },
    },
    "https://www.thecocktaildb.com/images/media/drink/ec2jtz1504350429.jpg"
  );

  await drinksRepository.create(
    "Whiskey Sour",
    "A classic cocktail made with bourbon, lemon juice, and sugar",
    {
      Bourbon: { description: "2 oz bourbon" },
      "Lemon Juice": { description: "1 oz lemon juice" },
      "Simple Syrup": { description: "1 oz simple syrup" },
    },
    "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg"
  );

  await drinksRepository.create(
    "Daiquiri",
    "A classic cocktail made with white rum, lime juice, and sugar",
    {
      "White Rum": { description: "2 oz white rum" },
      "Lime Juice": { description: "1 oz lime juice" },
      "Simple Syrup": { description: "1 oz simple syrup" },
    },
    "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg"
  );

  await drinksRepository.create(
    "Cosmopolitan",
    "A classic cocktail made with vodka, triple sec, cranberry juice, and lime juice",
    {
      Vodka: { description: "1 1/2 oz vodka" },
      "Triple Sec": { description: "1/2 oz triple sec" },
      "Lime Juice": { description: "1 oz lime juice" },
      "Cranberry Juice": { description: "1 dash cranberry juice" },
    },
    "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg"
  );

  await drinksRepository.create(
    "Mint Julep",
    "A classic cocktail made with bourbon, simple syrup, and mint",
    {
      Bourbon: { description: "2 oz bourbon" },
      "Simple Syrup": { description: "1 oz simple syrup" },
      "Mint Leaves": { description: "4 mint leaves" },
    },
    "https://www.thecocktaildb.com/images/media/drink/squyyq1439907312.jpg"
  );

  await drinksRepository.create(
    "Moscow Mule",
    "A classic cocktail made with vodka, ginger beer, and lime juice",
    {
      Vodka: { description: "2 oz vodka" },
      "Ginger Beer": { description: "4 oz ginger beer" },
      "Lime Juice": { description: "1/2 oz lime juice" },
    },
    "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg"
  );

  await drinksRepository.create(
    "Gin and Tonic",
    "A classic cocktail made with gin and tonic water",
    {
      Gin: { description: "2 oz gin" },
      "Tonic Water": { description: "4 oz tonic water" },
    },
    "https://www.thecocktaildb.com/images/media/drink/z0omyp1582480573.jpg"
  );

  await drinksRepository.create(
    "Gimlet",
    "A classic cocktail made with gin and lime juice",
    {
      Gin: { description: "2 oz gin" },
      "Lime Juice": { description: "1 oz lime juice" },
    },
    "https://www.thecocktaildb.com/images/media/drink/3xgldt1513707271.jpg"
  );

  await drinksRepository.create(
    "Sidecar",
    "A classic cocktail made with cognac, triple sec, and lemon juice",
    {
      Cognac: { description: "2 oz cognac" },
      "Triple Sec": { description: "1 oz triple sec" },
      "Lemon Juice": { description: "1 oz lemon juice" },
    },
    "https://www.thecocktaildb.com/images/media/drink/q5z4841582484168.jpg"
  );

  await drinksRepository.create(
    "French 75",
    "A classic cocktail made with gin, champagne, lemon juice, and sugar",
    {
      Gin: { description: "1 oz gin" },
      Champagne: { description: "1 oz champagne" },
      "Lemon Juice": { description: "1/2 oz lemon juice" },
      "Simple Syrup": { description: "1/2 oz simple syrup" },
    },
    "https://www.thecocktaildb.com/images/media/drink/4qnyty1504368615.jpg"
  );
  console.log("Inserted data");
};

const init = async () => {
  await initRepositories();
  await insertData();
};

init();

app.use("/users", usersController);
app.use("/drinks", drinksController);

export default app;
