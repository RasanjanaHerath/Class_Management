import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

const NewClass = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({
    instituteName: '',
    subject: '',
    batch: '',
    grade: '',
    dateTime: '',
    teacherName: '',
    feePerMonth: '',
    teacherExperience: '',
    numberOfStudents: '',
    teacherContactPhoneNumber: '',
    modeOfTeaching: '',
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(newClassData);
  //   setOpen(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate date
    const dateTime = new Date(newClassData.dateTime);
    if (isNaN(dateTime)) {
      alert('Please provide a valid date and time.');
      return;
    }
  
    onSubmit({
      ...newClassData,
      dateTime: dateTime.toISOString(), // Ensure date is in a proper format
    });

    
  };
  

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Add New
      </button>
      <Modal open={open} onClose={handleCancel}>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Institute Name"
                value={newClassData.instituteName}
                onChange={(e) => setNewClassData({ ...newClassData, instituteName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newClassData.subject}
                onChange={(e) => setNewClassData({ ...newClassData, subject: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Batch"
                value={newClassData.batch}
                onChange={(e) => setNewClassData({ ...newClassData, batch: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Grade"
                value={newClassData.grade}
                onChange={(e) => setNewClassData({ ...newClassData, grade: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Date & Time"
                value={newClassData.dateTime}
                onChange={(e) => setNewClassData({ ...newClassData, dateTime: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Teacher Name"
                value={newClassData.teacherName}
                onChange={(e) => setNewClassData({ ...newClassData, teacherName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Fee per Month"
                value={newClassData.feePerMonth}
                onChange={(e) => setNewClassData({ ...newClassData, feePerMonth: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Teacher Experience (years)"
                value={newClassData.teacherExperience}
                onChange={(e) => setNewClassData({ ...newClassData, teacherExperience: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Number of Students"
                value={newClassData.numberOfStudents}
                onChange={(e) => setNewClassData({ ...newClassData, numberOfStudents: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Teacher Contact Phone Number"
                value={newClassData.teacherContactPhoneNumber}
                onChange={(e) => setNewClassData({ ...newClassData, teacherContactPhoneNumber: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Mode of Teaching"
                value={newClassData.modeOfTeaching}
                onChange={(e) => setNewClassData({ ...newClassData, modeOfTeaching: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewClass;
