import React from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Top part with bg-gradient-to-r from-pink-500 to-gray-800 */}
      <div className="bg-gradient-to-r from-pink-600 via-gray-800 to-gray-800 p-6">
        <footer className="text-center text-white">
          {/* Contact Us Section */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">
              Have questions or need assistance? We're here to help!
              <br />
              Reach out to our friendly support team at{' '}
              <a href="mailto:support@classmaster.com" className="underline text-gray-200 hover:text-gray-100">
                support@classmaster.com
              </a>{' '}
              or give us a call at <span className="font-semibold">123-456-7890</span>.
            </p>
          </div>
        </footer>
      </div>

      {/* Bottom part with bg-gray-900 */}
      <div className="bg-gray-900 p-6">
        {/* Follow Us Section */}
        <div className="mb-4 mt-6">
          <h2 className="text-3xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-6">
            {/* Social Media Icons from react-icons */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white hover:text-blue-400 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white hover:text-blue-400 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white hover:text-pink-400 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white hover:text-blue-400 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-white hover:text-green-400 transition duration-300"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <footer className="text-center text-white bg-gray-800 rounded-lg p-4 mt-6">
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