var canvas;
var ctx;

// Hàm này sẽ được gọi từ main.js sau khi mọi thứ đã sẵn sàng
function initGraphics() {
    canvas = document.getElementById("gameCanvas");
    if(canvas) {
        ctx = canvas.getContext("2d");
    } else {
        console.error("Lỗi: Không tìm thấy thẻ canvas có id là gameCanvas!");
    }
}

function drawScene() {
    // Nếu chưa có ctx thì ngưng vẽ để tránh lỗi sập game
    if(!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    // Dịch chuyển thế giới theo Camera
    ctx.translate(-camera.x, -camera.y);

    // Vẽ nền đất
    ctx.fillStyle = "#e6d7bd"; 
    ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Vẽ đường viền bản đồ
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Vẽ vật cản (cây/đá)
    for(var i = 0; i < obstacles.length; i++) {
        var obs = obstacles[i];
        // Tính toán khoảng cách, chỉ vẽ những vật nằm trong màn hình
        if (obs.x + obs.size > camera.x && obs.x < camera.x + camera.width &&
            obs.y + obs.size > camera.y && obs.y < camera.y + camera.height) {
            
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, obs.y, obs.size, obs.size);
            
            // Vẽ bóng đổ
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(obs.x, obs.y + obs.size - 5, obs.size, 5);
        }
    }

    // Vẽ nhân vật
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Tên nhân vật
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Hero", player.x + player.width/2, player.y - 10);

    ctx.restore();
}
