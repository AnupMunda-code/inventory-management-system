import InvoiceModel from '../models/invoiceModel.js';

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find()
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id)
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber');
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice',
      error: error.message
    });
  }
};

// Create new invoice
export const createInvoice = async (req, res) => {
  try {
    const invoice = new InvoiceModel(req.body);
    await invoice.save();
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message
    });
  }
};

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    res.json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating invoice',
      error: error.message
    });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    res.json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting invoice',
      error: error.message
    });
  }
};

// Get invoices by customer
export const getInvoicesByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const invoices = await InvoiceModel.find({ customerId })
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices by customer',
      error: error.message
    });
  }
};

// Get invoices by payment status
export const getInvoicesByPaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.params;
    const invoices = await InvoiceModel.find({ paymentStatus })
      .populate('customerId', 'name companyName')
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices by payment status',
      error: error.message
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paidAmount } = req.body;
    
    const invoice = await InvoiceModel.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    invoice.paymentStatus = paymentStatus;
    if (paidAmount) {
      invoice.paidAmount = paidAmount;
      invoice.balanceAmount = invoice.totalAmount - paidAmount;
    }
    
    await invoice.save();
    
    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment status',
      error: error.message
    });
  }
};

