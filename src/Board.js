import React, { Component } from 'react'
// import { Button } from 'react-bootstrap'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0,
      playerOne: "",
      playerTwo: "",
      spaces: ["", "", "", "", "", "", "", "", ""],
      message: ""
    }
  }

  // teamSelect(){
  //   //create input box to select team
  // }
  //create a method to take turns from player: x / player: o

//method that measures click to determines who's turn is it.
  teamSelect = (e) => {
    let {playerOne, playerTwo} = this.state
    this.setState({playerOne: playerOne, playerTwo: playerTwo})
  }

  //method for userClick
  userClick(e) {
    let { spaces, count,playerOne, playerTwo, message} = this.state
      if((count+2)% 2 === 0 && spaces[e.target.id] === "") {
          spaces[e.target.id] = "X"
          count++
      } else if ((count+2)%2 === 1 && spaces[e.target.id] === "") {
          spaces[e.target.id] = "O"
          count++
      }
  //centralized winning condition
      var winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]

      let win= winningConditions.filter((combo,index,array) => {
      var [a,b,c] = combo
      if(spaces[a]==="X" && spaces[b]==="X"&& spaces[c]==="X"){
        message = "X is the Winner!"
      } else if(spaces[a]==="O" && spaces[b]==="O"&& spaces[c]==="O"){
        message = "O is the winner!"
      } else if(count === 9){
        message = "It's a draw!"
      }
      })
      this.setState({count:count, spaces:spaces, message:message})

    }

  render() {
    let { count,playerOneScore,message } = this.state
    let squares = this.state.spaces.map((val, index) => {
    return  (
      <div className = "grid-item" key={index} id={index} onClick={this.userClick.bind(this)}>{val}</div> )


  })
  return (
    <div>
    <div className="message"> {message}</div>
    <div className="grid-container">
      {squares}
    </div>
    <form onSubmit= {this.teamSelect}>
    <button className="Button" type = "submit" > Restart  </button>
    </form>
    </div>
  );
}
}
export default Board

/*  <label> Player One:
<input type="text" id='playerOne' value={this.playerOne} onChange={this.teamSelect}/>
</label>
<label> Player Two:
<input type="text" id='playerTwo' value={this.playerTwo} onChange={this.teamSelect}/>
</label> */
