import './App.css';
import React, { useEffect, useState } from 'react';
import Play from './pages/Play';
import Home from './pages/Home';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 480); // breakpoint width for phones 

  useEffect(()=>{  // this useEffect is for checking if the user's screen width changes.
    function updateIsPhone(){
      setIsPhone(window.innerWidth<=480);
    }
    window.addEventListener("resize", updateIsPhone);
    return()=>{
      window.removeEventListener("resize", updateIsPhone);
    };

  }, [])
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/albummatchup" element={<Home isPhone={isPhone}/>}></Route>
          <Route path="/albummatchup/play" element={<Play isPhone={isPhone}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
  


export default App;
