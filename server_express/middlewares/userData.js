const yup = require("yup");

async function bodyValidator(req, res, next) {
  const { body } = req;

  const userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email(),
  });

  try {
    const data = await userSchema.validate(body);
    req.body = data;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = bodyValidator;
