import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata"));

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    toast.success("Logged out successfully");
    navigate("/sign-in");
  };

  const handleDeleteAllNotes = () => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/notes/deleteallnotes`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message || "Notes deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Error deleting notes");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">
          Home
        </Link>
        <Link to="/notes" className="navbar-brand font-weight-bold">
          Notes
        </Link>
        <Link to="/create-note" className="navbar-brand font-weight-bold">
          Create-Notes
        </Link>

        <div className="d-flex ms-auto">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {!user ? (
              <li className="nav-item">
                <Link to="/sign-in" className="btn btn-outline-primary">
                  Sign In
                </Link>
              </li>
            ) : (
              <>
                {user?.role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link to="/admin" className="btn btn-outline-primary">
                        GetAllNotes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Button onClick={handleDeleteAllNotes}>
                        DeleteAllNotes
                      </Button>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
