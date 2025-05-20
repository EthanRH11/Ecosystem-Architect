import React, {Component} from 'react';
import p5 from 'p5';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
    }

    p.draw = () => {
      p.background(200, 200);
      p.circle(100, 200, 100);
      p.rect(300, 150, 100, 100);
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
      <div className="App">
      </div>
    );
  }
}

export default App;
