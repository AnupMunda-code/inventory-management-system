import { SalesOrderModel, SalesReturnModel, DeliveryChallanModel, OrderTrackingModel } from '../models/salesModel.js';

// Sales Orders
export const getAllSalesOrders = async (req, res) => {
  try {
    const salesOrders = await SalesOrderModel.find()
      .populate('customerId', 'name companyName')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: salesOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales orders',
      error: error.message
    });
  }
};

export const getSalesOrderById = async (req, res) => {
  try {
    const salesOrder = await SalesOrderModel.findById(req.params.id)
      .populate('customerId', 'name companyName');
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }
    res.json({
      success: true,
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales order',
      error: error.message
    });
  }
};

export const createSalesOrder = async (req, res) => {
  try {
    const salesOrder = new SalesOrderModel(req.body);
    await salesOrder.save();
    res.status(201).json({
      success: true,
      message: 'Sales order created successfully',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sales order',
      error: error.message
    });
  }
};

export const updateSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }
    res.json({
      success: true,
      message: 'Sales order updated successfully',
      data: salesOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating sales order',
      error: error.message
    });
  }
};

export const deleteSalesOrder = async (req, res) => {
  try {
    const salesOrder = await SalesOrderModel.findByIdAndDelete(req.params.id);
    if (!salesOrder) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }
    res.json({
      success: true,
      message: 'Sales order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting sales order',
      error: error.message
    });
  }
};

// Sales Returns
export const getAllSalesReturns = async (req, res) => {
  try {
    const salesReturns = await SalesReturnModel.find()
      .populate('customerId', 'name companyName')
      .populate('originalOrderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: salesReturns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales returns',
      error: error.message
    });
  }
};

export const getSalesReturnById = async (req, res) => {
  try {
    const salesReturn = await SalesReturnModel.findById(req.params.id)
      .populate('customerId', 'name companyName')
      .populate('originalOrderId', 'orderNumber');
    if (!salesReturn) {
      return res.status(404).json({
        success: false,
        message: 'Sales return not found'
      });
    }
    res.json({
      success: true,
      data: salesReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales return',
      error: error.message
    });
  }
};

export const createSalesReturn = async (req, res) => {
  try {
    const salesReturn = new SalesReturnModel(req.body);
    await salesReturn.save();
    res.status(201).json({
      success: true,
      message: 'Sales return created successfully',
      data: salesReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sales return',
      error: error.message
    });
  }
};

export const updateSalesReturn = async (req, res) => {
  try {
    const salesReturn = await SalesReturnModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!salesReturn) {
      return res.status(404).json({
        success: false,
        message: 'Sales return not found'
      });
    }
    res.json({
      success: true,
      message: 'Sales return updated successfully',
      data: salesReturn
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating sales return',
      error: error.message
    });
  }
};

export const deleteSalesReturn = async (req, res) => {
  try {
    const salesReturn = await SalesReturnModel.findByIdAndDelete(req.params.id);
    if (!salesReturn) {
      return res.status(404).json({
        success: false,
        message: 'Sales return not found'
      });
    }
    res.json({
      success: true,
      message: 'Sales return deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting sales return',
      error: error.message
    });
  }
};

// Delivery Challans
export const getAllDeliveryChallans = async (req, res) => {
  try {
    const deliveryChallans = await DeliveryChallanModel.find()
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: deliveryChallans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery challans',
      error: error.message
    });
  }
};

export const getDeliveryChallanById = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.findById(req.params.id)
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber');
    if (!deliveryChallan) {
      return res.status(404).json({
        success: false,
        message: 'Delivery challan not found'
      });
    }
    res.json({
      success: true,
      data: deliveryChallan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching delivery challan',
      error: error.message
    });
  }
};

export const createDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = new DeliveryChallanModel(req.body);
    await deliveryChallan.save();
    res.status(201).json({
      success: true,
      message: 'Delivery challan created successfully',
      data: deliveryChallan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating delivery challan',
      error: error.message
    });
  }
};

export const updateDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!deliveryChallan) {
      return res.status(404).json({
        success: false,
        message: 'Delivery challan not found'
      });
    }
    res.json({
      success: true,
      message: 'Delivery challan updated successfully',
      data: deliveryChallan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating delivery challan',
      error: error.message
    });
  }
};

export const deleteDeliveryChallan = async (req, res) => {
  try {
    const deliveryChallan = await DeliveryChallanModel.findByIdAndDelete(req.params.id);
    if (!deliveryChallan) {
      return res.status(404).json({
        success: false,
        message: 'Delivery challan not found'
      });
    }
    res.json({
      success: true,
      message: 'Delivery challan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting delivery challan',
      error: error.message
    });
  }
};

// ================================
// ORDER TRACKING CONTROLLERS
// ================================

// Get all order tracking records
export const getAllOrderTracking = async (req, res) => {
  try {
    const records = await OrderTrackingModel.find()
      .populate('orderId')
      .populate('customerId')
      .populate('assignedTo')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order tracking records',
      error: error.message
    });
  }
};

// Get order tracking by ID
export const getOrderTrackingById = async (req, res) => {
  try {
    const record = await OrderTrackingModel.findById(req.params.id)
      .populate('orderId')
      .populate('customerId')
      .populate('assignedTo');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Order tracking record not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order tracking record',
      error: error.message
    });
  }
};

// Create new order tracking record
export const createOrderTracking = async (req, res) => {
  try {
    const record = new OrderTrackingModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'Order tracking record created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating order tracking record',
      error: error.message
    });
  }
};

// Update order tracking record
export const updateOrderTracking = async (req, res) => {
  try {
    const record = await OrderTrackingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Order tracking record not found'
      });
    }
    res.json({
      success: true,
      message: 'Order tracking record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order tracking record',
      error: error.message
    });
  }
};

// Delete order tracking record
export const deleteOrderTracking = async (req, res) => {
  try {
    const record = await OrderTrackingModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Order tracking record not found'
      });
    }
    res.json({
      success: true,
      message: 'Order tracking record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order tracking record',
      error: error.message
    });
  }
};

