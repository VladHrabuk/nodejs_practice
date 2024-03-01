const yup = require("yup");
require("dotenv").config();
const config = require("config");
const {
  findUserByEmail,
} = require(`../controllers/userController_${config.storage.type}`);

async function bodyValidator(req, res, next) {
  const { body } = req;

  const userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email(),
  });

  try {
    const data = await userSchema.validate(body, { abortEarly: false });
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
      return res.status(400).json({ message: "Email must be unique" });
    }
    req.body = data;
    next();
  } catch (err) {
    const errors = err.inner ? err.inner.map((e) => e.message) : [err.message];
    res.status(400).json({ errors });
  }
}

module.exports = bodyValidator;
