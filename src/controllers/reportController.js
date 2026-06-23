import { StockSummaryModel, ItemSalesModel, StockAgingModel, ValuationReportModel } from '../models/reportModel.js';

// Stock Summary Report
export const getStockSummary = async (req, res) => {
  try {
    const stockSummary = await StockSummaryModel.find()
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: stockSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock summary',
      error: error.message
    });
  }
};

export const createStockSummary = async (req, res) => {
  try {
    const stockSummary = new StockSummaryModel(req.body);
    await stockSummary.save();
    res.status(201).json({
      success: true,
      message: 'Stock summary created successfully',
      data: stockSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating stock summary',
      error: error.message
    });
  }
};

// Item Sales Report
export const getItemSales = async (req, res) => {
  try {
    const itemSales = await ItemSalesModel.find()
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: itemSales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item sales',
      error: error.message
    });
  }
};

export const createItemSales = async (req, res) => {
  try {
    const itemSales = new ItemSalesModel(req.body);
    await itemSales.save();
    res.status(201).json({
      success: true,
      message: 'Item sales record created successfully',
      data: itemSales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item sales record',
      error: error.message
    });
  }
};

// Stock Aging Report
export const getStockAging = async (req, res) => {
  try {
    const stockAging = await StockAgingModel.find()
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: stockAging
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock aging',
      error: error.message
    });
  }
};

export const createStockAging = async (req, res) => {
  try {
    const stockAging = new StockAgingModel(req.body);
    await stockAging.save();
    res.status(201).json({
      success: true,
      message: 'Stock aging record created successfully',
      data: stockAging
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating stock aging record',
      error: error.message
    });
  }
};

// Valuation Report
export const getValuationReport = async (req, res) => {
  try {
    const valuationReport = await ValuationReportModel.find()
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: valuationReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valuation report',
      error: error.message
    });
  }
};

export const createValuationReport = async (req, res) => {
  try {
    const valuationReport = new ValuationReportModel(req.body);
    await valuationReport.save();
    res.status(201).json({
      success: true,
      message: 'Valuation report created successfully',
      data: valuationReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating valuation report',
      error: error.message
    });
  }
};

// Get reports by warehouse
export const getStockSummaryByWarehouse = async (req, res) => {
  try {
    const { warehouse } = req.params;
    const stockSummary = await StockSummaryModel.find({ warehouse })
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: stockSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock summary by warehouse',
      error: error.message
    });
  }
};

export const getItemSalesByWarehouse = async (req, res) => {
  try {
    const { warehouse } = req.params;
    const itemSales = await ItemSalesModel.find({ warehouse })
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: itemSales
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item sales by warehouse',
      error: error.message
    });
  }
};

export const getStockAgingByWarehouse = async (req, res) => {
  try {
    const { warehouse } = req.params;
    const stockAging = await StockAgingModel.find({ warehouse })
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: stockAging
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stock aging by warehouse',
      error: error.message
    });
  }
};

export const getValuationReportByWarehouse = async (req, res) => {
  try {
    const { warehouse } = req.params;
    const valuationReport = await ValuationReportModel.find({ warehouse })
      .populate('itemId', 'name sku')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: valuationReport
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching valuation report by warehouse',
      error: error.message
    });
  }
};

