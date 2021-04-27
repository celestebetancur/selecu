import React, {Suspense} from 'react';
import p5 from 'p5';
import UploadPhoto from '../../components/uploadPhoto'

import ColorPicker from './colorPicker'

import {AuthCheck} from 'reactfire'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import '../../styles/milecu.scss'

let s = undefined;

class PixelArt extends React.Component {

  state = {
    commands: [],
    setGrid: false,
    camaraState: false,
    usePhoto: false,
    color:{},
    image: {},
    ready: false,
    url: '',
    drawing: false,
    upload: false,
    buttonColor1: '',
    buttonColor2: '',
    buttonColor3: '',
    buttonColor4: ''
  };

  setColor = (value) => {
    this.setState(state => ({
      color:value
    }));
  }
  setButtonColor1 = () => {
    this.setState(state => ({
      buttonColor1: {r: this.state.color.r,g: this.state.color.g,b: this.state.color.b, o:this.state.color.o},
    }));
  }
  setButtonColor2 = () => {
    this.setState(state => ({
      buttonColor2: {r: this.state.color.r,g: this.state.color.g,b: this.state.color.b, o:this.state.color.o},
    }));
  }
  setButtonColor3 = () => {
    this.setState(state => ({
      buttonColor3: {r: this.state.color.r,g: this.state.color.g,b: this.state.color.b, o:this.state.color.o},
    }));
  }
  setButtonColor4 = () => {
    this.setState(state => ({
      buttonColor4: {r: this.state.color.r,g: this.state.color.g,b: this.state.color.b, o:this.state.color.o},
    }));
  }
  setCommands = (value) => {
    this.setState({commands:value});
  }
  reboot = () => {
    this.setState({camaraState:true},()=>{
      this.setState({usePhoto:false});
      this.setState({url:''});
      this.setState({drawing:false});
    });
  }
  usePhotoToDraw = () => {
    this.setState({usePhoto:true})
    this.setState({camaraState:false});
  }
  setGrid = () => {
    this.setState({setGrid:!this.state.setGrid});
  }
  setReady = () => {
    this.setState({ready:true});
  }

