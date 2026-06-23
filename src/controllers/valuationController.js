import { ValuationModel, DeadStockModel, COGSModel, FifoLifoWeightedModel } from '../models/valuationModel.js';

// ================================
// VALUATION CONTROLLERS
// ================================

// Get all valuations
export const getAllValuations = async (req, res) => {
  try {
    const valuations = await ValuationModel.find()
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: valuations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valuations',
      error: error.message
    });
  }
};

// Get valuation by ID
export const getValuationById = async (req, res) => {
  try {
    const valuation = await ValuationModel.findById(req.params.id)
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email');
    if (!valuation) {
      return res.status(404).json({
        success: false,
        message: 'Valuation not found'
      });
    }
    res.json({
      success: true,
      data: valuation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valuation',
      error: error.message
    });
  }
};

// Create new valuation
export const createValuation = async (req, res) => {
  try {
    const valuation = new ValuationModel(req.body);
    await valuation.save();
    res.status(201).json({
      success: true,
      message: 'Valuation created successfully',
      data: valuation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating valuation',
      error: error.message
    });
  }
};

// Update valuation
export const updateValuation = async (req, res) => {
  try {
    const valuation = await ValuationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!valuation) {
      return res.status(404).json({
        success: false,
        message: 'Valuation not found'
      });
    }
    res.json({
      success: true,
      message: 'Valuation updated successfully',
      data: valuation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating valuation',
      error: error.message
    });
  }
};

// Delete valuation
export const deleteValuation = async (req, res) => {
  try {
    const valuation = await ValuationModel.findByIdAndDelete(req.params.id);
    if (!valuation) {
      return res.status(404).json({
        success: false,
        message: 'Valuation not found'
      });
    }
    res.json({
      success: true,
      message: 'Valuation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting valuation',
      error: error.message
    });
  }
};

// ================================
// DEAD STOCK CONTROLLERS
// ================================

// Get all dead stock records
export const getAllDeadStock = async (req, res) => {
  try {
    const deadStock = await DeadStockModel.find()
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: deadStock
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dead stock records',
      error: error.message
    });
  }
};

// Get dead stock by ID
export const getDeadStockById = async (req, res) => {
  try {
    const deadStock = await DeadStockModel.findById(req.params.id)
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email');
    if (!deadStock) {
      return res.status(404).json({
        success: false,
        message: 'Dead stock record not found'
      });
    }
    res.json({
      success: true,
      data: deadStock
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dead stock record',
      error: error.message
    });
  }
};

// Create new dead stock record
export const createDeadStock = async (req, res) => {
  try {
    const deadStock = new DeadStockModel(req.body);
    await deadStock.save();
    res.status(201).json({
      success: true,
      message: 'Dead stock record created successfully',
      data: deadStock
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating dead stock record',
      error: error.message
    });
  }
};

// Update dead stock record
export const updateDeadStock = async (req, res) => {
  try {
    const deadStock = await DeadStockModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!deadStock) {
      return res.status(404).json({
        success: false,
        message: 'Dead stock record not found'
      });
    }
    res.json({
      success: true,
      message: 'Dead stock record updated successfully',
      data: deadStock
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating dead stock record',
      error: error.message
    });
  }
};

// Delete dead stock record
export const deleteDeadStock = async (req, res) => {
  try {
    const deadStock = await DeadStockModel.findByIdAndDelete(req.params.id);
    if (!deadStock) {
      return res.status(404).json({
        success: false,
        message: 'Dead stock record not found'
      });
    }
    res.json({
      success: true,
      message: 'Dead stock record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting dead stock record',
      error: error.message
    });
  }
};

// ================================
// COGS CONTROLLERS
// ================================

// Get all COGS records
export const getAllCOGS = async (req, res) => {
  try {
    const cogs = await COGSModel.find()
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: cogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching COGS records',
      error: error.message
    });
  }
};

// Get COGS by ID
export const getCOGSById = async (req, res) => {
  try {
    const cogs = await COGSModel.findById(req.params.id)
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email');
    if (!cogs) {
      return res.status(404).json({
        success: false,
        message: 'COGS record not found'
      });
    }
    res.json({
      success: true,
      data: cogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching COGS record',
      error: error.message
    });
  }
};

// Create new COGS record
export const createCOGS = async (req, res) => {
  try {
    const cogs = new COGSModel(req.body);
    await cogs.save();
    res.status(201).json({
      success: true,
      message: 'COGS record created successfully',
      data: cogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating COGS record',
      error: error.message
    });
  }
};

// Update COGS record
export const updateCOGS = async (req, res) => {
  try {
    const cogs = await COGSModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!cogs) {
      return res.status(404).json({
        success: false,
        message: 'COGS record not found'
      });
    }
    res.json({
      success: true,
      message: 'COGS record updated successfully',
      data: cogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating COGS record',
      error: error.message
    });
  }
};

// Delete COGS record
export const deleteCOGS = async (req, res) => {
  try {
    const cogs = await COGSModel.findByIdAndDelete(req.params.id);
    if (!cogs) {
      return res.status(404).json({
        success: false,
        message: 'COGS record not found'
      });
    }
    res.json({
      success: true,
      message: 'COGS record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting COGS record',
      error: error.message
    });
  }
};

// ================================
// FIFO/LIFO/WEIGHTED AVERAGE CONTROLLERS
// ================================

// Get all FIFO/LIFO/Weighted Average records
export const getAllFifoLifoWeighted = async (req, res) => {
  try {
    const records = await FifoLifoWeightedModel.find()
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FIFO/LIFO/Weighted Average records',
      error: error.message
    });
  }
};

// Get FIFO/LIFO/Weighted Average by ID
export const getFifoLifoWeightedById = async (req, res) => {
  try {
    const record = await FifoLifoWeightedModel.findById(req.params.id)
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('createdBy', 'name email');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'FIFO/LIFO/Weighted Average record not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FIFO/LIFO/Weighted Average record',
      error: error.message
    });
  }
};

// Create new FIFO/LIFO/Weighted Average record
export const createFifoLifoWeighted = async (req, res) => {
  try {
    const record = new FifoLifoWeightedModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'FIFO/LIFO/Weighted Average record created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating FIFO/LIFO/Weighted Average record',
      error: error.message
    });
  }
};

// Update FIFO/LIFO/Weighted Average record
export const updateFifoLifoWeighted = async (req, res) => {
  try {
    const record = await FifoLifoWeightedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'FIFO/LIFO/Weighted Average record not found'
      });
    }
    res.json({
      success: true,
      message: 'FIFO/LIFO/Weighted Average record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating FIFO/LIFO/Weighted Average record',
      error: error.message
    });
  }
};

// Delete FIFO/LIFO/Weighted Average record
export const deleteFifoLifoWeighted = async (req, res) => {
  try {
    const record = await FifoLifoWeightedModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'FIFO/LIFO/Weighted Average record not found'
      });
    }
    res.json({
      success: true,
      message: 'FIFO/LIFO/Weighted Average record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting FIFO/LIFO/Weighted Average record',
      error: error.message
    });
  }
};