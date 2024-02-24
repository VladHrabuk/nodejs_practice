const yup = require("yup");

async function userIdValidator(req, res, next) {
  const { userId } = req.params;
  const numberUserId = userId;
  const schema = yup.number().integer().min(0).required();
  try {
    await schema.validate(numberUserId);
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = userIdValidator;
