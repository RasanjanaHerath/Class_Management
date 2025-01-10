import React, { useState } from "react";

const PaymentDetails = () => {
  
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64 md:mr-64">
      <h1 className="text-2xl font-bold mb-6 text-center">Payment Details</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-400 text-white">
            <tr>
              <th className="p-4">Student ID</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Admission Fee</th>
              <th className="p-4">Subject</th>
              <th className="p-4">2 Months Ago Fee</th>
              <th className="p-4">Last Month Fee</th>
              <th className="p-4">Current Month Fee</th>
            </tr>
          </thead>
          {/* <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center border-t">
                <td className="p-4">{student.id}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">LKR {student.admissionFee}</td>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={student.months.twoMonthsAgo}
                    onChange={() => togglePayment(student.id, "twoMonthsAgo")}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={student.months.oneMonthAgo}
                    onChange={() => togglePayment(student.id, "oneMonthAgo")}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={student.months.currentMonth}
                    onChange={() => togglePayment(student.id, "currentMonth")}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
