import React from "react";
import Header from "../features/Homepage/layouts/Header/Header";
import Footer from "../features/Homepage/layouts/Footer/Footer";
import { Outlet } from "react-router";
import styles from "./MainLayout.module.css"
export default function MainLayout() {
  return (
    <div className={styles['home-container']}>
      <Header
        logoText="WEBART ®"
        searchPlaceholder="Tìm kiếm sản phẩm bạn mong muốn ..."
      />{" "}
      <main>
        <Outlet /> {/* Nơi hiển thị các trang con */}
      </main>
      <Footer
        companyName="WEBART ®"
        address="150 Hoàng Văn Thái - Thạnh Xuân - Hà Nội"
        hotline="1900.6021"
        hours="9h00 - 21h30"
        website="Website Artstore.vn được vận hành bởi: HỘ KINH DOANH 150 HOÀNG VĂN THÁI Ma số hộ kinh doanh: 889528016-001 Va Ma số đăng ký hộ kinh doanh, UBND quận Thanh Xuân cấp lần đầu ngày 27/10/2023."
        legal="Địa chỉ trụ sở: Hộ kinh doanh: Số nhà 150 phố Hoàng Văn Thái, phường Khương Mai, quận Thanh Xuân, thành phố Hà Nội. MST: 19006021 Email: hoacualostore@gmail.com"
        policySection={{
          title: "Thông tin và chính sách",
          items: [
            "Về chúng tôi",
            "Chính sách giao hàng",
            "Chính sách và quy định chung",
            "Phương thức thanh toán",
            "Chính sách vận chuyển",
          ],
        }}
        serviceSection={{
          title: "Dịch vụ và thông tin khác",
          items: [
            "Chính sách bảo mật thông tin cá nhân",
            "Cơ chế giải quyết tranh chấp",
            "Chính sách bảo hành",
            "Chính sách đổi trả và hoàn tiền",
            "Chính sách kiểm hàng",
          ],
        }}
        fanpage={{
          title: "Facebook Fanpage",
          imageSrc: "path/to/fanpage-image.jpg", // Thay bằng URL hình ảnh thực tế
          name: "Hoa Cua Art Store",
          followers: "298.851 người theo dõi",
          status: "FB Đã thuê đềo", // Dựa trên hình, có thể là typo, điều chỉnh nếu cần
        }}
        copyright="Nhan ©2023 copyright"
      />{" "}
    </div>
  );
}
