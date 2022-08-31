import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { PopularСars, CarShowrooms, TestDrive, SellingSoon } from "./pages";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<PopularСars />} />
        <Route path="/carShowrooms" element={<CarShowrooms />} />
        <Route path="/testDrive" element={<TestDrive />} />
        <Route path="/sellingSoon" element={<SellingSoon />} />
      </Routes>
    </div>
  );
}

export default App;
