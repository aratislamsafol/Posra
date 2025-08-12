const cartService = require('../services/CartController');

async function addToCartController(req, res) {
  try {
    const user_id = req.headers.user_id;
    const { product_id, spec_id, quantity } = req.body;
    if (!product_id || !spec_id || !quantity) {
      return res.status(400).json({ error: 'product_id, spec_id and quantity are required' });
    }
    const cart = await cartService.addToCart(user_id, product_id, spec_id, quantity);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateCartItemController(req, res) {
  try {
    const user_id = req.headers.user_id;
    const { product_id, old_spec_id, new_spec_id, quantity } = req.body;
    if (!product_id || !old_spec_id || !quantity) {
      return res.status(400).json({ error: 'product_id, old_spec_id and quantity are required' });
    }
    const cart = await cartService.updateCartItem(user_id, product_id, old_spec_id, new_spec_id, quantity);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCartController(req, res) {
  try {
    const user_id = req.headers.user_id;
    const cart = await cartService.getCart(user_id);
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function removeCartItemController(req, res) {
  try {
    const user_id = req.headers.user_id;
    const { product_id, spec_id } = req.body;
    if (!product_id || !spec_id) {
      return res.status(400).json({ error: 'product_id and spec_id are required' });
    }
    const cart = await cartService.removeCartItem(user_id, product_id, spec_id);
    res.status(200).json({status: "successfully delete", data: cart});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addToCartController,
  updateCartItemController,
  getCartController,
  removeCartItemController
};
