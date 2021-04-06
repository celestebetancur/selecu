import React from 'react';
import p5 from 'p5';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import MaskMenuMilecu from './MaskMenuMilecu'
import PixelArt from './pixelArt.js'

import mask1 from '../../assets/images/mask.png'
import mask2 from '../../assets/images/mask2.png'
import forest from '../../assets/images/forest.jpg'

import '../../styles/milecu.scss'

let s = undefined;

class MilecuFirst extends React.Component {

  state = {
    imgIndex: 0
  }

  passIndex = (index) => {
    this.setState({imgIndex:index});
  }

  componentDidMount(){

    const code = (sketch) => {

      let width = 400;
      let height = 600;
      let cnv;
      let capture;
      let mask = [];

      sketch.preload = () => {
        mask.push(sketch.loadImage(mask1));
        mask.push(sketch.loadImage(mask2));
        mask.push(sketch.loadImage(mask1));
        mask.push(sketch.loadImage(mask2));
        mask.push(sketch.loadImage(mask1));
      }

      sketch.setup = () => {
        cnv = sketch.createCanvas(width, height);
        cnv.parent('canvasP5');
        capture = sketch.createCapture(sketch.VIDEO);
        capture.hide();
        capture.size(800, 600);
      };

      sketch.draw = () => {
        sketch.background(100);
        sketch.image(capture, -200, 0, 800, 600);
        sketch.image(mask[this.state.imgIndex], 0, 0, width, height);
        sketch.stroke(255);
      };
    }
    // s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <Container className="mainPixelArtContainer" style={{backgroundImage:`url(${forest})`}} fluid >
        <Container className="parent" >
          <PixelArt />
        </Container>
      </Container>
    );
  }
}

        // <div id="canvasP5">
        //   <Button variant="warning" style={{display:'float', position:'absolute', marginLeft:'38%'}}>Tomar en 3</Button>
        // </div>
        // <MaskMenuMilecu
        //   passIndex={this.passIndex}
        //   images={[mask1,mask2,mask1,mask2,mask1]}
        // />

export default MilecuFirst;
