const express = require('express');
const router = express.Router();
const {
  addMenuItem,
  getMenuItems
} = require('../controllers/menuItemController');

router.post('/add', addMenuItem);
router.get('/', getMenuItems);

module.exports = router;
