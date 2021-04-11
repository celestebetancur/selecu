import React from 'react';
import p5 from 'p5';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import PixelArt from './pixelArt.js'
import ColorPicker from './colorPicker.js'

import {parser} from '../commands.js'

import '../../styles/milecu.scss'

let s = undefined;

class MilecuFirst extends React.Component {

  state = {
    imgIndex: 0,
    text: '',
    parsed: [0,0,0,0,0,0,0],
  }

  passIndex = (index) => {
    this.setState({imgIndex:index});
  }

  setOn = () => {
    this.setState({on:!this.state.on});
  }

  componentDidMount(){

    const code = (sketch) => {

      sketch.setup = () => {
        sketch.noCanvas();
      }

      sketch.draw = () => {
        this.setState({parsed:parser(this.state.text)});
      };
    }
    s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <Container className="mainPixelArtContainer" fluid >
        <Container className="parent" id="canvasParent">
          <PixelArt
            commands={this.state.parsed}
            on={this.setOn}
          />
          <Container className="instructP5 div2">
            <textarea id="intructP5" className="textarea-instructP5" rows="16" cols="16"
              onChange={e => this.setState({text:e.target.value})}
              placeholder=""
          />
          </Container>
        </Container>
      </Container>
    );
  }
}

export default MilecuFirst;
