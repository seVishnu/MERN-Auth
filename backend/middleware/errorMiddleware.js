const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalURL}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === "castError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found!";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { notFound, errorHandler };
