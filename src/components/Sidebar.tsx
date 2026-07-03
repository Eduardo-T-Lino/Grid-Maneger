'use client'; // Say for the Next, this runs in the client browser

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {

  const [isOnline, setIsOnline] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function toggleApiStatus() {
    try {

      if (isOnline) {
        setIsOnline(false);
        return;
      }

      setIsLoading(true);

      const apiURl = `http://localhost:8080/api/pilot`
      const response = await fetch(apiURl);

      if (response.ok) {
        setIsOnline(true);
      }
      else {
        setIsOnline(false);
      }

    } catch (error) {
      console.log('Error in the Search in the API');
      setIsOnline(false);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className=" w-55 h-full bg-header border-r border-gray-700">
      <div id="logo" className="mb-2 mt-2 border-b-2 border-gray-700 p-4 text-center">
        <h1 className="text-xl text-white">Grid<span className=" text-red-500 font-bold">Maneger</span></h1>
      </div>

      <div className=" h-8/9 flex flex-col justify-between">
        <nav className="ml-2 text-gray-300 p-4 mt-2 ">
          <ul className="text-base">
            <li className="mb-3"><Link href="">Dashboard</Link></li>
            <li className="mb-3"><Link href="">Pilots</Link></li>
            <li className="mb-3"><Link href="">Circuits</Link></li>
            <li className="mb-3"><Link href="">FIA Licenses</Link></li>
            <li className="mb-3"><Link href="">Teams</Link></li>
          </ul>
        </nav>

        <div className=" flex items-center gap-2 text-xs text-gray-300 pt-8 pl-6 border-t border-gray-700">
          <span
            className={`w-2 h-2 rounded-full ${isLoading ? 'bg-gray-500' : isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} ></span>
          <button onClick={toggleApiStatus}>
            API {isLoading ? 'Loading...' : isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>
    </aside>
  );
}
