// Глобальный middleware для обработки необработанных ошибок
const errorHandler = (err, req, res, next) => {
  console.error('[Error Stack]:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler;