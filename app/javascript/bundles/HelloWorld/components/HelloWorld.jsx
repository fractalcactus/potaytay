import PropTypes from 'prop-types';
import React from 'react';
import Popup from "reactjs-popup";


const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const GRID_SIZE = 15;
const QUOTES = {
  jasper:['burrito', 'cheese', "how's it going?", "I've been mixing all day", "dope", "hope that's mellow", "going surfing"],
  brigette:["squijected!!", "fart", "poo", "I ate too much", "mittens", "I can't, I need to clean my fish", "I love you!"]
}


// the default state, calculated when HelloWorld is called
const getDefaultState = () => {
    return {
        positions: {
            player: {
                top: 22,
                left: 30
            },
        },
        flatmates:{
          jasper: {top: 22, left: 18, image: "https://i.imgur.com/IalrPCs.jpg", key: 'jasper', is_interactable: false},
          brigette: {top: 22, left: 22, image: "https://i.imgur.com/IalrPCs.jpg", key: 'brigette', is_interactable: false}
        }
    }
};


export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  checkIfTileContainsMemory = (newDirection) => {
    let memories = this.props.memory_array
    let newDirTop = newDirection.top
    let newDirLeft = newDirection.left
    let memoryTriggerStyles = {
      position: 'absolute',
      top: ((newDirTop * GRID_SIZE) - 16) + 'px',
      left: (newDirLeft * GRID_SIZE) + 'px'
    }
    // check memories
    let memoriesLength = memories.length;
    for (var i = 0; i < memoriesLength; i++){
      if(memories[i].top == String(newDirTop) && memories[i].left == String(newDirLeft)){
         let memoryMarkup = <Popup trigger={<button style={memoryTriggerStyles} className="memoryTrigger"> memory!</button>} modal> <div className='memory-box'><img className='memory-image' src={ memories[i].image }/><p>{ memories[i].text }</p></div></Popup>
         return memoryMarkup
      }
    }
  }

  handlePlayerMovement = (dirObj) => {
      const { top, left } = this.state.positions.player;


      // if you can move, update the position, and then check if your new position contains a memory
      this.setState({
          positions: {
              ...this.state.positions,
              player: {
                  top: top + (1 * dirObj.top),
                  left: left + (1 * dirObj.left)
              }
          }
      });
      let newDirTop = this.state.positions.player.top
      let newDirLeft = this.state.positions.player.left
      //check flatmates
      for (var f in this.state.flatmates){
        let flatmateObj = this.state.flatmates[f]
        let flatmateTop = flatmateObj.top
        let flatmateLeft = flatmateObj.left
        let flatmateKey = flatmateObj.key
        if(flatmateTop == newDirTop && flatmateLeft == (newDirLeft - 2)){
          //update is_interactable state to true for that flatmate
          if(flatmateKey == 'jasper'){
            this.setState({
                  flatmates: {
                    ...this.state.flatmates,
                    jasper: {
                      ...this.state.flatmates.jasper,
                        is_interactable: true
                    }
                }
            });
          } else if(flatmateKey == 'brigette'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    brigette: {
                      ...this.state.flatmates.brigette,
                        is_interactable: true
                    }
                }
            });
          }
        }else{
          //update is_interactable state to false for that flatmate
            if(flatmateKey == 'jasper'){
            this.setState({
                  flatmates: {
                    ...this.state.flatmates,
                    jasper: {
                      ...this.state.flatmates.jasper,
                        is_interactable: false
                    }
                }
            });
          } else if(flatmateKey == 'brigette'){
            this.setState({
                flatmates: {
                    ...this.state.flatmates,
                    brigette: {
                      ...this.state.flatmates.brigette,
                        is_interactable: false
                    }
                }
            });
          }

        }
      }

      console.log("Memory.create(top: " + this.state.positions.player.top + ", left: " + this.state.positions.player.left + ",")
      console.log("------------")
  }

  renderFlatmates = () => {
    let flatmates = Object.assign({}, this.state.flatmates)
    let flatmatesArr = Object.values(flatmates)
    let newFlatmatesArr = flatmatesArr.map(f => this.generateAFlatmate(f));
    console.log(newFlatmatesArr);
    return newFlatmatesArr //this is a local object, not the state
  }

  generateAFlatmate = (flatmateObj) => {
    return <Flatmate  is_interactable={flatmateObj.is_interactable} top={flatmateObj.top}   left={flatmateObj.left}   image={flatmateObj.image}   key={flatmateObj.key} />
  }

  render() {

    let potentialMemory = this.checkIfTileContainsMemory({top: this.state.positions.player.top, left: this.state.positions.player.left})
    return (
      <div className="grid">
        { potentialMemory }
        <Player
            position={this.state.positions.player}
            handlePlayerMovement={this.handlePlayerMovement} />
        { this.renderFlatmates() }
      </div>
    );
  }
}

class Flatmate extends React.Component {
   constructor(props) {
    super(props);
    }

    render(){
      let flatmateStyle = {
        top: (this.props.top * GRID_SIZE) + 'px',
        left: (this.props.left * GRID_SIZE) + 'px',
        backgroundImage: `url(${this.props.image})`
      }
      let bubbleStyle = {
        top: ((this.props.top - 6) * GRID_SIZE) + 'px',
        left: ((this.props.left - 2) * GRID_SIZE) + 'px',
        display: `${this.props.is_interactable == false ? "none" : "flex" }`
      }
      let quote = QUOTES['brigette'][0]
      return(
        <div>
          <div
            className="flatmate-speech-bubble"
            style={bubbleStyle}
          >
          { quote }
          </div>
          <div
            className="flatmate"
            style={flatmateStyle}
          >
        </div>
      </div>
      );
    }

}


class Player extends React.Component {
  handleKeyDown = (e) => {
          let newDirection;
          switch(e.keyCode) {
              case 37:
                  newDirection = { top: 0, left: -1 , dir: LEFT};
                  break;
              case 38:
                  newDirection = { top: -1, left: 0 , dir: UP};
                  break;
              case 39:
                  newDirection = { top: 0, left: 1, dir: RIGHT};
                  break;
              case 40:
                  newDirection = { top: 1, left: 0, dir: DOWN };
                  break;
              default:
                  return;
          }
 
          this.props.handlePlayerMovement(newDirection);
      }



  render() {
    const { size, position: { top, left }} = this.props;
    let squareStyle = {
      top: (top * GRID_SIZE) + 'px',
      left: (left * GRID_SIZE) + 'px'
    }
    return (
      <div
        className="square"
        style={squareStyle}
      >
      </div>
    );
  }

  componentDidMount() {
      window.onkeydown = this.handleKeyDown;
  }
}