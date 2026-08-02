window.addEventListener("keydown", function(e) {
    var key = e.key.toLowerCase(); // Chuyển thành chữ thường hết
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }
});

window.addEventListener("keyup", function(e) {
    var key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
});

function update() {
    // 1. Cập nhật vị trí nhân vật
    if (keys.w || keys.arrowup) player.y -= player.speed;
    if (keys.s || keys.arrowdown) player.y += player.speed;
    if (keys.a || keys.arrowleft) player.x -= player.speed;
    if (keys.d || keys.arrowright) player.x += player.speed;

    // 2. Chặn ranh giới Thế Giới
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > WORLD_WIDTH) player.x = WORLD_WIDTH - player.width;
    if (player.y + player.height > WORLD_HEIGHT) player.y = WORLD_HEIGHT - player.height;

    // 3. Cập nhật Camera đi theo nhân vật
    camera.x = player.x + (player.width / 2) - (camera.width / 2);
    camera.y = player.y + (player.height / 2) - (camera.height / 2);

    // Chặn Camera không lòi ra ngoài map
    if (camera.x < 0) camera.x = 0;
    if (camera.y < 0) camera.y = 0;
    if (camera.x + camera.width > WORLD_WIDTH) camera.x = WORLD_WIDTH - camera.width;
    if (camera.y + camera.height > WORLD_HEIGHT) camera.y = WORLD_HEIGHT - camera.height;

    // 4. Update UI tọa độ an toàn (kiểm tra phần tử tồn tại trước khi sửa)
    var uiX = document.getElementById("ui-x");
    var uiY = document.getElementById("ui-y");
    if(uiX) uiX.innerText = Math.floor(player.x);
    if(uiY) uiY.innerText = Math.floor(player.y);
}
