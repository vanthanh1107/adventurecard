const canvas = document.getElementById("battleCanvas");
const ctx = canvas.getContext("2d");

function drawScene() {
    // Xóa nền cũ
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ nền đất
    ctx.fillStyle = "#8bc34a";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Vẽ Người chơi (Hình vuông màu xanh)
    ctx.fillStyle = "#3498db";
    ctx.fillRect(100, canvas.height - 130, 80, 80);
    ctx.fillStyle = "#000";
    ctx.fillText("HERO", 125, canvas.height - 140);

    // Vẽ Quái vật (Hình tròn màu đỏ)
    if (currentEnemy && currentEnemy.hp > 0) {
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath();
        ctx.arc(canvas.width - 150, canvas.height - 90, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.fillText(currentEnemy.name, canvas.width - 180, canvas.height - 140);
    }
}
