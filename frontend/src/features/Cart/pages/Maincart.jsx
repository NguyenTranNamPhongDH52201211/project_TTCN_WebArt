import "./Maincart.css";
import Table from "../components/Tabledata";
export default function Maincart() {
  return (
    <>
      <div className="container">
        <div className="cart-section">
          <h2>GIỎ HÀNG</h2>
          <Table/>
        </div>
        <div className="order-info">
          <h2>THÔNG TIN ĐƠN HÀNG</h2>
          <div className="order-summary">
            <p>
              Tổng: <strong>48.000đ</strong>
            </p>
            <ul>
              <li>Miễn phí ship đơn hàng trên 1 triệu</li>
              <li>Tổng đơn hàng hiện chưa bao gồm phí vận chuyển.</li>
              <li>
                Phí vận chuyển sẽ hiển thị ở trang thanh toán sau khi điền đầy
                đủ thông tin giao hàng.
              </li>
            </ul>
            <button className="checkout-btn">THANH TOÁN</button>
          </div>
        </div>
      </div>
      <div className="note-section">
        <h2>Ghi Chú Đơn Hàng</h2>
        <textarea placeholder="Nhập ghi chú của bạn..." defaultValue={""} />
        <p className="note-text">
          - Quý khách vui lòng quay video khi nhận hàng để đảm bảo quyền lợi đổi
          trả, bảo hành.
          <br />
          - Các sản phẩm bị thiếu hàng trong quá trình đóng gói, bị lỗi do NSX,
          hoặc lỗi do vận chuyển khách hàng vui lòng gửi phản hồi trong vòng
          48h.
          <br />
          - Quý khách mua tại cửa hàng sang nhắn hàng qua Fanpage Facebook hoặc
          Lỗ Store.
          <br />
          <em>Xin cảm ơn!</em>
        </p>
      </div>
    </>
  );
}
