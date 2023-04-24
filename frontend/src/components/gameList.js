import React from 'react'
import Dcon from './delet'

const gameListScreen = () => {

  const getGameList=async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8080/api/v1/gameList", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    
    });
  };
  return (
    <>
    <div>gameList</div>
    <Dcon></Dcon>
    </>
  )
}

export default gameListScreen