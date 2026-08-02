function gameLoop() {
    update();      
    drawScene();   
    requestAnimationFrame(gameLoop);
}

window.initGame = function() {
    console.log("Khởi động hệ thống Đa Bản Đồ...");
    if(typeof initGraphics === 'function') initGraphics();
    
    // Tải map mặc định (Town) và đặt nhân vật ở ô (col: 2, row: 2)
    if(typeof loadMap === 'function') {
        loadMap("Town", 2, 2);
    }
    
    requestAnimationFrame(gameLoop);
};
