import axios from "axios";

export async function getCategories() {
  try {
    // 1. Lấy danh sách category cha (cate_parent_id IS NULL)
    const parentRes = await axios.get(
      "http://localhost:3000/api/category/type"
    );
    const parents = parentRes.data;
    // 2. Gộp children vào
    const result = await Promise.all(
      parents.map(async (p) => {
        const childRes = await axios.get(
          `http://localhost:3000/api/category/type/${p.cate_id}`
        );
        const children = Array.isArray(childRes.data)
          ? childRes.data.map((c) => ({
              id: c.cate_id, // lưu cate_id
              title: c.cate_name, // lưu cate_name
            }))
          : []; // nếu không phải array thì gán rỗng
        return {
          id: p.cate_id,
          title: p.cate_name,
          children: children,
        };
      })
    );

    return result; // mảng cha con với cả id lẫn name
  } catch (error) {
    console.error("Lỗi khi load categories:", error);
    return []
  }
}
