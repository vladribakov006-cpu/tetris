const express = require('express');
const roomRoutes = require('./routes/roomRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для автоматического парсинга входящего JSON в req.body
app.use(express.json());

// Базовый тестовый маршрут
app.get('/', (req, res) => {
  res.send('API сервера мультиплеерного Тетриса работает');
});

// Подключение роутов для игровых комнат
app.use('/api/rooms', roomRoutes);

// Обработка несуществующих маршрутов (404)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Запрашиваемый эндпоинт не найден'
  });
});

// Глобальный обработчик ошибок (должен подключаться последним)
app.use(errorHandler);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер игры "Тетрис" запущен на http://localhost:${PORT}`);
});