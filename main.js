// Hàm chạy khi click nút "BẮT ĐẦU" ngoài HTML
function startGame() {
    document.getElementById("selection-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    
    addLog("Trận chiến bắt đầu!");
    spawnEnemy();
}

// Hàm khởi tạo game (được gọi từ file HTML khi load xong JS)
window.initGame = function() {
    console.log("Game RPG Loaded!");
    
    // Gắn sự kiện cho các nút bấm
    document.getElementById("btn-attack").addEventListener("click", playerAttack);
    
    document.getElementById("btn-magic").addEventListener("click", playerMagic);
    
    document.getElementById("btn-heal").addEventListener("click", function() {
        if (player.hp <= 0) return;
        if (player.mp < 15) {
            addLog("❌ Không đủ MP để hồi máu!", "#888");
            return;
        }
        player.mp -= 15;
        let heal = 40;
        player.hp = Math.min(player.maxHp, player.hp + heal);
        addLog(`💚 Bạn hồi phục ${heal} HP!`, "#2ecc71");
        updateHUD();
        setTimeout(enemyTurn, 800); // Hồi máu xong mất lượt, quái đánh
    });
};
