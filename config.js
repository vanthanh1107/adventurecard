var WORLD_WIDTH = 3000;
var WORLD_HEIGHT = 3000;

var player = {
    x: WORLD_WIDTH / 2,
    y: WORLD_HEIGHT / 2,
    width: 40,
    height: 40,
    speed: 5,
    color: "#3498db"
};

var camera = {
    x: 0,
    y: 0,
    width: 800,
    height: 600
};

// Chuẩn hóa tên phím thành chữ thường để không bị lỗi CapsLock
var keys = {
    w: false, a: false, s: false, d: false,
    arrowup: false, arrowleft: false, arrowdown: false, arrowright: false
};

var obstacles = [];
for(var i = 0; i < 200; i++) {
    obstacles.push({
        x: Math.random() * WORLD_WIDTH,
        y: Math.random() * WORLD_HEIGHT,
        size: 30 + Math.random() * 50,
        color: Math.random() > 0.5 ? "#27ae60" : "#7f8c8d"
    });
}
