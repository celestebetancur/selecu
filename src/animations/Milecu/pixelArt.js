import React from 'react';
import p5 from 'p5';

import ColorPicker from './colorPicker.js'

import '../../styles/milecu.scss'

let s = undefined;

class PixelArt extends React.Component {

  state = {
    color:{}
  };

  setColor = (value) => {
    this.setState({color:value});
  }

  componentDidMount(){

    const code = (sketch) => {

      let width = 400;
      let height = 600;
      let pixSize = 20;
      let paintState = true;
      let cnv;
      let colorGrid = [];
      for(let i = 0; i < width/pixSize; i++){
        for(let j = 0; j < height/pixSize; j++){
          colorGrid.push({r:255,g:200,b:0,o:80});
        }
      }

      sketch.setup = () => {
        cnv = sketch.createCanvas(width, height);
        cnv.parent('divPixelArt');
        cnv.id('canvasPixelArt');
      };

      sketch.draw = () => {
        sketch.background(255);
        grid();
      };

      sketch.mousePressed = () => {
        var temp = Math.floor((sketch.mouseY-10)/pixSize) + Math.floor((sketch.mouseX-10)/ pixSize) * (height/pixSize);
        if(paintState){
          colorGrid[temp] = this.state.color;
        }
        if(!paintState){
          colorGrid[temp] = {r:255,g:200,b:0,o:80};
        }
      }

      sketch.keyPressed = () => {
        if(sketch.keyCode === sketch.SHIFT){
          paintState = false;
        }
      }
      sketch.keyReleased = () => {
        if(sketch.keyCode === sketch.SHIFT){
          paintState = true;
        }
      }

      const grid = () => {
        for(let i = 0; i < width/pixSize; i++){
          for(let j = 0; j < height/pixSize; j++){
            var t = j + (height/pixSize)*i;
            sketch.line(0, j*pixSize, width, j*pixSize);
            sketch.line(i*pixSize,0, i*pixSize, height);
            sketch.fill(colorGrid[t].r,colorGrid[t].g,colorGrid[t].b,colorGrid[t].o);
            sketch.rect(i*pixSize,j*pixSize,pixSize,pixSize);
          }
        }
      }
    }
    s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <>
        <div id="divPixelArt" className="div1">
        </div>
        <ColorPicker
          setColor={this.setColor}
        />
      </>
    );
  }
}

export default PixelArt;
