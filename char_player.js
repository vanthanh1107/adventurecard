// Tạo đối tượng hình ảnh cho nhân vật chính
var playerImg = new Image();
// Đường dẫn trỏ tới file player.png bạn đã up lên github
playerImg.src = "https://raw.githack.com/vanthanh1107/adventurecard/main/player.png";

var player = {
    x: 100, 
    y: 100,
    width: 40, 
    height: 40,
    speed: 5,
    hp: 100, 
    maxHp: 100,
    atk: 25,
    img: playerImg // Gắn hình ảnh vào nhân vật
};
