var canvas, ctx;

function initGraphics() {
    canvas = document.getElementById("gameCanvas");
    if(canvas) ctx = canvas.getContext("2d");
}

// HÀM VẼ ẢNH NGHIÊNG CUTE (Lắc lư khi di chuyển)
function drawCuteSprite(img, fallbackColor, x, y, width, height, isMoving) {
    ctx.save();
    
    // Dời tâm xoay xuống DƯỚI CÙNG GIỮA CHÂN nhân vật
    ctx.translate(x + width / 2, y + height);
    
    var angle = 0;
    if (isMoving) {
        // Dao động hình sin: Date.now() giúp nó lắc liên tục theo thời gian thực
        // 0.25 là góc nghiêng tối đa (radians) ~ tương đương 14 độ
        angle = Math.sin(Date.now() / 120) * 0.25; 
    }
    
    ctx.rotate(angle);
    
    // Vẽ ảnh (nhớ lùi lại nửa kích thước vì tâm đang ở giữa)
    if (img && img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, -width / 2, -height, width, height);
    } else {
        ctx.fillStyle = fallbackColor;
        ctx.fillRect(-width / 2, -height, width, height);
    }
    
    ctx.restore();
}

function drawScene() {
    if(!ctx || !currentMap) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // 1. VẼ NỀN MAP
    for (var row = 0; row < currentMap.grid.length; row++) {
        for (var col = 0; col < currentMap.grid[row].length; col++) {
            var tileID = currentMap.grid[row][col];
            var tileX = col * TILE_SIZE;
            var tileY = row * TILE_SIZE;

            if (tileID === 0) ctx.fillStyle = "#2ecc71"; 
            else if (tileID === 1) ctx.fillStyle = "#7f8c8d"; 
            else if (tileID === 2) ctx.fillStyle = "#2980b9"; 
            else if (tileID === 3) ctx.fillStyle = "#e6d7bd"; 
            else if (tileID === 4) ctx.fillStyle = "#9b59b6"; 

            ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
        }
    }

    // 2. VẼ NPC QUẦN CHÚNG VÀ AI CHUYỂN ĐỘNG CỦA HỌ
    if (currentMap.npcs) {
        for (var i = 0; i < currentMap.npcs.length; i++) {
            var npcInstance = currentMap.npcs[i];
            var npcData = NPC_DATABASE[npcInstance.id]; 
            if(!npcData) continue; 

            // Gọi hàm lắc lư (Nếu đang đi thì isMoving = true, đứng im thì = false)
            drawCuteSprite(npcData.img, "#95a5a6", npcInstance.x, npcInstance.y, npcInstance.width, npcInstance.height, npcInstance.isMoving);

            ctx.fillStyle = "#fff"; ctx.font = "12px Arial"; ctx.textAlign = "center";
            ctx.fillText(npcData.name, npcInstance.x + npcInstance.width/2, npcInstance.y - 5);

            // Vẽ hộp thoại
            if (npcInstance.showDialog) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.fillRect(npcInstance.x - 60, npcInstance.y - 45, 170, 25);
                ctx.fillStyle = "#000"; ctx.font = "bold 12px Arial";
                ctx.fillText(npcData.dialog, npcInstance.x + npcInstance.width/2, npcInstance.y - 28);
            }
        }
    }

    // 3. VẼ QUÁI VẬT (Luôn lắc lư cho đáng yêu)
    for (var i = 0; i < currentMap.monsters.length; i++) {
        var m = currentMap.monsters[i];
        
        drawCuteSprite(null, m.color, m.x, m.y, m.width, m.height, m.isMoving);
        
        ctx.fillStyle = "red"; ctx.fillRect(m.x, m.y - 10, m.width, 5);
        ctx.fillStyle = "#2ecc71"; ctx.fillRect(m.x, m.y - 10, m.width * (m.hp / m.maxHp), 5);
    }

    // 4. VẼ PLAYER LẮC LƯ THEO BÀN PHÍM
    // Biến playerIsMoving đã được tính toán ở file engine.js
    drawCuteSprite(player.img, player.color, player.x, player.y, player.width, player.height, playerIsMoving);
    
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px Arial"; ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    ctx.restore();
    
    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(canvas.width / 2 - 100, 10, 200, 40);
    ctx.fillStyle = "#f1c40f"; ctx.font = "bold 20px Arial"; ctx.textAlign = "center";
    ctx.fillText(currentMap.name, canvas.width / 2, 38);
}
