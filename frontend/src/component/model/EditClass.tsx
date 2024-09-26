import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

interface ClassData {
  instituteName: string;
  subject: string;
  batch: string;
  grade: string;
  day: string;
  time: string;
  teacherName: string;
  fee: number;
  experience: string;
  students: number;
  phone: string;
  mode: string;
}

interface EditClassProps {
  classData: ClassData;
  onSubmit: (updatedData: ClassData) => void;
}

const EditClass: React.FC<EditClassProps> = ({ classData, onSubmit }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<ClassData>(classData);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData); // Pass the updated data to the parent component
    handleClose(); // Close modal after submission
  };

  return (
    <div>
      <Button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        onClick={handleOpen}
      >
        Edit Class
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-bold mb-4">Edit Class Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Institute Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Institute Name</label>
              <input
                type="text"
                name="instituteName"
                // value={formData.instituteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                // value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Batch */}
            <div className="mb-4">
              <label className="block text-gray-700">Batch</label>
              <input
                type="text"
                name="batch"
                // value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Grade */}
            <div className="mb-4">
              <label className="block text-gray-700">Grade</label>
              <input
                type="text"
                name="grade"
                // value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date and Time */}
            <div className="mb-4">
              <label className="block text-gray-700">Date & Time</label>
              <div className="flex gap-2">
                <select
                  name="day"
                //   value={formData.day}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
                <input
                  type="time"
                  name="time"
                //   value={formData.time}
                  onChange={handleChange}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Teacher Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Teacher Name</label>
              <input
                type="text"
                name="teacherName"
                // value={formData.teacherName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fee per Month */}
            <div className="mb-4">
              <label className="block text-gray-700">Fee per Month</label>
              <input
                type="number"
                name="fee"
                // value={formData.fee}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Additional fields can be filled in the same way */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
    // <div>test</div>
  );
};

export default EditClass;
