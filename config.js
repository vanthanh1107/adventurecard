var TILE_SIZE = 50; // Kích thước mỗi ô vuông là 50x50 pixel

// Chiều rộng = Số cột x 50. Chiều cao = Số hàng x 50
var WORLD_WIDTH = worldMap[0].length * TILE_SIZE;
var WORLD_HEIGHT = worldMap.length * TILE_SIZE;

var player = {
    x: 150, // Vị trí bắt đầu (X)
    y: 150, // Vị trí bắt đầu (Y)
    width: 35,
    height: 35,
    speed: 5,
    color: "#e74c3c" // Màu đỏ cho nhân vật
};

var camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600
};

var keys = {
    w: false, a: false, s: false, d: false,
    arrowup: false, arrowleft: false, arrowdown: false, arrowright: false
};
