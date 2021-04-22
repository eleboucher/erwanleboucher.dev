import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const ProfilePicture = () => {
  return (
    <StaticImage
      src="../images/erwanleboucher.jpg"
      placeholder="dominantColor"
      layout="fixed"
      alt="Erwan Leboucher"
      width={200}
      height={200}
      loading="lazy"
      className="rounded-full object-contain"
    ></StaticImage>
  )
}

export default React.memo(ProfilePicture)
