import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

const DeleteClass = ({ className, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(); // Trigger the delete action from the parent
    setOpen(false); // Close modal after deleting
  };

  return (
    <div>
      {/* Delete Button */}
      <button 
        onClick={() => setOpen(true)} 
        className="text-red-500 hover:underline"
      >
        Delete
      </button>

      {/* Modal for delete confirmation */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Class</h2>
            <p>
              Are you sure you want to delete the class <strong>{className}</strong>?
            </p>
            
            {/* Buttons for action */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteClass;
