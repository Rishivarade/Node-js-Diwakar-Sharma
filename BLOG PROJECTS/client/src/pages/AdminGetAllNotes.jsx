import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NotesCard from "../components/NotesCard";
import { useNavigate } from "react-router-dom";

const AdminGetAllNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate=useNavigate()

  const getAllUserNotes = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/getallnotes`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.AllNotes);
        // Ensure totalNotes is an array or fallback to an empty array
        setNotes(res.data.AllNotes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column flex-md-row"
    >

      <div className="w-100 p-2" >
        <h1 className="text-center bg-dark text-white"><marquee>ALL USERS NOTES: {notes.length}</marquee></h1>
        <h1 className="text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5" style={{ textDecoration: "underline" }}>
          NOTES RESULTS
        </h1>
        <div className="div" style={{ display: "flex", flexWrap: "wrap", gridTemplateColumns: "repeat(3,1fr)" }}>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NotesCard
                key={note._id}
                title={note.title}
                body={note.body}
                image={note.notesImage}
                id={note._id}
                getAllUserNotes={getAllUserNotes}
                UserId={note.userId}

              />
            ))
          ) : (
            <div className="p-4 d-flex flex-wrap gap-4">
              <p className="text-xl text-gray-500">No posts found.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminGetAllNotes;
