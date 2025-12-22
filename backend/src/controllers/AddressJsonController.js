const AddressService = require("../services/AddressJsonService");

const getProvinces = async (req, res) => {
  try {
    const data = await AddressService.getProvinces();
    res.json(Array.isArray(data) ? data : []); // đảm bảo là mảng
  } catch (err) {
    console.error(err);
    res.status(500).json([]); // trả về mảng rỗng nếu lỗi
  }
};

const getDistricts = async (req, res) => {
  try {
    const { provinceCode } = req.params;
    const data = await AddressService.getDistrictsByProvince(provinceCode);
    res.json(Array.isArray(data) ? data : []); // luôn là mảng
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

const getWards = async (req, res) => {
  try {
    const { districtCode } = req.params;
    const data = await AddressService.getWardsByDistrict(districtCode);
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

module.exports = {
  getProvinces,
  getDistricts,
  getWards,
};
