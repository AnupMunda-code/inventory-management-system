import mongoose from 'mongoose';
import { PurchaseOrderModel, PurchaseReturnModel, CostTrackingModel, GoodsReceiptNoteModel, PendingOrderModel } from '../models/purchaseModel.js';

// Purchase Orders
export const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrderModel.find()
      .populate('supplierId', 'name companyName')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: purchaseOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase orders',
      error: error.message
    });
  }
};

export const getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findById(req.params.id)
      .populate('supplierId', 'name companyName');
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }
    res.json({
      success: true,
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase order',
      error: error.message
    });
  }
};

export const createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrderModel(req.body);
    await purchaseOrder.save();
    res.status(201).json({
      success: true,
      message: 'Purchase order created successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating purchase order',
      error: error.message
    });
  }
};

export const updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }
    res.json({
      success: true,
      message: 'Purchase order updated successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating purchase order',
      error: error.message
    });
  }
};

export const deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findByIdAndDelete(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }
    res.json({
      success: true,
      message: 'Purchase order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting purchase order',
      error: error.message
    });
  }
};

// Purchase Returns
export const getAllPurchaseReturns = async (req, res) => {
  try {
    await mongoose.connection.db.collection('Purchase').dropIndex('code_1');
    //await mongoose.connection.db.collection('categories').dropIndex('code_1');
    const purchaseReturns = await PurchaseReturnModel.find()
      .populate('supplierId', 'name companyName')
      .populate('originalOrderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: purchaseReturns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase returns',
      error: error.message
    });
  }
};

export const getPurchaseReturnById = async (req, res) => {
  try {
    const purchaseReturn = await PurchaseReturnModel.findById(req.params.id)
      .populate('supplierId', 'name companyName')
      .populate('originalOrderId', 'orderNumber');
    if (!purchaseReturn) {
      return res.status(404).json({
        success: false,
        message: 'Purchase return not found'
      });
    }
    res.json({
      success: true,
      data: purchaseReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching purchase return',
      error: error.message
    });
  }
};

export const createPurchaseReturn = async (req, res) => {
  try {
    const purchaseReturn = new PurchaseReturnModel(req.body);
    await purchaseReturn.save();
    res.status(201).json({
      success: true,
      message: 'Purchase return created successfully',
      data: purchaseReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating purchase return',
      error: error.message
    });
  }
};

export const updatePurchaseReturn = async (req, res) => {
  try {
    const purchaseReturn = await PurchaseReturnModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!purchaseReturn) {
      return res.status(404).json({
        success: false,
        message: 'Purchase return not found'
      });
    }
    res.json({
      success: true,
      message: 'Purchase return updated successfully',
      data: purchaseReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating purchase return',
      error: error.message
    });
  }
};

export const deletePurchaseReturn = async (req, res) => {
  try {
    const purchaseReturn = await PurchaseReturnModel.findByIdAndDelete(req.params.id);
    if (!purchaseReturn) {
      return res.status(404).json({
        success: false,
        message: 'Purchase return not found'
      });
    }
    res.json({
      success: true,
      message: 'Purchase return deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting purchase return',
      error: error.message
    });
  }
};

// ================================
// COST TRACKING CONTROLLERS
// ================================

// Get all cost tracking records
export const getAllCostTracking = async (req, res) => {
  try {
    const records = await CostTrackingModel.find()
      .populate('purchaseOrderId')
      .populate('itemId')
      .populate('supplierId')
      .populate('createdBy')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cost tracking records',
      error: error.message
    });
  }
};

// Get cost tracking by ID
export const getCostTrackingById = async (req, res) => {
  try {
    const record = await CostTrackingModel.findById(req.params.id)
      .populate('purchaseOrderId')
      .populate('itemId')
      .populate('supplierId')
      .populate('createdBy');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Cost tracking record not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cost tracking record',
      error: error.message
    });
  }
};

// Create new cost tracking record
export const createCostTracking = async (req, res) => {
  try {
    const record = new CostTrackingModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'Cost tracking record created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating cost tracking record',
      error: error.message
    });
  }
};

// Update cost tracking record
export const updateCostTracking = async (req, res) => {
  try {
    const record = await CostTrackingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Cost tracking record not found'
      });
    }
    res.json({
      success: true,
      message: 'Cost tracking record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cost tracking record',
      error: error.message
    });
  }
};

// Delete cost tracking record
export const deleteCostTracking = async (req, res) => {
  try {
    const record = await CostTrackingModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Cost tracking record not found'
      });
    }
    res.json({
      success: true,
      message: 'Cost tracking record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting cost tracking record',
      error: error.message
    });
  }
};

// ================================
// GOODS RECEIPT NOTE CONTROLLERS
// ================================

// Get all goods receipt notes
export const getAllGoodsReceiptNotes = async (req, res) => {
  try {
    const records = await GoodsReceiptNoteModel.find()
      .populate('purchaseOrderId')
      .populate('supplierId')
      .populate('warehouseId')
      .populate('receivedBy')
      .populate('verifiedBy')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching goods receipt notes',
      error: error.message
    });
  }
};

// Get goods receipt note by ID
export const getGoodsReceiptNoteById = async (req, res) => {
  try {
    const record = await GoodsReceiptNoteModel.findById(req.params.id)
      .populate('purchaseOrderId')
      .populate('supplierId')
      .populate('warehouseId')
      .populate('receivedBy')
      .populate('verifiedBy');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Goods receipt note not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching goods receipt note',
      error: error.message
    });
  }
};

// Create new goods receipt note
export const createGoodsReceiptNote = async (req, res) => {
  try {
    const record = new GoodsReceiptNoteModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'Goods receipt note created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating goods receipt note',
      error: error.message
    });
  }
};

// Update goods receipt note
export const updateGoodsReceiptNote = async (req, res) => {
  try {
    const record = await GoodsReceiptNoteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Goods receipt note not found'
      });
    }
    res.json({
      success: true,
      message: 'Goods receipt note updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating goods receipt note',
      error: error.message
    });
  }
};

// Delete goods receipt note
export const deleteGoodsReceiptNote = async (req, res) => {
  try {
    const record = await GoodsReceiptNoteModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Goods receipt note not found'
      });
    }
    res.json({
      success: true,
      message: 'Goods receipt note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting goods receipt note',
      error: error.message
    });
  }
};

// ================================
// PENDING ORDERS CONTROLLERS
// ================================

// Get all pending orders
export const getAllPendingOrders = async (req, res) => {
  try {
    const records = await PendingOrderModel.find()
      .populate('purchaseOrderId')
      .populate('supplierId')
      .populate('assignedTo')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending orders',
      error: error.message
    });
  }
};

// Get pending order by ID
export const getPendingOrderById = async (req, res) => {
  try {
    const record = await PendingOrderModel.findById(req.params.id)
      .populate('purchaseOrderId')
      .populate('supplierId')
      .populate('assignedTo');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Pending order not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending order',
      error: error.message
    });
  }
};

// Create new pending order
export const createPendingOrder = async (req, res) => {
  try {
    const record = new PendingOrderModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'Pending order created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating pending order',
      error: error.message
    });
  }
};

// Update pending order
export const updatePendingOrder = async (req, res) => {
  try {
    const record = await PendingOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Pending order not found'
      });
    }
    res.json({
      success: true,
      message: 'Pending order updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating pending order',
      error: error.message
    });
  }
};

// Delete pending order
export const deletePendingOrder = async (req, res) => {
  try {
    const record = await PendingOrderModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Pending order not found'
      });
    }
    res.json({
      success: true,
      message: 'Pending order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting pending order',
      error: error.message
    });
  }
};

