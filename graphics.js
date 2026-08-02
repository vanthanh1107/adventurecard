var canvas;
var ctx;

function initGraphics() {
    canvas = document.getElementById("gameCanvas");
    if(canvas) ctx = canvas.getContext("2d");
}

function drawScene() {
    if(!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // 1. DUYỆT QUA MẢNG WORLDMAP ĐỂ VẼ BẢN ĐỒ
    for (var row = 0; row < worldMap.length; row++) {
        for (var col = 0; col < worldMap[row].length; col++) {
            
            var tileID = worldMap[row][col];
            var tileX = col * TILE_SIZE;
            var tileY = row * TILE_SIZE;

            // Chỉ vẽ những ô nằm lọt trong Camera để tránh giật lag khi map quá to
            if (tileX + TILE_SIZE > camera.x && tileX < camera.x + camera.width &&
                tileY + TILE_SIZE > camera.y && tileY < camera.y + camera.height) {
                
                // Chọn màu tùy theo mã số bạn đã quy ước
                if (tileID === 0) ctx.fillStyle = "#2ecc71"; // Cỏ (Xanh lá)
                else if (tileID === 1) ctx.fillStyle = "#7f8c8d"; // Tường đá (Xám)
                else if (tileID === 2) ctx.fillStyle = "#2980b9"; // Nước (Xanh biển)
                else if (tileID === 3) ctx.fillStyle = "#e6d7bd"; // Đường đất (Vàng cát)

                ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);

                // Tùy chọn: Vẽ mờ mờ viền ô vuông để bạn dễ hình dung dạng lưới
                ctx.strokeStyle = "rgba(0,0,0,0.05)";
                ctx.strokeRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }

    // 2. VẼ NHÂN VẬT
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    ctx.restore();
}
