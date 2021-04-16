import React from 'react';
import p5 from 'p5';

let s = undefined;

class Shader extends React.Component {

  componentDidMount(){

    const code = (sketch) => {

      let shader;
      let w;
      let h;

      sketch.preload = () => {
        w = sketch.windowWidth;
        h = sketch.windowHeight;
        shader = sketch.loadShader(this.props.vert, this.props.frag);
      }
      sketch.setup = () => {
        let cnv = sketch.createCanvas(w,h,sketch.WEBGL);
        cnv.position(0,0);
        sketch.noStroke();
        cnv.style('z-index','-1000');
        cnv.parent('canvasParentBH');
        cnv.id('shader-canvas');
      }
      sketch.draw = () => {
        shader.setUniform('u_resolution', [w, h]);
        shader.setUniform('iTime',sketch.millis()/1000);
        sketch.shader(shader);
        sketch.rect(0,0,w, h);
      }
      sketch.onWindowResized = () => {
        w = sketch.windowWidth;
        h = sketch.windowHeight;
        shader.setUniform('u_resolution', [w, h]);
      }
    };
    s = new p5(code,'defaultP5');
  }
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return(
      <></>
    );
  }
}

export default Shader;
