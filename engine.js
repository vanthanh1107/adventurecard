var isTransitioning = false;
var playerIsMoving = false; // Biến kiểm tra xem người chơi có đang bấm phím không

function loadMap(mapKey, startCol, startRow) {
    currentMapKey = mapKey;
    currentMap = maps[mapKey];
    WORLD_WIDTH = currentMap.grid[0].length * TILE_SIZE;
    WORLD_HEIGHT = currentMap.grid.length * TILE_SIZE;

    if(startCol !== undefined) {
        player.x = startCol * TILE_SIZE;
        player.y = startRow * TILE_SIZE;
    }

    if (currentMap.monsterConfig && !currentMap.isLoaded) {
        currentMap.monsters = [];
        for (var i = 0; i < currentMap.monsterConfig.maxCount; i++) {
            spawnMonster(mapKey);
        }
    }

    // CHUYỂN ĐỔI TỌA ĐỘ NPC TỪ DẠNG LƯỚI (col, row) SANG DẠNG PIXEL (x, y) ĐỂ ĐI LẠI ĐƯỢC
    if (currentMap.npcs && !currentMap.isLoaded) {
        for(var i = 0; i < currentMap.npcs.length; i++) {
            var npc = currentMap.npcs[i];
            npc.x = npc.col * TILE_SIZE;
            npc.y = npc.row * TILE_SIZE;
            npc.width = 35;
            npc.height = 35;
            npc.speed = 1.5; // NPC đi chậm hơn người chơi
            npc.targetX = npc.x;
            npc.targetY = npc.y;
            npc.isMoving = false;
        }
    }

    currentMap.isLoaded = true;

    isTransitioning = true;
    keys.w = false; keys.a = false; keys.s = false; keys.d = false;
    keys.arrowup = false; keys.arrowleft = false; keys.arrowdown = false; keys.arrowright = false;
    setTimeout(function() { isTransitioning = false; }, 500); 
}

function spawnMonster(mapKey) {
    var mapData = maps[mapKey];
    if (!mapData || !mapData.monsterConfig) return;
    var valid = false, rCol, rRow;
    while (!valid) {
        rRow = Math.floor(Math.random() * mapData.grid.length);
        rCol = Math.floor(Math.random() * mapData.grid[0].length);
        if (mapData.grid[rRow][rCol] === 0 || mapData.grid[rRow][rCol] === 3) valid = true;
    }
    mapData.monsters.push({
        id: Math.random(),
        x: rCol * TILE_SIZE + 5, y: rRow * TILE_SIZE + 5,
        width: 30, height: 30,
        hp: mapData.monsterConfig.maxHp, maxHp: mapData.monsterConfig.maxHp,
        color: mapData.monsterConfig.color, name: mapData.monsterConfig.name,
        isMoving: true // Quái luôn nhún nhảy
    });
}

window.addEventListener("keydown", function(e) { keys[e.key.toLowerCase()] = true; });
window.addEventListener("keyup", function(e) { keys[e.key.toLowerCase()] = false; });

// Nâng cấp hàm canMoveTo để truyền kích thước vào (dùng chung cho Player và NPC)
function canMoveTo(newX, newY, objWidth, objHeight) {
    var leftCol = Math.floor(newX / TILE_SIZE);
    var rightCol = Math.floor((newX + objWidth - 0.1) / TILE_SIZE);
    var topRow = Math.floor(newY / TILE_SIZE);
    var bottomRow = Math.floor((newY + objHeight - 0.1) / TILE_SIZE);

    if(leftCol < 0 || rightCol >= currentMap.grid[0].length || topRow < 0 || bottomRow >= currentMap.grid.length) return false;
    
    // Chặn Đá (1) và Nước (2)
    if (currentMap.grid[topRow][leftCol] === 1 || currentMap.grid[topRow][leftCol] === 2 ||
        currentMap.grid[bottomRow][rightCol] === 1 || currentMap.grid[bottomRow][rightCol] === 2) return false;
        
    return true; 
    // Ghi chú: Mình bỏ chặn va chạm cứng với NPC để người chơi không bị NPC dồn vào góc kẹt (Soft-lock).
}

