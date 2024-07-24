import React from 'react'
import logo from '../assets/1.png'
import welcome from '../assets/welcome.jpg'
import mission from '../assets/mission.jpg'
import offer from '../assets/offer.jpg'

const About = () => {
  return (
    <div className="bg-white text-white p-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex items-center justify-center">
          <section className="text-center text-black mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to ClassMaster!</h1>
            <p className="text-lg">
              At ClassMaster, we believe that education is the cornerstone of a brighter future. Our platform is designed to revolutionize the way tuition classes are managed, empowering students, teachers, administrators, and parents alike.
            </p>
          </section>
        </div>
        <div className="bg-white">
          <img
            src={welcome}
            alt="Welcome"
            className="w-full h-full rounded-sm"
          />
        </div>
        <div className="bg-white">
          <img
            src={mission}
            alt="Mission"
            className="w-full h-full rounded-sm"
          />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <section className="text-center text-black mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              Our mission is simple yet ambitious: to enhance learning outcomes, streamline administrative tasks, and foster collaboration within the educational community. We strive to create a seamless and efficient platform that supports the diverse needs of tuition classes, while promoting engagement, accountability, and success for every student.
            </p>
          </section>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <section className="text-center text-black">
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <p className="text-lg">
              With ClassMaster, teachers can easily mark attendance, manage class schedules, assign homework, and grade assignments—all from one convenient platform. Administrators can set class fees, generate reports, and ensure smooth operations, while parents can stay informed about their child's progress and participation.
            </p>
          </section>
        </div>
        <div className="bg-white">
          <img
            src={offer}
            alt="Offer"
            className="w-full h-full rounded-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default About
