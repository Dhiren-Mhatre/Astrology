import Banner from "../models/sp_banner_master.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ active: true }).sort({ sequenceNo: 1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
