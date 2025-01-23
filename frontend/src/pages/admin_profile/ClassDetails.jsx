import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ClassDetails = () => {
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/institute/classes/user/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  // Open update modal
  const handleOpenUpdateModal = (classItem) => {
    setSelectedClass(classItem);
    setOpenUpdateModal(true);
  };

  // Close update modal
  const handleCloseUpdateModal = () => {
    setSelectedClass(null);
    setOpenUpdateModal(false);
  };

  // Open delete modal
  const handleOpenDeleteModal = (classItem) => {
    setSelectedClass(classItem);
    setOpenDeleteModal(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setSelectedClass(null);
    setOpenDeleteModal(false);
  };

  // Update class
  const handleUpdateClass = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:3000/api/class/update/${selectedClass.id}`,
        selectedClass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchClasses();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  // Delete class
  async function handleDeleteClass() {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3000/api/class/delete/${selectedClass.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClasses(
        classes.filter((classItem) => classItem.id !== selectedClass.id)
      );
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  // Filter classes based on search term
  const filteredClasses = classes.filter((classItem) =>
    (classItem.subject?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <Typography variant="h4" className="text-center mb-6 font-bold">
        Class Details
      </Typography>

      <div className="flex justify-between mb-6">
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 300 }}
        />
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Teacher Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Batch
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Day
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Start Time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Students
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClasses.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.id}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.subject}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.grade}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.scheduleDay}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.startTime}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.numberOfStudents}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleOpenUpdateModal(classItem)}
                  >
                    <FaEdit style={{ marginRight: 5 }} />
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteModal(classItem)}
                  >
                    <FaTrash style={{ marginRight: 5 }} />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Update Class
          </Typography>
          <form onSubmit={handleUpdateClass}>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={selectedClass?.subject || ""}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, subject: e.target.value })
              }
            />
            <TextField
              label="Grade"
              fullWidth
              margin="normal"
              value={selectedClass?.grade || ""}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, grade: e.target.value })
              }
            />
            <TextField
              label="Day"
              fullWidth
              margin="normal"
              value={selectedClass?.scheduleDay || ""}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  scheduleDay: e.target.value,
                })
              }
            />
            <TextField
              label="Start Time"
              fullWidth
              margin="normal"
              value={selectedClass?.startTime || ""}
              onChange={(e) =>
                setSelectedClass({
                  ...selectedClass,
                  startTime: e.target.value,
                })
              }
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseUpdateModal}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2" mb={2} color="error">
            Confirm Deletion
          </Typography>
          <Typography variant="body1" mb={3}>
            Are you sure you want to delete this class?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClass}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ClassDetails;
