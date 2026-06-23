import ItemModel, { CategoryModel, SubcategoryModel, HsnSacModel, BatchSerialModel } from '../models/itemModel.js';

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items',
      error: error.message
    });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await ItemModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching item',
      error: error.message
    });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const item = new ItemModel(req.body);
    await item.save();
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating item',
      error: error.message
    });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const item = await ItemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating item',
      error: error.message
    });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting item',
      error: error.message
    });
  }
};

// Get items by category
export const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await ItemModel.find({ category }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching items by category',
      error: error.message
    });
  }
};

// Get low stock items
export const getLowStockItems = async (req, res) => {
  try {
    const items = await ItemModel.find({
      $expr: { $lte: ['$stock', '$minStock'] }
    }).sort({ stock: 1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock items',
      error: error.message
    });
  }
};

// ================================
// CATEGORY CONTROLLERS
// ================================

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ sortOrder: 1 });
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
};
import mongoose from 'mongoose';
// Create new category
export const createCategory = async (req, res) => {
  try {
     //await mongoose.connection.db.collection('categories').dropIndex('code_1');
    const category = new CategoryModel(req.body);
    await category.save();
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message
    });
  }
};

// ================================
// SUBCATEGORY CONTROLLERS
// ================================

// Get all subcategories
export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await SubcategoryModel.find().populate('category').sort({ sortOrder: 1 });
    res.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategories',
      error: error.message
    });
  }
};

// Get subcategory by ID
export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findById(req.params.id).populate('category');
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }
    res.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subcategory',
      error: error.message
    });
  }
};

// Create new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const subcategory = new SubcategoryModel(req.body);
    //await mongoose.connection.db.collection('subcategories').dropIndex('code_1');
    //console.log("index dropped successfully");
         //await mongoose.connection.db.collection('categories').dropIndex('code_1');

    await subcategory.save();
    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully',
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subcategory',
      error: error.message
    });
  }
};

// Update subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }
    res.json({
      success: true,
      message: 'Subcategory updated successfully',
      data: subcategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating subcategory',
      error: error.message
    });
  }
};

// Delete subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'Subcategory not found'
      });
    }
    res.json({
      success: true,
      message: 'Subcategory deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting subcategory',
      error: error.message
    });
  }
};

// ================================
// HSN/SAC CODE CONTROLLERS
// ================================

// Get all HSN/SAC codes
export const getAllHsnSacCodes = async (req, res) => {
  try {
    const codes = await HsnSacModel.find().sort({ code: 1 });
    res.json({
      success: true,
      data: codes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching HSN/SAC codes',
      error: error.message
    });
  }
};

// Get HSN/SAC code by ID
export const getHsnSacCodeById = async (req, res) => {
  try {
    const code = await HsnSacModel.findById(req.params.id);
    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'HSN/SAC code not found'
      });
    }
    res.json({
      success: true,
      data: code
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching HSN/SAC code',
      error: error.message
    });
  }
};

// Create new HSN/SAC code
export const createHsnSacCode = async (req, res) => {
  try {
    const code = new HsnSacModel(req.body);
    await code.save();
    res.status(201).json({
      success: true,
      message: 'HSN/SAC code created successfully',
      data: code
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating HSN/SAC code',
      error: error.message
    });
  }
};

// Update HSN/SAC code
export const updateHsnSacCode = async (req, res) => {
  try {
    const code = await HsnSacModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'HSN/SAC code not found'
      });
    }
    res.json({
      success: true,
      message: 'HSN/SAC code updated successfully',
      data: code
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating HSN/SAC code',
      error: error.message
    });
  }
};

// Delete HSN/SAC code
export const deleteHsnSacCode = async (req, res) => {
  try {
    const code = await HsnSacModel.findByIdAndDelete(req.params.id);
    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'HSN/SAC code not found'
      });
    }
    res.json({
      success: true,
      message: 'HSN/SAC code deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting HSN/SAC code',
      error: error.message
    });
  }
};

// ================================
// BATCH & SERIAL TRACKING CONTROLLERS
// ================================

// Get all batch/serial records
export const getAllBatchSerialRecords = async (req, res) => {
  try {
    const records = await BatchSerialModel.find()
      .populate('itemId')
      .populate('supplier')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch/serial records',
      error: error.message
    });
  }
};

// Get batch/serial record by ID
export const getBatchSerialRecordById = async (req, res) => {
  try {
    const record = await BatchSerialModel.findById(req.params.id)
      .populate('itemId')
      .populate('supplier');
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Batch/Serial record not found'
      });
    }
    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch/serial record',
      error: error.message
    });
  }
};

// Create new batch/serial record
export const createBatchSerialRecord = async (req, res) => {
  try {
    const record = new BatchSerialModel(req.body);
    await record.save();
    res.status(201).json({
      success: true,
      message: 'Batch/Serial record created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating batch/serial record',
      error: error.message
    });
  }
};

// Update batch/serial record
export const updateBatchSerialRecord = async (req, res) => {
  try {
    const record = await BatchSerialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Batch/Serial record not found'
      });
    }
    res.json({
      success: true,
      message: 'Batch/Serial record updated successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating batch/serial record',
      error: error.message
    });
  }
};

// Delete batch/serial record
export const deleteBatchSerialRecord = async (req, res) => {
  try {
    const record = await BatchSerialModel.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Batch/Serial record not found'
      });
    }
    res.json({
      success: true,
      message: 'Batch/Serial record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting batch/serial record',
      error: error.message
    });
  }
};

// Get batch/serial records by item
export const getBatchSerialRecordsByItem = async (req, res) => {
  try {
    const records = await BatchSerialModel.find({ itemId: req.params.itemId })
      .populate('supplier')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch/serial records by item',
      error: error.message
    });
  }
};

// Get batch/serial records by warehouse
export const getBatchSerialRecordsByWarehouse = async (req, res) => {
  try {
    const records = await BatchSerialModel.find({ warehouse: req.params.warehouseId })
      .populate('itemId')
      .populate('supplier')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch/serial records by warehouse',
      error: error.message
    });
  }
};

