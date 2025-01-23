import React from 'react'
import insta from "../assets/insta.png";
import fb from "../assets/facebook.webp";
import whatsapp from "../assets/whatsapp.png";
import twitter from "../assets/twitter.webp";
import linkedin from "../assets/linkedin.webp";
import logo from "../assets/logo.png";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 md:ml-64">
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-center">
                <img 
                  src={logo} 
                  alt="logo"
                  className="w-64 h-64"
                   
                />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
        <p className="text-gray-600 mb-6 text-2xl">
          Need assistance? Check our FAQs below or connect with us on social media. We're here to help!
        </p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {['Classes', 'Teachers', 'Students', 'Notifications', 'Notices', 'Payments'].map((item, index) => (
            <a 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className={`
                border 
                font-medium 
                py-6 
                px-8 
                rounded-lg 
                shadow-md 
                transition 
                text-lg 
                text-center
                ${index === 0 ? 'border-blue-300 hover:text-black hover:bg-blue-300' : 
                  index === 1 ? 'border-green-300 hover:text-black hover:bg-green-300' : 
                  index === 2 ? 'border-yellow-300 hover:bg-yellow-300 hover:text-black'  : 
                  index === 3 ? 'border-purple-300 hover:bg-purple-300 hover:text-black' : 
                  index === 4 ? 'border-red-300 hover:bg-red-300 hover:text-black' : 
                  'border-teal-300 hover:bg-teal-300'}
                hover:text-white
              `}
            >
              {item}
            </a>
          ))}
        </div>

        <hr className="my-6" />

        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 bg-gray-100">
          <div>
            <ul>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: How can I reset my password?</strong>
                <p className="text-gray-600">A: Go to the login page, click "Forgot Password," and follow the instructions.</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: How do I contact support?</strong>
                <p className="text-gray-600">A: Use the form below or email us at ClassMaster@gmail.com.</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: What are your support hours?</strong>
                <p className="text-gray-600">A: Our team is available Monday through Friday, 9 AM to 6 PM (GMT).</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: Can I change my account type?</strong>
                <p className="text-gray-600">A: Yes, contact our support team to upgrade or change your account type.</p>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: How do I update my profile?</strong>
                <p className="text-gray-600">A: Navigate to 'Profile Settings' and edit your information directly.</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: Is my data secure?</strong>
                <p className="text-gray-600">A: We use industry-standard encryption to protect your personal information.</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: Can I cancel my subscription?</strong>
                <p className="text-gray-600">A: Yes, you can cancel anytime from the 'Billing' section in your account.</p>
              </li>
              <li className="mb-4">
                <strong className="text-gray-800 block mb-1">Q: Do you offer refunds?</strong>
                <p className="text-gray-600">A: Refunds are available within 30 days of purchase. Check our refund policy for details.</p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6" />

        <div className="mb-4 mt-6">
          <h2 className="text-xl text-center font-bold text-gray">Follow Us & Contact Us</h2>
          <div className="flex justify-center space-x-6 mt-2">
            {[
              {src: twitter, alt: 'Twitter', link: 'https://twitter.com/'},
              {src: fb, alt: 'Facebook', link: 'https://facebook.com/'},
              {src: insta, alt: 'Instagram', link: 'https://instagram.com/'},
              {src: linkedin, alt: 'LinkedIn', link: 'https://linkedin.com/'},
              {src: whatsapp, alt: 'WhatsApp', link: 'https://wa.me/1234567890'}
            ].map(({src, alt, link}) => (
              <a key={alt} href={link} target="_blank" rel="noopener noreferrer">
                <img 
                  src={src} 
                  alt={alt} 
                  className="w-10 h-10 rounded-full border border-gray-300 hover:opacity-80 transition" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSupport;

