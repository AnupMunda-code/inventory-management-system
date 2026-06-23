import WarehouseModel, { BinRackModel, WarehouseCapacityModel, WarehouseSetupModel } from '../models/warehouseModel.js';

// Get all warehouses
export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await WarehouseModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: warehouses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouses',
      error: error.message
    });
  }
};

// Get warehouse by ID
export const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await WarehouseModel.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found'
      });
    }
    res.json({
      success: true,
      data: warehouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouse',
      error: error.message
    });
  }
};

// Create new warehouse
export const createWarehouse = async (req, res) => {
  try {
    const warehouse = new WarehouseModel(req.body);
    await warehouse.save();
    res.status(201).json({
      success: true,
      message: 'Warehouse created successfully',
      data: warehouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating warehouse',
      error: error.message
    });
  }
};

// Update warehouse
export const updateWarehouse = async (req, res) => {
  try {
    const warehouse = await WarehouseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse updated successfully',
      data: warehouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating warehouse',
      error: error.message
    });
  }
};

// Delete warehouse
export const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await WarehouseModel.findByIdAndDelete(req.params.id);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting warehouse',
      error: error.message
    });
  }
};

// Add bin to warehouse
export const addBinToWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const binData = req.body;
    
    const warehouse = await WarehouseModel.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found'
      });
    }
    
    warehouse.bins.push(binData);
    await warehouse.save();
    
    res.json({
      success: true,
      message: 'Bin added successfully',
      data: warehouse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding bin',
      error: error.message
    });
  }
};

// ================================
// BIN/RACK MANAGEMENT CONTROLLERS
// ================================

// Get all bin/rack records
export const getAllBinRacks = async (req, res) => {
  try {
    const binRacks = await BinRackModel.find()
      .populate('warehouseId')
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: binRacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bin/rack records',
      error: error.message
    });
  }
};

// Get bin/rack by ID
export const getBinRackById = async (req, res) => {
  try {
    const binRack = await BinRackModel.findById(req.params.id)
      .populate('warehouseId')
      .populate('createdBy');
    if (!binRack) {
      return res.status(404).json({
        success: false,
        message: 'Bin/Rack not found'
      });
    }
    res.json({
      success: true,
      data: binRack
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bin/rack',
      error: error.message
    });
  }
};

// Create new bin/rack
export const createBinRack = async (req, res) => {
  try {
    const binRack = new BinRackModel(req.body);
    await binRack.save();
    res.status(201).json({
      success: true,
      message: 'Bin/Rack created successfully',
      data: binRack
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating bin/rack',
      error: error.message
    });
  }
};

// Update bin/rack
export const updateBinRack = async (req, res) => {
  try {
    const binRack = await BinRackModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!binRack) {
      return res.status(404).json({
        success: false,
        message: 'Bin/Rack not found'
      });
    }
    res.json({
      success: true,
      message: 'Bin/Rack updated successfully',
      data: binRack
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating bin/rack',
      error: error.message
    });
  }
};

// Delete bin/rack
export const deleteBinRack = async (req, res) => {
  try {
    const binRack = await BinRackModel.findByIdAndDelete(req.params.id);
    if (!binRack) {
      return res.status(404).json({
        success: false,
        message: 'Bin/Rack not found'
      });
    }
    res.json({
      success: true,
      message: 'Bin/Rack deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting bin/rack',
      error: error.message
    });
  }
};

// Get bin/racks by warehouse
export const getBinRacksByWarehouse = async (req, res) => {
  try {
    const binRacks = await BinRackModel.find({ warehouseId: req.params.warehouseId })
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: binRacks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bin/racks by warehouse',
      error: error.message
    });
  }
};

// ================================
// WAREHOUSE CAPACITY CONTROLLERS
// ================================

// Get all warehouse capacity records
export const getAllWarehouseCapacities = async (req, res) => {
  try {
    const capacities = await WarehouseCapacityModel.find()
      .populate('warehouseId')
      .populate('createdBy')
      .sort({ lastUpdated: -1 });
    res.json({
      success: true,
      data: capacities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouse capacities',
      error: error.message
    });
  }
};

