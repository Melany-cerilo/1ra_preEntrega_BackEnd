import dotenv from "dotenv";

const enviroment = "production";
dotenv.config({
  path: enviroment === "production" ? "./.env" : "./.dev.env",
});
//eguv xzyz qkud rqgy
export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  secret: process.env.SECRET,
  env: process.env.ENV,
  mailing: {
    service: process.env.MAILING_SERVICE,
    host: process.env.MAILING_HOST,
    user: process.env.MAILING_USER,
    password: process.env.MAILING_PASSWORD,
  },
};
