// Временное хранилище комнат в памяти сервера
let rooms = [
  {
    id: 1,
    name: "Новички Тетрис",
    maxPlayers: 2,
    currentPlayers: 1,
    mode: "classic", // classic, battle-royale, sprint
    status: "waiting", // waiting, playing, finished
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "PRO Battle 1v1",
    maxPlayers: 2,
    currentPlayers: 2,
    mode: "battle-royale",
    status: "playing",
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

module.exports = {
  // Получить все комнаты
  findAll: () => rooms,

  // Найти комнату по ID
  findById: (id) => rooms.find(room => room.id === Number(id)),

  // Создать новую комнату
  create: (data) => {
    const newRoom = {
      id: nextId++,
      name: data.name || "Безымянная комната",
      maxPlayers: Number(data.maxPlayers) || 2,
      currentPlayers: Number(data.currentPlayers) || 1,
      mode: data.mode || "classic",
      status: data.status || "waiting",
      createdAt: new Date().toISOString()
    };
    rooms.push(newRoom);
    return newRoom;
  },

  // Обновить существующую комнату
  update: (id, data) => {
    const index = rooms.findIndex(room => room.id === Number(id));
    if (index === -1) return null;

    rooms[index] = {
      ...rooms[index],
      name: data.name !== undefined ? data.name : rooms[index].name,
      maxPlayers: data.maxPlayers !== undefined ? Number(data.maxPlayers) : rooms[index].maxPlayers,
      currentPlayers: data.currentPlayers !== undefined ? Number(data.currentPlayers) : rooms[index].currentPlayers,
      mode: data.mode !== undefined ? data.mode : rooms[index].mode,
      status: data.status !== undefined ? data.status : rooms[index].status
    };

    return rooms[index];
  },

  // Удалить комнату
  delete: (id) => {
    const index = rooms.findIndex(room => room.id === Number(id));
    if (index === -1) return false;
    rooms.splice(index, 1);
    return true;
  }
};