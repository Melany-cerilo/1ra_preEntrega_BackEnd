import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if (file.fieldname === "profile") {
      folder = "profiles";
    }
    if (file.fieldname === "products") {
      folder = "products";
    }
    if (
      file.fieldname === "identificacion" ||
      file.fieldname === "identificacion" ||
      file.fieldname === "identificacion"
    ) {
      folder = `documents`; // Carpeta específica para el usuario
    }
    const uploadFolder = __dirname + `/public/${folder}`; // Carpeta de destino

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true }); // Crear la carpeta de destino si no existe
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

export default __dirname;
