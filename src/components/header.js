import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <div className="flex p-3 flex-col justify-center items-center md:justify-between md:flex-row ">
      <Link to="/" className="text-4xl font-title">
        {siteTitle}
      </Link>
      <div className="flex justify-center items-center pr-3 md:justify-between flex-wrap mt-5 md:mt-0">
        <Link to="/" className="text-xl mr-4 font-title">
          About
        </Link>
        <Link to="/journey" className="text-xl mr-4 font-title">
          Journey
        </Link>
        <Link to="/projects" className="text-xl mr-4 font-title">
          Projects
        </Link>
        <Link to="/blog" className="text-xl font-title">
          Blog
        </Link>
      </div>
    </div>
  </header>
)

export default Header
