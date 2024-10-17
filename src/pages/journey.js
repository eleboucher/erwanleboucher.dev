import React from "react"

import Item from "../components/item"
import Section from "../components/section"
import SEO from "../components/seo"

const Journey = () => (
  <article>
    <SEO title="Journey" />
    <Item
      title="Wolt | Senior software engineer"
      description="10/2021 - Ongoing | Paris, France"
    >
      <ul className="list-disc list-inside pl-10 m-3">
        <li>
          Led the architecture and development of a high-performance audience
          builder tool for marketing managers, enabling the creation, analysis,
          and export of targeted audiences to third-party ad networks
        </li>
        <li>
          Implemented innovative features like periodic audience updates and
          automatic audience generation to enhance tool functionality and user
          experience
        </li>
        <li>
          Optimized data pipeline to process over 500 million rows daily,
          utilizing AWS S3 for artifact storage to ensure rapid performance and
          scalability, resulting in a 30x faster processing speed
        </li>
        <li>
          Integrated DynamoDB for millisecond query responses in the ordering
          system, enabling real-time eligibility checks for promotions and
          boosting system performance
        </li>
        <li>
          Collaborated with cross-functional teams to align tools and systems
          with business goals, leading to more impactful targeted marketing
          campaigns and improved user experience
        </li>
      </ul>
      (Golang, React, PostgreSQL, Snowflake, DynamoDB, S3, Kubernetes, Kafka)
    </Item>
    <Section title="Work experience">
      <Item
        title="viafintech | Software Engineer"
        description="09/2019 - 10/2021 | Berlin Germany"
      >
        <span>
          viafintech is a payment service provider. Through viacash, they offer
          a solution for cash deposits, withdrawals and payment for clients like
          N26, bunq, Amazon.de in retails such as DM, Rewe, Penny.
        </span>
        <ul className="list-disc list-inside pl-10 m-3">
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
            services. Integrated using Golang and Bash with Docker, GitLab, AWS
            S3 and Vault. Reducing the deployment time by 95%.
          </li>
        </ul>
        (Golang, Ruby on Rails, Postgresql, RabbitMQ)
      </Item>
      <Item
        title="GitGuardian | Full-Stack Developer"
        description="11/2018 - 07/2019 | Paris, France"
      >
        <span>
          GitGuardian is a solution that scans GitHub activity in real-time for
          API secret tokens, database credentials, certificates and alerts the
          developer within a minute.
        </span>
        <ul className="list-disc list-inside pl-10 m-3">
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

export default Journey