  componentDidMount(){

    const code = (sketch) => {

      let [width,height,w,h]  = [400,400,600,400];
      let [x,y] = [-100,0];
      let pixSize = 5;
      let paintState = true;
      let cnv;
      let colorGrid = [];

      let url;
      let canvasFrame;
      let capture;
      let pix;
      let captured = sketch.createImage(400,400);
      let imageCaptured = false;

      sketch.setup = () => {
        capture = sketch.createCapture(sketch.VIDEO, () => {
          fillColorGrid(pixSize);
        });
        cnv = sketch.createCanvas(width, height);
        cnv.parent('divPixelArt');
        cnv.id('canvasPixelArt');;
        capture.size(400, 400);
        capture.hide();
      };

      sketch.draw = () => {
        if(this.props.commands[6] === 1){
          this.setState({camaraState:true})
        }
        if(this.props.commands[6] === 0){
          this.setState({camaraState:false})
        }
        sketch.background(255);
        sketch.image(captured, x, y, w, h);
        if(this.state.camaraState){
          captured = capture.get();
        }
        if(!this.state.camaraState){
          sketch.fill(255);
          sketch.rect(0,0,400,400);
        }
        if(this.state.usePhoto){
          sketch.image(captured, x, y, w, h);
        }
        if(gridStep(this.props.commands[7]) !== pixSize){
          pixSize = gridStep(this.props.commands[7]);
          fillColorGrid(pixSize);
        }
        sketch.image(capture, -400, 0, 400 , 400);
        if(this.state.setGrid || this.props.commands[8] === 1){
          grid();
        }
        createBlob();
        if(this.state.drawing){
          sketch.fill(255);
          sketch.rect(0,0,400,400);
        }
      };

      sketch.mouseDragged = () => {

      }

      sketch.mousePressed = () => {
        if(sketch.mouseY > 0 && sketch.mouseY < 400){
          var temp = Math.floor((sketch.mouseY)/pixSize) + Math.floor((sketch.mouseX)/ pixSize) * (height/pixSize);
        }
        if(paintState){
          colorGrid[temp] = this.state.color;
        }
        if(!paintState){
          colorGrid[temp] = {r:255,g:255,b:255,o:0};
        }
      }

      sketch.keyPressed = () => {
        if(sketch.keyCode === sketch.SHIFT){
          paintState = false;
        }
        if(sketch.keyCode === sketch.CONTROL){
          this.setState({image:canvasFrame});
        }
      }
      sketch.keyReleased = () => {
        if(sketch.keyCode === sketch.SHIFT){
          paintState = true;
        }
      }

      const createBlob = () => {
        if(this.state.ready){
          // captured = capture.get();
          url = cnv.canvas.toDataURL('image/jpeg', 1.0);
          cnv.canvas.toBlob((blob)=>{
            canvasFrame = blob;
            this.setState({image:blob});
            this.setState({ready:false});
            this.setState({url:url});
            this.setState({drawing:true});
          },'image/jpeg', 0.95);
        }
      }

      const gridStep = (val) => {
        let size = 1;
        switch (val){
          case 1:
            return 5;
            break;
          case 2:
            return 8;
            break;
          case 3:
            return 10;
            break;
          case 4:
            return 16;
            break;
          case 5:
            return 20;
            break;
          case 6:
            return 25;
            break;
          case 7:
            return 40;
            break;
          case 8:
            return 50;
            break;
          case 9:
            return 80;
            break;
          case 10:
            return 100;
            break;
          case 11:
            return 200;
            break;
          default:
            return 20;
        }
      }

      const fillColorGrid = (val) => {
        for(let i = 0; i < width/val; i++){
          for(let j = 0; j < height/val; j++){
            colorGrid.push({r:255,g:255,b:255,o:0});
          }
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
    s = new p5(code);
  }

  componentWillUnmount(){
    s.remove();
  }


  render(){
    return (
          <Container id="pixelapp-main-container" fluid>
            <div className="savedColor one-color">
              <button
                onDragOver={e => e.preventDefault()}
                onDrop={this.setButtonColor1}
                onClick={() => this.setColor(this.state.buttonColor1)}
                className='button-pixelapp one-color'
                style={{background:`rgba(${this.state.buttonColor1.r},${this.state.buttonColor1.g},${this.state.buttonColor1.b})`,opacity:`${this.state.buttonColor1.o/255.0}`}}>
              </button>
            </div>
            <div className='savedColor two-color'>
              <button
                onDragOver={e => e.preventDefault()}
                onDrop={this.setButtonColor2}
                onClick={() => this.setColor(this.state.buttonColor2)}
                className='button-pixelapp'
                style={{background:`rgba(${this.state.buttonColor2.r},${this.state.buttonColor2.g},${this.state.buttonColor2.b})`,opacity:`${this.state.buttonColor2.o/255.0}`}}>
              </button>
            </div>
            <div className='savedColor three-color'>
              <button
                onDragOver={e => e.preventDefault()}
                onDrop={this.setButtonColor3}
                onClick={() => this.setColor(this.state.buttonColor3)}
                className='button-pixelapp'
                style={{background:`rgba(${this.state.buttonColor3.r},${this.state.buttonColor3.g},${this.state.buttonColor3.b})`,opacity:`${this.state.buttonColor3.o/255.0}`}}>
              </button>
            </div>
            <div className='savedColor four-color'>
              <button
                onDragOver={e => e.preventDefault()}
                onDrop={this.setButtonColor4}
                onClick={() => this.setColor(this.state.buttonColor4)}
                className='button-pixelapp'
                style={{background:`rgba(${this.state.buttonColor4.r},${this.state.buttonColor4.g},${this.state.buttonColor4.b})`,opacity:`${this.state.buttonColor4.o/255.0}`}}>
              </button>
            </div>
            <Row />
            <Row>
              <Col className="justify-content-center" style={{display:'flex'}}>
                <div id="divPixelArt"></div>
              </Col>
              <Col className="justify-content-center" style={{display:'flex'}}>
                <Row>
                  <ColorPicker
                    setColor={this.setColor}
                  />
                </Row>
                <Row>
                {this.state.url !== '' &&
                  <Container>
                    <Image id="preview-avatar" src={this.state.url} />
                    <UploadPhoto
                      image={this.state.image}
                    />
                  </Container>
                }
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center" style={{marginTop:'15%'}}>
            <Nav>
              {!this.state.usePhoto &&
                <Nav.Item>
                  <Button variant="info" onClick={() => this.setState({camaraState:!this.state.camaraState})}>Cámara</Button>
                </Nav.Item>
              }
              {this.state.usePhoto &&
                <>
                  <Nav.Item>
                    <Button variant="info" onClick={() =>this.setReady()}>Dibujo listo</Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="info" onClick={() => this.reboot()}>Eliminar toma</Button>
                  </Nav.Item>
                </>
              }
              <Nav.Item>
                <Button variant="info" onClick={() => this.setGrid()}>Guía de dibujo</Button>
              </Nav.Item>
              {this.state.camaraState &&
                <Nav.Item>
                  <Button variant="info" onClick={() => this.usePhotoToDraw()}>Tomar foto</Button>
                </Nav.Item>
              }
              <Nav.Item>
                <Nav.Link href="#/home" variant="info">Regresar al mapa</Nav.Link>
              </Nav.Item>
            </Nav>
            </Row>
          </Container>
    );
  }
}



export default PixelArt;
