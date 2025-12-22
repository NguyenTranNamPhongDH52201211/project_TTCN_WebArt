const rawData = require("../data/vietnamAddress.raw.json");

// helper sinh code có padding
const pad = (num, size) => String(num).padStart(size, "0");

const getProvinces = async () => {
  return rawData.map((p, pIndex) => ({
    code: pad(pIndex + 1, 2), // 01, 02...
    name: p.name
  }));
};

const getDistrictsByProvince = async (provinceCode) => {
  const pIndex = Number(provinceCode) - 1;
  const province = rawData[pIndex];
  if (!province) return [];

  return province.districts.map((d, dIndex) => ({
    code: pad(pIndex + 1, 2) + pad(dIndex + 1, 3), // 01001
    name: d.name
  }));
};

const getWardsByDistrict = async (districtCode) => {
  const pIndex = Number(districtCode.slice(0, 2)) - 1;
  const dIndex = Number(districtCode.slice(2)) - 1;

  const province = rawData[pIndex];
  if (!province) return [];

  const district = province.districts[dIndex];
  if (!district) return [];

  return district.wards.map((w, wIndex) => ({
    code: districtCode + pad(wIndex + 1, 3), // 01001001
    name: w.name
  }));
};

module.exports = {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict
};
