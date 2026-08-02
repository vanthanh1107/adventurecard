// Cấu hình thông số Người chơi
const player = {
    name: "Anh Hùng",
    maxHp: 100,
    hp: 100,
    maxMp: 50,
    mp: 50,
    atk: 15,
    def: 5
};

// Danh sách quái vật
const enemies = [
    { name: "Slime Nhỏ", hp: 30, maxHp: 30, atk: 5 },
    { name: "Goblin Xanh", hp: 60, maxHp: 60, atk: 12 },
    { name: "Sói Bóng Đêm", hp: 120, maxHp: 120, atk: 20 },
    { name: "Rồng Lửa (BOSS)", hp: 500, maxHp: 500, atk: 45 }
];

let currentEnemyIndex = 0;
let currentEnemy = null;
