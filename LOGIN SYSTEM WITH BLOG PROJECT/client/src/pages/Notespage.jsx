import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import NotesCard from "../components/NotesCard"
import axios from "axios";

export default function Notespage() {
  const UserData = JSON.parse(localStorage.getItem("userdata"));
  const [notes, setnotes] = useState([]);

  const getAllUserNotes = () => {
    if (!UserData || !UserData._id) {
      console.error("UserData is not valid.");
      return;
    }

    axios.get(`${import.meta.env.VITE_BASEURL}/notes/get/${UserData?._id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.notes);
        setnotes(res.data.notes);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column flex-md-row">
      <div className="w-100">
        <h1 className="text-center bg-dark text-white text-3xl font-semibold border-bottom border-gray-500 p-3">
          : ALL NOTES :
        </h1>
        <div className="p-2 d-flex flex-wrap" style={{border:"2px solid gray"}}>
          {notes.length > 0 ? (
           notes.map((el) => (
            <NotesCard
              key={el._id}
              title={el.title}
              body={el.body}
              image={el.notesImage}
              id={el._id}
              getAllUserNotes={getAllUserNotes}
              UserId={UserData._id}
            />
          ))
          ) : (
            <p className="text-xl text-gray-500">No notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
