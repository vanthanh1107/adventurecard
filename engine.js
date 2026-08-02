// Bắt sự kiện nhấn phím
window.addEventListener("keydown", function(e) {
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = true;
        keys[e.key] = true; 
    }
});

// Bắt sự kiện thả phím
window.addEventListener("keyup", function(e) {
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = false;
        keys[e.key] = false;
    }
});

function update() {
    // 1. Cập nhật vị trí nhân vật theo bàn phím
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;

    // 2. Chặn không cho nhân vật đi ra ngoài ranh giới Thế Giới
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > WORLD_WIDTH) player.x = WORLD_WIDTH - player.width;
    if (player.y + player.height > WORLD_HEIGHT) player.y = WORLD_HEIGHT - player.height;

    // 3. Cập nhật Camera luôn đi theo giữa nhân vật
    camera.x = player.x + (player.width / 2) - (camera.width / 2);
    camera.y = player.y + (player.height / 2) - (camera.height / 2);

    // Chặn Camera không được chiếu ra vùng không gian trống ngoài map
    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x + camera.width > WORLD_WIDTH) camera.x = WORLD_WIDTH - camera.width;
    if (camera.y + camera.height > WORLD_HEIGHT) camera.y = WORLD_HEIGHT - camera.height;

    // 4. Update UI tọa độ
    document.getElementById("ui-x").innerText = Math.floor(player.x);
    document.getElementById("ui-y").innerText = Math.floor(player.y);
}
