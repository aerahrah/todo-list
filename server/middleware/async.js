const tryCatch = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({ errors: errorMessages });
      }
      next(error);
    }
  };
};

module.exports = tryCatch;
