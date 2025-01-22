import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import insta from "../assets/insta.png";
import fb from "../assets/facebook.webp";
import whatsapp from "../assets/whatsapp.png";
import twitter from "../assets/twitter.webp";
import linkedin from "../assets/linkedin.webp";


const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Help & Support</h1>
        <p className="text-gray-600 mb-6 text-2xl">
          Need assistance? Check our FAQs below or connect with us on social media. We're here to help!
        </p>

        <hr />

        <h2 className="text-4xl font-semibold text-gray-800 mb-3">Frequently Asked Questions</h2>
        <ul className="mb-6">
          <li className="mb-3">
            <strong className="text-gray-800">Q: How can I reset my password?</strong>
            <p className="text-gray-600">A: Go to the login page, click "Forgot Password," and follow the instructions.</p>
          </li>
          <li className="mb-3">
            <strong className="text-gray-800">Q: How do I contact support?</strong>
            <p className="text-gray-600">A: Use the form below or email us at ClassMaster@gmail.com.</p>
          </li>
          <li className="mb-3">
            <strong className="text-gray-800">Q: What are your support hours?</strong>
            <p className="text-gray-600">A: Our team is available Monday through Friday, 9 AM to 6 PM (GMT).</p>
          </li>
        </ul>

        <hr />

        <div className="mb-4 mt-6">
                  <h2 className="text-xl text-center font-bold text-gray">Follow Us</h2>
                  <div className="flex justify-center space-x-6 mt-2">
                    {/* Social Media Icons as Images */}
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:text-blue-400"
                    >
                      <img
                        src={twitter}
                        alt="User"
                        className="w-10 h-10 rounded-full border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
                      />            
                    </a>
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:text-blue-400"
                    >
                      <img
                        src={fb}
                        alt="User"
                        className="w-10 h-10 rounded-full border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
                      />            
                    </a>
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:text-blue-400"
                    >
                      <img
                          src={insta}
                          alt="User"
                          className="w-10 h-10 rounded-full border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
                      />           
                   </a>
                    <a
                      href="https://linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:text-blue-400"
                    >
                      <img
                        src={linkedin}
                        alt="User"
                        className="w-10 h-10 rounded-full border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
                      />            
                    </a>
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:text-blue-400"
                    >
                    <img
                      src={whatsapp}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer hover:opacity-80 transition duration-300"
                    />            
                    </a>
                  </div>
                </div>

      </div>
    </div>
  )
}

export default HelpSupport;

