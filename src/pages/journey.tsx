import React from "react"

import Item from "../components/item"
import Section from "../components/section"
import SEO from "../components/seo"

const WorkPage = () => (
  <article>
    <SEO title="Journey" />
    <Section title="Work experience">
      <Item
        title="viafintech | Software Engineer"
        description="September 2019 – Present | Berlin Germany"
      >
        <span>
          viafintech is a payment service provider. Through viacash, they offer
          a solution for cash deposits, withdrawals and payment for clients like
          N26, bunq, Amazon.de in retails such as DM, Rewe, Penny.
        </span>
        <ul>
          <li>
            Integrated multiple external transaction API such as Alipay or
            Incomm (gift cards) using Golang. Enabling the user to use these
            services at a retail.
          </li>
          <li>
            Designed and developed an iOS and Android application to find the
            nearest retail partners with React Native and Typescript.
          </li>
          <li>
            Engineered a new deployment system written in Golang, affecting 60+
            services. Integrated using Golang and Bash with Docker, Gitlab-CI,
            AWS S3 and Vault. Reducing the deployment time by 95%.
          </li>
        </ul>
        (Golang, Ruby on Rails, Postgresql, RabbitMQ)
      </Item>
      <Item
        title="GitGuardian | Full-Stack Developer"
        description="November 2018 – July 2019 | Paris, France"
      >
        <span>
          GitGuardian is a solution that scans GitHub activity in real-time for
          API secret tokens, database credentials, certificates and alerts the
          developer within a minute.
        </span>
        <ul>
          <li>
            Involved in the main website redesign using GatsbyJS with serverless
            functions in NodeJS, now viewed by more than 50k people per month.
          </li>
          <li>
            Built a B2B dashboard used by some Fortune 500 with Django and
            React.
          </li>
        </ul>
        (Django, Python, React, Postgresql, Golang)
      </Item>
    </Section>

    <Section title="Involvements &amp; Hackathons">
      <Item
        title="Android OS open-source community"
        description="February 2015 – November 2017"
      >
        Adding improvements and features on the Android system and kernel, with
        Java and C. Member of multiple organizations such as
        LineageOS/Cyanogenmod and AICP. Recognized developer on the developer
        forum XDA.
      </Item>
      <Item
        title="Navya x 42 - Team Exedra - First Place"
        description="Mondial Paris Motor Show 2018 | CES 2019"
      >
        Navya organized a contest with 42 about improving the user experience
        aboard the car. We envisioned a pop-up meeting room, then we engineered
        a platform to book and manage meetings with React Native and Express.
      </Item>
    </Section>
    <Section title="Education">
      <Item title="Ecole 42" description="2019 | Computer Science"></Item>
    </Section>
  </article>
)

export default WorkPage
