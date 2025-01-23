import React, { useState } from "react";
import axios from "axios";

const InstituteRegistration = () => {
  const [formData, setFormData] = useState({
    phoneNo: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits.";
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Simulating a successful response
        setSnackbarMessage("Institute registered successfully!");
        setOpenSnackbar(true);
        setFormData({ phoneNo: "", city: "" }); // Clear form fields
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 mt-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">
          Register Institute
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-0 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.phoneNo && (
              <p className="mt-1 text-xs text-red-500">{errors.phoneNo}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-0 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-1 px-4 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        {openSnackbar && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstituteRegistration;
