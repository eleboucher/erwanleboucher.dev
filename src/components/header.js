import React from "react"
import { Link as RawLink } from "gatsby"

const Link = ({ children, className, ...props }) => (
  <RawLink className={"mr-3 font-title " + className} {...props}>
    {children}
  </RawLink>
)

const Header = ({ siteTitle }) => (
  <header>
    <div className="flex p-3 flex-col justify-center items-center md:justify-between md:flex-row">
      <Link to="/" className="text-4xl">
        {siteTitle}
      </Link>
      <div className="flex justify-center items-center pr-3 md:justify-between">
        <Link to="/">About</Link>
        <Link to="/journey">Journey</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </div>
  </header>
)

export default Header
