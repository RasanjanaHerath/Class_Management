import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Importing FontAwesome delete icon

const BASE_URL = "http://localhost:3000/api/";

const StudentProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const user = localStorage.getItem("user");

  // Selection states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Available options states
  const [availableCities, setAvailableCities] = useState([]);
  const [availableInstitutes, setAvailableInstitutes] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);

  const [classes, setClasses] = useState([]);
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}class/get-all`);
        const validClasses = response.data.filter(
          (cls) => cls && cls.institute && cls.institute.city && cls.institute.id
        );
        setClasses(validClasses);

        const uniqueCities = [
          ...new Set(
            validClasses.map((cls) => cls.institute?.city).filter((city) => city)
          ),
        ];
        setAvailableCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchMyClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}class_card/get-all-my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyClasses(response.data);
      } catch (error) {
        console.error("Error fetching my classes:", error);
      }
    };

    fetchClasses();
    fetchMyClasses();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const filteredInstitutes = classes
        .filter((cls) => cls.institute?.city === selectedCity)
        .map((cls) => ({
          id: cls.institute?.id,
          name: cls.institute?.name || `Institute ${cls.institute?.id}`,
        }));

      const uniqueInstitutes = Array.from(
        new Map(filteredInstitutes.map((item) => [item.id, item])).values()
      );
      setAvailableInstitutes(uniqueInstitutes);
      setSelectedInstitute("");
      setSelectedClass("");
      setSelectedTeacher("");
    }
  }, [selectedCity, classes]);

  useEffect(() => {
    if (selectedInstitute) {
      const filteredClasses = classes.filter(
        (cls) => cls.institute?.id?.toString() === selectedInstitute
      );
      setAvailableClasses(filteredClasses);
      setSelectedClass("");
      setSelectedTeacher("");
    }
  }, [selectedInstitute, classes]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (selectedClass) {
        console.log(selectedClass);
        const result = await axios.get(`http://localhost:3000/api/class/get-teachers-by-class/${selectedClass}`);
        console.log(result.data);
        setAvailableTeachers(result.data.user.firstName);
      }
    };
    fetchTeachers();
  }, [selectedClass, availableClasses]);

  const handleEnroll = () => {
    setSelectedTeacher(availableTeachers);
    if (selectedCity && selectedInstitute && selectedClass && selectedTeacher) {
      const token = localStorage.getItem("token");
      const data = { classId: parseInt(selectedClass) };

      axios
        .post(`${BASE_URL}class_card/create`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Enrolled successfully!");
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error enrolling in class:", error);
        });
    } else {
      alert("Please complete all selections before enrolling.");
    }
  };

  const handleDelete = (classCardId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(`${BASE_URL}class_card/delete/${classCardId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setMyClasses((prevClasses) =>
            prevClasses.filter((cls) => cls.id !== classCardId)
          );
          alert("Class deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting class:", error);
        });
    }
  };

  const cardColors = ["bg-yellow-200", "bg-blue-300", "bg-green-300", "bg-red-200", "bg-purple-300"];

  return (
    <div className="flex min-h-screen bg-gray-100 gap-10 p-4 md:ml-64 ml-0">
      {/* Main Section */}
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome {user ? JSON.parse(user).firstName : "Guest"}
        </h2>

        <div className="text-center mb-4">
          <button
            className="bg-blue-500 text-white py-4 px-6 rounded-md text-lg font-semibold hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Enroll in Course
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {myClasses.map(
            (cls, index) =>
              cls &&
              cls.classObject &&
              cls.classObject.institute && (
                <div
                  key={cls.id}
                  className={`w-full ${cardColors[index % cardColors.length]} p-4 rounded-lg shadow-md hover:bg-gray-300 relative`}
                >
                  <button
                    className="absolute bottom-2 right-2 text-red-400 hover:text-red-700"
                    onClick={() => handleDelete(cls.id)}
                  >
                    <FaTrashAlt />
                  </button>
                  {cls.classObject.institute.city} <br />
                  {cls.classObject.institute.name} <br />
                  {cls.classObject.subject} - Grade {cls.classObject.grade}
                </div>
              )
          )}
        </div>
      </div>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enroll in a Course</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select City:
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="">Choose City</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Institute:
              </label>
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedCity}
              >
                <option value="">Choose Institute</option>
                {availableInstitutes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Class:
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedInstitute}
              >
                <option value="">Choose Class</option>
                {availableClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.subject} - Grade {cls.grade} ({cls.scheduleDay}{" "}
                    {cls.startTime}-{cls.endTime})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Teacher:
              </label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                disabled={!selectedClass}
              >
                <option value="">Choose Teacher</option>
                {/* {availableTeachers.map((teacher,index) => (
                  <option key={index} value={teacher}>
                    {teacher.name}
                  </option>
                ))} */}
                <option value={availableTeachers}>{availableTeachers}</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleEnroll}
                disabled={!selectedTeacher}
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
