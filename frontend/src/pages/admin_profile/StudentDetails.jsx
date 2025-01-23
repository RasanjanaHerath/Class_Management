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

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/institute/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Open and close modals
  const handleOpenUpdateModal = (student) => {
    setSelectedStudent(student);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedStudent(null);
    setOpenUpdateModal(false);
  };

  const handleOpenDeleteModal = (student) => {
    setSelectedStudent(student);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedStudent(null);
    setOpenDeleteModal(false);
  };

  // Handle update
  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const updatedStudent = {
        name: selectedStudent.user.firstName,
        email: selectedStudent.user.email,
        phone: selectedStudent.telephone,
      };
      await axios.put(
        `http://localhost:3000/api/students/update/${selectedStudent.id}`,
        updatedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchStudents();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Handle delete
  const handleDeleteStudent = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3000/api/student/delete/${selectedStudent.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchStudents();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    (student.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <Typography variant="h4" className="text-center mb-6 font-bold">
        Student Details
      </Typography>

      <Box className="mb-6 flex justify-between items-center">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "40%" }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Grade
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={{ textAlign: "center" }}>{student.id}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {student.user.firstName} {student.user.lastName}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {student.user.email}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {student.telephone}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {student.age-6}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenUpdateModal(student)}
                    sx={{
                      backgroundColor: "#017388",
                      borderRadius: "20px",
                      marginRight: "10px",
                      "&:hover": { backgroundColor: "#016377" },
                    }}
                  >
                    <FaEdit style={{ marginRight: 5 }} />
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteModal(student)}
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
            Update Student
          </Typography>
          <form onSubmit={handleUpdateStudent}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={selectedStudent?.name || ""}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={selectedStudent?.email || ""}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  email: e.target.value,
                })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              value={selectedStudent?.phone || ""}
              onChange={(e) =>
                setSelectedStudent({
                  ...selectedStudent,
                  phone: e.target.value,
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
          <Typography variant="h6" mb={2} color="error" align="center">
            Confirm Deletion
          </Typography>
          <Typography mb={3}>
            Are you sure you want to delete this student?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteStudent}
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

export default StudentDetails;
