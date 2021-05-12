import React from 'react';
import p5 from 'p5';

import mapa from '../assets/images/mapa/mapa.png'
import fondo from '../assets/images/mapa/fondo.jpg'
import targ from '../assets/images/mapa/target.png'

import casa1 from '../assets/images/mapa/1.png'
import casa2 from '../assets/images/mapa/2.png'
import casa3 from '../assets/images/mapa/3.png'
import casa4 from '../assets/images/mapa/4.png'
import casa5 from '../assets/images/mapa/5.png'
import casa6 from '../assets/images/mapa/6.png'
import casa7 from '../assets/images/mapa/7.png'
import casa8 from '../assets/images/mapa/8.png'
import casa9 from '../assets/images/mapa/9.png'
import casa10 from '../assets/images/mapa/10.png'
import casa11 from '../assets/images/mapa/11.png'
import casa12 from '../assets/images/mapa/12.png'
import casa13 from '../assets/images/mapa/13.png'
import casa14 from '../assets/images/mapa/14.png'
import casa15 from '../assets/images/mapa/15.png'
import casa16 from '../assets/images/mapa/16.png'
import casa17 from '../assets/images/mapa/17.png'
import casa18 from '../assets/images/mapa/18.png'

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
    // current: this.props.userInfo.progress.current
  };

  onClick = (value) => {
    this.props.onClick(value);
  }
  // onTime = (value) => {
  //   this.props.onTime(value);
  // }

  componentDidMount(){

    const code = (sketch) => {

      var date = new Date();

      let cnv
      let width = 400
      let height = 400
      let map
      let target
      let background
      let gridSpace = 10
      let tPosX = 0
      let tPosY = 0

      let house1
      let house2
      let house3
      let house4
      let house5
      let house6
      let house7
      let house8
      let house9
      let house10
      let house11
      let house12
      let house13
      let house14
      let house15
      let house16
      let house17
      let house18

      let islandHS = [[30,8],[31,8],[32,8],[30,9],[31,9],[32,9]]
      let islandInfo = ["Islandia es un pais de la union europea","Norte de Europa"]
      let japanHS = [[70,13],[71,13],[70,14],[70,15],[71,15],[69,16],[70,16],[71,16]]
      let japanInfo = ["Japón es una isla en el oceano Pacífico","Asia del Este"]
      let indiaHS = [[54,19],[55,19],[56,19],[57,19],[58,19],[59,19],[55,20],[56,20],[57,20],[58,20],[55,21],[56,21],[57,21],[58,21],[56,22],[57,22],[56,23],[57,23],[57,24]]
      let indiaInfo = ["India es un pais multicultural de Asia","Asia Central"]

      let hotspots = [islandHS, japanHS, indiaHS]
      let hsInfo = [islandInfo, japanInfo, indiaInfo]

      sketch.preload = () => {
         map = sketch.loadImage(mapa)
         background = sketch.loadImage(fondo)
         target = sketch.loadImage(targ)

         house1 = sketch.loadImage(casa1)
         house2 = sketch.loadImage(casa2)
         house3 = sketch.loadImage(casa3)
         house4 = sketch.loadImage(casa4)
         house5 = sketch.loadImage(casa5)
         house6 = sketch.loadImage(casa6)
         house7 = sketch.loadImage(casa7)
         house8 = sketch.loadImage(casa8)
         house9 = sketch.loadImage(casa9)
         house10 = sketch.loadImage(casa10)
         house11 = sketch.loadImage(casa11)
         house12 = sketch.loadImage(casa12)
         house13 = sketch.loadImage(casa13)
         house14 = sketch.loadImage(casa14)
         house15 = sketch.loadImage(casa15)
         house16 = sketch.loadImage(casa16)
         house17 = sketch.loadImage(casa17)
         house18 = sketch.loadImage(casa18)

         // this.setState(state => ({
         //   current: this.props.userInfo.progress.current
         // }))
      }

      sketch.setup = () => {
        sketch.imageMode(sketch.CENTER)

        width = sketch.displayWidth
        height = sketch.displayHeight
        cnv = sketch.createCanvas(sketch.windowWidth - 20, sketch.windowHeight,sketch.GLSL)
        cnv.parent('canvasP5home')
        cnv.id('canvasHomeMap')
        cnv.style('z-index','-1000')
        cnv.style('overflow-x','hidden')
        cnv.resize(width,height)
        tPosX = width/2
        tPosY = height/2

        background.resize(width,height)
        map.resize(width+150,height+100)
        house1.resize(width*0.036,height*0.06)
        house2.resize(width*0.03,height*0.07)
        house3.resize(width*0.045,height*0.045)
        house4.resize(width*0.045,height*0.045)
        house5.resize(width*0.04,height*0.04)
        house6.resize(width*0.04,height*0.052)
        house7.resize(width*0.04,height*0.052)
        house8.resize(width*0.045,height*0.045)
        house9.resize(width*0.045,height*0.045)
        house10.resize(width*0.045,height*0.045)
        house11.resize(width*0.037,height*0.05)
        house12.resize(width*0.038,height*0.062)
        house13.resize(width*0.04,height*0.064)
        house14.resize(width*0.041,height*0.065)
        house15.resize(width*0.041,height*0.065)
        house16.resize(width*0.041,height*0.065)
        house17.resize(width*0.041,height*0.085)
        house18.resize(width*0.045,height*0.055)
      };

      sketch.draw = () => {

        this.setState({commands:parser(this.props.commands)})
        tPosY = -sketch.map(this.state.commands[0],0,90,0,height/2) + sketch.map(this.state.commands[1],0,90,0,height/2) + (height/2)
        tPosX = -sketch.map(this.state.commands[2],0,180,0,width/2) + sketch.map(this.state.commands[3],0,180,0,width/2) + (width/2)
        sketch.background(0)

        sketch.image(background,width/2,height/2,width,height)
        sketch.push()
        let time = sketch.timeGet()
        this.props.setTime(time)
        if(time === 'day'){
          sketch.tint(255,255,255,255)
        }
        if(time === 'night'){
          sketch.tint(10,10,10,255)
        }
        sketch.image(map,(width/2)+22,(height/2)-32,width+484,height+140)
        sketch.pop()
        sketch.image(target,tPosX,tPosY,70,70)
        if(sketch.targetCheck(this.state.commands[3]-this.state.commands[2],this.state.commands[1]-this.state.commands[0])){
          sketch.strokeWeight(4);
          sketch.stroke(224,37,118)
          sketch.line(0, tPosY, tPosX-34, tPosY)
          sketch.line(tPosX+34, tPosY, width, tPosY)
          sketch.line(tPosX, 0, tPosX,tPosY-34)
          sketch.line(tPosX, tPosY+34, tPosX, height)
          sketch.strokeWeight(1);
        }

        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house1,width*0.17,height*0.29,width*0.036,height*0.06)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house2,width*0.22,height*0.36,width*0.03,height*0.07)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house3,width*0.28,height*0.33,width*0.045,height*0.045)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house4,width*0.24,height*0.48,width*0.045,height*0.045)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house5,width*0.32,height*0.6,width*0.04,height*0.04)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house6,width*0.35,height*0.67,width*0.04,height*0.052)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house7,width*0.53,height*0.59,width*0.04,height*0.052)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house8,width*0.56,height*0.5,width*0.04,height*0.052)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house9,width*0.53,height*0.3,width*0.04,height*0.052)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house10,width*0.49,height*0.32,width*0.04,height*0.052)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house11,width*0.54,height*0.18,width*0.037,height*0.05)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house12,width*0.6,height*0.28,width*0.038,height*0.062)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house13,width*0.74,height*0.43,width*0.04,height*0.064)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house14,width*0.82,height*0.36,width*0.041,height*0.065)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house15,width*0.83,height*0.19,width*0.041,height*0.065)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house16,width*0.83,height*0.57,width*0.041,height*0.065)
        sketch.pop()
        sketch.push()
        if(this.state.current !== 1){
          sketch.tint(80,80,80,100)
        }
        sketch.image(house17,width*0.75,height*0.56,width*0.041,height*0.085)
        sketch.pop()
        sketch.push()
        sketch.tint(80,80,80,100)
        sketch.image(house18,width*0.38,height*0.1,width*0.045,height*0.055)
        sketch.pop()
      };

      sketch.equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      sketch.windowResized = () => {
        // width = sketch.windowWidth;
        // height = sketch.windowHeight;
        // cnv.resize(width,height);
      }

      sketch.grid = () => {
          for(let i = 0; i < width/gridSpace; i++){
            for(let j = 0; j < height/gridSpace; j++){
              sketch.line(i * gridSpace, 0, i * gridSpace, height);
              sketch.line(0, j * gridSpace, width, j*gridSpace);
          }
        }
      };

      sketch.timeGet = () => {
        let hour = date.getHours()
        if(hour >= 22 || hour < 6){
          return 'night'
        }
        return 'day'
      }

      sketch.targetCheck = (x,y) => {
        let places = [{x: 114, y: 1}]
        for (let coor of places){
          if(x === coor.x && y === coor.y){
            this.props.setPlace('INDONESIA')
            return true
          }
          this.props.setPlace('')
          return false
        }
      }

      sketch.mousePressed = () => {
        let x = sketch.mouseX
        let y = sketch.mouseY

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
