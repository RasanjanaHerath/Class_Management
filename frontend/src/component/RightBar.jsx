import React from 'react'

const RightBar = () => {
  return (
    <div >
        <div className="text-center mb-6">
              <img src={profilePicture} alt="Teacher" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="font-bold text-lg">Theresa Flores</h4>
              <p className="text-gray-500">Senior Teacher at Tiger School</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Hello, my name is Theresa Flores. I come from Australia. I graduated from DoMi and got a PhD degree. My major is Academic Studies. I have 4 years of teaching experience.
              </p>
            </div>
            <div className="mb-6">
              <p className="font-bold">Contact Information</p>
              <p className="text-gray-700">theresaflores@voit.team</p>
              <p className="text-gray-700">+1 (000) 000 0000</p>
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="font-bold">Open to work</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg transition transform hover:scale-105">
                Manage Subscriptions
              </button>
            </div>
    </div>
  )
}

export default RightBar