// Đợi web tải xong giao diện mới chạy
window.addEventListener('DOMContentLoaded', function() {
    var uploadInput = document.getElementById('upload-avatar');
    if(!uploadInput) return;

    uploadInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                // Kiểm tra định dạng file
                if (file.type === 'image/png') {
                    // Nếu là PNG -> Tự động xóa nền trắng
                    console.log("Phát hiện file PNG, tự động xóa nền...");
                    processAndApplyImage(img, true);
                } else {
                    // Nếu là JPG/JPEG/... -> Hỏi ý kiến người chơi
                    var confirmRemove = confirm("Đây là file " + file.type + ". Hệ thống phát hiện có thể ảnh sẽ có viền. Bạn có muốn hệ thống tự động lọc xóa phông trắng giùm không?");
                    processAndApplyImage(img, confirmRemove);
                }
            };
            img.src = event.target.result;
        };
        // Đọc file người chơi tải lên dưới dạng URL
        reader.readAsDataURL(file);
    });
});

// HÀM XỬ LÝ ẢNH (Thuật toán lọc nền trắng)
function processAndApplyImage(sourceImg, removeWhiteBackground) {
    // 1. Tạo một Canvas ảo (ẩn) để xử lý ảnh
    var tempCanvas = document.createElement('canvas');
    var tCtx = tempCanvas.getContext('2d');
    tempCanvas.width = sourceImg.width;
    tempCanvas.height = sourceImg.height;

    // 2. Vẽ ảnh gốc lên Canvas ảo
    tCtx.drawImage(sourceImg, 0, 0);

    // 3. Nếu người dùng muốn xóa trắng, tiến hành quét Pixel
    if (removeWhiteBackground) {
        // Lấy toàn bộ dữ liệu điểm ảnh (Pixel Data)
        var imgData = tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        var data = imgData.data;

        // Quét qua từng điểm ảnh (Mỗi điểm ảnh gồm 4 giá trị: Đỏ, Xanh lá, Xanh dương, Độ mờ Alpha)
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];     // Đỏ (Red)
            var g = data[i+1];   // Xanh lá (Green)
            var b = data[i+2];   // Xanh biển (Blue)
            
            // Nếu màu là Trắng (hoặc gần trắng như xám nhạt do chất lượng ảnh JPG)
            // Màu trắng tuyệt đối là 255, 255, 255. Ta để mốc > 230 để lọc luôn các viền lem nhem.
            if (r > 230 && g > 230 && b > 230) {
                data[i+3] = 0; // Chỉnh Độ mờ (Alpha) về 0 => Biến thành TRONG SUỐT!
            }
        }
        // Áp dụng lại điểm ảnh đã xóa nền lên Canvas ảo
        tCtx.putImageData(imgData, 0, 0);
    }

    // 4. Chuyển Canvas ảo thành Hình ảnh mới và gắn cho Player
    var newImg = new Image();
    newImg.onload = function() {
        // CẬP NHẬT ẢNH NHÂN VẬT TRONG GAME
        player.img = newImg; 
        
        // Hiện ảnh xem trước lên UI
        document.getElementById('preview-container').style.display = 'block';
        document.getElementById('avatar-preview').src = newImg.src;
        
        alert("Đã cập nhật nhân vật thành công! Cùng chiến thôi!");
    };
    
    // Xuất ra định dạng PNG để giữ được độ trong suốt
    newImg.src = tempCanvas.toDataURL('image/png'); 
}
