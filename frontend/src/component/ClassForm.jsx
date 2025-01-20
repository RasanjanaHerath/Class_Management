import React from "react";

const ClassForm = ({ formData, handleChange, handleSave, togglePopup, isEditing, institutes }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Class" : "Add Class"}
        </h2>
        <form>
          <label className="block mb-2">
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Grade:
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Institute:
            <select
              name="instituteId"
              value={formData.instituteId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Institute</option>
              {institutes.map((institute) => (
                <option key={institute.id} value={institute.id}>
                  {institute.user.firstName}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Schedule Day:
            <input
              type="text"
              name="scheduleDay"
              value={formData.scheduleDay}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            End Time:
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Fee Per Month:
            <input
              type="number"
              name="feePerMonth"
              value={formData.feePerMonth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <label className="block mb-2">
            Number of Students:
            <input
              type="number"
              name="numberOfStudents"
              value={formData.numberOfStudents}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-full mt-4"
          >
            Save
          </button>
          <button
            type="button"
            onClick={togglePopup}
            className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;