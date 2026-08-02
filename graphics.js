var canvas, ctx;

function initGraphics() {
    canvas = document.getElementById("gameCanvas");
    if(canvas) ctx = canvas.getContext("2d");
}

function drawScene() {
    if(!ctx || !currentMap) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // 1. VẼ GẠCH BẢN ĐỒ
    for (var row = 0; row < currentMap.grid.length; row++) {
        for (var col = 0; col < currentMap.grid[row].length; col++) {
            var tileID = currentMap.grid[row][col];
            var tileX = col * TILE_SIZE;
            var tileY = row * TILE_SIZE;

            if (tileID === 0) ctx.fillStyle = "#2ecc71"; // Cỏ
            else if (tileID === 1) ctx.fillStyle = "#7f8c8d"; // Đá
            else if (tileID === 2) ctx.fillStyle = "#2980b9"; // Nước
            else if (tileID === 3) ctx.fillStyle = "#e6d7bd"; // Đường đất
            else if (tileID === 4) ctx.fillStyle = "#9b59b6"; // Cổng

            ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            
            if (tileID === 4) {
                ctx.strokeStyle = "#f1c40f"; ctx.lineWidth = 3; ctx.beginPath();
                ctx.arc(tileX + TILE_SIZE/2, tileY + TILE_SIZE/2, TILE_SIZE/3, 0, Math.PI*2);
                ctx.stroke();
            }
        }
    }

    // 2. VẼ BẢN THỂ (NPC) VÀ LỜI THOẠI
    if (currentMap.npcs) {
        for (var i = 0; i < currentMap.npcs.length; i++) {
            var npc = currentMap.npcs[i];
            var nX = npc.col * TILE_SIZE;
            var nY = npc.row * TILE_SIZE;

            // Vẽ NPC (Hình vuông có khung viền)
            ctx.fillStyle = npc.color;
            ctx.fillRect(nX + 5, nY + 5, TILE_SIZE - 10, TILE_SIZE - 10);
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(nX + 5, nY + 5, TILE_SIZE - 10, TILE_SIZE - 10);

            // Tên NPC
            ctx.fillStyle = "#fff";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(npc.name, nX + TILE_SIZE/2, nY - 5);

            // Vẽ lời thoại khi player đứng gần
            if (npc.showDialog) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.fillRect(nX - 40, nY - 45, 130, 25);
                ctx.fillStyle = "#000";
                ctx.font = "bold 12px Arial";
                ctx.fillText(npc.dialog, nX + TILE_SIZE/2, nY - 28);
            }
        }
    }

    // 3. VẼ QUÁI VẬT
    for (var i = 0; i < currentMap.monsters.length; i++) {
        var m = currentMap.monsters[i];
        ctx.fillStyle = m.color;
        ctx.fillRect(m.x, m.y, m.width, m.height);
        
        ctx.fillStyle = "red"; ctx.fillRect(m.x, m.y - 10, m.width, 5);
        ctx.fillStyle = "#2ecc71"; ctx.fillRect(m.x, m.y - 10, m.width * (m.hp / m.maxHp), 5);
    }

    // 4. VẼ PLAYER
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px Arial"; ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    ctx.restore();
    
    // 5. HIỂN THỊ TÊN MAP TRÊN CÙNG
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(canvas.width / 2 - 100, 10, 200, 40);
    ctx.fillStyle = "#f1c40f"; ctx.font = "bold 20px Arial"; ctx.textAlign = "center";
    ctx.fillText(currentMap.name, canvas.width / 2, 38);
}
