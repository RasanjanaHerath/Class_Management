import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Typography,Modal, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Institutes = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({
    phoneNo: '',
    city: ''
  });



  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)

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


  const handleDeleteInstitute = () => {
    // Add logic to delete the institute
    const updatedInstitutes = approvedInstitutes.filter((_, i) => i !== deleteIndex);
    setApprovedInstitutes(updatedInstitutes);
    handleCloseDeleteModal();
  };



  useEffect(() => {
    const fetchUsers = async (users) => {
      // const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/user/institute-users');
      setUsers(response.data);
    }

    const fetchApproved = async (approvedInstitutes) => {
      const response = await axios.get('http://localhost:3000/api/institute/get-all-approved');
      setApprovedInstitutes(response.data);
    }

    const fetchCreationRequests = async (creationRequests) => {
      const response = await axios.get('http://localhost:3000/api/institute/get-all-pending');
      setCreationRequests(response.data);
    }


    fetchApproved();
    fetchCreationRequests();
    fetchUsers();
  }, [])


  const handleCreateInstitute = () => {
    let valid = true;
    const newErrors = { phoneNo: '', city: '' };

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phoneNo) {
      newErrors.phoneNo = 'Phone number is required';
      valid = false;
    } else if (!phonePattern.test(phoneNo)) {
      newErrors.phoneNo = 'Phone number must be 10 digits';
      valid = false;
    }

    // Validate city
    if (!city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    // If form is valid, submit the form
    if (valid) {
      const newInstitute = { phoneNo, city };
      setApprovedInstitutes([...approvedInstitutes, newInstitute]);

      // Reset form fields
      setPhoneNo('');
      setCity('');
      setErrors({ phoneNo: '', city: '' }); // Reset errors

      const token = localStorage.getItem('token');

      const data = {
        phoneNumber: phoneNo,
        city,
        userId: selectedUser
      }

      axios.post('http://localhost:3000/api/institute/create-by-admin', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setSnackbarMessage(`Institute with  is created..!`);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })


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

    const token = localStorage.getItem('token');

    axios.patch(`http://localhost:3000/api/institute/approve/verify/${approved.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })



    // Show approval Snackbar
    setSnackbarMessage(`Institute with phone number ${approved.phoneNo} is approved!`);
    setOpenSnackbar(true);
  };

  const handleReject = (index) => {
    const rejected = creationRequests[index];
    const updatedRequests = creationRequests.filter((_, i) => i !== index);
    setCreationRequests(updatedRequests);

    const token = localStorage.getItem('token');
    console.log(rejected.id)
    axios.patch(`http://localhost:3000/api/institute/approve/reject/${rejected.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Show rejection Snackbar
    setSnackbarMessage(`Institute with phone number ${rejected.phoneNo} is rejected!`);
    setOpenSnackbar(true);
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleUpdateInstitute = (event) => {
    event.preventDefault();
    // Add logic to update the institute details
    handleCloseUpdateModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <div className="text-center mb-6">
        <Typography variant="h4" className="font-semibold text-gray-700">Institute Management</Typography>
      </div>

      {/* MUI Tabs for Navigation */}
      <Box sx={{ width: '100%' }} className="mb-6">
        <Tabs value={selectedTab} onChange={handleTabChange} centered textColor="primary" indicatorColor="primary">
          <Tab label="Creation Requests" />
          <Tab label="Institute List" />
        </Tabs>
      </Box>

      {/* Institute Creation Form for Super Admin */}
      {selectedTab === 0 && (
        <Paper className="p-6 rounded-lg shadow-lg bg-white">
          <Typography variant="h6" className="mb-4 text-center">Create New Institute</Typography>
          <TextField
            label="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            fullWidth
            className="mb-3"
            error={Boolean(errors.phoneNo)}
            helperText={errors.phoneNo}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            className="mb-3"
            error={Boolean(errors.city)}
            helperText={errors.city}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <FormControl
            fullWidth
            className="mb-3"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          >
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser || ''}
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
              backgroundColor: '#2d3748',
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'none',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#4a5568',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)'
              },
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 10px rgba(63, 81, 181, 0.6)'
              }
            }}
          >
            Create Institute
          </Button>
        </Paper>
      )}

      {/* Tab Panels */}

       {/* Tab Panels */}
       <TabPanel value={selectedTab} index={0}>
        <h3 className="text-xl font-medium mb-4">Creation Requests</h3>
        {/* Display Creation Requests */}
        <Paper className="p-4 bg-white rounded-lg shadow-lg">
          {creationRequests.length === 0 ? (
            <Typography variant="body1">No creation requests yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Phone Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creationRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: 'center' }}>{request.phoneNo}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{request.city}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(index)}
                          sx={{ marginRight: '8px' }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(index)}
                        >
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



      <TabPanel value={selectedTab} index={1}>
      <h3 className="text-xl font-medium font-bold mb-4">Institute List:</h3>
      <Paper className="p-4 bg-white rounded-lg shadow-lg">
        {approvedInstitutes.length === 0 ? (
          <Typography variant="body1">No approved institutes yet.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>phoneNo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvedInstitutes.map((institute, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>{institute.phoneNo}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{institute.city}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenUpdateModal(institute)}
                        sx={{ marginRight: '8px' }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => handleOpenDetailsModal(institute)}
                        sx={{ marginRight: '8px' }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDeleteModal(index)}
                      >
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">Update Institute</Typography>
          <form onSubmit={handleUpdateInstitute}>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={selectedInstitute?.phoneNo || ''}
              onChange={(e) => setSelectedInstitute({ ...selectedInstitute, phoneNo: e.target.value })}
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              value={selectedInstitute?.city || ''}
              onChange={(e) => setSelectedInstitute({ ...selectedInstitute, city: e.target.value })}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">Update</Button>
              <Button variant="contained" color="secondary" onClick={handleCloseUpdateModal}>Close</Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">Institute Details</Typography>
          {selectedInstitute && (
            <Box>
              <Typography variant="body1"><strong>Phone Number:</strong> {selectedInstitute.phoneNo}</Typography>
              <Typography variant="body1"><strong>City:</strong> {selectedInstitute.city}</Typography>
              {/* Add more details as needed */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={handleCloseDetailsModal}>Close</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">Confirm Deletion</Typography>
          <Typography variant="body1">Are you sure you want to delete this institute?</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDeleteInstitute}>OK</Button>
            <Button variant="contained" color="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </TabPanel>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
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
