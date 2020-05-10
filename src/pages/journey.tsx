import React from "react"

import Section from "../components/section"
import SEO from "../components/seo"
import Item from "../components/item"

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
          <li>Integrated Alipay payment solution.</li>
          <li>
            Developed an iOS and Android application to find the nearest retail
            partners in React Native.
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
            Involved in the main website redesign, now viewed by more than 50k
            people per month.
          </li>
          <li>Built a B2B dashboard used by some Fortune 500</li>
        </ul>
        (Django, Python, React, Postgresql, Golang)
      </Item>
    </Section>

    <Section title="Involvements & Hackathons">
      <Item
        title="Android OS open-source community"
        description="January 2016 – November 2017"
      >
        Adding improvements and features on the Android system and kernel, with
        Java and C. Member of multiple organizations such as
        LineageOS/Cyanogenmod and AICP. Recognized developer on the community
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
      <Item title="Ecole 42" description="2019"></Item>
    </Section>
  </article>
)

export default WorkPage
