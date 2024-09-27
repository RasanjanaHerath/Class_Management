import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstituteTable = () => {
  const [institutes, setInstitutes] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [currentInstitute, setCurrentInstitute] = useState(null);
  const [newInstituteData, setNewInstituteData] = useState({ name: '', email: '', city: '' });
  const [updatedData, setUpdatedData] = useState({ name: '', email: '', city: '' });

  // Fetch Institutes from the Backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/institute')  // Replace with your backend API endpoint
      .then(response => {
        setInstitutes(response.data);
        console.log("Response:" + JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        console.error("There was an error fetching the institutes!", error);
      });
  }, []);

  // Handle Update Button
  const handleUpdate = (institute) => {
    setCurrentInstitute(institute); // Set the current institute to be updated
    setUpdatedData(institute);      // Prepopulate the modal with current data
    setIsUpdateModalOpen(true);     // Open the update modal
  };

  // Handle Details Button
  const handleDetails = (institute) => {
    setCurrentInstitute(institute);
    setIsDetailsModalOpen(true);
  };

  // Handle Input Change in the Update Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Handle Update Submit with axios PUT
  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:3000/api/institute/${currentInstitute.id}`, updatedData)  // Replace with your backend API endpoint
      .then(response => {
        // Update the institute list in the frontend
        const updatedInstitutes = institutes.map((institute) =>
          institute.id === currentInstitute.id ? response.data : institute
        );
        setInstitutes(updatedInstitutes);  // Update the state with the new institute data
        setIsUpdateModalOpen(false);       // Close the modal after updating
      })
      .catch(error => {
        console.error("There was an error updating the institute!", error);
      });
  };

  // Handle Create Submit using axios
  const handleCreateSubmit = () => {
    axios.post('http://localhost:3000/api/institute', newInstituteData)  // Replace with your backend API endpoint
      .then(response => {
        setInstitutes([...institutes, response.data]);
        setIsCreateModalOpen(false);  // Close the modal
        setNewInstituteData({ name: '', email: '', city: '' });  // Reset the form
      })
      .catch(error => {
        console.error("There was an error creating the institute!", error);
      });
  };

  // Handle Delete Request
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this institute?");
    if (confirmed) {
      axios.delete(`http://localhost:3000/api/institute/${id}`)  // Replace with your backend API endpoint
        .then(() => {
          const updatedInstitutes = institutes.filter((institute) => institute.id !== id);
          setInstitutes(updatedInstitutes);
        })
        .catch(error => {
          console.error("There was an error deleting the institute!", error);
        });
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-50 rounded-lg shadow-md max-w-auto md:ml-64">
      <h3 className="text-2xl mb-4">Institute List</h3>

      {/* Create Institute Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create Institute
      </button>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutes.map((institute) => (
            <tr key={institute.id}>
              <td className="border px-4 py-2">{institute.name}</td>
              <td className="border px-4 py-2">{institute.email}</td>
              <td className="border px-4 py-2">{institute.city}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => handleUpdate(institute)}
                >
                  Update
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  onClick={() => handleDetails(institute)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(institute.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Creating New Institute */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg mb-4">Create New Institute</h3>
            <div className="mb-4">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newInstituteData.name}
                onChange={(e) => setNewInstituteData({ ...newInstituteData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newInstituteData.email}
                onChange={(e) => setNewInstituteData({ ...newInstituteData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">City</label>
              <input
                type="text"
                name="city"
                value={newInstituteData.city}
                onChange={(e) => setNewInstituteData({ ...newInstituteData, city: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleCreateSubmit}
              >
                Create
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Institute */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg mb-4">Update Institute</h3>
            <div className="mb-4">
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">City</label>
              <input
                type="text"
                name="city"
                value={updatedData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                onClick={handleUpdateSubmit}
              >
                Update
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Institute Details */}
      {isDetailsModalOpen && currentInstitute && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg mb-4">Institute Details</h3>
            <p><strong>Name:</strong> {currentInstitute.name}</p>
            <p><strong>Email:</strong> {currentInstitute.email}</p>
            <p><strong>City:</strong> {currentInstitute.city}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteTable;
