import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, {useState} from 'react'

function calculateWinner(squares){
  const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
  ]

  for(let i =0; i<winningCombinations.length;i++){
    const [a,b,c] = winningCombinations[i];

    if(squares[a] && squares[a]===squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}


function Square({value, onSquareClick}){

  // console.log("square");

  return(
    <button onClick={onSquareClick} className='square'>{value}</button>
  )
  
}

function Board(){
  const [squares,setSquares]=useState(Array(9).fill(null));
  // console.log("board");
  console.log(squares)
  const [xisNext,setXisNext]=useState(true);
  function handleClick(i){
    const updatedSquares= squares.slice();
    // alert(i);
    // const updatedSquares= squares.slice();
    if(updatedSquares[i] || calculateWinner(squares)){
      return;
    }
    if(xisNext){
      updatedSquares[i]="X";
    }
    else{
      updatedSquares[i]="O";
    }
    setXisNext(!xisNext);
    setSquares(updatedSquares);
  }

  const winner=calculateWinner(squares);
  console.log('winner',winner);

  let status;
  if(winner){
    status=`Winner: ${winner}`;
  }
  else{
    status=`Next player: ${xisNext ? 'X' : 'O'}`;
  }
  // Check for draw condition
  if (!winner && squares.every(square => square !== null)) {
    status = "It's a draw!";
  }
  return(
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
      <button 
      style={
        {
          marginTop:"20px"
      }}
      onClick={()=>{
        setSquares(Array(9).fill(null));
        setXisNext(true);
        }}>Reset</button>
    </>
  )
}

function App() {
  console.log("app");
  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column"
    }}
    className='App'>
      <h1>Tic Tac Toe</h1>
    <div>
      <Board />
    </div>
    </div>
  )
  
}

export default App
