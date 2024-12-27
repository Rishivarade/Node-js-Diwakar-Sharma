import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Notespage from "./pages/Notespage";
import UpdateNote from "./pages/UpdateNote";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleNote from "./pages/SingleNote";
import AdminGetAllNotes from "./pages/AdminGetAllNotes";
import Notescreate from "./pages/Notescreate";
import Privatepage from "./components/Privatepage";
const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/sign-in" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/notes" element={
        <Privatepage>
          <Notespage />
        </Privatepage>

      }
      ></Route>
      <Route path="/create-note" element={<Notescreate />}></Route>
      <Route path="/single-note/:notesId" element={<SingleNote />}></Route>
      <Route path="/updatenote/:notesId" element={<UpdateNote />}></Route>
      <Route path="/admin" element={<AdminGetAllNotes />}></Route>
    </Routes>
  );
};

export default Allroutes;
