const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// Get all menu items
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new menu item (admin only)
router.post('/menu', async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  });
  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
