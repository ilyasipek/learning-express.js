import type { Config } from "drizzle-kit";
import {config} from 'dotenv'

config() 

if(!process.env['DATABASE_URL']) {
  throw new Error('DATABASE_URL is not defined')
}
 
export default {
  schema: "./db/schema.ts",
  out: "./db",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env['DATABASE_URL']!
  },
} satisfies Config;