import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const AssignmentSubmissions = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      <div className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Assignment Submissions</h2>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Student Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Assignment Title</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Date Submitted</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-right">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">John Doe</td>
                  <td className="py-2 px-4 border-b border-gray-200">Math Homework</td>
                  <td className="py-2 px-4 border-b border-gray-200">12 Feb 2023</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-right">A</td>
                </tr>
                {/* Additional rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
