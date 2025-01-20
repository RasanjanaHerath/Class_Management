import React from 'react';
import logo from '../assets/1.png';
import welcome from '../assets/welcome.jpg';
import mission from '../assets/mission.jpg';
import offer from '../assets/offer.jpg';

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-900 p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Welcome Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-6500">Welcome to ClassMaster!</h1>
            <p className="text-lg md:text-xl text-center text-gray-600">
              At ClassMaster, we believe that education is the cornerstone of a brighter future. Our platform is designed to revolutionize the way tuition classes are managed, empowering students, teachers, administrators, and parents alike.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={welcome}
              alt="Welcome"
              className="w-full h-80 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex justify-center items-center">
            <img
              src={mission}
              alt="Mission"
              className="w-full h-80 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-600 text-center">Our Mission</h2>
            <p className="text-lg text-center text-gray-600">
              Our mission is simple yet ambitious: to enhance learning outcomes, streamline administrative tasks, and foster collaboration within the educational community. We strive to create a seamless and efficient platform that supports the diverse needs of tuition classes, while promoting engagement, accountability, and success for every student.
            </p>
          </div>
        </div>

        {/* Offer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-600 text-center">What We Offer</h2>
            <p className="text-lg text-center text-gray-600">
              With ClassMaster, teachers can easily mark attendance, manage class schedules, assign homework, and grade assignments—all from one convenient platform. Administrators can set class fees, generate reports, and ensure smooth operations, while parents can stay informed about their child's progress and participation.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={offer}
              alt="Offer"
              className="w-full h-80 object-cover rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
