function gameLoop() {
    update();      // Cập nhật logic, tọa độ
    drawScene();   // Vẽ ra màn hình
    
    // Chạy vòng lặp liên tục (khoảng 60 FPS)
    requestAnimationFrame(gameLoop);
}

// Khởi tạo game
window.initGame = function() {
    console.log("Thế giới mở đã tải xong!");
    
    // Bắt đầu vòng lặp game
    requestAnimationFrame(gameLoop);
};
