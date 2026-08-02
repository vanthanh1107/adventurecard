window.addEventListener("keydown", function(e) {
    var key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = true;
});

window.addEventListener("keyup", function(e) {
    var key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = false;
});

// Hàm kiểm tra xem nhân vật có đâm vào tường/nước không
function canMoveTo(newX, newY) {
    // Tìm ra 4 góc của nhân vật đang chạm vào những ô lưới nào
    var leftCol = Math.floor(newX / TILE_SIZE);
    var rightCol = Math.floor((newX + player.width - 0.1) / TILE_SIZE);
    var topRow = Math.floor(newY / TILE_SIZE);
    var bottomRow = Math.floor((newY + player.height - 0.1) / TILE_SIZE);

    // Chặn ra ngoài rìa mảng (lỗi game)
    if(leftCol < 0 || rightCol >= worldMap[0].length || topRow < 0 || bottomRow >= worldMap.length) return false;

    // Quy ước: Ô số 1 (Đá) và 2 (Nước) là vật cản
    var topLeft = worldMap[topRow][leftCol];
    var topRight = worldMap[topRow][rightCol];
    var bottomLeft = worldMap[bottomRow][leftCol];
    var bottomRight = worldMap[bottomRow][rightCol];

    if (topLeft === 1 || topLeft === 2 || 
        topRight === 1 || topRight === 2 || 
        bottomLeft === 1 || bottomLeft === 2 || 
        bottomRight === 1 || bottomRight === 2) {
        return false; // Chạm vật cản -> Không cho đi
    }
    return true; // Đường thoáng -> Cho đi
}

function update() {
    var nextX = player.x;
    var nextY = player.y;

    // Tính toán tọa độ dự kiến
    if (keys.w || keys.arrowup) nextY -= player.speed;
    if (keys.s || keys.arrowdown) nextY += player.speed;
    if (keys.a || keys.arrowleft) nextX -= player.speed;
    if (keys.d || keys.arrowright) nextX += player.speed;

    // KIỂM TRA VA CHẠM: Chỉ cho đi nếu chỗ đó không có vật cản
    if (canMoveTo(nextX, player.y)) player.x = nextX;
    if (canMoveTo(player.x, nextY)) player.y = nextY;

    // Cập nhật Camera đi theo nhân vật
    camera.x = player.x + (player.width / 2) - (camera.width / 2);
    camera.y = player.y + (player.height / 2) - (camera.height / 2);

    // Ép Camera không lòi ra ngoài bản đồ
    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x + camera.width > WORLD_WIDTH) camera.x = WORLD_WIDTH - camera.width;
    if (camera.y + camera.height > WORLD_HEIGHT) camera.y = WORLD_HEIGHT - camera.height;

    // Cập nhật tọa độ UI
    var uiX = document.getElementById("ui-x");
    var uiY = document.getElementById("ui-y");
    if(uiX) uiX.innerText = Math.floor(player.x);
    if(uiY) uiY.innerText = Math.floor(player.y);
}
