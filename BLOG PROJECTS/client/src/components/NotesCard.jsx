import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function NotesCard({ title, image, id,UserId, getAllUserNotes }) {
  const user = JSON.parse(localStorage.getItem("userdata"));
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/notes/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        getAllUserNotes(UserId); // Refresh notes after deletion
        toast.success(res?.data?.message || "Notes deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting notes:", err.response || err.message);
        toast.error(err?.response?.data?.message || "Error deleting notes");
      });
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm h-100 p-2" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "5px" }}>
        <Link to={`/single-note/${id}`}>
          <img
            src={`${import.meta.env.VITE_BASEURL}/${image}`}
            alt="post cover"
            className="card-img-top img-fluid"
            style={{ height: "250px", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate p-1" style={{ backgroundColor: "black", color: "white" }}>NOTE : {title}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2px",
              marginBottom: "2px",
            }}
          >
            <div>
              <Link to={`/updatenote/${id}`} className="btn bg-dark text-white btn-outline-primary">
                Edit
              </Link>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
          <Link
            to={`/single-note/${id}`}
            className="btn btn-outline-primary mt-3"
          >
            Read Note Content
          </Link>
        </div>
      </div>
    </div>
  );
}
