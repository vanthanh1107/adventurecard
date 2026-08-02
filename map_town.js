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
        // SỬA targetCol thành 2 (để né cái cổng ở cột 1 của Forest)
        { col: 7, row: 3, targetMap: "Forest", targetCol: 2, targetRow: 3 }
    ],
    // DANH SÁCH BẢN THỂ (NPC) ĐỨNG TRONG LÀNG
    // ... (Phần grid và portals giữ nguyên)
    npcs: [
        { 
            id: "truong_lang", // Gọi ID từ file char_npc.js
            col: 4, row: 2, 
            showDialog: false 
        },
        { 
            id: "tho_ren",     // Gọi ID từ file char_npc.js
            col: 2, row: 4, 
            showDialog: false 
        }
    ],
    // ...
    monsterConfig: null, 
    monsters: [],
    isLoaded: false
};
