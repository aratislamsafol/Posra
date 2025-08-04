const {
  CategoryServices,
  CreateCategoryServices,
} = require("../services/CategoryController");

const fs = require("fs/promises");
const path = require("path");

exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryServices();
  return res.status(200).json(result);
};
exports.CreateCategory = async (req, res) => {
  const folder = req.dynamicFolder || "others";
  try {
    const { name, status } = req.body;
    let image_url = "";
    // link create for image in db
    if (req.file) {
      image_url = `${req.protocol}://${req.get("host")}/uploads/${folder}/${req.file.filename}`;
    }

    const result = await CreateCategoryServices({
      name,
      image_url,
      status,
      folder,
    });

    res.status(201).json({ success: true, data: result });
  } 
  catch(err) {
    if (req.file) {
      const filePath = path.join(__dirname,`../../uploads/${folder}`, req.file.filename);
      try {
        await fs.unlink(filePath);
        console.log("Image Deleted From :", filePath);
      } catch (err) {
        console.error("Image delete failed:", err.message);
      }
    }

    res.status(400).json({ success: false, message: err.message });
  }
};
