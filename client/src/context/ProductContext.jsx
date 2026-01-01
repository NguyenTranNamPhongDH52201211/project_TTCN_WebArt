import { createContext, useContext, useState, useEffect } from "react";
import { getDetail } from "../api/productService";

export const ProductContext = createContext(null);

export const useProduct = () => useContext(ProductContext);

export function ProductProvider({ id, children }) {
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDetail(id);

        const images = Array.isArray(data.image)
          ? data.image
          : typeof data.image === "string"
          ? data.image.split(",")
          : [];

        setItem({
          ...data,
          image: images,
        });
        console.log("DETAIL RAW:", data);
        console.log("IMAGES:", images);

        setMainImage(images[0] || null);
      } catch (error) {
        console.error("Lỗi khi load chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const imageArrRand = item?.image?.slice(1, 5) || [];

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const value = {
    item,
    mainImage,
    setMainImage,
    hoverImage,
    setHoverImage,
    imageArrRand,
    quantity,
    handleIncrease,
    handleDecrease,
    loading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
