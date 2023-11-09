import { Pool } from "pg";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
};

export class UsersRepository {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(name: string, email: string, password: string, isAdmin = false) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const client = await this.pool.connect();
    try {
      await client.query(
        `
        INSERT INTO users (name, email, password, is_admin)
        VALUES ($1, $2, $3, $4)
      `,
        [name, email, hashedPassword, isAdmin]
      );
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `
            SELECT * FROM users WHERE email = $1
        `,
        [email]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<User | undefined> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `
                SELECT * FROM users WHERE id = $1
            `,
        [id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async init() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        DROP TABLE IF EXISTS users;
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL,
          is_admin BOOLEAN NOT NULL DEFAULT FALSE
        );
      `);
    } finally {
      client.release();
    }
  }
}
