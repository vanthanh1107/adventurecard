var npcImg1 = new Image();
npcImg1.src = "https://raw.githack.com/vanthanh1107/adventurecard/main/npc.png";

// TẠO KHO DỮ LIỆU NPC
var NPC_DATABASE = {
    "truong_lang": {
        name: "Trưởng Làng",
        img: npcImg1,
        dialog: "Hãy cẩn thận lũ Slime ngoài rừng! Chúng rất đông!"
    },
    "tho_ren": {
        name: "Thợ Rèn",
        img: npcImg1, // Có thể thay bằng hình thợ rèn khác
        dialog: "Vũ khí của cậu cùn rồi đấy, nâng cấp không?"
    },
    "lu_khach": {
        name: "Lữ Khách Bí Ẩn",
        img: npcImg1,
        dialog: "Nơi này đầy rẫy nguy hiểm..."
    }
};
