const { body } = require("express-validator");

const taskInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório.")
      .isString()
      .isLength({ min: 2 })
      .withMessage("O título precisa ter no mínimo 2 caracteres."),
  ];
};

const taskUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O título precisa ter no mínimo 2 caracteres."),
  ];
};

module.exports = {
  taskInsertValidation,
  taskUpdateValidation,
};