function update() {
    if (isTransitioning) return;

    // 1. XỬ LÝ DI CHUYỂN NGƯỜI CHƠI
    var nextX = player.x, nextY = player.y;
    playerIsMoving = false; // Mặc định là đứng im
    
    if (keys.w || keys.arrowup) { nextY -= player.speed; playerIsMoving = true; }
    if (keys.s || keys.arrowdown) { nextY += player.speed; playerIsMoving = true; }
    if (keys.a || keys.arrowleft) { nextX -= player.speed; playerIsMoving = true; }
    if (keys.d || keys.arrowright) { nextX += player.speed; playerIsMoving = true; }

    if (canMoveTo(nextX, player.y, player.width, player.height)) player.x = nextX;
    if (canMoveTo(player.x, nextY, player.width, player.height)) player.y = nextY;

    // 2. XỬ LÝ NPC TỰ ĐỘNG ĐI LẠI VÀ NÓI CHUYỆN
    if (currentMap.npcs) {
        for (var i = 0; i < currentMap.npcs.length; i++) {
            var npc = currentMap.npcs[i];
            
            // Tương tác thoại: Nếu người chơi đứng gần thì hiện thoại, đứng xa thì tắt
            var distX = Math.abs(player.x - npc.x);
            var distY = Math.abs(player.y - npc.y);
            npc.showDialog = (distX < TILE_SIZE + 15 && distY < TILE_SIZE + 15);

            // AI di chuyển: Tỷ lệ 1% mỗi khung hình (khoảng 1.5 giây 1 lần) NPC sẽ chọn hướng mới
            if (!npc.isMoving && Math.random() < 0.01 && !npc.showDialog) { 
                // npc.showDialog = false để NPC đứng lại nói chuyện khi bạn tới gần
                
                var dirs = [
                    {dx: 0, dy: -TILE_SIZE}, // Lên
                    {dx: 0, dy: TILE_SIZE},  // Xuống
                    {dx: -TILE_SIZE, dy: 0}, // Trái
                    {dx: TILE_SIZE, dy: 0}   // Phải
                ];
                var dir = dirs[Math.floor(Math.random() * dirs.length)];
                var targetNextX = npc.x + dir.dx;
                var targetNextY = npc.y + dir.dy;
                
                // Kiểm tra xem vị trí định đi có vướng tường không
                if (canMoveTo(targetNextX, targetNextY, npc.width, npc.height)) {
                    npc.targetX = targetNextX;
                    npc.targetY = targetNextY;
                    npc.isMoving = true;
                }
            }

            // Thực hiện bước đi mượt mà tới mục tiêu
            if (npc.isMoving) {
                var dx = npc.targetX - npc.x;
                var dy = npc.targetY - npc.y;
                var dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist <= npc.speed) {
                    npc.x = npc.targetX;
                    npc.y = npc.targetY;
                    npc.isMoving = false; // Tới nơi thì dừng
                } else {
                    npc.x += (dx / dist) * npc.speed;
                    npc.y += (dy / dist) * npc.speed;
                }
            }
        }
    }

    // 3. CHUYỂN MAP QUA CỔNG
    var pCol = Math.floor((player.x + player.width/2) / TILE_SIZE);
    var pRow = Math.floor((player.y + player.height/2) / TILE_SIZE);
    for (var i = 0; i < currentMap.portals.length; i++) {
        var portal = currentMap.portals[i];
        if (pCol === portal.col && pRow === portal.row) {
            loadMap(portal.targetMap, portal.targetCol, portal.targetRow);
            break; 
        }
    }

    // 4. TƯƠNG TÁC QUÁI VẬT
    for (var i = currentMap.monsters.length - 1; i >= 0; i--) {
        var m = currentMap.monsters[i];
        if (player.x < m.x + m.width && player.x + player.width > m.x &&
            player.y < m.y + m.height && player.y + player.height > m.y) {
            m.hp -= player.atk;
            player.y += 20; // Knockback
            if (m.hp <= 0) {
                currentMap.monsters.splice(i, 1);
                setTimeout(function(mapToSpawn) {
                    return function() { spawnMonster(mapToSpawn); }
                }(currentMapKey), currentMap.monsterConfig.respawnTime);
            }
        }
    }

    // Camera
    camera.x = player.x + (player.width/2) - (camera.width/2);
    camera.y = player.y + (player.height/2) - (camera.height/2);
    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x + camera.width > WORLD_WIDTH) camera.x = WORLD_WIDTH - camera.width;
    if (camera.y + camera.height > WORLD_HEIGHT) camera.y = WORLD_HEIGHT - camera.height;
}
