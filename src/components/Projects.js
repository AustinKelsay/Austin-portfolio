import React, { useState, useEffect } from 'react';
import {useSpring, animated} from "react-spring";
import { v4 as uuidv4 } from 'uuid';
import anyFit from "../images/anyFit.jpg"
import gameOfLife from "../images/gameOfLife.jpg"
import fbExplorer from "../images/fbexplorer.jpg"
import lawnGnome from "../images/lawnGnome.jpg"
import Reclaim from "../images/reclaimWide.png"
import KnowledgeBot from "../images/bitcoinKnowledgeBot.png"
import "./components.css"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const items = [
  {
    src: `${KnowledgeBot}`,
    altText: 'Bitcoin Knowledge Bot',
    header: "Bitcoin Knowledge Bot",
    github: "https://github.com/bitcoin-knowledge/bitcoin-knowledge-bot",
    caption: "A question & answer AI bot that also suggests articles/podcasts. Powered by GPT-3 and trained on an open source dataset of established Bitcoin knowledge",
    link: "https://bitcoin-knowledge-bot.vercel.app"
  },
  {
    src: `${fbExplorer}`,
    altText: "fb-explorer app image",
    header: "fbexplorer",
    github: 'https://github.com/AustinKelsay/fb-explorer',
    caption: "fbexplorer is a tool that lets you reclaim, search, and explore all of your Facebook data. This is a single page application built with React and utilizing Redux/hooks for state management. fbexplorer does not collect any user's Facebook data or personal information.",
    link: 'https://fbexplorer.app/'
  },
  {
    src: `${Reclaim}`,
    altText: "Reclaim app image",
    header: "Reclaim",
    github: 'https://github.com/ReclaimApp/Reclaim',
    caption: "Reclaim is an open source desktop app for collecting and storing your online information. With Reclaim you can collect your social media data in a few clicks and explore every photo, friend, and interaction from your digital life.",
    link: "https://github.com/ReclaimApp/Reclaim"
  },
  {
    src: `${gameOfLife}`,
    altText: "austin's game of life app image",
    header: "Austin's game of life",
    github: 'https://github.com/AustinKelsay/austins-game-of-life',
    caption: 'An implementation of Conway’s Game of Life. This is a React single page application with a random cell placement feature, speed settings for the simulation, and the ability to step through each generation with a visual counter! I have always been fascinated by celular automata and conways game of life in paticular!',
    link: 'https://austins-game-of-life.vercel.app/'
  },
  {
    src: `${lawnGnome}`,
    altText: 'the lawn gnome app image',
    header: 'The Lawn Gnome',
    github: 'https://github.com/AustinKelsay/Lawn-gnomes',
    caption: 'The Lawn Gnome was my first freelance web app for a small local business! The Lawn Gnome was built with React and styled with material-ui/core and I implemented emailjs for customers to contact the owner directly',
    link: 'https://lawn-gnomes.vercel.app/'
  },
  {
    src: `${anyFit}`,
    altText: 'Anywhere Fitness app image',
    header: 'Anywhere Fitness',
    github: 'https://github.com/AustinKelsay/back-end',
    caption: 'Anywhere Fitness was my backend buildweek project (frontend is a little buggy). I built the entire backend with Node/Express, a Postgres database, and a tests on all of the endpoints with supertest and a local SQL3 test db!',
    link: 'https://musing-knuth-63bdac.netlify.app/register'
  }
];

const Projects = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isToggled, setToggled] = useState(false)

    useEffect(() => {
        setToggled(!isToggled);
    }, [])

  const fade = useSpring({
    config: {
      duration: 3000
    },
    opacity: isToggled ? 1 : 0
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <a href={item.link} target="_blank" rel="noopener noreferrer">
        <img src={item.src} alt={item.altText} />
        </a>
        <div className='project-info'>
            <h1>{item.header}</h1>
            <div className="project-links">
              <a href={item.github} target="_blank" rel="noopener noreferrer">github</a>
              <a href={item.link} target="_blank" rel="noopener noreferrer">deployment</a>
            </div>
            <p>{item.caption}</p>
        </div>
      </CarouselItem>
    );
  });

  return (
    <animated.div style={fade} className="projects">
        <Carousel
        key={uuidv4}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    </animated.div>
  );
}

export default Projects;
