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
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

let userItem = localStorage.getItem("user");
const user = userItem ? JSON.parse(userItem) : null;

const TeacherDetails = () => {
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/institute/classes/user/${user.id}`
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Open and close modals
  const handleOpenUpdateModal = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedTeacher(null);
    setOpenUpdateModal(false);
  };

  const handleOpenDeleteModal = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTeacher(null);
    setOpenDeleteModal(false);
  };

  // Handle update
  const handleUpdateTeacher = async (event) => {
    event.preventDefault();
    console.log(selectedTeacher);
    try {
      const updatedTeacher = {
        name: selectedTeacher.name,
        subjects: selectedTeacher.subjects,
        nic: selectedTeacher.nic,
        phoneNumber: selectedTeacher.phoneNumber,
      };
      await axios.put(
        `http://localhost:3000/api/teacher/update/${selectedTeacher.teacherId}`,
        updatedTeacher
      );
      fetchClasses();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  // Handle delete
  const handleDeleteTeacher = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/teacher/delete/${selectedTeacher.teacherId}`
      );
      fetchClasses();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <Typography variant="h4" className="text-center mb-6 font-bold">
        Teacher Details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Teacher Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Teacher Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                NIC
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher?.teacherId || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher?.name || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher?.subjects || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher?.nic || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {classItem.teacher?.phoneNumber || "-"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenUpdateModal(classItem.teacher)}
                    sx={{
                      backgroundColor: "#017388",
                      borderRadius: "20px",
                      marginRight: 1,
                      "&:hover": { backgroundColor: "#016377" },
                    }}
                  >
                    <FaEdit style={{ marginRight: 5 }} />
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteModal(classItem.teacher)}
                    sx={{
                      backgroundColor: "#DB4437",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#C33A2C" },
                    }}
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
          <Typography variant="h6" mb={2}>
            Update Teacher
          </Typography>
          <form onSubmit={handleUpdateTeacher}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={selectedTeacher?.name || ""}
              onChange={(e) =>
                setSelectedTeacher({ ...selectedTeacher, name: e.target.value })
              }
            />
            <TextField
              label="Subjects"
              fullWidth
              margin="normal"
              value={selectedTeacher?.subjects || ""}
              onChange={(e) =>
                setSelectedTeacher({
                  ...selectedTeacher,
                  subjects: e.target.value,
                })
              }
            />
            <TextField
              label="NIC"
              fullWidth
              margin="normal"
              value={selectedTeacher?.nic || ""}
              onChange={(e) =>
                setSelectedTeacher({ ...selectedTeacher, nic: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={selectedTeacher?.phoneNumber || ""}
              onChange={(e) =>
                setSelectedTeacher({
                  ...selectedTeacher,
                  phoneNumber: e.target.value,
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
          <Typography variant="h6" mb={2} color="error">
            Confirm Deletion
          </Typography>
          <Typography mb={3}>
            Are you sure you want to delete this teacher?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteTeacher}
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

export default TeacherDetails;
