import React from "react"

import Divider from "./divider"

const Section = ({ children, title, ...props }) => (
  <div className="flex flex-col animate-fade-in" {...props}>
    <Divider />
    <div className="mx-3 md:mx-0">
      <span className="text-base font-bold mb-3 font-title">{title}</span>
      {children}
    </div>
  </div>
)

export default React.memo(Section)
