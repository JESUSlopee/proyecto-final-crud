const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new Item
router.post('/', itemController.create);

// Retrieve all Items
router.get('/', itemController.findAll);

// Retrieve a single Item with id
router.get('/:id', itemController.findOne);

// Update an Item with id
router.put('/:id', itemController.update);

// Delete an Item with id
router.delete('/:id', itemController.delete);

module.exports = router;