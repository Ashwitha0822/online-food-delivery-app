const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Restaurant = sequelize.define('Restaurant', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  cuisine: { type: DataTypes.STRING },
  image: { type: DataTypes.TEXT, defaultValue: '' },
  rating: { type: DataTypes.FLOAT, defaultValue: 4.0 },
  deliveryTime: { type: DataTypes.STRING, defaultValue: '30-45 min' },
  minOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = Restaurant;
