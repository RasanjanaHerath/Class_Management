import React from 'react'

const Footer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      
      <footer className="bg-pink-500 p-4 text-center text-black">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-950">Contact Us</h2>
          <br />
          <p>Have questions or need assistance? We're here to help!<br />
          Reach out to our friendly support team at <a href="mailto:support@classmaster.com" className="underline">support@classmaster.com</a> or give us a call at 123-456-7890.</p>
        </div>
        
        <div className="mb-4">
          <br />
          <h2 className="text-xl font-bold text-blue-950">Follow Us</h2>
          {/* <div className="flex justify-center space-x-4">
            <a href="#" className="text-2xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-2xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-2xl"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-2xl"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-2xl"><i className="fab fa-whatsapp"></i></a>
          </div> */}


          
        </div>
        
        <div className="mb-4">
          <a href="#" className="underline">Terms of Service</a> | <a href="#" className="underline">Privacy Policy</a>
        </div>
        
        <div>
          <p>&copy; 2024 ClassMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer