import React from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'
import {connect} from 'react-redux'

import {loginFirstStage, userRollPass} from '../actions'

import { shuffle } from '../helpers'

import base from '../assets/images/landing/Base.png'
import baseGen from '../assets/images/landing/baseGen.png'
import fichaCentral from '../assets/images/landing/Ficha central.png'
import amarilla from '../assets/images/landing/amarilla.png'
import verde from '../assets/images/landing/verde.png'
import azul from '../assets/images/landing/azul.png'
import fucsia from '../assets/images/landing/fucsia.png'
import agua from '../assets/images/landing/agua.png'
import tierra from '../assets/images/landing/tierra.png'
import fuego from '../assets/images/landing/fuego.png'
import aire from '../assets/images/landing/aire.png'
import tablero from '../assets/images/landing/tableroBack.png'

import brickAudio from '../assets/audio/brick.m4a'

let s = undefined;

class HomePuzzle extends React.Component {

  state = {
    play: false,
    passKeys: [
      [3,2,1,0], //Gestores
      [0,1,3,2], //Mentores
      [0,1,2,3]  //tercero
    ]
  };

  introPassed = () => {
    this.props.loginFirstStage(true);
  }

  componentDidMount(){
    const code = (sketch) => {

      p5.disableFriendlyErrors = true; // disables FES

      let img;
      let baseG;
      let centro;
      let pngFichas = [];
      let pngHotspots = [];
      let back;
      let end = false;

      let width = 500;
      let height = 400;
      let windowWidth = 0;
      let cnv = undefined;
      let keys = 8;
      let wCells = 5;
      let hCells = 3;

      // let walls = [];
      let stepSize = width/wCells;
      const maxStepSize = stepSize;
      let activeCube = 1;
      const sizeConst = 16;

      let positionGrid = [];
      for(let i = 0; i < hCells; i++){
        for(let j = 0; j < wCells; j++){
          positionGrid.push([j,i]);
        }
      }
      let hotspotsShuffle = shuffle([1,3,5,9,11,13]);
      let hotspots = hotspotsShuffle.splice(0,4);

      let wallsGrid = [[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[1,0],[1,0],[1,0],[1,1],[0,0],[0,0],[1,1],[1,0],[1,0],[0,1],[1,0],[0,0],[0,1],[0,1],[1,0],[1,0], [1,0],[0,1],[0,0],[1,1],[0,1],[1,0],[1,1],[1,0],[0,0],[0,0],[1,1],[0,0],[0,1],[0,0],[1,0], [0,0],[1,1],[1,1],[1,0],[1,0],[0,0],[0,1],[1,1],[1,1],[0,0],[1,1],[0,1],[1,1],[1,1],[1,1], [0,0],[0,1],[0,0],[1,1],[1,0],[0,1],[0,1],[0,0],[1,0],[0,1],[0,1],[0,0],[0,1],[0,1],[1,0], [1,0],[0,0],[1,0],[0,1],[1,0],[0,0],[0,1],[1,0],[0,1],[1,0],[1,0],[1,1],[1,0],[1,0],[1,0], [1,1],[1,1],[0,1],[0,0],[0,1],[1,0],[1,0],[1,0],[0,0],[1,1],[1,0],[0,0],[0,0],[0,1],[1,1], [0,0],[0,1],[1,1],[1,1],[0,1],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[0,0],[0,0],[1,0], [1,0],[0,0],[0,1],[0,1],[1,1],[1,0],[1,0],[0,1],[0,1],[0,1],[1,0],[1,0],[1,1],[1,1],[1,0], [0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[1,0],[1,0]];
      //Pseudorandom maze
      /*for(let i = 0; i < positionGrid.length; i++){
        wallsGrid.push([Math.floor(Math.random()*2),Math.floor(Math.random()*2)]);
      }*/

      let currentPos = shuffle([0,2,4,6,8,10,12,14]);
      // let colors = [{red: 255, green:0, blue:0},{red: 0, green:255, blue:0},{red: 0, green:0, blue:255},{red: 255, green:255, blue:0},{red: 255, green:0, blue:0},{red: 0, green:255, blue:0},{red: 0, green:0, blue:255},{red: 255, green:255, blue:0}]

      sketch.preload = () => {

        back = sketch.loadImage(tablero);
        img = sketch.loadImage(base);
        baseG = sketch.loadImage(baseGen);
        centro = sketch.loadImage(fichaCentral);
        pngFichas.push(sketch.loadImage(fucsia));
        pngFichas.push(sketch.loadImage(verde));
        pngFichas.push(sketch.loadImage(azul));
        pngFichas.push(sketch.loadImage(amarilla));
        pngFichas.push(sketch.loadImage(fucsia));
        pngFichas.push(sketch.loadImage(verde));
        pngFichas.push(sketch.loadImage(azul));
        pngFichas.push(sketch.loadImage(amarilla));

        pngHotspots.push(sketch.loadImage(agua));
        pngHotspots.push(sketch.loadImage(aire));
        pngHotspots.push(sketch.loadImage(fuego));
        pngHotspots.push(sketch.loadImage(tierra));

      }

      sketch.setup = () => {
        hotspotsShuffle = shuffle([1,3,5,9,11,13]);
        hotspots = hotspotsShuffle.splice(0,4);
        windowWidth = sketch.windowWidth;
        stepSize = windowWidth/sizeConst < maxStepSize ? windowWidth/sizeConst : maxStepSize;
        if(sketch.deviceOrientation === sketch.PORTRAIT || windowWidth < sketch.windowHeight){
          stepSize *= 2;
        }
        width = stepSize*wCells;
        height = stepSize*hCells;
        cnv = sketch.createCanvas(width+stepSize*2,height+stepSize*1.2);
        cnv.id('canvasP5Puzzle');
        cnv.parent("divP5Puzzle");
      };

      sketch.draw = () => {
        cnv.class(`canvas-${this.props.onMenu}`);
        for (let i = 0; i < this.state.passKeys.length; i++){
          checkCode(this.state.passKeys[i],i);
        }
        sketch.background(255,255,255,0);
        sketch.image(back,0,0,cnv.width, cnv.height);
        sketch.push();
        sketch.translate((cnv.width - stepSize*wCells)/2,(cnv.height - stepSize*hCells)/2);
        sketch.image(img,0,0, stepSize*wCells, stepSize*hCells);
        for(let i = 0; i < positionGrid.length; i++){
          sketch.image(baseG,positionGrid[i][0]*stepSize,positionGrid[i][1]*stepSize,stepSize,stepSize);
          if(i === 7) {
            sketch.image(centro,positionGrid[i][0]*stepSize,positionGrid[i][1]*stepSize,stepSize,stepSize);
          }
        }

        for(let i = 0; i < keys/2; i++){
          sketch.image(pngHotspots[i],positionGrid[hotspots[i]][0]*stepSize,positionGrid[hotspots[i]][1]*stepSize,stepSize,stepSize);
          // sketch.rect(positionGrid[hotspots[i]][0]*stepSize,positionGrid[hotspots[i]][1]*stepSize,stepSize,stepSize);
        }

        for(let i = 0; i < keys; i++){
          // sketch.stroke(255);
          for(let i = 0; i < keys; i++){
            if(activeCube === i){
              cubeDrawImg(pngFichas[i],positionGrid[currentPos[i]],true);
            } else {
              cubeDrawImg(pngFichas[i],positionGrid[currentPos[i]],false);
            }
          }
        }
        sketch.pop();
        /*sketch.noStroke();
        // sketch.fill(88, 184, 204);
        sketch.fill(255);
        sketch.rect(0, 0,width-1,height-1);
        sketch.textSize(16);
        sketch.textAlign(sketch.CENTER);
        sketch.fill(0);
        sketch.stroke(0);
        sketch.strokeWeight(0);
        sketch.line(0,0,stepSize*wCells,0);
        sketch.line(stepSize*wCells,0,stepSize*wCells,stepSize*hCells);
        sketch.line(0,0,0,stepSize*hCells);
        sketch.line(0,stepSize*hCells,stepSize*wCells,stepSize*hCells);
        sketch.stroke(1);
        // for(let i = 0; i < positionGrid.length; i++){
          // sketch.text(i,positionGrid[i][0]*stepSize,positionGrid[i][1]*stepSize);
        // }
        for(let i = 0; i < keys/2; i++){
          sketch.fill(200);
          sketch.noStroke();
          sketch.rect(positionGrid[hotspots[i]][0]*stepSize,positionGrid[hotspots[i]][1]*stepSize,stepSize,stepSize);
          sketch.fill(0);
          sketch.text(i,positionGrid[hotspots[i]][0]*stepSize + (stepSize/2),positionGrid[hotspots[i]][1]*stepSize+ (stepSize/2));
        }
        sketch.stroke(255);
        // for(let i = 0; i < positionGrid.length; i++){
        for(let i = 0; i < wCells*hCells; i++){
          if(wallsGrid[i][0] === 1){
            sketch.line(positionGrid[i][0]*stepSize+stepSize,positionGrid[i][1]*stepSize,positionGrid[i][0]*stepSize+stepSize,(positionGrid[i][1]*stepSize)+stepSize);
          }
          if(wallsGrid[i][1] === 1){
            sketch.line(positionGrid[i][0]*stepSize,positionGrid[i][1]*stepSize+stepSize,(positionGrid[i][0]*stepSize)+stepSize,(positionGrid[i][1]*stepSize)+stepSize);
          }
        }

        for(let i = 0; i < keys; i++){
          sketch.stroke(255);
          cubeDraw({red:255,green:121,blue:0},positionGrid[7],true);
          for(let i = 0; i < keys; i++){
            if(activeCube === i){
              cubeDraw(colors[i],positionGrid[currentPos[i]],true);
            } else {
              cubeDraw(colors[i],positionGrid[currentPos[i]],false);
            }
          }
        }*/
      };

      sketch.windowResized = () => {
        // windowWidth = sketch.windowWidth;
        // windowHeight = sketch.windowHeight;
        // stepSize = windowWidth/sizeConst < maxStepSize ? windowWidth/sizeConst : maxStepSize;
        if(sketch.deviceOrientation === sketch.PORTRAIT  || windowWidth < sketch.windowHeight){
          stepSize = sketch.windowWidth/6;
          // stepSize *= 0;
          // sketch.resizeCanvas(sketch.windowWidth,sketch.windowHeight);
        }
        // width = stepSize*wCells;
        // height = stepSize*hCells;

        cnv.resize(sketch.windowWidth,sketch.windowHeight);
        // stepSize = cnv.width *0.12;
      }

      sketch.keyPressed = () =>{
        // console.log((Math.floor(currentPos[activeCube]/15)*15)+Math.floor(currentPos[activeCube])%15,currentPos[activeCube]);
        if(sketch.keyCode === sketch.DOWN_ARROW){
          if(currentPos[activeCube] < (positionGrid.length-(width/stepSize))){
            if(wallsGrid[currentPos[activeCube]][1] === 0){
              if(checkPosFree(currentPos[activeCube]+width/stepSize)){
                  currentPos[activeCube] += width/stepSize;
                  this.setState({play: true});
              }
            }
          }
        }
        if(sketch.keyCode === sketch.UP_ARROW){
          if(currentPos[activeCube] >= width/stepSize){
            if((wallsGrid[currentPos[activeCube]-width/stepSize][1] === 0)){
              if(checkPosFree(currentPos[activeCube]-width/stepSize)){
                currentPos[activeCube] -= width/stepSize;
                this.setState({play: true});
              }
            }
          }
        }
        if(sketch.keyCode === sketch.LEFT_ARROW){
          if(currentPos[activeCube] % width/stepSize !== 0){
            if(wallsGrid[currentPos[activeCube]-1][0] === 0){
              if(checkPosFree(currentPos[activeCube]-1)){
                currentPos[activeCube] --;
                this.setState({play: true});
              }
            }
          }
        }
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          if((currentPos[activeCube]-(width/stepSize-1)) % width/stepSize !== 0){
            if(wallsGrid[currentPos[activeCube]][0] === 0){
              if(checkPosFree(currentPos[activeCube]+1)){
                currentPos[activeCube] ++;
                this.setState({play: true});
              }
            }
          }
        }
        if(sketch.keyCode >= 49 && sketch.keyCode <= 53){
          activeCube = sketch.keyCode - 49;
        }
      }

      sketch.mousePressed = () => {
        for(let i = 0; i < keys; i++){
          if(sketch.mouseX > positionGrid[currentPos[i]][0]*stepSize &&
          sketch.mouseX < positionGrid[currentPos[i]][0]*stepSize + stepSize &&
          sketch.mouseY > positionGrid[currentPos[i]][1]*stepSize &&
          sketch.mouseY < positionGrid[currentPos[i]][1]*stepSize + stepSize){
            activeCube = i;
          }
        }
      }

      sketch.mouseDragged = () => {
        for(let i = 0; i < keys; i++){
          if(sketch.mouseX > positionGrid[currentPos[i]][0]*stepSize &&
            sketch.mouseX < positionGrid[currentPos[i]][0]*stepSize + stepSize &&
            sketch.mouseY > positionGrid[currentPos[i]][1]*stepSize &&
            sketch.mouseY < positionGrid[currentPos[i]][1]*stepSize + stepSize){
            activeCube = i;
          }
        }
        if(sketch.mouseX > sketch.pmouseX){
          if((currentPos[activeCube]-(width/stepSize-1)) % width/stepSize !== 0){
            if(wallsGrid[currentPos[activeCube]][0] === 0){
              if(checkPosFree(currentPos[activeCube]+1)){
                for(let i = 0; i < wCells; i++){
                  if(sketch.mouseX > stepSize*i && sketch.mouseX < stepSize*(i+1)){
                    while(Math.floor(currentPos[activeCube]%wCells)<i){
                      if(currentPos[activeCube]+1){
                        currentPos[activeCube]++;
                        this.setState({play: true});
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if(sketch.mouseX < sketch.pmouseX){
          if(currentPos[activeCube] % width/stepSize !== 0){
            if(wallsGrid[currentPos[activeCube]-1][0] === 0){
              if(checkPosFree(currentPos[activeCube]-1)){
                for(let i = 0; i < wCells; i++){
                  if(sketch.mouseX > stepSize*i && sketch.mouseX < stepSize*(i+1)){
                    while(Math.floor(currentPos[activeCube]%wCells)>i){
                      currentPos[activeCube]--;
                      this.setState({play: true});
                    }
                  }
                }
              }
            }
          }
        }
        if(sketch.mouseY > sketch.pmouseY){
          if(currentPos[activeCube] < (positionGrid.length-(width/stepSize))){
            if(wallsGrid[currentPos[activeCube]][1] === 0){
              if(checkPosFree(currentPos[activeCube]+width/stepSize)){
                for(let i = 0; i < hCells; i++){
                  if(sketch.mouseY > stepSize*i && sketch.mouseY < stepSize*(i+1)){
                    while(Math.floor(currentPos[activeCube]/wCells)<i){
                      currentPos[activeCube]+= width/stepSize;
                      this.setState({play: true});
                    }
                  }
                }
              }
            }
          }
        }
        if(sketch.mouseY < sketch.pmouseY){
          if(currentPos[activeCube] >= width/stepSize){
            if((wallsGrid[currentPos[activeCube]-width/stepSize][1] === 0)){
              if(checkPosFree(currentPos[activeCube]-width/stepSize)){
                for(let i = 0; i < hCells; i++){
                  if(sketch.mouseY > stepSize*i && sketch.mouseY < stepSize*(i+1)){
                    while(Math.floor(currentPos[activeCube]/wCells)>i){
                      currentPos[activeCube] -= width/stepSize;
                      this.setState({play: true});
                    }
                  }
                }
              }
            }
          }
        }
        return false;
      }

      // const cubeDraw = (color, pos, active) => {
      //   if(active){
      //     sketch.stroke(255,155,155);
      //   } else {
      //     sketch.stroke(255);
      //   }
      //   sketch.fill(color.red,color.green,color.blue);
      //   sketch.rect(pos[0]*stepSize+2,pos[1]*stepSize+2,stepSize-4,stepSize-4);
      // }

      const cubeDrawImg = (png, pos, active) => {
        if(active){
          sketch.stroke(255,155,155);
        } else {
          sketch.stroke(255);
        }
        sketch.image(png,pos[0]*stepSize+2,pos[1]*stepSize+2,stepSize,stepSize);
      }

      const checkPosFree = (newPos) => {
        for(let i = 0; i < keys; i++){
          if(newPos === currentPos[i] || newPos === 7){
            return false;
          }
        }
        return true;
      }

      const checkCode = (key, id) => {
        let validated = [0,0,0,0];
        for(let i = 0; i < keys; i++){
          if(i < 4){
            if(currentPos[i] === hotspots[key[i]]){
              validated[i] = 1;
            }
          }
          if(i >= 4){
            if(currentPos[i] === hotspots[key[i-4]]){
              validated[i-4] = 1;
            }
          }
        }
        var c = 0;
        for(let i = 0; i < keys; i++){
          if(validated[i] === 1){
            c++;
          }
        }
        if(c === 4){
          this.props.userRollPass(id);
          cnv.style('opacity',0);
          cnv.style('transition','0.5s');
          setTimeout(()=> end = !end,500);
          if(end){
            this.introPassed();
          }
        }
      }

      /*sketch.mousePressed = () => {
        // to work on maze design
        const writer = sketch.createWriter('wallMap.txt');
          var temp = '';
        for(let i = 0; i < wallsGrid.length; i++){
          temp += `[${wallsGrid[i]}],`;
        }
        writer.print(temp);
        writer.close();
        writer.clear();
      }*/

    };
    s = new p5(code,'defaultP5');
  }
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return(
      <ReactHowler
        src={brickAudio}
        playing={this.state.play}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstStageStatus: state.loginFirstStage,
    userRoll: state.userRollPass
  };
}

export default connect(mapStateToProps,{
  loginFirstStage,
  userRollPass
})(HomePuzzle);
