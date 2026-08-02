function gameLoop() {
    update();      // Xử lý logic di chuyển
    drawScene();   // Xuất hình ảnh ra Canvas
    
    requestAnimationFrame(gameLoop);
}

window.initGame = function() {
    console.log("Bắt đầu khởi tạo hệ thống Thế Giới Mở...");
    
    // Khởi tạo Canvas trước tiên
    if(typeof initGraphics === 'function') {
        initGraphics();
    }
    
    // Bật vòng lặp game
    requestAnimationFrame(gameLoop);
};
