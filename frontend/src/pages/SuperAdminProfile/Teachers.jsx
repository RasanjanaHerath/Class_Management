import React, { useState } from 'react';

const Teachers = () => {
  const [teacherID, setTeacherID] = useState('');
  const [nic, setNic] = useState('');
  const [teacherData, setTeacherData] = useState(null); // Stores fetched teacher data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    description: '',
    birthday: '',
    phoneNumber: '',
    qualification: '',
    subjects: '',
    experience: ''
  });

  // Function to handle search
  const handleSearch = () => {
    const mockData = {
      teacherID: 'T123',
      nic: '123456789V',
      description: 'Experienced teacher in Mathematics.',
      birthday: '1985-06-15',
      phoneNumber: '0712345678',
      qualification: 'M.Sc Mathematics',
      subjects: 'Math, Physics',
      experience: '10 years'
    };

    if (teacherID === mockData.teacherID || nic === mockData.nic) {
      setTeacherData(mockData);
    } else {
      alert('Teacher not found.');
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (update teacher details)
  const handleUpdate = () => {
    console.log('Updated teacher data:', formData);
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:ml-64">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        Teacher Management
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8">
        {/* Search Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Teacher</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter Teacher ID"
              className="p-3 border border-gray-300 rounded-lg w-full"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter NIC"
              className="p-3 border border-gray-300 rounded-lg w-full"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Teacher Data Section */}
        {teacherData && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Teacher Details</h3>
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p><strong>Teacher ID:</strong> {teacherData.teacherID}</p>
                  <p><strong>NIC:</strong> {teacherData.nic}</p>
                </div>
                <p><strong>Description:</strong> {teacherData.description}</p>
                <p><strong>Birthday:</strong> {teacherData.birthday}</p>
                <p><strong>Phone Number:</strong> {teacherData.phoneNumber}</p>
                <p><strong>Qualification:</strong> {teacherData.qualification}</p>
                <p><strong>Subjects:</strong> {teacherData.subjects}</p>
                <p><strong>Experience:</strong> {teacherData.experience}</p>

                <button
                  onClick={() => {
                    setFormData({ ...teacherData });
                    setIsEditing(true);
                  }}
                  className="mt-6 w-full bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="3"
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
                  <label className="block text-sm font-semibold text-gray-700">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Subjects</label>
                  <input
                    type="text"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
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

export default Teachers;
