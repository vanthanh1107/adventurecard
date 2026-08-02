var TILE_SIZE = 50; 

// Biến lưu Map hiện tại
var currentMapKey = "Town";
var currentMap = maps[currentMapKey];
var WORLD_WIDTH = 0;
var WORLD_HEIGHT = 0;

var player = {
    x: 100, y: 100,
    width: 35, height: 35,
    speed: 5,
    color: "#e74c3c",
    hp: 100, maxHp: 100,
    atk: 25 // Sát thương mỗi lần đâm vào quái
};

var camera = { x: 0, y: 0, width: 800, height: 600 };

var keys = {
    w: false, a: false, s: false, d: false,
    arrowup: false, arrowleft: false, arrowdown: false, arrowright: false
};
