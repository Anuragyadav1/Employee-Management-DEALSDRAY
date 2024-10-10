import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    imgUrl: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    imgUrl: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      console.log(id)
      const res = await api.get(`/api/employees/${id}`);
      // console.log(res)
      setEmployee(res.data);
    };
    fetchEmployee();
  }, [id]);

  // Validation functions
  const isNameValid = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };  
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isMobileValid = (mobile) => /^[6789]\d{9}$/.test(mobile);
  const isImageUrlValid = (url) => /\.(jpg|jpeg|png)$/.test(url);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        setErrors({ ...errors, name: !employee.name ? 'Name is required.' :  (isNameValid(employee.name) ? '' : 'Name should contain only letters.') });
        break;
      case 'email':
        setErrors({
          ...errors,
          email: !employee.email
            ? 'Email is required.'
            : isEmailValid(employee.email)
            ? ''
            : 'Invalid email format.',
        });
        break;
      case 'mobile':
        setErrors({
          ...errors,
          mobile: !employee.mobile
            ? 'Mobile number is required.'
            : isMobileValid(employee.mobile)
            ? ''
            : 'Mobile number should contain only 10 digit numbers.',
        });
        break;
      case 'designation':
        setErrors({
          ...errors,
          designation: !employee.designation ? 'Designation is required.' : '',
        });
        break;
      case 'imgUrl':
        setErrors({
          ...errors,
          imgUrl: !employee.imgUrl
            ? 'Image URL is required.'
            : isImageUrlValid(employee.imgUrl)
            ? ''
            : 'Image URL must be a valid jpg or png file.',
        });
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (course) => {
    setEmployee((prev) => ({
      ...prev,
      course: prev.course.includes(course)
        ? prev.course.filter((c) => c !== course)
        : [...prev.course, course],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation checks before submitting the form
    let hasErrors = false;
  
    if (!employee.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required.' }));
      hasErrors = true;
    } else if (!isNameValid(employee.name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name should contain only letters.' }));
      hasErrors = true;
    }
  
    if (!employee.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required.' }));
      hasErrors = true;
    } else if (!isEmailValid(employee.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format.' }));
      hasErrors = true;
    }
  
    if (!employee.mobile) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: 'Mobile number is required.' }));
      hasErrors = true;
    } else if (!isMobileValid(employee.mobile)) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: 'Mobile numbers must have exactly 10 digits and start with either 6, 7, 8, or 9.' }));
      hasErrors = true;
    }
  
    if (!employee.designation) {
      setErrors((prevErrors) => ({ ...prevErrors, designation: 'Designation is required.' }));
      hasErrors = true;
    }
  
    if (!employee.imgUrl) {
      setErrors((prevErrors) => ({ ...prevErrors, imgUrl: 'Image URL is required.' }));
      hasErrors = true;
    } else if (!isImageUrlValid(employee.imgUrl)) {
      setErrors((prevErrors) => ({ ...prevErrors, imgUrl: 'Image URL must be a valid jpg or png file.' }));
      hasErrors = true;
    }
  
    // If any validation errors exist, prevent form submission
    if (hasErrors) {
      return;
    }
  
    // If all validations pass, update the employee
    await api.patch(`/api/employees/${id}`, employee);
    navigate('/employees');
  };
  

  if (!employee) return <div className="loading">Loading...</div>;

  return (
    <div className='edit-employee-container'>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={employee.name}
          onChange={(e) => {
            setEmployee({ ...employee, name: e.target.value });
            if (isNameValid(e.target.value)) {
              setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
            }
          }}      
          onBlur={() => handleBlur('name')}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => {
          setEmployee({ ...employee, email: e.target.value });
             if (isEmailValid(e.target.value)) {
              setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
           }
         }}        
          onBlur={() => handleBlur('email')}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="text"
          placeholder="Mobile No"
          value={employee.mobile}
          onChange={(e) => {
          setEmployee({ ...employee, mobile: e.target.value });
          if (isMobileValid(e.target.value)) {
            setErrors((prevErrors) => ({ ...prevErrors, mobile: '' }));
           }
         }}      
          onBlur={() => handleBlur('mobile')}
          required
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}

        <div className='designation-container'>
          <label>
            <select 
              value={employee.designation} 
              onChange={(e) => setEmployee({ ...employee, designation: e.target.value })} 
              onBlur={() => handleBlur('designation')}
            >
              <option value="" disabled>Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>

        {/* Gender Selection */}
        <div className='gender-containerr'>
          <span>Gender:</span>
          <label>
            <input
              type="radio"
              value="M"
              checked={employee.gender === 'M'}
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="F"
              checked={employee.gender === 'F'}
              onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            />
            Female
          </label>
        </div>

        {/* Courses Selection */}
        <div className='course-containerr'>
          <span>Select Courses:</span>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={employee.course.includes('MCA')}
              onChange={() => handleCheckboxChange('MCA')}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={employee.course.includes('BCA')}
              onChange={() => handleCheckboxChange('BCA')}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={employee.course.includes('BSC')}
              onChange={() => handleCheckboxChange('BSC')}
            />
            BSC
          </label>
        </div>

        <input
          type="text"
          placeholder="Image URL"
          value={employee.imgUrl}
          onChange={(e) => {
          setEmployee({ ...employee, imgUrl: e.target.value });
          if (isImageUrlValid(e.target.value)) {
            setErrors((prevErrors) => ({ ...prevErrors, imgUrl: '' }));
            }
         }}      
         onBlur={() => handleBlur('imgUrl')}
          required
        />
        {errors.imgUrl && <span className="error">{errors.imgUrl}</span>}

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
