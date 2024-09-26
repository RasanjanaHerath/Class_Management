import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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
};

interface DeleteClassProps {
  className: string; // Class name for confirmation display
  onDelete: () => void; // Function to handle deletion
}

const DeleteClass: React.FC<DeleteClassProps> = ({ className, onDelete }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleDelete = (): void => {
    onDelete(); // Call the delete function
    handleClose(); // Close modal after deletion
  };

  return (
    <div>
      <Button
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        onClick={handleOpen}
      >
        Delete Class
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="font-bold mb-4">
            Delete Class
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the class <strong>{className}</strong>? This action cannot
            be undone.
          </Typography>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteClass;
