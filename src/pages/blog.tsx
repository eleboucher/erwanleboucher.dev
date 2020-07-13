import React from "react"

import Item from "../components/item"
import Section from "../components/section"
import SEO from "../components/seo"
import styled from "styled-components"

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    margin-top: 30px;
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
  }
`

const externalPost = [
  {
    title: "Comment fonctionne une Rom Custom?",
    url: "https://bit.ly/2YDhxDJ",
    description:
      "Vous devez sûrement entendre, si vous intéressez à Android, les mots “Rom Custom”, “CyanogenMod”, “LineageOS”… Mais vous avez aucune idée de ce qu’il s’agit. Voilà un article qui pourra, vous éclairez !",
    date: "Oct 6, 2017",
  },
  {
    title: "Kernel et Android : Qu’est-ce que c’est et pourquoi le modifier ?",
    image:
      "https://images.frandroid.com/wp-content/uploads/2017/02/android-kernel-explication.jpg",
    url: "https://bit.ly/3eFpEFw",
    description:
      "Vous êtes très nombreux à bidouiller votre appareil Android. Nous nous sommes intéressés à un composant essentiel de votre système : le kernel.",
    date: "Feb 16, 2017",
  },
]

const BlogPage = () => (
  <article>
    <SEO title="Journey" />
    <Section title="Blog Posts">
      <h2>Coming soon ...</h2>
    </Section>
    <Section title="External Posts">
      {externalPost.map(post => (
        <a href={post.url} key={post.title}>
          <PostWrapper>
            <Item title={post.title} description={post.date}>
              <p>{post.description}</p>
            </Item>
            {post.image && (
              <img
                src={post.image}
                loading="lazy"
                height="100"
                style={{ borderRadius: 15 }}
              />
            )}
          </PostWrapper>
        </a>
      ))}
    </Section>
  </article>
)

export default BlogPage
