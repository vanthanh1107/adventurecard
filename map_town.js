// BẢN ĐỒ 1: LÀNG KHỞI ĐẦU
// Thêm dữ liệu vào kho 'maps' với key là "Town"
maps["Town"] = {
    name: "Làng Khởi Đầu",
    grid: [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
        [2, 1, 0, 3, 3, 3, 3, 4, 1, 2], // 4: Cổng sang Rừng
        [2, 1, 0, 0, 0, 0, 0, 0, 1, 2],
        [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ],
    portals: [
        { col: 7, row: 3, targetMap: "Forest", targetCol: 1, targetRow: 3 }
    ],
    // DANH SÁCH BẢN THỂ (NPC) ĐỨNG TRONG LÀNG
    npcs: [
        { 
            col: 4, row: 2,           // Tọa độ đứng (Cột 4, Hàng 2)
            name: "Trưởng Làng", 
            color: "#f39c12",         // Màu vàng
            dialog: "Hãy cẩn thận lũ Slime ngoài rừng!", // Lời thoại
            showDialog: false         // Trạng thái hiển thị thoại (mặc định tắt)
        },
        { 
            col: 2, row: 4, 
            name: "Thợ Rèn", 
            color: "#95a5a6", 
            dialog: "Cần nâng cấp kiếm không nhóc?",
            showDialog: false 
        }
    ],
    monsterConfig: null, 
    monsters: [],
    isLoaded: false
};
