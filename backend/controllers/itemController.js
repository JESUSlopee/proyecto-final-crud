const Item = require('../models/Item');

// Create and Save a new Item
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name can not be empty!"
    });
  }

  // Create an Item
  const item = {
    name: req.body.name,
    description: req.body.description || null,
    quantity: req.body.quantity || 0
  };

  try {
    // Save Item in the database
    const createdItem = await Item.create(item);
    res.status(201).json(createdItem);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Item."
    });
  }
};

// Retrieve all Items from the database
exports.findAll = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving items."
    });
  }
};

// Find a single Item with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findByPk(id);
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({
        message: `Cannot find Item with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving Item with id=" + id
    });
  }
};

// Update an Item by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [num] = await Item.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.json({
        message: "Item was updated successfully."
      });
    } else {
      res.status(404).json({
        message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating Item with id=" + id
    });
  }
};

// Delete an Item with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Item.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.json({
        message: "Item was deleted successfully!"
      });
    } else {
      res.status(404).json({
        message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not delete Item with id=" + id
    });
  }
};