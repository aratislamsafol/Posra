const {TagCreteServices, ProductTagCreateService, listProductByTagServices} = require('../services/TagController');
exports.TagCreate = async(req, res) => {
    try {
        const tagData = req.body;
        const result = await TagCreteServices(tagData);
        res.status(201).json({ success: true, data: result });
    }
    catch(err) {
        return {status: "Failed", data: err.message}
    }
}

exports.ProductTagCreate = async (req, res) => {
  try {
    const result = await ProductTagCreateService(req.body);
    res.status(201).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err.message });
  }
};

exports.listProductByTags = async (req, res) => {
    try {
      const data = await listProductByTagServices(req);
      res.status(200).json({ status: "success", data: data });
    } catch (err) {
      res.status(400).json({ status: "failed", message: err.message });
  }
};
