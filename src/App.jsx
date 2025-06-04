import React, { Component } from 'react';
import p5 from 'p5';
import './App.css';
import {setUpAnimal, drawAnimal} from './drawFunctions/animals';

class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    let img = null

    p.setup = async () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      setUpAnimal();

      try {
        img = await p.loadImage('/assets/animals/bear.png');
      } catch (err) {
        console.error("Can't find image");
      }
    }

    p.draw = () => {
      p.background(200, 200);

      if (img) {
        drawAnimal(p, img);
      }
    }
  }

  componentDidMount() {
    if (!this.myP5)
      this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  componentWillUnmount() {
    if (this.myP5) {
      this.myP5.remove();
      this.myP5 = null;
    }
  }

  render() {
    return (
      <div className="App" ref={this.myRef}>
      </div>
    );
  }
}

export default App;
