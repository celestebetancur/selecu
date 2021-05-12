import React from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'

import andre from '../assets/audio/andre.mp3'

let s = undefined;

class Readalong extends React.Component {

state = {};

componentDidMount(){

  const code = (sketch) => {

    let word = 0;
    let audio;
    let currentTimeMs;
    let offsets = this.props.offsets;
    let text = this.props.text;
    let pText = text.split(' ');
    let p = [];

    sketch.setup = () => {
      for(let i = 0; i < pText.length; i++){
        let t = sketch.createSpan(pText[i]);
        sketch.createSpan(' ');
        p.push(t);
      }
    };

    sketch.draw = () => {
      console.log(this.player.howler.seek())
      // for(let i = 0; i < pText.length; i++){
      //   p[i].removeAttribute('style');
      //   if(currentTimeMs >= Math.round(offsets[i]) && currentTimeMs < Math.round(offsets[i+1])){
      //     word = i;
      //   }
      // }
      // p[word].style('color','#0000ff');
      // p[word].style('text-decoration','underline');
      // p[word].style('background-color','lightgray');
      // if(word >= 2){
      //   p[word - 2].removeAttribute('style');
      // }
    };
  };
  s = new p5(code,'defaultP5');
}
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <ReactHowler
        src={andre}
        playing={true}
        ref={(ref) => (this.player = ref)}
      />
    );
  }
}

export default Readalong;
