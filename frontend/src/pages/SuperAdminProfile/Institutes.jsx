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
import { FaEdit, FaInfoCircle, FaTrash, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';


const Institutes = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [firstName, setfirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    phoneNumber: "",
    city: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [approvedInstitutes, setApprovedInstitutes] = useState([]);
  const [creationRequests, setCreationRequests] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

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

  const handleDeleteInstitute = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/institute/delete/${approvedInstitutes[deleteIndex].id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedInstitutes = approvedInstitutes.filter((_, i) => i !== deleteIndex);
      setApprovedInstitutes(updatedInstitutes);
      setSnackbarMessage("Institute deleted successfully!");
      setOpenSnackbar(true);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting institute:", error);
      setSnackbarMessage("Failed to delete institute.");
      setOpenSnackbar(true);
    }
  };

  const handleUpdateInstitute = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const updatedInstitute = {
      firstName: selectedInstitute.firstName,
      phoneNumber: selectedInstitute.phoneNumber,
      city: selectedInstitute.city,
    };

    console.log("fname :" , selectedInstitute.id)

    try {
      const response = await axios.put(
        `http://localhost:3000/api/institute/update/${selectedInstitute.id}`,
        updatedInstitute
      );
      console.log(response);
      setSnackbarMessage("Institute updated successfully!");
      setOpenSnackbar(true);
      handleCloseUpdateModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating institute:", error);
      setSnackbarMessage("Failed to update institute.");
      setOpenSnackbar(true);
    }
  };

  // const handleDeleteInstitute = () => {
  //   // Add logic to delete the institute
  //   const updatedInstitutes = approvedInstitutes.filter(
  //     (_, i) => i !== deleteIndex
  //   );
  //   setApprovedInstitutes(updatedInstitutes);
  //   handleCloseDeleteModal();
  // };

  useEffect(() => {
    const fetchUsers = async (users) => {
      // const token = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:3000/api/user/institute-users"
      );
      setUsers(response.data);
    };

    const fetchApproved = async (approvedInstitutes) => {
      const response = await axios.get(
        "http://localhost:3000/api/institute/get-all-approved"
      );
      setApprovedInstitutes(response.data);
    };

    const fetchCreationRequests = async (creationRequests) => {
      const response = await axios.get(
        "http://localhost:3000/api/institute/get-all-pending"
      );
      setCreationRequests(response.data);
    };

    fetchApproved();
    fetchCreationRequests();
    fetchUsers();
  }, []);

  const handleCreateInstitute = () => {
    let valid = true;
    const newErrors = {  phoneNumber: "", city: "" };

    // Validate phone number
    // const phonePattern = /^[0-9]{10}$/;
    // if (!phoneNumber) {
    //   newErrors.phoneNumber = "Phone number is 22 required";
    //   valid = false;
    // }
    // else if (!phonePattern.test(firstName)) {
    //   newErrors.firstName = 'Phone number must be 10 digits';
    //   valid = false;
    // }
    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!phonePattern.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      valid = false;
    }

    // Validate city
    if (!city) {
      newErrors.city = "City is required";
      valid = false;
    }

    // If form is valid, submit the form
    if (valid) {
      const newInstitute = { phoneNumber, city };
      setApprovedInstitutes([...approvedInstitutes, newInstitute]);

      // Reset form fields
      // setfirstName("");
      setPhoneNumber("");
      setCity("");
      setErrors({  phoneNumber: "", city: "" }); // Reset errors

      const token = localStorage.getItem("token");

      const data = {
        // firstName: firstName,
        phoneNumber: phoneNumber,
        city:city,
        userId: selectedUser,
      };

      axios
        .post("http://localhost:3000/api/institute/create-by-admin", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSnackbarMessage(`Institute with  is created..!`);
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });

      setOpenSnackbar(true);
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };

  const handleApprove = (index) => {
    const approved = creationRequests[index];
    setApprovedInstitutes([...approvedInstitutes, approved]);
    const updatedRequests = creationRequests.filter((_, i) => i !== index);
    setCreationRequests(updatedRequests);

    const token = localStorage.getItem("token");

    axios.patch(
      `http://localhost:3000/api/institute/approve/verify/${approved.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Show approval Snackbar
    setSnackbarMessage(
      `Institute with phone number ${approved.phoneNumber} is approved!`
    );
    setOpenSnackbar(true);
  };

  const handleReject = (index) => {
    const rejected = creationRequests[index];
    const updatedRequests = creationRequests.filter((_, i) => i !== index);
    setCreationRequests(updatedRequests);

    const token = localStorage.getItem("token");
    console.log(rejected.id);
    axios.patch(
      `http://localhost:3000/api/institute/approve/reject/${rejected.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Show rejection Snackbar
    setSnackbarMessage(
      `Institute with phone number ${rejected.phoneNumber} is rejected!`
    );
    setOpenSnackbar(true);
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // const handleUpdateInstitute = (event) => {
  //   event.preventDefault();
  //   // Add logic to update the institute details
  //   handleCloseUpdateModal();
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <div className="text-center mb-4">
        <Typography variant="h4" className="font-semibold text-gray-700">
          Institute Management
        </Typography>
        <p>
     
    </p>
      </div>
   
      {/* MUI Tabs for Navigation */}
      <Box sx={{ width: "100%" }} className="mb-4">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Pending Institutes" />
          <Tab label="Institute List" />
          <Tab label="Create Institute" />
        </Tabs>
      </Box>

      <div className="">
        {/* Institute Creation Form for Super Admin */}
        <div className="ml-2">
          <TabPanel value={selectedTab} index={0}>
            {/* Display Pending Institutes */}
            <Paper className="p-1 bg-white rounded-lg shadow-lg">
              {creationRequests.length === 0 ? (
                <Typography variant="body1">
                  No pending institutes yet.
                </Typography>
              ) : (
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: "none", borderRadius: "20px" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Institute Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Phone Number
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          City
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {creationRequests.map((request, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {request.user?.firstName}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {request.phoneNumber}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {request.city}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleApprove(index)}
                              sx={{
                                marginRight: "15px",
                                borderRadius: "20px",
                                backgroundColor: "#017388",
                              }}
                              className="hover:shadow-lg transform hover:scale-105"
                            >
                              <FaCheck style={{ marginRight: '8px' }} />

                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleReject(index)}
                              sx={{
                                borderRadius: "20px",
                                marginRight: "15px",
                              }}
                              className="hover:shadow-lg transform hover:scale-105"
                            >
                              <FaTimes style={{ marginRight: '8px' }} />

                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </TabPanel>
        </div>
        <div className="ml-2">
          <TabPanel value={selectedTab} index={1}>
            {/* <h3 className="text-xl font-medium font-bold mb-4">Institute List:</h3> */}
            <Paper className="p-0 bg-white rounded-lg shadow-lg">
              {approvedInstitutes.length === 0 ? (
                <Typography variant="body1">
                  No approved institutes yet.
                </Typography>
              ) : (
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: "none", borderRadius: "20px" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Institute Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Phone Number
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          City
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            textAlign: "center",
                            fontSize: "1.05rem",
                            borderBottom: "1px solid #2d3748",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvedInstitutes.map((institute, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {institute.user?.firstName}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {institute.phoneNumber}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            {institute.city}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", borderBottom: "none" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleOpenUpdateModal(institute)}
                              sx={{
                                marginRight: '15px',
                                borderRadius: '20px',
                                backgroundColor: '#017388',
                              }}
                              className="hover:shadow-lg transform hover:scale-105"
                            >
                              <FaEdit style={{ marginRight: '8px' }} />
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              // color="info"
                              onClick={() => handleOpenDetailsModal(institute)}
                              sx={{
                                marginRight: "15px",
                                borderRadius: "20px",
                                backgroundColor: "#DBA522",
                              }}
                              FaclassName="hover:shadow-lg transform hover:scale-105"
                            >
                                <FaInfoCircle style={{ marginRight: '8px' }} />

                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleOpenDeleteModal(index)}
                              sx={{ marginRight: "15px", borderRadius: "20px" }}
                              className="hover:shadow-lg transform hover:scale-105"
                            >
                                <FaTrash style={{ marginRight: '8px' }} />

                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

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
                  Update Institute
                </Typography>
                <form onSubmit={handleUpdateInstitute}>
                  <TextField
                    label="Institute Name"
                    fullWidth
                    margin="normal"
                    value={selectedInstitute?.firstName || ""}
                    onChange={(e) =>
                      setSelectedInstitute({
                        ...selectedInstitute,
                        firstName: e.target.value,
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
                  <TextField
                    label="City"
                    fullWidth
                    margin="normal"
                    value={selectedInstitute?.city || ""}
                    onChange={(e) =>
                      setSelectedInstitute({
                        ...selectedInstitute,
                        city: e.target.value,
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
                        <FaEdit style={{ marginRight: '8px' }} />

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
                      <FaTimes style={{ marginRight: '8px' }} />

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
                  Institute Details
                </Typography>
                {selectedInstitute && (
                  <Box>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      <strong>Name:</strong> {selectedInstitute.user?.firstName}
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      <strong>Phone Number:</strong>{" "}
                      {selectedInstitute.phoneNumber}
                    </Typography>
                    <Typography variant="body1" sx={{ m: 1 }}>
                      <strong>City:</strong> {selectedInstitute.city}
                    </Typography>
                    {/* Add more details as needed */}
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
                        <FaTimes style={{ marginRight: '8px' }} />

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
                  Are you sure you want to delete this institute?
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
                    onClick={handleDeleteInstitute}
                  >
                    <FaCheck style={{ marginRight: '8px' }} />
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
                    <FaTimes style={{ marginRight: '8px' }} />
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          </TabPanel>
        </div>
        <div className="ml-2">
          <TabPanel value={selectedTab} index={2}>
            <Paper className="p-4 rounded-lg shadow-lg bg-white  mx-auto">
              <Typography
                variant="h6"
                className="text-left"
                sx={{ marginBottom: "16px" }}
              >
                Create New Institute
              </Typography>
              {/* <TextField
                label="Institute Name"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                fullWidth
                className="mb-3"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  marginBottom: "16px",
                }}
              /> */}
              <TextField
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                className="mb-3"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  marginBottom: "16px",
                }}
              />
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                className="mb-3"
                error={Boolean(errors.city)}
                helperText={errors.city}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                  marginBottom: "16px",
                }}
              />
              <FormControl
                fullWidth
                className="mb-3"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    marginBottom: "16px",
                  },
                }}
              >
                <InputLabel>Select User</InputLabel>
                <Select
                  value={selectedUser || ""}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  label="Select User"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name || user.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleCreateInstitute}
                fullWidth
                sx={{
                  backgroundColor: "#2d3748",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "none",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#4a5568",
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 10px rgba(63, 81, 181, 0.6)",
                  },
                }}
                className="hover:shadow-lg transform hover:scale-105"
              >
                <FaPlus style={{ marginRight: '8px' }} />
                Create Institute
              </Button>
            </Paper>
          </TabPanel>

        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default Institutes;
