import Header from "../layouts/Header/Header"
import Cat from "../components/Category/Category"
import ProductList from"../layouts/ProductList/ProductList"
import Footer from "../layouts/Footer/Footer"
import { FaHome, FaUser, FaBox, FaShoppingCart, FaChevronDown, FaChevronRight ,FaCog } from "react-icons/fa";

const array = [];
array.push("butve", "cove", "banphathtao");
const productGroups = [
    {
      title: 'BÚT VẼ, CỌ VẼ',
      products: [
        {
          logoText: "WEB ART",
          imageSrc: "path/to/ninh-image.jpg",
          altText: "Cọ vẽ thư pháp Lobeo - Ninh",
          price: "14.000đ",
          discount: null,
          title: "Cọ vẽ thư pháp Lobeo - Ninh",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/bich-image.jpg",
          altText: "Cọ vẽ thư pháp Lobeo - Bich",
          price: "45.000đ",
          discount: null,
          title: "Cọ vẽ thư pháp Lobeo - Bich",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/duyen-image.jpg",
          altText: "(Quà tặng) Cọ vẽ thư pháp Lobeo - Duyên",
          price: "89.999đ",
          discount: null,
          title: "(Quà tặng) Cọ vẽ thư pháp Lobeo - Duyên",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/tung-image.jpg",
          altText: "Cọ vẽ thư pháp Lobeo - Tùng",
          price: "85.000đ",
          discount: null,
          title: "Cọ vẽ thư pháp Lobeo - Tùng",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/van-image.jpg",
          altText: "Cọ vẽ thư pháp Lobeo - Vân",
          price: "120.000đ",
          discount: null,
          title: "Cọ vẽ thư pháp Lobeo - Vân",
          status: "Hết hàng"
        },
       
      ]
    },
    {
      title: 'MÀU VẼ',
      products: [
        {
          logoText: "WEB ART",
          imageSrc: "path/to/marker-phoenix-image.jpg",
          altText: "Marker Phoenix",
          price: "20.000đ",
          discount: null,
          title: "Marker Phoenix",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/dina-turner-image.jpg",
          altText: "Dina Turner",
          price: "89.000đ",
          discount: null,
          title: "Dina Turner",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/mau-gouache-hanna-image.jpg",
          altText: "Màu gouache Hanna 12ml",
          price: "13.000đ",
          discount: null,
          title: "Màu gouache Hanna 12ml",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/jerry-gouache-image.jpg",
          altText: "Jerry gouache",
          price: "22.000đ",
          discount: null,
          title: "Jerry gouache",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/mau-acrylic-maria-image.jpg",
          altText: "Màu acrylic Maria 120ml",
          price: "65.000đ",
          discount: null,
          title: "Màu acrylic Maria 120ml",
          status: null
        },
      ]
    },
    {
      title: 'GIẤY VẼ',
      products: [
        // Placeholder products for this category
        {
          logoText: "WEB ART",
          imageSrc: "path/to/giay-ve-1.jpg",
          altText: "Giấy vẽ A4",
          price: "50.000đ",
          discount: null,
          title: "Giấy vẽ A4",
          status: null
        },
        {
          logoText: "WEB ART",
          imageSrc: "path/to/giay-ve-2.jpg",
          altText: "Giấy vẽ watercolor",
          price: "100.000đ",
          discount: null,
          title: "Giấy vẽ watercolor",
          status: null
        },
         {
          logoText: "WEB ART",
          imageSrc: "path/to/giay-ve-2.jpg",
          altText: "Giấy vẽ watercolor",
          price: "100.000đ",
          discount: null,
          title: "Giấy vẽ watercolor",
          status: null
        },
          {
          logoText: "WEB ART",
          imageSrc: "path/to/giay-ve-2.jpg",
          altText: "Giấy vẽ watercolor",
          price: "100.000đ",
          discount: null,
          title: "Giấy vẽ watercolor",
          status: null
        },
          {
          logoText: "WEB ART",
          imageSrc: "path/to/giay-ve-2.jpg",
          altText: "Giấy vẽ watercolor",
          price: "100.000đ",
          discount: null,
          title: "Giấy vẽ watercolor",
          status: null
        },
      ]
    },
    
  ];
const Home =()=>{
  return (
    <div>
        <Header
        logoText="WEBART ®"
        searchPlaceholder="Tìm kiếm sản phẩm bạn mong muốn ..."
        favoritesCount={0}
        cartCount={0}
      />


      <Cat menuItems={[
        { icon: '🖌️', label: 'BÚT VẼ, CỌ VẼ' },
        { icon: '🎨', label: 'MÀU VẼ' },
        { icon: '📄', label: 'GIẤY VẼ' },
        { icon: '✒️', label: 'PHÁC THẢO' },
        { icon: '🛠️', label: 'THỦ CÔNG (DIY)' },
        { icon: '🔧', label: 'DỤNG CỤ BỔ TRỢ' },
        { icon: '📚', label: 'VĂN PHÒNG PHẨM' },
      ]} />

     {productGroups.map((group, index) => (
        <div key={index} className="product-section">
          <div className="section-header">
            <h2 style={{color:'black', marginLeft:'20vh', marginTop:'5vh'}}>{group.title}</h2>
            <a style={{marginLeft:'21vh', color:'black'}} href="#">Xem thêm</a> 
          </div>
          <ProductList style={{width:'30%'}} products={group.products} />
        </div>
      ))}

      <Footer
        companyName="WEBART ®"
        address="150 Hoàng Văn Thái - Thạnh Xuân - Hà Nội"
        hotline="1900.6021"
        hours="9h00 - 21h30"
        website="Website Artstore.vn được vận hành bởi: HỘ KINH DOANH 150 HOÀNG VĂN THÁI Ma số hộ kinh doanh: 889528016-001 Va Ma số đăng ký hộ kinh doanh, UBND quận Thanh Xuân cấp lần đầu ngày 27/10/2023."
        legal="Địa chỉ trụ sở: Hộ kinh doanh: Số nhà 150 phố Hoàng Văn Thái, phường Khương Mai, quận Thanh Xuân, thành phố Hà Nội. MST: 19006021 Email: hoacualostore@gmail.com"
        policySection={{
          title: 'Thông tin và chính sách',
          items: [
            'Về chúng tôi',
            'Chính sách giao hàng',
            'Chính sách và quy định chung',
            'Phương thức thanh toán',
            'Chính sách vận chuyển'
          ]
        }}
        serviceSection={{
          title: 'Dịch vụ và thông tin khác',
          items: [
            'Chính sách bảo mật thông tin cá nhân',
            'Cơ chế giải quyết tranh chấp',
            'Chính sách bảo hành',
            'Chính sách đổi trả và hoàn tiền',
            'Chính sách kiểm hàng'
          ]
        }}
        fanpage={{
          title: 'Facebook Fanpage',
          imageSrc: 'path/to/fanpage-image.jpg', // Thay bằng URL hình ảnh thực tế
          name: 'Hoa Cua Art Store',
          followers: '298.851 người theo dõi',
          status: 'FB Đã thuê đềo' // Dựa trên hình, có thể là typo, điều chỉnh nếu cần
        }}
        
        copyright="Nhan ©2023 copyright"
      />
    </div>
  );
}

export default Home;