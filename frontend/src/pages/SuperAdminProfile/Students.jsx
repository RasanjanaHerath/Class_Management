import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";

const InstituteTable = () => {
  const data = [
    { name: "madhawa", phone: "0774148826", city: "dambulla" },
    { name: "janith", phone: "0224565253", city: "ampara" },
  ];

  const handleUpdate = (name) => {
    alert(`${name} updated.`);
  };

  const handleViewDetails = (name) => {
    alert(`Viewing details for ${name}.`);
  };

  const handleDelete = (name) => {
    alert(`${name} deleted.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64 mr-8">
    <div className="text-center mb-12">
        <Typography variant="h4" className="text-gray-700">
          Student Management
        </Typography>
        <p>
     
    </p>
      </div>
      <TableContainer component={Paper} sx={{ margin: "20px", borderRadius: "10px" }}>
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
              Institute Name
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
              City
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
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                {row.name}
              </TableCell>
              <TableCell sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                {row.phone}
              </TableCell>
              <TableCell sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                {row.city}
              </TableCell>
              <TableCell sx={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(row.name)}
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
                  onClick={() => handleViewDetails(row.name)}
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
                  onClick={() => handleDelete(row.name)}
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
    </div>
  );
};

export default InstituteTable;
