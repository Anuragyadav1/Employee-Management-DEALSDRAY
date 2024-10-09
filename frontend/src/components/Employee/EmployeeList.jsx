import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Number of employees per page
  let count = employees.length;

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await api.get('/api/employees');
      setEmployees(res.data);
      setLoading(false);
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      await api.delete(`/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className='employee-list-container'>
      <div className='employee-list-header'>
        <h2>Employee List</h2>
        <h4>Total Count: {count}</h4>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='search-input'
        />
      </div>
      {loading ? (
        <p className='loading-text'>Loading...</p>
      ) : currentEmployees.length > 0 ? (
        <>
          <table className='employee-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td><img src={employee.imgUrl} alt={employee.name} className="employee-img" /></td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                  <td>{employee.course.join(', ')}</td>
                  <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className='action-buttons'>
                      <Link to={`/edit-employee/${employee._id}`} className='edit-button'>Edit</Link>
                      <button onClick={() => handleDelete(employee._id)} className='delete-button'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modern Pagination */}
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1} className="pagination-button">
              &laquo; First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">
              &lt; Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
              Next &gt;
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages} className="pagination-button">
              Last &raquo;
            </button>
          </div>
        </>
      ) : (
        <p className='no-results'>No employees found</p>
      )}
    </div>
  );
};

export default EmployeeList;
