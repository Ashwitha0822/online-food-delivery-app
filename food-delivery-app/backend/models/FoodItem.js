const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restaurant = require('./Restaurant');

const FoodItem = sequelize.define('FoodItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurantId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING },
  image: { type: DataTypes.TEXT, defaultValue: '' },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

Restaurant.hasMany(FoodItem, { foreignKey: 'restaurantId', as: 'menu' });
FoodItem.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = FoodItem;
