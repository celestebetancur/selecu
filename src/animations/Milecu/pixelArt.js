import React from 'react';
import p5 from 'p5';
import UploadPhoto from '../../components/uploadPhoto.js'

import ColorPicker from './colorPicker.js'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import '../../styles/milecu.scss'

let s = undefined;

class PixelArt extends React.Component {

  state = {
    color:{},
    image: {},
    ready: false,
    menu: false,
    url: ''
  };

  setColor = (value) => {
    this.setState({color:value});
  }

  writePhoto = () => {
    this.setState({ready:!this.state.ready});
    this.setState({menu:!this.state.menu});
  }
  changeMenu = () => {
    this.setState({menu:!this.state.menu});
  }

  componentDidMount(){

    const code = (sketch) => {

      let [width,height,w,h]  = [400,400,400,640];
      let [x,y] = [0,0];
      let pixSize = 5;
      let paintState = true;
      let cnv;
      let colorGrid = [];
      for(let i = 0; i < width/pixSize; i++){
        for(let j = 0; j < height/pixSize; j++){
          colorGrid.push({r:255,g:255,b:255,o:0});
        }
      }

      let url;
      let canvasFrame;
      let capture;
      let pix;
      let captured = sketch.createImage(400,400);
      let imageCaptured = false;

      sketch.setup = () => {
        cnv = sketch.createCanvas(width, height);
        cnv.parent('divPixelArt');
        cnv.id('canvasPixelArt');

        capture = sketch.createCapture(sketch.VIDEO);
        capture.hide();
        capture.size(400, 400);
      };

      sketch.draw = () => {
        createBlob();
        sketch.background(255);
        w = this.props.commands[4];
        h = this.props.commands[5];
        x = -this.props.commands[2] + this.props.commands[3];
        y = -this.props.commands[0] + this.props.commands[1];
        // sketch.background(255);
        if(this.props.commands[6] === 0){
          sketch.image(captured, x, y, w, h);
        }
        if(this.props.commands[6] === 1){
          captured = capture.get();
          sketch.image(capture, x, y, w, h);
        }
        grid(this.props.commands[7]);
      };

      sketch.mousePressed = () => {
        if(sketch.mouseY > -10 && sketch.mouseY < 390){
          var temp = Math.floor((sketch.mouseY-10)/pixSize) + Math.floor((sketch.mouseX-10)/ pixSize) * (height/pixSize);
        }
        if(paintState){
          colorGrid[temp] = this.state.color;
        }
        if(!paintState){
          colorGrid[temp] = {r:255,g:200,b:0,o:80};
        }
      }

      sketch.keyPressed = () => {
        // console.log(sketch.keyCode, sketch.CONTROL);
        if(sketch.keyCode === sketch.SHIFT){
          paintState = false;
        }
        if(sketch.keyCode === sketch.CONTROL){
          this.setState({image:canvasFrame});
          console.log(this.state.image);
        }
      }
      sketch.keyReleased = () => {
        if(sketch.keyCode === sketch.SHIFT){
          paintState = true;
        }
      }

      const createBlob = () => {
        if(this.state.ready){
          captured = capture.get();
          url = cnv.canvas.toDataURL('image/jpeg', 1.0);
          cnv.canvas.toBlob((blob)=>{
            canvasFrame = blob;
            this.setState({image:blob});
            this.setState({ready:false});
            this.setState({url:url});
          },'image/jpeg', 0.95);
        }
      }

      const grid = (lines) => {
        for(let i = 0; i < width/pixSize; i++){
          for(let j = 0; j < height/pixSize; j++){
            var t = j + (height/pixSize)*i;
            if(lines !== 0){
              sketch.stroke(100);
              sketch.line(0, j*pixSize, width, j*pixSize);
              sketch.line(i*pixSize,0, i*pixSize, height);
              sketch.stroke(colorGrid[t].r,colorGrid[t].g,colorGrid[t].b,100);
            }
            if(lines === 0){
              sketch.stroke(colorGrid[t].r,colorGrid[t].g,colorGrid[t].b,0);
            }
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
        {this.state.menu &&
          <>
            <Container>
              <Button variant="info" className="mr-3">Descargar a mi equipo</Button>
              <Button variant="info" onClick={this.writePhoto}>Volver</Button>
              <UploadPhoto
                image={this.state.image}
              />
            </Container>
            <Container className="div3">
              <Container className="preview-avatar">
                <Image id="preview-avatar" src={this.state.url}/>
              </Container>
            </Container>
          </>
        }
        {!this.state.menu &&
          <>
            <Container>
              <Container>
                <Button className="mr-3" variant="warning" onClick={this.writePhoto}>Listo</Button>
              </Container>
            </Container>
          </>
        }
      </>
    );
  }
}

export default PixelArt;
