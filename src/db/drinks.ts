import { Pool } from "pg";

export type Drink = {
  id: number;
  name: string;
  description: string;
  ingredients: Record<string, Ingredient>;
  image: string;
};

export type Ingredient = {
  description: string;
};

export class DrinksRepository {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(
    name: string,
    description: string,
    ingredients: Record<string, Ingredient>,
    image: string
  ): Promise<Drink> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `
        INSERT INTO drinks (name, description, ingredients)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
        [name, description, ingredients]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Drink[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `
            SELECT * FROM drinks
        `
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async init() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        DROP TABLE IF EXISTS drinks;
        CREATE TABLE IF NOT EXISTS drinks (
          id SERIAL PRIMARY KEY,
          name TEXT,
          description TEXT,
          ingredients JSONB,
          image TEXT
        );
      `);
    } finally {
      client.release();
    }
  }
}
