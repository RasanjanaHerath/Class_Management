import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert } from '@mui/material';

const Institutes = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [instituteName, setInstituteName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({
    instituteName: '',
    email: '',
    city: ''
  });
  const [creationRequests, setCreationRequests] = useState([
    { instituteName: 'Institute A', email: 'a@institute.com', city: 'City A' },
    { instituteName: 'Institute B', email: 'b@institute.com', city: 'City B' },
  ]);
  const [approvedInstitutes, setApprovedInstitutes] = useState([
    { instituteName: 'Institute X', email: 'x@institute.com', city: 'City X' },
  ]);
  const [rejectedInstitutes, setRejectedInstitutes] = useState([
    { instituteName: 'Institute Y', email: 'y@institute.com', city: 'City Y' },
  ]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCreateInstitute = () => {
    let valid = true;
    const newErrors = { instituteName: '', email: '', city: '' };

    // Validate institute name
    if (!instituteName) {
      newErrors.instituteName = 'Institute name is required';
      valid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Validate city
    if (!city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    // If form is valid, submit the form
    if (valid) {
      const newInstitute = { instituteName, email, city };
      setApprovedInstitutes([...approvedInstitutes, newInstitute]);

      // Reset form fields
      setInstituteName('');
      setEmail('');
      setCity('');
      setErrors({ instituteName: '', email: '', city: '' }); // Reset errors

      // Set snackbar message and show it
      setSnackbarMessage(`Institute ${instituteName} is created..!`);
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

    // Show approval Snackbar
    setSnackbarMessage(`Institute ${approved.instituteName} is approved!`);
    setOpenSnackbar(true);
  };

  const handleReject = (index) => {
    const rejected = creationRequests[index];
    setRejectedInstitutes([...rejectedInstitutes, rejected]);
    const updatedRequests = creationRequests.filter((_, i) => i !== index);
    setCreationRequests(updatedRequests);

    // Show rejection Snackbar
    setSnackbarMessage(`Institute ${rejected.instituteName} is rejected!`);
    setOpenSnackbar(true);
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <Tab label="Rejected Institutes" />
        </Tabs>
      </Box>

      {/* Institute Creation Form for Super Admin */}
      {selectedTab === 0 && (
        <Paper className="p-6 rounded-lg shadow-lg bg-white">
          <Typography variant="h6" className="mb-4 text-center">Create New Institute</Typography>
          <TextField
            label="Institute Name"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            fullWidth
            className="mb-3"
            error={Boolean(errors.instituteName)}
            helperText={errors.instituteName}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className="mb-3"
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            className="mb-3 "
            error={Boolean(errors.city)}
            helperText={errors.city}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleCreateInstitute}
            fullWidth
            sx={{
              backgroundColor: '#2d3748', // Matches the gray color from the drawer (bg-gray-800)
              borderRadius: '10px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'none',
              transition: 'all 0.3s ease-in-out',

              // Hover effects
              '&:hover': {
                backgroundColor: '#4a5568',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              },

              // Focused state
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 10px rgba(63, 81, 181, 0.6)',
              },
            }}
          >
            Create Institute
          </Button>

        </Paper>
      )}

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
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Institute Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creationRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: 'center' }}>{request.instituteName}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{request.email}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{request.city}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(index)}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#388e3c',
                            },
                            marginRight: '8px',
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(index)}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#d32f2f',
                            },
                          }}
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
        <h3 className="text-xl font-medium font-bold mb-4">Institute List :</h3>
        {/* Display Approved Institutes */}
        <Paper className="p-4 bg-white rounded-lg shadow-lg">
          {approvedInstitutes.length === 0 ? (
            <Typography variant="body1">No approved institutes yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Institute Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedInstitutes.map((institute, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.instituteName}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.email}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.city}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <h3 className="text-xl font-medium mb-4">Rejected Institutes :</h3>
        {/* Display Rejected Institutes */}
        <Paper className="p-4 bg-white rounded-lg shadow-lg">
          {rejectedInstitutes.length === 0 ? (
            <Typography variant="body1">No rejected institutes yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Institute Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2d3748', textAlign: 'center' }}>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rejectedInstitutes.map((institute, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.instituteName}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.email}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{institute.city}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </TabPanel>

      {/* Snackbar for Success Message */}
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

// TabPanel Component to handle the individual tab content
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
