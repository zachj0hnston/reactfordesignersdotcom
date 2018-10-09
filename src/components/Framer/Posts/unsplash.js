import React, { Component } from 'react';
import Template from '../Template'

export default class PageUnsplash extends Component {

  render() {
    
    return (
      <Template 
        title="Unsplash"
        url="unsplash/unsplash"
        content={content}
        code={code}
      />
    );
  }
};


const content = [
  {text: "![Unsplash demo](https://i.giphy.com/media/35SxjovgqxyBpy0WL9/giphy.webp) This component by [Unsplash](https://twitter.com/unsplash) and [Floris Vorloop](https://twitter.com/fverloop) is a great example of how to reference a simple API in React. We'll be using `fetch()` to grab an image from source.unsplash.com."},
  
  {title: "Imports", lines: "1-2", text: "These two lines of import are standard for all Framer components. The only thing we need to add is an import for `Frame` on line 2. You can import all sorts of helpful component from the Framer library like `<Stacks>` and `<Text>` but we only need `<Frame>` for this project."},
  
  // {title: "Typescript", lines: "4-9", text: "Typescript is a flavor of Javascript that allows us to strictly define what value a variable can store. Typescript is great for preventing bugs caused a variable being or prop being the wrong data type. This component has a width and height prop that should only ever be a `number` and a search prop that should be a `string`. Then on line `11` we tack `<Props>` to the connect these Typescript definitions to our component.  \n\n If you're just getting started with React or if you like living life on the edge, feel free to ignore Typescript for now."},

  {title: "Create the class", lines: "6", text: "We create a new class that extends the core `React.Component` class. We export this new class with the name \"Unsplash\" and it will automatically show up in the Framer component panel as Unsplash."},

  {title: "Default props", lines: "8-10", text: "Properties are how we customize React components. Even the prop's value is likely to be changed, it's nice to give your props a default value. `Size: \"M\"` will default the size property to M (medium)."},

  {title: "Property controls", lines: "13-24", text: "Framer allows us to put custom controls in the right menu of their interface. For this component, we want the user to be able to customize the search string and the size of the image so we create two property controllers. You can learn more about Framer's property controllers [here](https://store.framer.com/package/@framer/benjamin.properties)."},

  {title: "Size controller", lines: "21-22", text: "The enum control type gives users a dropdown to select values. Users will see the optionTitles of `S, M, L, XL` but the true value will be `0, 1, 2, 3` so if M is selected, 1 will be the value of `this.props.size`. We will use this value later as a multiplier in a math equation."},

  {title: "State", lines: "26-28", text: "States are like props except they can't be edited from the outside. Usually states are used to store a components (you guessed it) state. In this component, we create a state for the image URL so that once we get an image URL from Unsplash, we can store it. \n\n A great feature of states is that any time they are changed, the component automatically renders itself again to see if anything has changed."},

  {title: "Component lifecycle", lines: "30-37", text: "One of the really great things React gives us is something called the component lifecycle. There are 8 moments or methods in the lifecycle and [this image](https://cdn-images-1.medium.com/max/2000/1*cEWErpe-oY-_S1dOaT1NtA.jpeg) is a great overview of each step. \n\n What we need to know about the lifecycle that any code we place inside `componentDidMount()` will run once when the component is mounted on the page and any code we put inside `componentWillReceiveProps()` will run when the the props of the component change."},

  {title: "", lines: "35-36", text: "These two lines are checking to see if the props we care about have actually changed. Remember that all Framer components come with default props like width, height, position, scale, etc. We only want to fire `this.setImage()` if the search or size props have updated."},

  {title: "The API call 🤖", lines: "39", text: "Now for the good part. We have an `async` function that will take a `size` and `search` value and return an Unsplash image URL like `source.unsplash.com/random/800x800?trees`. \n\n Adding `async` in front of the function name and `await` on line `44` is called a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and is great for making external API calls that might take a couple seconds to complete. "},

  {title: "Base URL", lines: "40", text: "We will be making a `fetch()` call. To do so, we need a URL so the next few lines will be creating a url based on the URL format Unsplash defines in their [API docs](https://source.unsplash.com/)."},

  {title: "Random or search?", lines: "41", text: "This component has an optional Search prop. `search === \"\" ?` is a conditional statement and so if the `search` prop has any value at all, `route` will equal `\/random`. If `search` is empty, `route` will be saved as `\/featured`. This might more sense after reading the [Unsplash API docs](https://source.unsplash.com/)."},

  {title: "Size", lines: "42", text: "`size` is number between 0-3 in in the form of a string so before we can use it in a math equation, we need to turn it into an number with `Number()`. We can then add 400 and multiple multiply it by 400. That means if a user chooses XL the math equation will be `400 + 3 * 400` which equals 1600."},

  {title: "Combining the URL into one", lines: "43", text: "We can now combine the `baseUrl`, the `route`, and the `currentSize` constants into one `url` constant that will be used to make the `fetch()` call. We use backticks (``) and these special brackets `${ }` to form a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) out of our constants."},

  {title: "Fetch and await", lines: "44", text: "Using the `url` constant we just composed, we can call `fetch(url)` and save it as a constant called `response`. By adding `await` before `fetch()`, we are telling this `async` function to not wait for the image to come back. We're storing this `response` variable as a promise that will update when the Unsplash API call completes. Read more about [Javascript Promises here](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)."},

  {title: "Set state.url", lines: "45", text: "Now we set the components `url` state to be `response.url`. When the Unsplash `fetch()` call we made comes back after a couple seconds, it will be in the form of an `object` and have a `url` value. This will be accessible as `response.url` and since we want to use that URL to display our image, we will save it in the `url` state using `this.setState`. \n\n State is a complex little concept that can take a while to master. One thing to keep in mind with State is that when you run `this.setState()` it will re-render the component. So to avoid an infinite loop, don't set state inside the `render()` lifecycle method below."},

  {title: "Render", lines: "48-50", text: "Render the main [lifecycle method](https://cdn-images-1.medium.com/max/2000/1*cEWErpe-oY-_S1dOaT1NtA.jpeg) and is the only method you *must* include. Inside of the `render()` method will always be a `return()` that contains JSX (aka fancy HTML)."},

  {title: "<Frame />", lines: "51", text: "Remember in line `2` when we imported `Frame` from the Framer library? Well this is where we are using it. A `<div>` would also work but the `<Frame>` component makes it easy to keep the width and height linked to the outer container using `width={this.props.width}`."},

  {title: "Placing the image 🖼", lines: "52-63", text: "Now we need to create a `<div>` and set its `backgroundImage` to the URL we got from Unsplash. The URL was stored in `this.state.url` so we can use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to place this URL in the CSS."},

  {title: "A loading state for good measure", lines: "64-92", text: "While the Unsplash image is loading, we can show a nice little Unsplash SVG logo and a \"Loading image...\" message. Once the image loads, it will cover this loading state."},

  {title: "All done ✅", text: "That's how you make a component that calls on Unsplash to load a random image. Check out the component in the Framer store and then go make something awesome!"},

  {title: "A note about the lack of Typescript", lines: "4", text: "Typescript is a flavor of Javascript that allows us to strictly define what value a variable can store. Typescript is great for preventing bugs caused a variable or prop being the wrong data type. To keep this guide short, I removed the Typescript bits but you can read about Typescript [here](https://www.typescriptlang.org/docs/handbook/jsx.html) and find the original, Typescript version of this component in the Framer store."},

];


