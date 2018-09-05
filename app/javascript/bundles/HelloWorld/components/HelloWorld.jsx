import PropTypes from 'prop-types';
import React from 'react';
import Popup from "reactjs-popup";


const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const GRID_SIZE = 15;


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
          jasper: {top: 22, left: 27, image: "https://i.imgur.com/NBBFoNn.jpg", key: 'jasper', is_interactable: false},
          brigette: {top: 22, left: 22, image: "https://i.imgur.com/IalrPCs.jpg", key: 'brigette', is_interactable: false},
        }
    }
};


export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  checkIfTileContainsMemoryOrFlatmate = (newDirection) => {
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

    //check flatmates
    // for (var i = 0; i < this.state.flatmates.length; i++){
    //   let flatmate = this.state.flatmates[i]
    //   let flatmateTop = flatmate.top
    //   let flatmateLeft = flatmate.left
    //   if(flatmateTop == newDirTop && flatmateLeft == (newDirLeft - 2)){
    //   }else{
    //     //find the element and replace it in the array, passing a prop along

    //   }
    // }
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

      // console.log("player top is now " + this.state.positions.player.top)
      // console.log("player left is now " + this.state.positions.player.left)
      console.log("Memory.create(top: " + this.state.positions.player.top + ", left: " + this.state.positions.player.left + ",")
      console.log("------------")
  }

  renderFlatmates = () => {
    //make a copy of the state
    let flatmates = Object.assign({}, this.state.flatmates)
    Object.keys(flatmates).map(function(key){console.log(flatmates[key].image)})
  }

  render() {

    let potentialMemory = this.checkIfTileContainsMemoryOrFlatmate({top: this.state.positions.player.top, left: this.state.positions.player.left})
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
    // props: image, top, left
    super(props);
    this.state = {is_interactable: false}
    }

    isInteractable = (e) => {
      this.setState((state) => {
          return {is_interactable: true}
        });
    }

    notInteractable = (e) => {
      this.setState((state) => {
          return {is_interactable: false}
        });
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
        display: `${this.state.is_interactable ? "none" : "" }`
      }
      return(
        <div>
          <div
            className="flatmate-speech-bubble"
            style={bubbleStyle}
          >
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