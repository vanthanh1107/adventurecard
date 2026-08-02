// QUY ƯỚC MÃ Ô:
// 0 = Cỏ (Đi được), 1 = Đá (Không đi được), 2 = Nước (Không đi được)
// 3 = Đường đất (Đi được), 4 = CỔNG DỊCH CHUYỂN (Màu Tím)

var maps = {
    // ---- BẢN ĐỒ 1: LÀNG TÂN THỦ ----
    "Town": {
        name: "Làng Khởi Đầu",
        grid: [
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
            [2, 1, 0, 3, 3, 3, 3, 4, 1, 2], // Ô 4 ở cuối đường là Cổng
            [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
            [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        ],
        // Cấu hình Cổng: Giẫm vào ô [Cột 7, Hàng 3] sẽ bay sang map Forest ở [Cột 1, Hàng 3]
        portals: [
            { col: 7, row: 3, targetMap: "Forest", targetCol: 1, targetRow: 3 }
        ],
        // Làng thì không có quái vật
        monsterConfig: null, 
        monsters: [],
        isLoaded: false
    },

    // ---- BẢN ĐỒ 2: RỪNG QUÁI VẬT ----
    "Forest": {
        name: "Rừng Ác Mộng",
        grid: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Ô 4 về lại Làng
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        // Cổng về lại Làng
        portals: [
            { col: 1, row: 3, targetMap: "Town", targetCol: 6, targetRow: 3 }
        ],
        // Cấu hình sinh quái ngẫu nhiên
        monsterConfig: {
            name: "Slime Rừng",
            color: "#8e44ad", // Quái màu tím
            maxHp: 50,
            maxCount: 4,      // Tối đa 4 con trên map
            respawnTime: 3000 // Hồi sinh sau 3 giây (3000 ms)
        },
        monsters: [],
        isLoaded: false
    }
};
