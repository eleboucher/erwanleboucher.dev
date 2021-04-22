import React from "react"

const Item = ({ title, description, children }) => (
  <div className="my-4">
    <p className="text-2xl mb-1">{title}</p>
    <p className="text-sm mb-3 text-primary dark:text-darkPrimary">
      {description}
    </p>
    {children}
  </div>
)

export default React.memo(Item)
