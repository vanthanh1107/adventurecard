// Ghi log ra màn hình
function addLog(msg, color = "#fff") {
    const logBox = document.getElementById("battle-log");
    logBox.innerHTML += `<div style="color: ${color};">> ${msg}</div>`;
    logBox.scrollTop = logBox.scrollHeight;
}

// Cập nhật máu trên UI
function updateHUD() {
    document.getElementById("player-hp").innerText = player.hp;
    document.getElementById("player-mp").innerText = player.mp;
    
    if(currentEnemy) {
        document.getElementById("enemy-name").innerText = currentEnemy.name;
        document.getElementById("enemy-hp").innerText = currentEnemy.hp;
        document.getElementById("enemy-maxhp").innerText = currentEnemy.maxHp;
    }
    drawScene();
}

// Spawn quái mới
function spawnEnemy() {
    if (currentEnemyIndex >= enemies.length) {
        addLog("🎉 CHÚC MỪNG! BẠN ĐÃ TIÊU DIỆT HẾT QUÁI VẬT!", "#f1c40f");
        return;
    }
    // Copy dữ liệu quái từ config
    currentEnemy = Object.assign({}, enemies[currentEnemyIndex]);
    addLog(`⚠️ Quái vật xuất hiện: ${currentEnemy.name}!`, "#e67e22");
    updateHUD();
}

// Quái vật phản công
function enemyTurn() {
    if (currentEnemy.hp <= 0) return;
    
    let damage = Math.max(1, currentEnemy.atk - player.def + Math.floor(Math.random() * 5));
    player.hp -= damage;
    addLog(`💥 ${currentEnemy.name} đánh trả! Bạn mất ${damage} HP.`, "#e74c3c");
    
    if (player.hp <= 0) {
        player.hp = 0;
        addLog("💀 BẠN ĐÃ TỬ TRẬN. GAME OVER!", "#c0392b");
        // Khóa nút
        document.getElementById("btn-attack").disabled = true;
    }
    updateHUD();
}

// Kỹ năng tấn công thường
function playerAttack() {
    if (player.hp <= 0 || !currentEnemy) return;

    let damage = player.atk + Math.floor(Math.random() * 5);
    currentEnemy.hp -= damage;
    addLog(`🗡️ Bạn chém ${currentEnemy.name} gây ${damage} sát thương!`, "#3498db");

    checkEnemyDeath();
}

// Kỹ năng dùng phép
function playerMagic() {
    if (player.hp <= 0 || !currentEnemy) return;
    if (player.mp < 10) {
        addLog("❌ Không đủ MP!", "#888");
        return;
    }
    
    player.mp -= 10;
    let damage = player.atk * 2; // Phép mạnh gấp đôi
    currentEnemy.hp -= damage;
    addLog(`🔥 Bạn phóng Cầu Lửa vào ${currentEnemy.name} gây ${damage} sát thương!`, "#e74c3c");
    
    checkEnemyDeath();
}

// Kiểm tra xem quái đã chết chưa
function checkEnemyDeath() {
    if (currentEnemy.hp <= 0) {
        currentEnemy.hp = 0;
        addLog(`🏆 Bạn đã tiêu diệt ${currentEnemy.name}!`, "#2ecc71");
        updateHUD();
        
        // Hồi chút máu và mp sau khi qua ải
        player.hp = Math.min(player.maxHp, player.hp + 20);
        player.mp = Math.min(player.maxMp, player.mp + 15);
        
        currentEnemyIndex++;
        setTimeout(spawnEnemy, 2000); // 2 giây sau ra quái mới
    } else {
        // Quái chưa chết thì nó đánh lại
        setTimeout(enemyTurn, 800);
    }
    updateHUD();
}
