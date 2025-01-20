import React from 'react';
import insta from "../assets/insta.png";
import fb from "../assets/facebook.webp";
import whatsapp from "../assets/whatsapp.png";
import twitter from "../assets/twitter.webp";
import linkedin from "../assets/linkedin.webp";


const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Top part with bg-pink-500 */}
      <div className="bg-pink-500 p-6">
        <footer className="text-center text-black">
          {/* Contact Us Section */}
          <div>
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
            <br />
            <p>
              Have questions or need assistance? We're here to help!
              <br />
              Reach out to our friendly support team at{' '}
              <a href="mailto:support@classmaster.com" className="underline text-gray-600">
                support@classmaster.com
              </a>{' '}
              or give us a call at <span className="font-semibold">123-456-7890</span>.
            </p>
          </div>
        </footer>
      </div>

      {/* Bottom part with bg-gray-800 */}
      <div className="bg-gray-800 p-6">
        {/* Follow Us Section */}
        <div className="mb-4 mt-6">
          <h2 className="text-xl font-bold text-white">Follow Us</h2>
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

        <footer className="text-center text-white bg-gray-600 rounded-lg p-2 m-2">
          {/* Legal Links Section */}
          <div className="mb-4">
            <a href="#" className="underline hover:text-blue-400">
              Terms of Service
            </a>{' '}
            |{' '}
            <a href="#" className="underline hover:text-blue-400">
              Privacy Policy
            </a>
          </div>

          {/* Copyright Section */}
          <div>
            <p>&copy; 2024 ClassMaster. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
