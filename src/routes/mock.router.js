import Express from "express";
import { generateProduct } from "../mockUtils.js";
const router = Express.Router();
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

router.get("/mockingProducts", async (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  res.send({ status: "success", payload: products });
});

export default router;
