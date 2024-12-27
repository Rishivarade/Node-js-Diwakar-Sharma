import React from 'react'
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Homepage = () => {
  return (  
    <div className="div">
      <div className="bg-light text-center py-5">
        <Container>
          <h1 className="display-4">Welcome to Notestalgia</h1>
          <p className="lead">Discover notes awesome and remember.</p>
          <img src="" alt="" />
          <Button href="#get-started" size="lg">
            <Link to={"/notes"} style={{color:"white",textDecoration:"none"}}>See Notes</Link>
          </Button>
        </Container>
        <div className="div mt-3" >
          <img style={{width:"60%"}} src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*17370ki_MifjrRoZ" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Homepage

