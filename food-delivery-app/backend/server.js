const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
// Import models to register associations
require('./models/User');
require('./models/Restaurant');
require('./models/FoodItem');
require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('MySQL connected & tables synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