const code = `import * as React from "react";
import { Frame, PropertyControls, ControlType, Animatable } from "framer";

// A note about the lack of Typescript

export class Unsplash extends React.Component {

  static defaultProps = {
    search: "",
    size: "M"
  };

  static propertyControls = {
    search: { 
      type: ControlType.String, 
      title: "Search" 
    },
    size: {
      type: ControlType.Enum,
      title: "Size",
      options: ["0", "1", "2", "3"],
      optionTitles: ["S", "M", "L", "XL"]
    }
  };

  state = {
    url: null
  };

  componentDidMount() {
    this.setImage(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.search !== this.props.search) this.setImage(props);
    if (props.size !== this.props.size) this.setImage(props);
  }

  async setImage({ size, search }) {
    const baseUrl = "https://source.unsplash.com";
    const route = search === "" ? "/random" : \`/featured\`;
    const currentSize = 400 + Number(size) * 400;
    const url = \`\${baseUrl}\${route}/\${currentSize}x\${currentSize}?\${search}\`;
    const response = await fetch(url);
    this.setState({ url: response.url });
  }

  render() {

    return (
      <Frame width={this.props.width} height={this.props.height} background="white">
        <div
          style={{
            width: 100%,
            height: 100%,
            backgroundImage: \`url(\${this.state.url})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              zIndex: -1,
              position: "relative"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26.156">
              <path
                fill="rgb(204,204,204)"
                d="M 19.5 15.094 C 19.5 17.625 17.438 19.594 15 19.594 C 
                  12.563 19.594 10.5 17.625 10.5 15.094 C 10.5 12.563
                  12.563 10.594 15 10.594 C 17.531 10.688 19.5 12.656 
                  19.5 15.094 Z M 30 8.156 L 30 22.125 C 30 24.281 28.219 
                  26.156 25.969 26.156 L 4.031 26.156 C 1.781 26.156 0 24.375 
                  0 22.125 L 0 8.063 C 0 5.906 1.781 4.031 4.031 4.031 L 7.5 
                  4.031 L 8.25 1.875 C 8.625 0.844 9.844 0 10.969 0 L 19.031 
                  0 C 20.156 0 21.375 0.844 21.75 1.875 L 22.5 4.125 L 25.969 
                  4.125 C 28.219 4.125 30 5.906 30 8.156 Z M 21.938 15.188 C 
                  21.938 11.344 18.844 8.156 14.906 8.156 C 11.063 8.156 
                  7.875 11.344 7.875 15.188 C 7.875 19.031 10.969 22.219 
                  14.906 22.219 C 18.844 22.125 21.938 19.031 21.938 15.188 Z"
              />
            </svg>
            <p>Loading image...</p>
          </div>
        </div>
      </Frame>
    );
  }
}


`;

