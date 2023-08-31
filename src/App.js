import './App.css';
import React from 'react';
import Play from './pages/Play';
import Home from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/albummatchup" element={<Home/>}></Route>
          <Route path="/albummatchup/play" element={<Play/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
  


export default App;
