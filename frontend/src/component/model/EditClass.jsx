import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

const EditClass = ({ classData, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [editedClassData, setEditedClassData] = useState(classData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedClassData); // Pass the edited class data to parent
    setOpen(false); // Close modal after submitting
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <button 
        onClick={() => setOpen(true)} 
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>

      {/* Modal Component */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Class</h2>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Subject"
                value={editedClassData.subject}
                onChange={(e) => setEditedClassData({ ...editedClassData, subject: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Batch"
                value={editedClassData.batch}
                onChange={(e) => setEditedClassData({ ...editedClassData, batch: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Date & Time"
                value={editedClassData.dateTime}
                onChange={(e) => setEditedClassData({ ...editedClassData, dateTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={editedClassData.numberOfStudents}
                onChange={(e) => setEditedClassData({ ...editedClassData, numberOfStudents: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Action buttons */}
              <div className="flex justify-between mt-4">
                <button 
                  type="button" 
                  onClick={() => setOpen(false)} 
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditClass;
