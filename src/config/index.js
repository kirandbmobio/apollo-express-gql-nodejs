import { config } from "dotenv";

const { parsed } = config();

export const {
  PORT,
  MODE,
  DB = "mongodb://localhost:27017/post-gql-app",
  IN_PROD = MODE !== "prod",
} = parsed;
