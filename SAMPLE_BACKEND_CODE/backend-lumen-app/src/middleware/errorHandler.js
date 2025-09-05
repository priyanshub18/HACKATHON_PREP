// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  res.status(status).json({ message, stack });
}


