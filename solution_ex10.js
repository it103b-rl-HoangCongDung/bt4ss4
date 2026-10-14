/**
 * Môn học: [RL-IT103B-K25] - Xây dựng ứng dụng web với Javascript
 * GitHub Org: it103b-rl-HoangCongDung
 * Bài tập: Bài 4 - Session 4
 * Tiêu đề: Phân tích Trade-off: Vòng lặp for vs while trong Duyệt Dữ liệu
 */

/*
+-------------------+------------------------------------------+------------------------------------------+------------------------------------------+
| Tiêu chí          | Vòng lặp for                             | Vòng lặp while                           | Vòng lặp do-while                        |
+-------------------+------------------------------------------+------------------------------------------+------------------------------------------+
| Số lần lặp        | Biết trước (đếm bước, độ dài chuỗi/mảng) | Chưa biết trước (phụ thuộc điều kiện động) | Chưa biết trước (phụ thuộc điều kiện động) |
| Thời điểm kiểm tra| Đầu vòng lặp                             | Đầu vòng lặp                             | Cuối vòng lặp                            |
| Số lần lặp tối thiểu| 0 lần                                   | 0 lần                                    | Ít nhất 1 lần                            |
| Ứng dụng POS tối ưu| Quét chuỗi món order order.length       | Đợi khách quẹt thẻ / Rút tiền thừa       | Menu nhắc lệnh xác nhận thanh toán       |
+-------------------+------------------------------------------+------------------------------------------+------------------------------------------+
*/

// 1. Vòng lặp for: Quét danh sách các món trong hóa đơn có độ dài cố định
function scanOrderItems(orderItems) {
    console.log('--- Bắt đầu quét danh sách món ăn trong hóa đơn ---');
    for (let i = 0; i < orderItems.length; i++) {
        console.log('Đang xử lý món thứ ' + (i + 1) + ': ' + orderItems[i]);
    }
    console.log('Đã quét xong toàn bộ hóa đơn.');
}

// 2. Vòng lặp while: Nhận đơn hàng liên tục từ quầy cho đến khi thu ngân bấm chốt ca
function processContinuousOrders(getCashierShiftStatus, fetchNextOrder) {
    console.log('--- Bắt đầu ca làm việc, chờ đơn hàng từ quầy ---');
    while (getCashierShiftStatus() === 'OPEN') {
        let currentOrder = fetchNextOrder();
        if (currentOrder) {
            console.log('Đã tiếp nhận đơn hàng: ' + currentOrder.id);
        }
    }
    console.log('Thu ngân đã chốt ca. Dừng nhận đơn mới.');
}

// 3. Vòng lặp do-while: Hỏi xác nhận thanh toán (bắt buộc hiển thị bảng hỏi ít nhất 1 lần)
function confirmPaymentPrompt(askUserForConfirmation) {
    let isConfirmed = false;
    console.log('--- Bắt đầu quy trình xác nhận thanh toán ---');
    do {
        isConfirmed = askUserForConfirmation();
        if (!isConfirmed) {
            console.log('Khách hàng chưa xác nhận, hiển thị lại bảng thông báo...');
        }
    } while (!isConfirmed);
    console.log('Thanh toán đã được khách hàng xác nhận thành công!');
}

// Đoạn mã kiểm thử mô phỏng
const sampleItems = ['Phở bò đặc biệt', 'Cà phê sữa đá', 'Nem rán giòn'];
scanOrderItems(sampleItems);

let mockShift = 'OPEN';
let mockOrderCount = 0;
processContinuousOrders(
    () => mockShift,
    () => {
        mockOrderCount++;
        if (mockOrderCount > 2) {
            mockShift = 'CLOSED';
            return null;
        }
        return { id: 'ORD-10' + mockOrderCount };
    }
);

let promptAttempts = 0;
confirmPaymentPrompt(() => {
    promptAttempts++;
    return promptAttempts >= 2;
});
