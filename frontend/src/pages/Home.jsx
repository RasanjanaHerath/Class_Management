import React from 'react';
import homePageImage from '../assets/homePageImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const features = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>,
    title: 'Powerful Learning Management System',
    description: 'Outstanding features for highly customizable Courses, Units, Lessons, and Quizzes',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
  </svg>
  ,
    title: 'Effortlessly Manage Courses',
    description: 'User-friendly Course Management Powered by Masterstudy LMS Plugin',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  , 
    title: 'Easily Sell Courses Online',
    description: 'Enjoy the flexibility of education WordPress theme and easily manage online sales.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
  , 
    title: '24/7 Professional Support',
    description: 'We care about our customers and provide free 24/7 support. Ask your questions via Ticket System.',
  },
];

const categories = [
  {
    title: 'Our Mission',
    description: 'Our mission is simple yet ambitious: to enhance learning outcomes, streamline administrative tasks, and foster collaboration within the educational community. We strive to create a seamless and efficient platform that supports the diverse needs of tuition classes, while promoting engagement, accountability, and success for every student.',
    color: 'text-yellow-300',
  },
  {
    title: 'What We Offer',
    description: 'With ClassMaster, teachers can easily mark attendance, manage class schedules, assign homework, and grade assignments—all from one convenient platform. Administrators can set class fees, generate reports, and ensure smooth operations, while parents can stay informed about their childs progress and participation.',
    color: 'text-pink-400',
  },
  {
    title: 'Online Platform',
    description: 'Build a universal online learning platform for everyone and provide an exceptional experience.',
    color: 'text-blue-400',
  },
];

const Home = () => {
  return (
    <div className="grid grid-cols-1 bg-gray-100 min-h-screen">
      <main className="flex flex-col items-center justify-center text-center py-16 px-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="mt-44">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-pink-500">Class Master</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Empowering Education, Connecting Communities.
            </p>
            <div className="flex justify-center">
              <div className="p-4">
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
                  style={{ minWidth: '140px', lineHeight: '36px', letterSpacing: '.3px' }}
                >
                  Sign In
                </button>
              </div>
              <div className="p-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
                  style={{ minWidth: '140px', lineHeight: '36px', letterSpacing: '.3px' }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="container mx-auto py-8">
            <div className="flex justify-center">
              <img src={homePageImage} alt="Illustration" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      </main>

      <section className="bg-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-10 text-center mb-12 p-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Class Master is the best choice for everyone!
              </h2>
            </div>
            <div>
              <p className="text-lg">
              At ClassMaster, we believe that education is the cornerstone of a brighter future. 
              Our platform is designed to revolutionize the way tuition classes are managed, empowering students, teachers, administrators, and parents alike.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {categories.map((category, index) => (
              <div key={index} className="p-4">
                <h3 className={`text-2xl font-semibold mb-4 ${category.color}`}>
                  {category.title}
                </h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;


