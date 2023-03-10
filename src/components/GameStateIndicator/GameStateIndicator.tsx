import { FC, useCallback, useContext } from "react";
import styles from "./GameStateIndicator.module.scss"
import { GameState } from "../../types/game";
import { GameContext } from "../../context/GameContext";

import NotStarted from "../../asset/notstarted.png"
import Started from "../../asset/started.png"
import Loosed from "../../asset/loosed.png"
import MouseDown from "../../asset/mouseDown.png"
import Wined from "../../asset/wined.png"

import { getGameMap } from "../../helpers/getGameMap";
import { MAP_SIZE } from "../../vars/game";

const GameStateImgs = {
  [ GameState.STARTED ]: Started,
  [ GameState.LOOSED ]: Loosed,
  [ GameState.WINED ]: Wined,
  [ GameState.NOT_STARTED ]: NotStarted
}

export const GameStateIndicator: FC = ( {} ) => {
  const { gameContext, setGameContext } = useContext( GameContext );

  const handleClick = useCallback( () => {
    setGameContext( prev => {
      prev.gameState = GameState.NOT_STARTED;
      prev.map = getGameMap( MAP_SIZE, 0 );
      prev.openedCellsCount = 0;
      prev.flagsCount = 0;

      return { ...prev }
    } )
  }, [ gameContext ] );

  return (
    <img src={ gameContext.isMouseDown ? MouseDown : GameStateImgs[ gameContext.gameState ] } className={ styles.GameState }
         onClick={ handleClick }/>
  )
}