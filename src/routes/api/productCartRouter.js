const express = require("express");
const router = express.Router();
const { cart, cartCreate, cartUpdate, cartDestroy } = require("../../controllers/api/productCartController");
const userSessionCheck = require("../../middlewares/userSessionCheck");

router.get("/cart", /* userSessionCheck , */cart);
router.post("/cart", cartCreate);
router.put("/cart/:id", cartUpdate);
router.delete("/cart/:id", cartDestroy);

module.exports = router;
