const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawScene() {
    // Xóa khung hình cũ
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // LƯU TRẠNG THÁI CANVAS
    ctx.save();

    // DỊCH CHUYỂN CANVAS THEO CAMERA (BÍ QUYẾT LÀM MAP RỘNG LÀ ĐÂY)
    ctx.translate(-camera.x, -camera.y);

    // --- Bắt đầu vẽ các vật thể trong Thế Giới ---

    // 1. Vẽ nền đất của cả bản đồ
    ctx.fillStyle = "#e6d7bd"; // Màu cát giống hình bạn gửi
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Vẽ đường viền ranh giới map
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // 2. Vẽ cảnh vật (cây, đá, nhà cửa,...)
    obstacles.forEach(obs => {
        // Tối ưu hóa: Chỉ vẽ những vật thể nằm trong tầm nhìn của Camera
        if (obs.x + obs.size > camera.x && obs.x < camera.x + camera.width &&
            obs.y + obs.size > camera.y && obs.y < camera.y + camera.height) {
            
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
            // Vẽ bóng
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(obs.x, obs.y + obs.size - 5, obs.size, 5);
        }
    });

    // 3. Vẽ Nhân Vật
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Tên nhân vật (gắn trên đầu)
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    // --- Kết thúc vẽ Thế Giới ---

    // PHỤC HỒI TRẠNG THÁI (Để UI không bị dịch chuyển theo)
    ctx.restore();
}
