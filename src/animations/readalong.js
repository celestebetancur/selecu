import React from 'react';
import p5 from 'p5';
import ReactHowler from 'react-howler'

let s = undefined;

class Readalong extends React.Component {

state = {
  text: this.props.text,
  offsets: this.props.offsets,
  done: true
};

componentDidMount(){

  const code = (sketch) => {

    let word = 0
    let audio
    let divMain
    let offsets
    let pText
    let p

    sketch.update = () => {
      document.querySelectorAll('.temporal').forEach(function(a) {
        a.remove()
      })
      p = []
      offsets = this.state.offsets
      pText = this.state.text.split(' ')
      for(let i = 0; i < pText.length; i++){
        let t = sketch.createSpan(pText[i])
        let space = sketch.createSpan(' ')
        t.class('temporal')
        space.class('temporal')
        p.push(t)
        p.push(space)
      }
      for(let i = 0; i < p.length; i++){
        p[i].parent(divMain)
      }
      this.setState({done: false})
    }

    sketch.setup = () => {
      divMain = document.getElementById('main-container-text')
    };

    sketch.draw = () => {
      if(this.state.done){
        sketch.update()
      }

      let currentTime = this.player.howler.seek() * 1000
      for(let i = 0; i < pText.length; i++){
        p[i].removeAttribute('style');
        if(currentTime >= Math.round(offsets[i]) && currentTime < Math.round(offsets[i+1])){
          word = i*2;
        }
      }
      p[word].style('color','#0000ff');
      p[word].style('text-decoration','underline');
      p[word].style('background-color','lightblue');
      if(word >= 2){
        p[word - 2].removeAttribute('style');
      }
    };
  };
  s = new p5(code,'defaultP5');
}

componentDidUpdate(){
    if(this.state.text !== this.props.text){
      this.setState({done:true, text: this.props.text})
      console.log(this.state.text)
    }
}
  componentWillUnmount(){
    s.remove();
  }
  render(){
    return (
      <ReactHowler
        src={this.props.audio}
        playing={this.props.play}
        ref={(ref) => (this.player = ref)}
      />
    );
  }
}

export default Readalong;
