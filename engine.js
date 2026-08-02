// Thêm 1 biến để khóa di chuyển
var isTransitioning = false;

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
        currentMap.isLoaded = true;
    }

    // KHÓA DI CHUYỂN TRONG 0.5 GIÂY ĐỂ TRÁNH LỖI VÒNG LẶP CỔNG
    isTransitioning = true;
    keys.w = false; keys.a = false; keys.s = false; keys.d = false; // Tắt kẹt phím
    keys.arrowup = false; keys.arrowleft = false; keys.arrowdown = false; keys.arrowright = false;
    
    setTimeout(function() {
        isTransitioning = false;
    }, 500); 
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
        color: mapData.monsterConfig.color, name: mapData.monsterConfig.name
    });
}

window.addEventListener("keydown", function(e) { keys[e.key.toLowerCase()] = true; });
window.addEventListener("keyup", function(e) { keys[e.key.toLowerCase()] = false; });

function canMoveTo(newX, newY) {
    var leftCol = Math.floor(newX / TILE_SIZE);
    var rightCol = Math.floor((newX + player.width - 0.1) / TILE_SIZE);
    var topRow = Math.floor(newY / TILE_SIZE);
    var bottomRow = Math.floor((newY + player.height - 0.1) / TILE_SIZE);

    if(leftCol < 0 || rightCol >= currentMap.grid[0].length || topRow < 0 || bottomRow >= currentMap.grid.length) return false;
    
    // 1. Chặn Đá (1) và Nước (2)
    if (currentMap.grid[topRow][leftCol] === 1 || currentMap.grid[topRow][leftCol] === 2 ||
        currentMap.grid[bottomRow][rightCol] === 1 || currentMap.grid[bottomRow][rightCol] === 2) return false;
        
    // 2. Chặn đụng vào NPC (Bản thể)
    if (currentMap.npcs) {
        for(var i = 0; i < currentMap.npcs.length; i++) {
            var npc = currentMap.npcs[i];
            if (leftCol <= npc.col && rightCol >= npc.col && topRow <= npc.row && bottomRow >= npc.row) {
                return false; // Không đi xuyên NPC được
            }
        }
    }
    return true;
}

function update() {
    // ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT: Chặn mọi hoạt động (di chuyển, va chạm cổng) nếu đang trong 0.5s chuyển map
    if (isTransitioning) return;

    var nextX = player.x, nextY = player.y;
    if (keys.w || keys.arrowup) nextY -= player.speed;
    if (keys.s || keys.arrowdown) nextY += player.speed;
    if (keys.a || keys.arrowleft) nextX -= player.speed;
    if (keys.d || keys.arrowright) nextX += player.speed;

    if (canMoveTo(nextX, player.y)) player.x = nextX;
    if (canMoveTo(player.x, nextY)) player.y = nextY;

    var pCol = Math.floor((player.x + player.width/2) / TILE_SIZE);
    var pRow = Math.floor((player.y + player.height/2) / TILE_SIZE);

    // 1. CHUYỂN MAP QUA CỔNG
    for (var i = 0; i < currentMap.portals.length; i++) {
        var portal = currentMap.portals[i];
        if (pCol === portal.col && pRow === portal.row) {
            loadMap(portal.targetMap, portal.targetCol, portal.targetRow);
            break; 
        }
    }

    // 2. TƯƠNG TÁC QUÁI VẬT
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

    // 3. TƯƠNG TÁC NPC (NÓI CHUYỆN KHI ĐẾN GẦN)
    if (currentMap.npcs) {
        for (var i = 0; i < currentMap.npcs.length; i++) {
            var npc = currentMap.npcs[i];
            var npcX = npc.col * TILE_SIZE;
            var npcY = npc.row * TILE_SIZE;
            
            // Tính khoảng cách giữa người chơi và NPC
            var distX = Math.abs(player.x - npcX);
            var distY = Math.abs(player.y - npcY);
            
            // Nếu đứng sát bên (khoảng cách < TILE_SIZE + 10px) thì hiện thoại
            if (distX < TILE_SIZE + 10 && distY < TILE_SIZE + 10) {
                npc.showDialog = true;
            } else {
                npc.showDialog = false;
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
