// import React, { useState } from "react";

// const Reports = () => {
//   const [institutes, setInstitutes] = useState([
//     "Institute A",
//     "Institute B",
//     "Institute C",
//   ]);
//   const [classes, setClasses] = useState([
//     "Class 1",
//     "Class 2",
//     "Class 3",
//   ]);
//   const [students, setStudents] = useState([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alice Brown" },
//   ]);

//   const [selectedInstitute, setSelectedInstitute] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const handleSelectInstitute = (institute) => {
//     setSelectedInstitute(institute);
//     setSelectedClass(null);
//     setSelectedStudent(null);
//   };

//   const handleSelectClass = (cls) => {
//     setSelectedClass(cls);
//     setSelectedStudent(null);
//   };

//   const handleSelectStudent = (student) => {
//     setSelectedStudent(student);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
//       <div className="flex-grow p-4">
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold mb-4">Reports</h2>

//           {/* Institute Selection */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Select Institute</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {institutes.map((institute, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSelectInstitute(institute)}
//                   className={`p-3 rounded-lg border text-center hover:bg-blue-100 ${
//                     selectedInstitute === institute ? "bg-blue-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {institute}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Class Selection */}
//           {selectedInstitute && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Select Class</h3>
//               <div className="grid grid-cols-3 gap-4">
//                 {classes.map((cls, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSelectClass(cls)}
//                     className={`p-3 rounded-lg border text-center hover:bg-green-100 ${
//                       selectedClass === cls ? "bg-green-200" : "bg-gray-100"
//                     }`}
//                   >
//                     {cls}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Student Selection */}
//           {selectedClass && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Select Student</h3>
//               <div className="grid grid-cols-3 gap-4">
//                 {students.map((student) => (
//                   <button
//                     key={student.id}
//                     onClick={() => handleSelectStudent(student)}
//                     className={`p-3 rounded-lg border text-center hover:bg-yellow-100 ${
//                       selectedStudent === student ? "bg-yellow-200" : "bg-gray-100"
//                     }`}
//                   >
//                     {student.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Student Report */}
//           {selectedStudent && (
//             <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//               <h3 className="text-lg font-semibold mb-4">
//                 Student Report: {selectedStudent.name}
//               </h3>
//               <p><strong>Attendance:</strong> 95%</p>
//               <p><strong>Fees:</strong> Paid</p>
//               <p><strong>Assignment Submissions:</strong> 8/10</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reports;

import React, { useState } from "react";

const Reports = () => {
  const [institutes, setInstitutes] = useState([
    "Institute A",
    "Institute B",
    "Institute C",
  ]);
  const [classes, setClasses] = useState([
    "Class 1",
    "Class 2",
    "Class 3",
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Brown" },
  ]);

  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSelectInstitute = (institute) => {
    setSelectedInstitute(institute);
    setSelectedClass(null);
    setSelectedStudent(null);
    setSearchQuery("");
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setSelectedStudent(null);
    setSearchQuery("");
    setFilteredStudents(students); // Reset filtered students
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredStudents(
      students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen md:ml-64 ml-0">
      <div className="flex-grow p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Reports</h2>

          {/* Institute Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Institute</h3>
            <div className="grid grid-cols-3 gap-4">
              {institutes.map((institute, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectInstitute(institute)}
                  className={`p-3 rounded-lg border text-center hover:bg-blue-100 ${
                    selectedInstitute === institute ? "bg-blue-200" : "bg-gray-100"
                  }`}
                >
                  {institute}
                </button>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          {selectedInstitute && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Class</h3>
              <div className="grid grid-cols-3 gap-4">
                {classes.map((cls, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectClass(cls)}
                    className={`p-3 rounded-lg border text-center hover:bg-green-100 ${
                      selectedClass === cls ? "bg-green-200" : "bg-gray-100"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Student Search and Selection */}
          {selectedClass && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Search and Select Student</h3>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search student by name"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="grid grid-cols-3 gap-4">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className={`p-3 rounded-lg border text-center hover:bg-yellow-100 ${
                      selectedStudent === student ? "bg-yellow-200" : "bg-gray-100"
                    }`}
                  >
                    {student.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Student Report */}
          {selectedStudent && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Student Report: {selectedStudent.name}
              </h3>
              <p><strong>Attendance:</strong> 95%</p>
              <p><strong>Fees:</strong> Paid</p>
              <p><strong>Assignment Submissions:</strong> 8/10</p>

              <div className="mt-6">
                <h4 className="text-md font-semibold mb-2">Graphical Representation</h4>
                <div className="h-48 bg-gray-200 rounded-lg">
                  {/* Placeholder for charts */}
                  <p className="text-center pt-20">Chart goes here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
