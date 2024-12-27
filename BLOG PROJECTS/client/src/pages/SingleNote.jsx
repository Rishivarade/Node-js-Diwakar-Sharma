import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleNote() {
  const { notesId } = useParams();
  const [notes, setNotes] = useState({});
  // const [isLoading, setLoading] = useState(false);
  // const url=("http://localhost:8080")
 
  const getAllUserNotes = () => {
   
    axios
      .get(`${import.meta.env.VITE_BASEURL}/notes/singlenotes/${notesId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setNotes(res.data.notes);
        
      })
      .catch((err) => {
       
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUserNotes();
  }, []);
  return (
   
    <div className="container my-4">
 
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="text-center">
         
                <img
                  src={`${import.meta.env.VITE_BASEURL}/${notes.notesImage}`}
                  alt="Blog Title"
                  className="img-fluid rounded mb-3"
                  height={600}
                  width={600}
                />
             
          
              <h2>NOTE TITLE: {notes.title}</h2>

         
              <div className="blog-content">CONTENT: {notes.body}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
