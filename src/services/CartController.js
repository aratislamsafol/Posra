const CartModel = require('../models/CartModel');
const ProductSpecsModel = require('../models/ProductSpecs');
const mongoose = require('mongoose');

async function addToCart(user_id, ProductId, SpecId, quantity) {
  let product_id = new mongoose.Types.ObjectId(ProductId);
  let spec_id = new mongoose.Types.ObjectId(SpecId);
  const spec = await ProductSpecsModel.findById(spec_id);
  if (!spec) throw new Error('Invalid product specification');


  const price = Number(spec.price) || 0; 

  let cart = await CartModel.findOne({ user_id });

  if (!cart) {
    cart = new CartModel({
      user_id,
      items: [{ product_id, spec_id, quantity, price }]
    });
  } else {
    const itemIndex = cart.items.findIndex(item =>
      item.product_id.equals(product_id) && item.spec_id.equals(spec_id)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product_id, spec_id, quantity, price });
    }
  }

  await cart.save();
  return cart;
}

async function updateCartItem(user_id, ProductId, OldSpecId, new_spec_id, new_quantity) {
  const product_id = new mongoose.Types.ObjectId(ProductId);
  const old_spec_id = new mongoose.Types.ObjectId(OldSpecId);
  const cart = await CartModel.findOne({ user_id });
  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex(item =>
    item.product_id.equals(product_id) && item.spec_id.equals(old_spec_id)
  );

  if (itemIndex === -1) throw new Error('Item not found in cart');

  if (new_spec_id && !old_spec_id.equals(new_spec_id)) {
    const existingIndex = cart.items.findIndex(item =>
      item.product_id.equals(product_id) && item.spec_id.equals(new_spec_id)
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += new_quantity;
      cart.items.splice(itemIndex, 1);
    } else {
      const spec = await ProductSpecsModel.findById(new_spec_id);
      if (!spec) throw new Error('Invalid new product specification');
      cart.items[itemIndex].spec_id = new_spec_id;
      cart.items[itemIndex].quantity = new_quantity;
      cart.items[itemIndex].price = Number(spec.value) || 0;
    }
  } else {
    cart.items[itemIndex].quantity = new_quantity;
  }

  await cart.save();
  return cart;
}

async function getCart(user_id) {
  const cart = await CartModel.findOne({ user_id })
    .populate('items.product_id', 'name price sku main_image') 
    .populate('items.spec_id');

  return cart;
}

async function removeCartItem(user_id, product_id, spec_id) {
  const cart = await CartModel.findOne({ user_id });
  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter(item =>
    !(item.product_id.equals(product_id) && item.spec_id.equals(spec_id))
  );

  await cart.save();
  return cart;
}

module.exports = {
  addToCart,
  updateCartItem,
  getCart,
  removeCartItem
};
