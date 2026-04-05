const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Restaurant = require('./Restaurant');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  restaurantId: { type: DataTypes.INTEGER, allowNull: false },
  restaurantName: { type: DataTypes.STRING },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  deliveryAddress: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM('placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'),
    defaultValue: 'placed',
  },
  paymentMethod: { type: DataTypes.STRING, defaultValue: 'cod' },
  paymentStatus: { type: DataTypes.STRING, defaultValue: 'pending' },
}, { timestamps: true });

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  foodItemId: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  quantity: { type: DataTypes.INTEGER },
}, { timestamps: false });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = { Order, OrderItem };
