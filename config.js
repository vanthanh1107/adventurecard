// Cấu hình Kích thước Map rộng lớn (VD: 3000 x 3000 pixel)
const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;

// Cấu hình nhân vật
const player = {
    x: WORLD_WIDTH / 2, // Bắt đầu ở giữa map
    y: WORLD_HEIGHT / 2,
    width: 40,
    height: 40,
    speed: 5,           // Tốc độ di chuyển
    color: "#3498db"
};

// Cấu hình Camera (Góc nhìn của người chơi trên Canvas)
const camera = {
    x: 0,
    y: 0,
    width: 800,  // Bằng width của canvas
    height: 600  // Bằng height của canvas
};

// Lưu trữ trạng thái phím bấm
const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
};

// Sinh ngẫu nhiên một số cái cây/tảng đá để nhìn thấy map đang trôi đi
const obstacles = [];
for(let i = 0; i < 200; i++) {
    obstacles.push({
        x: Math.random() * WORLD_WIDTH,
        y: Math.random() * WORLD_HEIGHT,
        size: 30 + Math.random() * 50,
        color: Math.random() > 0.5 ? "#27ae60" : "#7f8c8d" // Xanh lá (cây) hoặc Xám (đá)
    });
}
