const express = require('express');
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeWithMailMatching,
  getEmployeeUpdate
} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/employees
// @desc    Get all employees
router.get('/', authMiddleware, getEmployees);

// @route   GET /api/employees/check-email
// @desc    Check if email already exists
router.get('/check-email', authMiddleware, getEmployeeWithMailMatching);

// @route   POST /api/employees
// @desc    Create a new employee
router.post('/', authMiddleware, createEmployee);

router.get('/:id',authMiddleware,getEmployeeUpdate)

// @route   PATCH /api/employees/:id
// @desc    Update employee
router.patch('/:id', authMiddleware, updateEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete employee
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
