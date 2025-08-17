const PaymentLogModel = require('../models/PaymentLogsModel');
const dotenv = require('dotenv');
dotenv.config({path: '../../config.env'});

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWD;
const is_live = process.env.is_live;

const InitiateSSLPayment = async (order, customer) => {
  const data = {
    total_amount: order.grand_total,
    currency: 'BDT',
    tran_id: `TXN-${order.order_number}-${Date.now()}`,
    success_url: process.env.SSL_SUCCESS_URL,
    fail_url: process.env.SSL_FAIL_URL,
    cancel_url: process.env.SSL_CANCEL_URL,
    ipn_url: process.env.SSL_IPN_URL,

    product_name: 'E-commerce Order',
    product_category: 'General',
    product_profile: 'general',

    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: customer.address,
    cus_city: customer.city,
    cus_country: 'Bangladesh',
    cus_phone: customer.phone,

    ship_name: customer.name,
    ship_add1: customer.address,
    ship_city: customer.city,
    ship_country: 'Bangladesh'
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const apiResponse = await sslcz.init(data);

  // Save transaction_id in PaymentLog
  await PaymentLogModel.updateOne(
    { order_id: order.order_id },
    { $set: { transaction_id: data.tran_id } }
  );

  return apiResponse.GatewayPageURL;
};

module.exports = { InitiateSSLPayment };
