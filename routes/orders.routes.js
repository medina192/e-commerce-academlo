const express = require('express');

// Controllers
const {
	addProductToCart,
	getUserCart,
	updateProductCart,
	purchaseOrder,
	getAllOrders,
	removeProductCart,
} = require('../controllers/orders.controller');

// Middlewares
const {
	updateProductCartValidations,
	validateResult,
} = require('../middlewares/validators.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protectSession);

// Get user's orders
router.get('/', getAllOrders);

// create order
router.get('/purchase-order', purchaseOrder);

// Get user's cart
router.get('/get-cart', getUserCart);

// Add product to cart
router.post('/add-product-to-cart', addProductToCart);

// Update cart product quantity
router.patch(
	'/update-cart-product',
	updateProductCartValidations,
	validateResult,
	updateProductCart
);

router.patch('/removeproductcart', removeProductCart);

// Remove product from cart




module.exports = { ordersRouter: router };
