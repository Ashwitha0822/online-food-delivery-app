const router = require('express').Router();
const { Op } = require('sequelize');
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { cuisine, search } = req.query;
    const where = {};
    if (cuisine) where.cuisine = cuisine;
    if (search) where.name = { [Op.like]: `%${search}%` };
    const restaurants = await Restaurant.findAll({ where });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single restaurant with menu
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [{ model: FoodItem, as: 'menu' }],
    });
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed sample data
router.post('/seed', async (req, res) => {
  try {
    await FoodItem.destroy({ where: {} });
    await Restaurant.destroy({ where: {} });

    const restaurants = [
      {
        name: 'Spice Garden', cuisine: 'Indian', rating: 4.5,
        description: 'Authentic Indian flavors', deliveryTime: '30-40 min',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        menu: [
          { name: 'Butter Chicken', price: 280, category: 'Main Course', description: 'Creamy tomato curry' },
          { name: 'Paneer Tikka', price: 220, category: 'Starters', description: 'Grilled cottage cheese' },
          { name: 'Biryani', price: 320, category: 'Main Course', description: 'Fragrant rice dish' },
          { name: 'Naan', price: 40, category: 'Breads', description: 'Soft leavened bread' },
        ],
      },
      {
        name: 'Pizza Palace', cuisine: 'Italian', rating: 4.3,
        description: 'Best pizzas in town', deliveryTime: '25-35 min',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        menu: [
          { name: 'Margherita Pizza', price: 250, category: 'Pizza', description: 'Classic tomato & cheese' },
          { name: 'Pepperoni Pizza', price: 320, category: 'Pizza', description: 'Loaded with pepperoni' },
          { name: 'Pasta Arrabiata', price: 200, category: 'Pasta', description: 'Spicy tomato pasta' },
          { name: 'Garlic Bread', price: 80, category: 'Sides', description: 'Crispy garlic bread' },
        ],
      },
      {
        name: 'Burger Barn', cuisine: 'American', rating: 4.1,
        description: 'Juicy burgers & fries', deliveryTime: '20-30 min',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        menu: [
          { name: 'Classic Burger', price: 180, category: 'Burgers', description: 'Beef patty with veggies' },
          { name: 'Cheese Burger', price: 210, category: 'Burgers', description: 'Double cheese loaded' },
          { name: 'Crispy Fries', price: 80, category: 'Sides', description: 'Golden crispy fries' },
          { name: 'Milkshake', price: 120, category: 'Drinks', description: 'Thick creamy shake' },
        ],
      },
      {
        name: 'Sushi World', cuisine: 'Japanese', rating: 4.7,
        description: 'Fresh sushi & ramen', deliveryTime: '35-45 min',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
        menu: [
          { name: 'Salmon Sushi (8pc)', price: 380, category: 'Sushi', description: 'Fresh salmon rolls' },
          { name: 'Tuna Roll', price: 350, category: 'Sushi', description: 'Classic tuna maki' },
          { name: 'Ramen', price: 280, category: 'Noodles', description: 'Rich broth noodle soup' },
          { name: 'Miso Soup', price: 80, category: 'Sides', description: 'Traditional miso' },
        ],
      },
    ];

    for (const r of restaurants) {
      const { menu, ...rData } = r;
      const created = await Restaurant.create(rData);
      for (const item of menu) {
        await FoodItem.create({ ...item, restaurantId: created.id });
      }
    }

    res.json({ message: 'Seeded successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
