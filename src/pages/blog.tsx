import React, { useEffect, useState, useCallback } from "react"

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

const oldPost = [
  {
    title: "Comment fonctionne une Rom Custom?",
    url: "https://bit.ly/2YDhxDJ",
    description:
      "Vous devez sûrement entendre, si vous intéressez à Android, les mots “Rom Custom”, “CyanogenMod”, “LineageOS”… Mais vous avez aucune idée de ce qu’il s’agit. Voilà un article qui pourra, vous éclairez !",
    published_at: "2017-10-06T08:44:33Z",
  },
  {
    title: "Kernel et Android : Qu’est-ce que c’est et pourquoi le modifier ?",
    image:
      "https://images.frandroid.com/wp-content/uploads/2017/02/android-kernel-explication.jpg",
    url: "https://bit.ly/3eFpEFw",
    description:
      "Vous êtes très nombreux à bidouiller votre appareil Android. Nous nous sommes intéressés à un composant essentiel de votre système : le kernel.",
    published_at: "2017-02-16T08:44:33Z",
  },
]

const BlogPage = () => {
  const [articles, setArticles] = useState([])

  const fetchArticles = useCallback(async () => {
    const res = await fetch("https://dev.to/api/articles?username=eleboucher")
    const articles = await res.json()
    setArticles(articles)
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [articles, fetchArticles])

  return (
    <article>
      <SEO title="Blog" />
      <Section title="Blog Posts">
        {articles?.map(post => (
          <a href={post.url} key={post.title}>
            <PostWrapper>
              <Item
                title={post.title}
                description={new Date(post.published_at).toLocaleDateString()}
              >
                <p>{post.description}</p>
              </Item>
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  loading="lazy"
                  height="100"
                  style={{ borderRadius: 15 }}
                />
              )}
            </PostWrapper>
          </a>
        ))}
        {oldPost.map(post => (
          <a href={post.url} key={post.title}>
            <PostWrapper>
              <Item
                title={post.title}
                description={new Date(post.published_at).toLocaleDateString()}
              >
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
}

export default BlogPage
