import React, { Component } from 'react';
import '../index.css';
import ReactGA from 'react-ga';
import TextBlock from '../TextBlock';
import CardCarousel from '../CardCarousel';
import ResourceCard from '../ResourceCard';
import { Container, Content, Footer } from './style'

class App extends Component {
  state = {
    selectedCard: null,
    currentOffset: 0,
  }

  componentDidMount() {
    ReactGA.initialize('UA-54549890-1');
    ReactGA.pageview(window.location.pathname);
  }

  handleScroll = (event) => {
    const SCROLLDIF = window.pageYOffset - this.state.currentOffset
    if (SCROLLDIF > 150 || SCROLLDIF < -150) {
      this.setState({selectedCard:null})
    }
  }

  handleClickCard = (id) => {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({
      selectedCard:id,
      currentOffset: window.pageYOffset,
    })
  }

  handleCloseCard = () => {
    window.removeEventListener('scroll', this.handleScroll);
    this.setState({selectedCard:null})
  }

  render() {
    return (
      <Container>

        <Content>

          <TextBlock>
            <h1 className="title">React is intimidating.</h1>
            <p>But it doesn’t need to be. If you know where to look
              and what concepts to learn first, you can get up and running in
              less than a week.</p>
            <p>Follow this guide to break the learning down into 3 simple steps.
              Start by learning the fundamentals, then poke through some example
              React projects, and finally create your first React app.</p>
          </TextBlock>

          <TextBlock section="1">
            <h3 className="secondary-title">Learn the fundamentals</h3>
            <p>Spend your first couple days going through one of these beginner React courses. Find more options <a href="https://github.com/davo/awesome-react-framer-x">here</a>.</p>
          </TextBlock>


          <CardCarousel>
            <ResourceCard
              id="treehouse"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="treehouse"}
              color="#5FCF80"
              title="Treehouse"
              description="React Basics"
              length="3 hours"
              cost="Trial"
              body="Treehouse's React intro course is easy to follow and
                    highly polished. You'll watch videos and complete code
                    excercises in a browser sandbox environment. One drawback,
                    the course is a bit dated and they teach you some older
                    javascript syntax."
              cta="Start course"
              url="https://teamtreehouse.com/library/react-basics"
            />
            <ResourceCard
              id="codecademy"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="codecademy"}
              color="#2BBABA"
              title="Codecademy"
              description="React 101"
              length="4 hours"
              cost="Trial"
              body="Codecademy's React 101 course is perfect for people
                    new to JavaScript. You'll learn the core React concepts
                    by completing dozens of small code challenges."
              cta="Start course"
              url="https://www.codecademy.com/learn/react-101"
            />
            <ResourceCard
              id="egghead"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="egghead"}
              color="#1A94CB"
              title="Egghead"
              description="React for Beginners"
              length="2 hours"
              cost="Free"
              body="These videos are fast paced and probably best for people with some JavaScript experience.
                    That said, the content is great and Kent Dodds is an excellent teacher. If you
                    enjoy this course, check out Egghead's other React courses."
              cta="Start course"
              url="https://egghead.io/courses/the-beginner-s-guide-to-react"
            />
          </CardCarousel>

          <TextBlock>
            <p>If you haven't used JavaScript before,
              you may find some of the content in these courses complicated.
              That's totally fine. The <a href="https://www.robinwieruch.de/javascript-fundamentals-react-requirements/">JavaScript concepts you need</a> for React
              aren't limitless and you'll get the hang of it before long.</p>
          </TextBlock>

          <TextBlock section="2">
            <h3 className="secondary-title">Read other people's code</h3>
            <p>Now that you know the basics, go explore a couple open
              source projects to see how React looks in action.
              Pro tip: Install <a href="https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc">Octotree</a> for Chrome to navigate Github projects.</p>
          </TextBlock>

          <CardCarousel>
            <ResourceCard
              id="calculator"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="calculator"}
              color="#512747"
              title="Calculator"
              description="A simple calculator React app"
              body="This functional calculator app is well designed and simple
                enough to follow along. Start with App.js in the /src/components
                folder and see if you can follow the flow of components."
              cta="View code"
              url="https://github.com/ahfarmer/calculator"
            />
            <ResourceCard
              id="ustwo"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="ustwo"}
              color="#45456B"
              title="ustwo.com"
              description="A beautiful static site built on React"
              body="The creators of Monument Valley were kind enough to open source
                their team's website. You can spend hours clicking through each component
                in the /src/app/components folder. Check out the Hero and Carousel components!"
              cta="View code"
              url="https://github.com/ustwo/ustwo.com-frontend/tree/master/src/app/components"
            />
            <ResourceCard
              id="tictactoe"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="tictactoe"}
              color="#45606B"
              title="Tic Tac Toe"
              description="A step-by-step guide to build a game"
              body="This is the official tutorial found on the reactjs.org website. You can either follow
                the steps to build the game yourself or just skip to the end and
                view the final source code."
              cta="View code"
              url="https://reactjs.org/tutorial/tutorial.html"
            />
          </CardCarousel>

          <TextBlock>
            <p>As you explore other people's React apps, keep an eye out for common JavaScript patterns.
              You should start to recognize some of the concepts you've learned.</p>
          </TextBlock>

          <TextBlock section="3">
            <h3 className="secondary-title">Make your first React component</h3>
            <p>You should feel ready to start building.
            Use the create-react-app boilerplate to get a basic React
            app up in just a couple minutes.</p>
          </TextBlock>

          <CardCarousel>
            <ResourceCard
              id="node"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="node"}
              color="#CB3837"
              title="Install Node"
              description="Download the Node installer app"
              body="NPM is a package manager that the React community uses to share
                modules like the create-react-app or react-router. You'll need to install
                Node.js to be able to run any npm or npx install commands."
              cta="Download Node"
              url="https://nodejs.org/en/download/"
            />
            <ResourceCard
              id="create-react-app"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="create-react-app"}
              color="#637282"
              title="create-react-app"
              description="Create a simple boilerplate React app"
              body="Almost every guide you read will recommend that you
                create a react app using this npm package built by Facebook.
                You can use Guppy for Mac to run this command if you're not
                comfortable with the terminal."
              cta="View guide"
              url="https://github.com/facebook/create-react-app"
            />
            <ResourceCard
              id="guppy"
              onSelect={this.handleClickCard}
              onClose={this.handleCloseCard}
              isZoomed={this.state.selectedCard==="guppy"}
              color="#EFB81A"
              title="Guppy"
              description="Step-by-step guide to build a game"
              body="This macOS app helps you create, run, and manage your React apps.
                It's ultimately just an interface for the terminal commands you would
                otherwise be running, so if you prefer a CLI this may not be for you."
              cta="Download Guppy"
              url="https://github.com/joshwcomeau/guppy"
            />
          </CardCarousel>

          <TextBlock>
            <p>From here on, the path will be different for everyone.
              Go join a <a href="https://spectrum.chat/react">React community</a>,
              build a <a href="https://framer.com/announcement/">Framer X</a> prototype,
              or maybe redesign your portfolio.</p>
            <p>See, not intimidating at all.</p>
          </TextBlock>

          <Footer>
            made by <a href="https://twitter.com/zach__johnston">me</a>
          </Footer>

        </Content>
      </Container>
    );
  }
}

export default App;
