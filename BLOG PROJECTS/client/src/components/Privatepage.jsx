import React from 'react'
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';

const Privatepage = ({children}) => {
    const USER=localStorage.getItem("userdata")
  //   let isAuth = true;
  const [cookies] = useCookies(["verificationToken"]);
  const isAuth = cookies.verificationToken;
console.log(isAuth);
  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }
  if(!USER){
    return <Navigate to="/sign-in" />
  }

  return children;
}

export default Privatepage
