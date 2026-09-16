const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Маршруты для работы со всеми комнатами
router.route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

// Маршруты для работы с конкретной комнатой по ID
router.route('/:id')
  .get(roomController.getRoomById)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;