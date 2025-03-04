const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address-controller");

router.post("/", addressController.addAddress);

router.get("/", addressController.getAddress);

router.put("/:id", addressController.updateAddress);

router.delete("/:id",addressController.deleteAddress)

module.exports = router;
