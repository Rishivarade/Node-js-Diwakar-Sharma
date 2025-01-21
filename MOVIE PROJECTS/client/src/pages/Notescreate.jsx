import axios from "axios";
import { useState } from "react";
import {Button, Form,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Notescreate() {
  const [title, setitle] = useState("");
  const [content, setcontent] = useState("");
  const [genre,setgenre]=useState("")
  const [director,setdirector]=useState("")
  const [releaseYear,setreleaseYear]=useState(null)
  const navigate=useNavigate()
  // const url=("http://localhost:8080")
  const handlesubmit = (e) => {
    e.preventDefault();
    let notesdata = { title, body: content ,genre,director,releaseYear};
    axios
      .post(`${import.meta.env.VITE_BASEURL}/notes/create`, notesdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message || "Notes created successfully");
        navigate("/notes")
        setcontent("");
        setitle("");
        setgenre("");
        setdirector("");
        setreleaseYear(null);

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Error creating notes");
      });
  };
  return (
    <div
      className="container p-3 max-w-3xl mx-auto min-vh-100"
      style={{ maxWidth: "60%" }}
    >
      <h1 className="text-center my-4">Add Movie</h1>
      <Form className="d-flex flex-column gap-3" onSubmit={handlesubmit}>
        <Form.Group className="d-flex flex-wrap gap-3">
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setitle(e.target.value)}
            placeholder="Title"
            className="flex-fill"
          />
          <Form.Control
            type="text"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            placeholder="Enter your Content here "
            className="flex-fill"
          />
          <Form.Control
            type="text"
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
            placeholder="Enter your Genre here"
            className="flex-fill"
          />
          <Form.Control
            type="text"
            value={director}
            onChange={(e) => setdirector(e.target.value)}
            placeholder="Enter your Director name here "
            className="flex-fill"
          />
          <Form.Control
            type="text"
            value={releaseYear}
            onChange={(e) => setreleaseYear(e.target.value)}
            placeholder="Enter your releaseYear here "
            className="flex-fill"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>
    </div>
  );
}
