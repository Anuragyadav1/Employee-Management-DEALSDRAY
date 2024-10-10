import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './CreateEmployee.css';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  
  // Error state for form fields
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    imgUrl: ''
  });
  
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isNameValid = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };
  
  const isMobileValid = (mobile) => {
    return /^[6789]\d{9}$/.test(mobile);
  };

  const isImageUrlValid = (url) => {
    return /\.(jpg|jpeg|png)$/.test(url);
  };

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        setErrors({ ...errors, name: !name ? 'Name is required.' : (isNameValid(name) ? '' : 'Name should contain only letter.')});
        break;
      case 'email':
        setErrors({ 
          ...errors, 
          email: !email ? 'Email is required.' : (isEmailValid(email) ? '' : 'Invalid email format.')
        });
        break;
      case 'mobile':
        setErrors({ ...errors, mobile: !mobile ? 'Mobile number is required.' : (isMobileValid(mobile) ? '' : 'Mobile numbers must have exactly 10 digits and start with 6, 7, 8, or 9.') });
        break;
      case 'designation':
        setErrors({ ...errors, designation: !designation ? 'Designation is required.' : '' });
        break;
      case 'gender':
        setErrors({ ...errors, gender: !gender ? 'Gender is required.' : '' });
        break;
      case 'imgUrl':
        setErrors({ ...errors, imgUrl: !imgUrl ? 'Image URL is required.' : (isImageUrlValid(imgUrl) ? '' : 'Image URL must be a valid jpg or png file.') });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields
    let hasErrors = false;
    
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required.' }));
      hasErrors = true;
    } else if (!isNameValid(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name should contain only letters.' }));
      hasErrors = true;
    }
  
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required.' }));
      hasErrors = true;
    } else if (!isEmailValid(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format.' }));
      hasErrors = true;
    }
  
    if (!mobile) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: 'Mobile numbers must have exactly 10 digits and start with 6, 7, 8, or 9.' }));
      hasErrors = true;
    } else if (!isMobileValid(mobile)) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: 'Mobile number should contain only numbers.' }));
      hasErrors = true;
    }
  
    if (!designation) {
      setErrors((prevErrors) => ({ ...prevErrors, designation: 'Designation is required.' }));
      hasErrors = true;
    }
  
    if (!gender) {
      setErrors((prevErrors) => ({ ...prevErrors, gender: 'Gender is required.' }));
      hasErrors = true;
    }
  
    if (!imgUrl) {
      setErrors((prevErrors) => ({ ...prevErrors, imgUrl: 'Image URL is required.' }));
      hasErrors = true;
    } else if (!isImageUrlValid(imgUrl)) {
      setErrors((prevErrors) => ({ ...prevErrors, imgUrl: 'Image URL must be a valid jpg or png file.' }));
      hasErrors = true;
    }
  
    // If any errors are found, prevent submission
    if (hasErrors) {
      return;
    }
  
    try {
      // Check for duplicate email (server-side validation)
      const emailCheckResponse = await api.get(`/api/employees/check-email?email=${email}`);
      if (emailCheckResponse.data) {
        alert('Email already exists. Please use a different email.');
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Email not found (which is good)
      } else {
        console.error('Error checking email:', error);
        alert('An error occurred while checking the email.');
        return;
      }
    }
  
    // If all validations pass, create the employee
    await api.post('/api/employees', {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      imgUrl,
    });
    navigate('/employees');
  };
  

  const handleCheckboxChange = (course) => {
    setCourse((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  return (
    <div className='create-employee-container'>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
           setName(e.target.value);
           if (isNameValid(e.target.value)) {
             setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
          }
          }}          
         onBlur={() => handleBlur('name')}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
          setEmail(e.target.value);
          if (isEmailValid(e.target.value)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
          }
        }}       
        onBlur={() => handleBlur('email')}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <input
          type="text"
          placeholder="Mobile No"
          value={mobile}
          onChange={(e) => {
          setMobile(e.target.value);
          if (isMobileValid(e.target.value)) {
            setErrors((prevErrors) => ({ ...prevErrors, mobile: '' }));
          }
        }}     
         onBlur={() => handleBlur('mobile')}
        />
        {errors.mobile && <span className="error">{errors.mobile}</span>}

        {/* Designation Dropdown */}
        <div className='designation-container'>
          <label>
            <select 
              value={designation} 
              onChange={(e) => setDesignation(e.target.value)} 
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
        <div className='gender-container'>
          <span>Gender:</span>
          <label>
            <input
              type="radio"
              value="M"
              checked={gender === 'M'}
              onChange={() => setGender('M')}
              onBlur={() => handleBlur('gender')}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="F"
              checked={gender === 'F'}
              onChange={() => setGender('F')}
              onBlur={() => handleBlur('gender')}
            />
            Female
          </label>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        {/* Courses Selection */}
        <div className='course-container'>
          <span>Select Courses:</span>
          <label>
            <input  
              type="checkbox"
              value="MCA"
              onChange={() => handleCheckboxChange('MCA')}
            />
            MCA 
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              onChange={() => handleCheckboxChange('BCA')}
            />
            BCA 
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              onChange={() => handleCheckboxChange('BSC')}
            />
            BSC 
          </label>
        </div>

        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => {
          setImgUrl(e.target.value);
          if (isImageUrlValid(e.target.value)) {
            setErrors((prevErrors) => ({ ...prevErrors, imgUrl: '' }));
          }
        }}         
         onBlur={() => handleBlur('imgUrl')}
        />
        {errors.imgUrl && <span className="error">{errors.imgUrl}</span>}

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
