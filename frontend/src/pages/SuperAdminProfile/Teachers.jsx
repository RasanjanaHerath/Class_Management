import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
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
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  FaEdit,
  FaInfoCircle,
  FaTrash,
  FaCheck,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);

  const handleUpdate = (name) => {
    alert(`${name} updated.`);
  };

  const handleViewDetails = (name) => {
    alert(`Viewing details for ${name}.`);
  };

  const handleDelete = (name) => {
    alert(`${name} deleted.`);
  };

  const [approvedInstitutes, setApprovedInstitutes] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [reaload, setReaload] = useState(false);

  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  // const [selectedTab, setSelectedTab] = useState(0);
  // const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenUpdateModal = (institute) => {
    setSelectedInstitute(institute);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedInstitute(null);
  };

  const handleOpenDetailsModal = (institute) => {
    setSelectedInstitute(institute);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedInstitute(null);
  };

  const handleOpenDeleteModal = (index) => {
    setDeleteIndex(index);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setDeleteIndex(null);
  };

  const handleDeleteTeacher = async () => {
    const token = localStorage.getItem("token");

    try {
      // Make API ca
      // ll to delete the teacher

      await axios.delete(
        `http://localhost:3000/api/teacher/delete/${deleteIndex.teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the teacher list after successful deletion
      const updatedTeachers = teachers.filter((_, i) => i !== deleteIndex);
      setTeachers(updatedTeachers);
      // setSnackbarMessage("Teacher deleted successfully!");
      reloadTeachers();
      setOpenSnackbar(true);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      // setSnackbarMessage("Failed to delete teacher.");
      setOpenSnackbar(true);
    }
  };

  const handleUpdateTeacher = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    // Prepare the updated teacher data payload
    const updatedTeacher = {
      firstName: selectedInstitute?.user?.firstName,
      lastName: selectedInstitute?.user?.lastName,
      subjects: selectedInstitute?.subjects,
      nic: selectedInstitute?.nic,
      phoneNumber: selectedInstitute?.phoneNumber,
    };

    console.log(selectedInstitute);

    try {
      // Make API call to update the teacher
      const response = await axios.put(
        `http://localhost:3000/api/teacher/update/${selectedInstitute.teacherId}`,
        updatedTeacher,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
      // setSnackbarMessage("Teacher updated successfully!");
      // setOpenSnackbar(true);
      reloadTeachers();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating teacher:", error);
      // setSnackbarMessage("Failed to update teacher.");
      setOpenSnackbar(true);
    }
  };

  const reloadTeachers = () => {
    setReaload(!reaload);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/teacher/get-all`
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, [reaload]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64 mr-8">
      <div className="text-center mb-12">
        <Typography variant="h4" className="text-gray-700">
          Teacher Management
        </Typography>
        <p></p>
      </div>
      <TableContainer
        component={Paper}
        sx={{ margin: "20px", borderRadius: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                Teacher Id
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                Teacher Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                Subject
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                NIC
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.05rem",
                  color: "#2d3748",
                  textAlign: "center",
                  borderBottom: "2px solid #ccc",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  {row.user?.firstName || "N/A"}{" "}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  {row.user?.lastName || "N/A"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  {row.subjects?.[0] || "N/A"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  {row.nic || "N/A"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  {row.phoneNumber || "N/A"}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenUpdateModal(row)}
                    sx={{
                      backgroundColor: "#017388",
                      borderRadius: "20px",
                      marginRight: "10px",
                      "&:hover": { backgroundColor: "#016377" },
                    }}
                    className="hover:shadow-lg transform hover:scale-105"
                  >
                    <FaEdit style={{ marginRight: "5px" }} />
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDetailsModal(row)}
                    sx={{
                      backgroundColor: "#DBA522",
                      borderRadius: "20px",
                      marginRight: "10px",
                      "&:hover": { backgroundColor: "#D29B1F" },
                    }}
                    className="hover:shadow-lg transform hover:scale-105"
                  >
                    <FaInfoCircle style={{ marginRight: "5px" }} />
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDeleteModal(row)}
                    sx={{
                      backgroundColor: "#DB4437",
                      borderRadius: "20px",
                      "&:hover": { backgroundColor: "#C33A2C" },
                    }}
                    className="hover:shadow-lg transform hover:scale-105"
                  >
                    <FaTrash style={{ marginRight: "5px" }} />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Update Teacher
          </Typography>
          <form onSubmit={handleUpdateTeacher}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={selectedInstitute?.user?.firstName || ""}
              onChange={(e) =>
                setSelectedInstitute({
                  ...selectedInstitute,
                  user: {
                    ...selectedInstitute.user,
                    firstName: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={selectedInstitute?.user?.lastName || ""}
              onChange={(e) =>
                setSelectedInstitute({
                  ...selectedInstitute,
                  user: { ...selectedInstitute.user, lastName: e.target.value },
                })
              }
            />
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={selectedInstitute?.subjects?.[0] || ""}
              onChange={(e) =>
                setSelectedInstitute({
                  ...selectedInstitute,
                  subjects: [e.target.value],
                })
              }
            />
            <TextField
              label="NIC"
              fullWidth
              margin="normal"
              value={selectedInstitute?.nic || ""}
              onChange={(e) =>
                setSelectedInstitute({
                  ...selectedInstitute,
                  nic: e.target.value,
                })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={selectedInstitute?.phoneNumber || ""}
              onChange={(e) =>
                setSelectedInstitute({
                  ...selectedInstitute,
                  phoneNumber: e.target.value,
                })
              }
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                className="hover:shadow-lg transform hover:scale-105"
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#017388",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#016377" },
                }}
              >
                <FaEdit style={{ marginRight: "8px" }} />
                Update
              </Button>
              <Button
                className="hover:shadow-lg transform hover:scale-105"
                variant="contained"
                color="secondary"
                onClick={handleCloseUpdateModal}
                sx={{
                  backgroundColor: "#2d3748",
                  "&:hover": { backgroundColor: "#4b5563" },
                }}
              >
                <FaTimes style={{ marginRight: "8px" }} />
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", m: 4, p: 0 }}
          >
            Teacher Details
          </Typography>
          {selectedInstitute && (
            <Box>
              <Typography variant="body1" sx={{ m: 1 }}>
                <strong>First Name:</strong> {selectedInstitute.user?.firstName}
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                <strong>Last Name:</strong> {selectedInstitute.user?.lastName}
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                <strong>Subject:</strong> {selectedInstitute.subjects?.[0]}
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                <strong>NIC:</strong> {selectedInstitute.nic}
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                <strong>Phone Number:</strong> {selectedInstitute.phoneNumber}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  className="hover:shadow-lg transform hover:scale-105"
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseDetailsModal}
                  sx={{
                    backgroundColor: "#2d3748",
                    "&:hover": { backgroundColor: "#4b5563" },
                  }}
                >
                  <FaTimes style={{ marginRight: "8px" }} />
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", mb: 2, color: "maroon" }}
          >
            Confirm Deletion
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete this teacher?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              className="hover:shadow-lg transform hover:scale-105"
              variant="contained"
              color="error"
              onClick={handleDeleteTeacher}
            >
              <FaCheck style={{ marginRight: "8px" }} />
              OK
            </Button>
            <Button
              className="hover:shadow-lg transform hover:scale-105"
              variant="contained"
              color="secondary"
              onClick={handleCloseDeleteModal}
              sx={{
                backgroundColor: "#2d3748",
                "&:hover": { backgroundColor: "#4b5563" },
              }}
            >
              <FaTimes style={{ marginRight: "8px" }} />
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TeacherTable;
