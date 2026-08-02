// --- HỆ THỐNG MAP & QUÁI VẬT ---
function loadMap(mapKey, startCol, startRow) {
    currentMapKey = mapKey;
    currentMap = maps[mapKey];
    WORLD_WIDTH = currentMap.grid[0].length * TILE_SIZE;
    WORLD_HEIGHT = currentMap.grid.length * TILE_SIZE;

    // Đặt người chơi vào vị trí cổng
    if(startCol !== undefined) {
        player.x = startCol * TILE_SIZE;
        player.y = startRow * TILE_SIZE;
    }

    // Nếu map này có cấu hình quái và chưa được nạp lần nào
    if (currentMap.monsterConfig && !currentMap.isLoaded) {
        currentMap.monsters = [];
        for (var i = 0; i < currentMap.monsterConfig.maxCount; i++) {
            spawnMonster(mapKey);
        }
        currentMap.isLoaded = true; // Đánh dấu đã thả quái
    }
}

// Thả 1 con quái ngẫu nhiên vào ô trống
function spawnMonster(mapKey) {
    var mapData = maps[mapKey];
    if (!mapData || !mapData.monsterConfig) return;

    var valid = false;
    var rCol, rRow;
    
    // Tìm ngẫu nhiên đến khi trúng ô Cỏ (0) hoặc Đường (3)
    while (!valid) {
        rRow = Math.floor(Math.random() * mapData.grid.length);
        rCol = Math.floor(Math.random() * mapData.grid[0].length);
        if (mapData.grid[rRow][rCol] === 0 || mapData.grid[rRow][rCol] === 3) {
            valid = true;
        }
    }

    mapData.monsters.push({
        id: Math.random(),
        x: rCol * TILE_SIZE + 5, // Lệch vào giữa ô 1 tí
        y: rRow * TILE_SIZE + 5,
        width: 30, height: 30,
        hp: mapData.monsterConfig.maxHp,
        maxHp: mapData.monsterConfig.maxHp,
        color: mapData.monsterConfig.color,
        name: mapData.monsterConfig.name
    });
}

// --- HỆ THỐNG DI CHUYỂN & VA CHẠM ---
window.addEventListener("keydown", function(e) { keys[e.key.toLowerCase()] = true; });
window.addEventListener("keyup", function(e) { keys[e.key.toLowerCase()] = false; });

function canMoveTo(newX, newY) {
    var leftCol = Math.floor(newX / TILE_SIZE);
    var rightCol = Math.floor((newX + player.width - 0.1) / TILE_SIZE);
    var topRow = Math.floor(newY / TILE_SIZE);
    var bottomRow = Math.floor((newY + player.height - 0.1) / TILE_SIZE);

    if(leftCol < 0 || rightCol >= currentMap.grid[0].length || topRow < 0 || bottomRow >= currentMap.grid.length) return false;

    // Chặn Đá (1) và Nước (2). Ô Cổng (4) vẫn đi qua được!
    if (currentMap.grid[topRow][leftCol] === 1 || currentMap.grid[topRow][leftCol] === 2 ||
        currentMap.grid[bottomRow][rightCol] === 1 || currentMap.grid[bottomRow][rightCol] === 2) return false;
    return true;
}

function update() {
    var nextX = player.x, nextY = player.y;
    if (keys.w || keys.arrowup) nextY -= player.speed;
    if (keys.s || keys.arrowdown) nextY += player.speed;
    if (keys.a || keys.arrowleft) nextX -= player.speed;
    if (keys.d || keys.arrowright) nextX += player.speed;

    if (canMoveTo(nextX, player.y)) player.x = nextX;
    if (canMoveTo(player.x, nextY)) player.y = nextY;

    // 1. KIỂM TRA ĐẠP TRÚNG CỔNG DỊCH CHUYỂN
    var pCol = Math.floor((player.x + player.width/2) / TILE_SIZE);
    var pRow = Math.floor((player.y + player.height/2) / TILE_SIZE);

    for (var i = 0; i < currentMap.portals.length; i++) {
        var portal = currentMap.portals[i];
        if (pCol === portal.col && pRow === portal.row) {
            // Chuyển Map!
            loadMap(portal.targetMap, portal.targetCol, portal.targetRow);
            break; 
        }
    }

    // 2. KIỂM TRA VA CHẠM VỚI QUÁI (Đánh nhau bằng cách đụng vào)
    for (var i = currentMap.monsters.length - 1; i >= 0; i--) {
        var m = currentMap.monsters[i];
        if (player.x < m.x + m.width && player.x + player.width > m.x &&
            player.y < m.y + m.height && player.y + player.height > m.y) {
            
            // Trừ máu quái
            m.hp -= player.atk;
            
            // Bật người chơi lùi lại 1 chút để không dính sát thương liên tục (Knockback)
            player.y += 20;

            // Quái chết
            if (m.hp <= 0) {
                currentMap.monsters.splice(i, 1); // Xóa quái khỏi map
                
                // Hẹn giờ hồi sinh quái ở đúng MAP đó (Closure)
                setTimeout(function(mapToSpawn) {
                    return function() { spawnMonster(mapToSpawn); }
                }(currentMapKey), currentMap.monsterConfig.respawnTime);
            }
        }
    }

    // Camera đi theo người
    camera.x = player.x + (player.width/2) - (camera.width/2);
    camera.y = player.y + (player.height/2) - (camera.height/2);
    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x + camera.width > WORLD_WIDTH) camera.x = WORLD_WIDTH - camera.width;
    if (camera.y + camera.height > WORLD_HEIGHT) camera.y = WORLD_HEIGHT - camera.height;
}
