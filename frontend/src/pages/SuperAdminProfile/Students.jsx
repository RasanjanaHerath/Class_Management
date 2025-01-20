import React, { useState } from "react";

const Students = () => {
  const [studentID, setStudentID] = useState('');
  const [nic, setNic] = useState('');
  const [studentData, setStudentData] = useState(null); // Stores fetched student data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    school: '',
    birthday: '',
    phoneNumber: '',
    address: '',
    parentsName: '',
    parentsNumber: ''
  });
  const [errors, setErrors] = useState({
    studentID: '',
    nic: '',
  });

  // Function to handle search
  const handleSearch = () => {
    // Validate Student ID and NIC before searching
    let valid = true;
    const newErrors = { studentID: '', nic: '' };

    // Validate Student ID
    if (!studentID) {
      newErrors.studentID = 'Student ID is required';
      valid = false;
    }

    // Validate NIC format (basic validation for simplicity)
    const nicPattern = /^[0-9]{9}[VvXx]$/;
    if (!nic) {
      newErrors.nic = 'NIC is required';
      valid = false;
    } else if (!nicPattern.test(nic)) {
      newErrors.nic = 'Invalid NIC format';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // If both fields are valid, proceed to search
    const mockData = {
      studentID: 'S123',
      nic: '989999999V',
      school: 'XYZ High School',
      birthday: '2005-08-22',
      phoneNumber: '0712345678',
      address: '456 School St, Cityville',
      parentsName: 'John Doe',
      parentsNumber: '0718765432'
    };

    // Display student data only when both ID and NIC match the mock data
    if (studentID === mockData.studentID && nic === mockData.nic) {
      setStudentData(mockData);
    } else {
      alert('Student not found.');
      setStudentData(null);  // Clear any previous data if not found
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (update student details)
  const handleUpdate = () => {
    console.log('Updated student data:', formData);
    setIsEditing(false); // Exit editing mode
  };

  // Function to handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        Student Management
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8">
        {/* Search Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Student</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter Student ID"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                onKeyDown={handleKeyDown}  // Add the keydown event listener
              />
              {errors.studentID && <p className="absolute text-red-500 text-sm mt-1">{errors.studentID}</p>} {/* Error message for Student ID */}
            </div>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter NIC"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                onKeyDown={handleKeyDown}  // Add the keydown event listener
              />
              {errors.nic && <p className="absolute text-red-500 text-sm mt-1">{errors.nic}</p>} {/* Error message for NIC */}
            </div>

            {/* Ensure Search button doesn't change size */}
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={handleSearch}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Student Data Section */}
        {studentData && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Student Details</h3>
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between bg-gray-100 p-2 rounded-lg">
                  <p><strong>Student ID:</strong> {studentData.studentID}</p>
                  <p><strong>NIC:</strong> {studentData.nic}</p>
                </div>
                <p><strong>School:</strong> {studentData.school}</p>
                <p><strong>Birthday:</strong> {studentData.birthday}</p>
                <p><strong>Phone Number:</strong> {studentData.phoneNumber}</p>
                <p><strong>Address:</strong> {studentData.address}</p>
                <p><strong>Parents Name:</strong> {studentData.parentsName}</p>
                <p><strong>Parents Number:</strong> {studentData.parentsNumber}</p>

                <button
                  onClick={() => {
                    setFormData({ ...studentData });
                    setIsEditing(true);
                  }}
                  className="mt-6 w-full sm:w-auto bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">School</label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Parents Name</label>
                  <input
                    type="text"
                    name="parentsName"
                    value={formData.parentsName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Parents Number</label>
                  <input
                    type="text"
                    name="parentsNumber"
                    value={formData.parentsNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleUpdate}
                    className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
