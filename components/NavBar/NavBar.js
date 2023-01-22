import React from 'react';

const NavBar = () => {
  return(
    <div className="flex-1 flex flex-col">
      <nav className="px-4 flex justify-center h-16 bg-gradient-to-r from-red-600 via-white to-blue-700">
        <ul className="flex items-center">
          <li>
            <h1 className="font-bold text-3xl text-black">Grateful ⚡️ Ipsum</h1>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;