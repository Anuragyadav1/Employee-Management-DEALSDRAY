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
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isMobileValid = (mobile) => /^\d+$/.test(mobile);
  const isImageUrlValid = (url) => /\.(jpg|jpeg|png)$/.test(url);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        setErrors({ ...errors, name: !employee.name ? 'Name is required.' : '' });
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
            : 'Mobile number should contain only numbers.',
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
    
    // Final validation before submitting
    if (!employee.name || !employee.email || !employee.mobile || !employee.designation || !employee.imgUrl) {
      alert('All fields are required!');
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
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          onBlur={() => handleBlur('name')}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          onBlur={() => handleBlur('email')}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="text"
          placeholder="Mobile No"
          value={employee.mobile}
          onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
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
          onChange={(e) => setEmployee({ ...employee, imgUrl: e.target.value })}
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
