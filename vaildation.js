const { check } = require("express-validator");

const addSchoolsValidator = [
  check("name").notEmpty().withMessage("School name is required"),

  check("address").notEmpty().withMessage("Address is required"),

  check("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: 0, max: 90 })
    .withMessage("Latitude must be a valid number between 0 and 90"),

  check("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: 0, max: 180 })
    .withMessage("Longitude must be a valid number between 0 and 180"),
];

module.exports = { addSchoolsValidator };
