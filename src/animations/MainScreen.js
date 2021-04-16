import React from 'react';
import p5 from 'p5';

import mapa from '../assets/images/mapa/mapa.png'
import fondo from '../assets/images/mapa/fondo.jpg'
import targ from '../assets/images/mapa/target.png'

import {parser} from './commands.js'

import Container from 'react-bootstrap/Container'

let s = undefined;

class MainScreen extends React.Component {

  state = {
    x: 0,
    y: 0,
    genX: 0,
    genY: 0,
    commands: []
  };

  onClick = (value) => {
    this.props.onClick(value);
  }
  // onTime = (value) => {
  //   this.props.onTime(value);
  // }

  componentDidMount(){

    const code = (sketch) => {

      let cnv;
      let width = 400;
      let height = 400;
      let map;
      let target;
      let background;
      let gridSpace = 10;
      let elapsedTime = 0;
      let minutes = 0;
      let seconds = 0;
      let hours = 0;
      let tPosX = 0;
      let tPosY = 0;

      let islandHS = [[30,8],[31,8],[32,8],[30,9],[31,9],[32,9]];
      let islandInfo = ["Islandia es un pais de la union europea","Norte de Europa"];
      let japanHS = [[70,13],[71,13],[70,14],[70,15],[71,15],[69,16],[70,16],[71,16]];
      let japanInfo = ["Japón es una isla en el oceano Pacífico","Asia del Este"];
      let indiaHS = [[54,19],[55,19],[56,19],[57,19],[58,19],[59,19],[55,20],[56,20],[57,20],[58,20],[55,21],[56,21],[57,21],[58,21],[56,22],[57,22],[56,23],[57,23],[57,24]];
      let indiaInfo = ["India es un pais multicultural de Asia","Asia Central"];

      let hotspots = [islandHS, japanHS, indiaHS];
      let hsInfo = [islandInfo, japanInfo, indiaInfo];

      // let scale = 0.2;
      // let sliderScale;
      let genXpos;
      let genYpos;

      sketch.preload = () => {
         map = sketch.loadImage(mapa);
         background = sketch.loadImage(fondo);
         target = sketch.loadImage(targ);
      }

      sketch.setup = () => {
        sketch.imageMode(sketch.CENTER);

        width = sketch.windowWidth;
        height = sketch.windowHeight;
        genXpos = 0;
        genYpos = 0;
        cnv = sketch.createCanvas(sketch.windowWidth - 20, sketch.windowHeight);
        cnv.parent('canvasP5home');
        cnv.id('canvasHomeMap');
        cnv.style('z-index','-1000');
        cnv.resize(width,height);
        tPosX = width/2;
        tPosY = height/2;
      };

      sketch.draw = () => {
        this.setState({commands:parser(this.props.commands)});
        tPosY = -this.state.commands[0] + this.state.commands[1] + (height/2);
        tPosX = -this.state.commands[2] + this.state.commands[3] + (width/2);
        sketch.background(0);

        // sketch.timeGet();

        sketch.image(background,width/2,height/2,width,height);
        sketch.image(map,width/2,(height/2)-50,map.width * ((height-50)/map.height),height-50);
        sketch.image(target,tPosX,tPosY,50,50);
      };

      sketch.equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      sketch.windowResized = () => {
        width = sketch.windowWidth;
        height = sketch.windowHeight;
        cnv.resize(width,height);
      }

      sketch.grid = () => {
          for(let i = 0; i < width/gridSpace; i++){
            for(let j = 0; j < height/gridSpace; j++){
              sketch.line(i * gridSpace, 0, i * gridSpace, height);
              sketch.line(0, j * gridSpace, width, j*gridSpace);
          }
        }
      };

      // sketch.timeGet = () => {
      //   elapsedTime = Math.floor(sketch.millis()/1000.0);
      //   seconds = elapsedTime%60;
      //   minutes = Math.floor(elapsedTime/60);
      //   hours = Math.floor(minutes/60);
      //   this.onTime([hours,minutes,seconds]);
      // }

      sketch.mousePressed = () => {
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        //mini map
        if(x > 20 && x < (20 + map.width * 0.05)
           && y > 20 && y < (20 + map.height * 0.05)){
          genXpos = sketch.map(sketch.mouseX,20,(20+map.width * 0.05),-0.2,0.2);
          genYpos = sketch.map(sketch.mouseY,20,(20+map.height * 0.05),-0.2,0.2);
          this.setState({x: genXpos, y: genYpos});
        }
        // check mouse against grid to return info
        for(let i = 0; i < width/gridSpace; i++){
          for(let j = 0; j < height/gridSpace; j++){
            if(x > i * gridSpace && x < i * gridSpace + gridSpace){
              if(y > j * gridSpace && y < j * gridSpace + gridSpace){
                // console.log(i,j); //debug and info config
                for(let k = 0; k < hotspots.length; k++){
                  for(let h = 0; h < hotspots[k].length; h++){
                    if(sketch.equals(hotspots[k][h],[i,j])){
                      this.onClick(hsInfo[k]);
                    }
                  }
                }
              }
            }
          }
        }
        return [-1,-1];
      }
    }

    s = new p5(code,'defaultP5');
  }

  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <Container id="canvasP5home" fluid>
      </Container>
    );
  }
}

export default MainScreen;
