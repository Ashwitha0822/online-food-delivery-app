const router = require('express').Router();
const { Order, OrderItem } = require('../models/Order');
const auth = require('../middleware/auth');

// Place order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurant, restaurantName, items, totalAmount, deliveryAddress, paymentMethod } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      restaurantId: restaurant,
      restaurantName,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });
    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        foodItemId: item.foodItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    }
    const fullOrder = await Order.findByPk(order.id, { include: [{ model: OrderItem, as: 'items' }] });
    res.json(fullOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: OrderItem, as: 'items' }],
    });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel order
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (order.status !== 'placed') return res.status(400).json({ message: 'Cannot cancel' });
    order.status = 'cancelled';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
