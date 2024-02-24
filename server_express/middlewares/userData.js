const yup = require("yup");

async function bodyValidator(req, res, next) {
  const { body } = req;

  const userSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email(),
  });

  try {
    const data = await userSchema.validate(body, { abortEarly: false });
    req.body = data;
    next();
  } catch (err) {
    const errors = err.inner.map((e) => e.message);
    res.status(400).json({ errors });
  }
}

module.exports = bodyValidator;
