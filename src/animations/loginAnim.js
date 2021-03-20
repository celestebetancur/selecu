import React from 'react';
import p5 from 'p5';
import vert from './shader.vert'
import frag from './shader.frag'

let s = undefined;

class LoginAnim extends React.Component {

  componentDidMount(){


    const code = (sketch) => {

      let mandel;
      let w;
      let h;

      sketch.preload = () => {
        w = sketch.windowWidth;
        h = sketch.windowHeight;
        mandel = sketch.loadShader(vert, frag);
        console.log(mandel);
      }
      sketch.setup = () => {
        let cnv = sketch.createCanvas(w,h,sketch.WEBGL);
        cnv.position(0,0);
        sketch.noStroke();
        cnv.style('z-index','-1000');
      }
      sketch.draw = () => {
        mandel.setUniform('u_resolution', [w, h]);
        mandel.setUniform('iTime',sketch.millis()/1000);
        sketch.shader(mandel);
        sketch.rect(0,0,w, h);
      }
      sketch.onWindowResized = () => {
        w = sketch.windowWidth;
        h = sketch.windowHeight;
      }
    };
    s = new p5(code,'defaultP5');
  }
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return(
      <div
      />
    );
  }
}

export default LoginAnim;
