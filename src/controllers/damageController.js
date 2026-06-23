import DamageModel, { DamageReceiptModel, WriteOffModel } from '../models/damageModel.js';

// ================================
// DAMAGE RECORD CONTROLLERS
// ================================

// Get all damage records
export const getAllDamageRecords = async (req, res) => {
  try {
    const damageRecords = await DamageModel.find()
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('reportedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: damageRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage records',
      error: error.message
    });
  }
};

// Get damage record by ID
export const getDamageRecordById = async (req, res) => {
  try {
    const damageRecord = await DamageModel.findById(req.params.id)
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('reportedBy', 'name email')
      .populate('approvedBy', 'name email');
    if (!damageRecord) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    res.json({
      success: true,
      data: damageRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage record',
      error: error.message
    });
  }
};

// Create new damage record
export const createDamageRecord = async (req, res) => {
  try {
    const damageRecord = new DamageModel(req.body);
    await damageRecord.save();
    res.status(201).json({
      success: true,
      message: 'Damage record created successfully',
      data: damageRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating damage record',
      error: error.message
    });
  }
};

// Update damage record
export const updateDamageRecord = async (req, res) => {
  try {
    const damageRecord = await DamageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!damageRecord) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    res.json({
      success: true,
      message: 'Damage record updated successfully',
      data: damageRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating damage record',
      error: error.message
    });
  }
};

// Delete damage record
export const deleteDamageRecord = async (req, res) => {
  try {
    const damageRecord = await DamageModel.findByIdAndDelete(req.params.id);
    if (!damageRecord) {
      return res.status(404).json({
        success: false,
        message: 'Damage record not found'
      });
    }
    res.json({
      success: true,
      message: 'Damage record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting damage record',
      error: error.message
    });
  }
};

// Get damage records by warehouse
export const getDamageRecordsByWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    const damageRecords = await DamageModel.find({ warehouseId })
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('reportedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: damageRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage records by warehouse',
      error: error.message
    });
  }
};

// Get damage records by status
export const getDamageRecordsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const damageRecords = await DamageModel.find({ status })
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('reportedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: damageRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage records by status',
      error: error.message
    });
  }
};

// ================================
// DAMAGE RECEIPT CONTROLLERS
// ================================

// Get all damage receipts
export const getAllDamageReceipts = async (req, res) => {
  try {
    const receipts = await DamageReceiptModel.find()
      .populate('damageId')
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('receivedBy', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: receipts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage receipts',
      error: error.message
    });
  }
};

// Get damage receipt by ID
export const getDamageReceiptById = async (req, res) => {
  try {
    const receipt = await DamageReceiptModel.findById(req.params.id)
      .populate('damageId')
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('receivedBy', 'name email')
      .populate('verifiedBy', 'name email');
    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: 'Damage receipt not found'
      });
    }
    res.json({
      success: true,
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching damage receipt',
      error: error.message
    });
  }
};

// Create new damage receipt
export const createDamageReceipt = async (req, res) => {
  try {
    const receipt = new DamageReceiptModel(req.body);
    await receipt.save();
    res.status(201).json({
      success: true,
      message: 'Damage receipt created successfully',
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating damage receipt',
      error: error.message
    });
  }
};

// Update damage receipt
export const updateDamageReceipt = async (req, res) => {
  try {
    const receipt = await DamageReceiptModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: 'Damage receipt not found'
      });
    }
    res.json({
      success: true,
      message: 'Damage receipt updated successfully',
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating damage receipt',
      error: error.message
    });
  }
};

// Delete damage receipt
export const deleteDamageReceipt = async (req, res) => {
  try {
    const receipt = await DamageReceiptModel.findByIdAndDelete(req.params.id);
    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: 'Damage receipt not found'
      });
    }
    res.json({
      success: true,
      message: 'Damage receipt deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting damage receipt',
      error: error.message
    });
  }
};

// ================================
// WRITE-OFF CONTROLLERS
// ================================

// Get all write-off records
export const getAllWriteOffs = async (req, res) => {
  try {
    const writeOffs = await WriteOffModel.find()
      .populate('damageId')
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('approvedBy', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: writeOffs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching write-off records',
      error: error.message
    });
  }
};

// Get write-off by ID
export const getWriteOffById = async (req, res) => {
  try {
    const writeOff = await WriteOffModel.findById(req.params.id)
      .populate('damageId')
      .populate('itemId', 'name sku')
      .populate('warehouseId', 'name location')
      .populate('approvedBy', 'name email')
      .populate('createdBy', 'name email');
    if (!writeOff) {
      return res.status(404).json({
        success: false,
        message: 'Write-off record not found'
      });
    }
    res.json({
      success: true,
      data: writeOff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching write-off record',
      error: error.message
    });
  }
};

// Create new write-off record
export const createWriteOff = async (req, res) => {
  try {
    const writeOff = new WriteOffModel(req.body);
    await writeOff.save();
    res.status(201).json({
      success: true,
      message: 'Write-off record created successfully',
      data: writeOff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating write-off record',
      error: error.message
    });
  }
};

// Update write-off record
export const updateWriteOff = async (req, res) => {
  try {
    const writeOff = await WriteOffModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!writeOff) {
      return res.status(404).json({
        success: false,
        message: 'Write-off record not found'
      });
    }
    res.json({
      success: true,
      message: 'Write-off record updated successfully',
      data: writeOff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating write-off record',
      error: error.message
    });
  }
};

// Delete write-off record
export const deleteWriteOff = async (req, res) => {
  try {
    const writeOff = await WriteOffModel.findByIdAndDelete(req.params.id);
    if (!writeOff) {
      return res.status(404).json({
        success: false,
        message: 'Write-off record not found'
      });
    }
    res.json({
      success: true,
      message: 'Write-off record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting write-off record',
      error: error.message
    });
  }
};