const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEmployeeWithMailMatching = async (req, res) => {
  const { email } = req.query; // Get the email from the query parameters
  try {
      const existingEmployee = await Employee.findOne({ email: email });
      if (existingEmployee) {
          return res.status(200).json(existingEmployee); // Email exists
      }
      return res.status(404).json({ message: 'Email not found' }); // Email does not exist
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error });
  }
}


// @desc    Create a new employee
// @route   POST /api/employees
exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, imgUrl } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      imgUrl,
    });

    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Update employee
// @route   PATCH /api/employees/:id
exports.updateEmployee = async (req, res) => {
  // console.log("Hello")
  const { name, email, mobile, designation, gender, course, imgUrl } = req.body;
  //  console.log(req.params.id)
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.imgUrl = imgUrl || employee.imgUrl;

    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEmployeeUpdate = async (req, res) => {
  try {
    // console.log(req.params.id)
    const employee = await Employee.findById(req.params.id);
  res.json(employee)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    // console.log(req.params.id)
    const employee = await Employee.findById(req.params.id);
    // console.log(employee)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.deleteOne();
    res.json({ message: 'Employee removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