// Get warehouse capacity by ID
export const getWarehouseCapacityById = async (req, res) => {
  try {
    const capacity = await WarehouseCapacityModel.findById(req.params.id)
      .populate('warehouseId')
      .populate('createdBy');
    if (!capacity) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse capacity not found'
      });
    }
    res.json({
      success: true,
      data: capacity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouse capacity',
      error: error.message
    });
  }
};

// Create new warehouse capacity
export const createWarehouseCapacity = async (req, res) => {
  try {
    const capacity = new WarehouseCapacityModel(req.body);
    await capacity.save();
    res.status(201).json({
      success: true,
      message: 'Warehouse capacity created successfully',
      data: capacity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating warehouse capacity',
      error: error.message
    });
  }
};

// Update warehouse capacity
export const updateWarehouseCapacity = async (req, res) => {
  try {
    const capacity = await WarehouseCapacityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!capacity) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse capacity not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse capacity updated successfully',
      data: capacity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating warehouse capacity',
      error: error.message
    });
  }
};

// Delete warehouse capacity
export const deleteWarehouseCapacity = async (req, res) => {
  try {
    const capacity = await WarehouseCapacityModel.findByIdAndDelete(req.params.id);
    if (!capacity) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse capacity not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse capacity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting warehouse capacity',
      error: error.message
    });
  }
};

// Get capacity by warehouse
export const getCapacityByWarehouse = async (req, res) => {
  try {
    const capacity = await WarehouseCapacityModel.findOne({ warehouseId: req.params.warehouseId })
      .populate('warehouseId')
      .populate('createdBy');
    if (!capacity) {
      return res.status(404).json({
        success: false,
        message: 'Capacity record not found for this warehouse'
      });
    }
    res.json({
      success: true,
      data: capacity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching capacity by warehouse',
      error: error.message
    });
  }
};

// ================================
// WAREHOUSE SETUP CONTROLLERS
// ================================

// Get all warehouse setup records
export const getAllWarehouseSetups = async (req, res) => {
  try {
    const setups = await WarehouseSetupModel.find()
      .populate('warehouseId')
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: setups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouse setups',
      error: error.message
    });
  }
};

// Get warehouse setup by ID
export const getWarehouseSetupById = async (req, res) => {
  try {
    const setup = await WarehouseSetupModel.findById(req.params.id)
      .populate('warehouseId')
      .populate('createdBy');
    if (!setup) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse setup not found'
      });
    }
    res.json({
      success: true,
      data: setup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching warehouse setup',
      error: error.message
    });
  }
};

// Create new warehouse setup
export const createWarehouseSetup = async (req, res) => {
  try {
    const setup = new WarehouseSetupModel(req.body);
    await setup.save();
    res.status(201).json({
      success: true,
      message: 'Warehouse setup created successfully',
      data: setup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating warehouse setup',
      error: error.message
    });
  }
};

// Update warehouse setup
export const updateWarehouseSetup = async (req, res) => {
  try {
    const setup = await WarehouseSetupModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!setup) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse setup not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse setup updated successfully',
      data: setup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating warehouse setup',
      error: error.message
    });
  }
};

// Delete warehouse setup
export const deleteWarehouseSetup = async (req, res) => {
  try {
    const setup = await WarehouseSetupModel.findByIdAndDelete(req.params.id);
    if (!setup) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse setup not found'
      });
    }
    res.json({
      success: true,
      message: 'Warehouse setup deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting warehouse setup',
      error: error.message
    });
  }
};

// Get setup by warehouse
export const getSetupByWarehouse = async (req, res) => {
  try {
    const setup = await WarehouseSetupModel.findOne({ warehouseId: req.params.warehouseId })
      .populate('warehouseId')
      .populate('createdBy');
    if (!setup) {
      return res.status(404).json({
        success: false,
        message: 'Setup record not found for this warehouse'
      });
    }
    res.json({
      success: true,
      data: setup
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching setup by warehouse',
      error: error.message
    });
  }
};

