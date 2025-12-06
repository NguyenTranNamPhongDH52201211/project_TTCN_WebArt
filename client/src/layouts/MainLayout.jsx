import React from "react";
import Header from "../features/Homepage/layouts/Header/Header";
import Footer from "../features/Homepage/layouts/Footer/Footer";
import { Outlet } from "react-router";
import styles from "./MainLayout.module.css";
import logo from "../assets/logo/logo.png";

export default function MainLayout() {
  return (
    <div className={styles["home-container"]}>
      <Header
        logo={logo}
        searchPlaceholder="Tìm kiếm sản phẩm tại PaintsWeb..."
      />

      <main>
        <Outlet />
      </main>

      <Footer
        logo={logo}
        address="123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh"
        hotline="1900.1234"
        hours="8h30 - 21h00"
        website="PaintsWeb.vn được vận hành bởi HỘ KINH DOANH PAINTSWEB. MST: 889528016-002 – cấp lần đầu năm 2025 tại TP.HCM."
        legal="Trụ sở: 123 Nguyễn Văn Cừ, phường 4, Quận 5, TP. Hồ Chí Minh. Email: support@paintsweb.vn"
        policySection={{
          title: "Thông tin & Chính sách",
          items: [
            "Giới thiệu PaintsWeb",
            "Chính sách giao hàng",
            "Chính sách & Quy định",
            "Hình thức thanh toán",
            "Chính sách vận chuyển",
          ],
        }}
        serviceSection={{
          title: "Dịch vụ hỗ trợ",
          items: [
            "Bảo mật thông tin",
            "Giải quyết khiếu nại",
            "Chính sách bảo hành",
            "Đổi trả - Hoàn tiền",
            "Chính sách kiểm hàng",
          ],
        }}
        fanpage={{
          title: "Facebook Fanpage",
          imageSrc: logo,
          name: "PaintsWeb Official",
          followers: "25.842 người theo dõi",
        }}
        copyright="PaintsWeb © 2025"
      />
    </div>
  );
}
