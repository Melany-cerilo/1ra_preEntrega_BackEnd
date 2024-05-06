import dotenv from "dotenv";

const enviroment = "production";
dotenv.config({
  path: enviroment === "production" ? "./.prd.env" : "./.dev.env",
});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  secret: process.env.SECRET,
  env: process.env.ENV,
};
