import React from 'react';
import p5 from 'p5';
import world from '../assets/images/world.png'

import '../styles/home.css'

let s = undefined;

class MainScreen extends React.Component {

  state = {};

  onClick = (value) => {
    this.props.onClick(value);
  }
  onTime = (value) => {
    this.props.onTime(value);
  }

  componentDidMount(){

    const code = (sketch) => {

      let cnv;
      let width = 400;
      let height = 400;
      let map;
      let x = 370;
      let y = 440;
      let xDir = 1;
      let gridSpace = 10;
      let elapsedTime = 0;
      let minutes = 0;
      let seconds = 0;
      let hours = 0;

      let islandHS = [[30,8],[31,8],[32,8],[30,9],[31,9],[32,9]];
      let islandInfo = ["Islandia es un pais de la union europea","Norte de Europa"];
      let japanHS = [[70,13],[71,13],[70,14],[70,15],[71,15],[69,16],[70,16],[71,16]];
      let japanInfo = ["Japón es una isla en el oceano Pacífico","Asia del Este"];
      let indiaHS = [[54,19],[55,19],[56,19],[57,19],[58,19],[59,19],[55,20],[56,20],[57,20],[58,20],[55,21],[56,21],[57,21],[58,21],[56,22],[57,22],[56,23],[57,23],[57,24]];
      let indiaInfo = ["India es un pais multicultural de Asia","Asia Central"];

      let hotspots = [islandHS, japanHS, indiaHS];
      let hsInfo = [islandInfo, japanInfo, indiaInfo];

      sketch.preload = () => {
         map = sketch.loadImage(world);
      }

      sketch.setup = () => {
        width = map.width;
        height = map.height;
        cnv = sketch.createCanvas(width, height);
        cnv.parent('canvasP5');
      };

      sketch.draw = () => {
        sketch.image(map,0,0, width, height);
        // let HS = sketch.grid();
        sketch.timeGet();
      };

      sketch.equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      sketch.grid = () => {
          for(let i = 0; i < width/gridSpace; i++){
            for(let j = 0; j < height/gridSpace; j++){
              sketch.line(i * gridSpace, 0, i * gridSpace, height);
              sketch.line(0, j * gridSpace, width, j*gridSpace);
          }
        }
      };

      sketch.timeGet = () => {
        elapsedTime = Math.floor(sketch.millis()/1000.0);
        seconds = elapsedTime%60;
        minutes = Math.floor(elapsedTime/60);
        hours = Math.floor(minutes/60);
        this.onTime([hours,minutes,seconds]);
      }

      sketch.mousePressed = () => {
        // check mouse against grid to return info
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        for(let i = 0; i < width/gridSpace; i++){
          for(let j = 0; j < height/gridSpace; j++){
            if(x > i * gridSpace && x < i * gridSpace + gridSpace){
              if(y > j * gridSpace && y < j * gridSpace + gridSpace){
                console.log(i,j); //debug and info config
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
    return <div id="canvasP5"></div>;
  }
}

export default MainScreen;
