import React from "react";
import "./App.css";
import CropList from "./components/CropList";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import AddCrop from "./components/AddCrop";
import UpdateCrop from "./components/UpdateCrop";

function App() {
  return (
    <>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/*" element={<CropList />}></Route>
          <Route path="/add-crop" element={<AddCrop />}></Route>
          <Route path="/update-crop" element={<UpdateCrop />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
