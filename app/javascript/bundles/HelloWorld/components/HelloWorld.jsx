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
    }
};


export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState()
  }

  flatmates = () => {
      return [ <Flatmate
                    top={22}
                    left={27}
                    image="https://i.imgur.com/NBBFoNn.jpg"
                    key='jasper' />,
                    <Flatmate
                      top={22}
                      left={22}
                      image="https://i.imgur.com/IalrPCs.jpg"
                      key='brigette' />
                  ]
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
    for (var i = 0; i < this.flatmates().length; i++){
      // console.log(this.flatmates()[i].props.image)
      let flatmate = this.flatmates()[i]
      let flatmateTop = flatmate.props.top
      let flatmateLeft = flatmate.props.left
      if(flatmateTop == newDirTop && flatmateLeft == (newDirLeft - 2)){
        console.log('next to ' + flatmate.key);
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

      // console.log("player top is now " + this.state.positions.player.top)
      // console.log("player left is now " + this.state.positions.player.left)
      console.log("Memory.create(top: " + this.state.positions.player.top + ", left: " + this.state.positions.player.left + ",")
      console.log("------------")
  }



  render() {

    let potentialMemory = this.checkIfTileContainsMemoryOrFlatmate({top: this.state.positions.player.top, left: this.state.positions.player.left})
    return (
      <div className="grid">
        { potentialMemory }
        <Player
            position={this.state.positions.player}
            handlePlayerMovement={this.handlePlayerMovement} />
        { this.flatmates() }
      </div>
    );
  }
}

class Flatmate extends React.Component {
   constructor(props) {
    // props: image, top, left
    super(props);
    }

    render(){
      let flatmateStyle = {
        top: (this.props.top * GRID_SIZE) + 'px',
        left: (this.props.left * GRID_SIZE) + 'px',
        backgroundImage: `url(${this.props.image})`
      }
      return(
        <div
          className="flatmate"
          style={flatmateStyle}
        >
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