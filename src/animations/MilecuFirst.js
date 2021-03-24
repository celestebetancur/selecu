import React from 'react';
import p5 from 'p5';

import mask1 from '../assets/images/mask.png'
import body from '../assets/images/body.png'

import '../styles/home.css'

let s = undefined;

class MilecuFirst extends React.Component {

  componentDidMount(){

    const code = (sketch) => {

      let width = 320;
      let height = 600;
      let cnv;
      let capture;
      let maskOne;
      let b;

      sketch.preload = () => {
        maskOne = sketch.loadImage(mask1);
        b = sketch.loadImage(body);
      }

      sketch.setup = () => {
        cnv = sketch.createCanvas(width, height);
        cnv.parent('canvasP5');
        capture = sketch.createCapture(sketch.VIDEO);
        capture.hide();
        capture.size(width, 240);
      };

      sketch.draw = () => {
        sketch.background(255);
        sketch.image(capture, 0, 0, 320, 240);
        sketch.image(maskOne, 70, 0, 180, 240);
        sketch.image(b, 0, 220, 320, 380);
        sketch.stroke(255);
        sketch.rect(0,0,70,240);
        sketch.rect(250,0,70,240);
      };
    }
    s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }
  render(){
    return <div id="canvasP5"></div>;
  }
}

export default MilecuFirst;
