// BẢN ĐỒ 2: RỪNG ÁC MỘNG
maps["Forest"] = {
    name: "Rừng Ác Mộng",
    grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4: Cổng về Làng
        [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    portals: [
        // SỬA targetCol thành 6 (để né cái cổng ở cột 7 của Town)
        { col: 1, row: 3, targetMap: "Town", targetCol: 6, targetRow: 3 }
    ],
    npcs: [
        // Rừng cũng có thể có NPC (Ví dụ một thương nhân bí ẩn)
        { 
            col: 10, row: 2, 
            name: "Lữ Khách", 
            color: "#34495e", 
            dialog: "Quái vật ở đây rất mạnh...",
            showDialog: false 
        }
    ],
    // CẤU HÌNH QUÁI VẬT DÀNH RIÊNG CHO MAP NÀY
    monsterConfig: {
        name: "Slime Rừng",
        color: "#8e44ad",
        maxHp: 50,
        maxCount: 4,      
        respawnTime: 3000 
    },
    monsters: [],
    isLoaded: false
};
