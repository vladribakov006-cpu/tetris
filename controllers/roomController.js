const Room = require('../models/roomModel');

// GET /api/rooms - Получение всех комнат
exports.getAllRooms = (req, res, next) => {
  try {
    const rooms = Room.findAll();
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/rooms/:id - Получение одной комнаты по ID
exports.getRoomById = (req, res, next) => {
  try {
    const room = Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        error: `Комната с ID ${req.params.id} не найдена`
      });
    }

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/rooms - Создание новой комнаты
exports.createRoom = (req, res, next) => {
  try {
    const { name, maxPlayers, mode } = req.body;

    // Простая валидация входных данных (400 Bad Request)
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Поле "name" обязательно и должно быть непустой строкой'
      });
    }

    const newRoom = Room.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Игровая комната успешно создана',
      data: newRoom
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/rooms/:id - Полное обновление комнаты
exports.updateRoom = (req, res, next) => {
  try {
    const { name } = req.body;

    // Проверка наличия объекта комнаты
    const existingRoom = Room.findById(req.params.id);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        error: `Комната с ID ${req.params.id} не найдена`
      });
    }

    // Валидация при изменении имени
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Поле "name" должно быть валидной непустой строкой'
      });
    }

    const updatedRoom = Room.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Данные комнаты успешно обновлены',
      data: updatedRoom
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/rooms/:id - Удаление комнаты
exports.deleteRoom = (req, res, next) => {
  try {
    const isDeleted = Room.delete(req.params.id);

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        error: `Комната с ID ${req.params.id} не найдена`
      });
    }

    res.status(200).json({
      success: true,
      message: `Комната с ID ${req.params.id} успешно удалена`
    });
  } catch (error) {
    next(error);
  }
};