import React from 'react'
import logo from "../assets/menu.jpg"

function Logo( {width = "40px"} ) {
  return (
    <img src={logo} alt="Logo" style={{width: "30px"}}/>
  )
}

export default Logo