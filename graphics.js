var canvas, ctx;

function initGraphics() {
    canvas = document.getElementById("gameCanvas");
    if(canvas) ctx = canvas.getContext("2d");
}

function drawScene() {
    if(!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // 1. VẼ BẢN ĐỒ
    for (var row = 0; row < currentMap.grid.length; row++) {
        for (var col = 0; col < currentMap.grid[row].length; col++) {
            var tileID = currentMap.grid[row][col];
            var tileX = col * TILE_SIZE;
            var tileY = row * TILE_SIZE;

            if (tileID === 0) ctx.fillStyle = "#2ecc71"; // Cỏ
            else if (tileID === 1) ctx.fillStyle = "#7f8c8d"; // Đá
            else if (tileID === 2) ctx.fillStyle = "#2980b9"; // Nước
            else if (tileID === 3) ctx.fillStyle = "#e6d7bd"; // Đường đất
            else if (tileID === 4) ctx.fillStyle = "#9b59b6"; // CỔNG DỊCH CHUYỂN

            ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            
            // Vẽ hiệu ứng vòng sáng cho cổng
            if (tileID === 4) {
                ctx.strokeStyle = "#f1c40f";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(tileX + TILE_SIZE/2, tileY + TILE_SIZE/2, TILE_SIZE/3, 0, Math.PI*2);
                ctx.stroke();
            }
        }
    }

    // 2. VẼ QUÁI VẬT TRÊN MAP NÀY
    for (var i = 0; i < currentMap.monsters.length; i++) {
        var m = currentMap.monsters[i];
        
        // Vẽ thân quái
        ctx.fillStyle = m.color;
        ctx.fillRect(m.x, m.y, m.width, m.height);
        
        // Vẽ thanh máu (HP Bar) cho quái
        ctx.fillStyle = "red";
        ctx.fillRect(m.x, m.y - 10, m.width, 5); // Nền đỏ
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(m.x, m.y - 10, m.width * (m.hp / m.maxHp), 5); // Thanh xanh
    }

    // 3. VẼ NHÂN VẬT CHÍNH
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    ctx.restore();
    
    // 4. VẼ UI TRÊN CÙNG (Tên Bản Đồ)
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(canvas.width / 2 - 100, 10, 200, 40);
    ctx.fillStyle = "#f1c40f";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(currentMap.name, canvas.width / 2, 38);
}
